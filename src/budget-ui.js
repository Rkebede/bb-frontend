const setIncomeType = (budgetCount) => {
  if (budgetCount > 0) {
    document.getElementById('income-type').value = budgetCount
  }
}

const saveIncomeType = (e) => {
  e.preventDefault()
  const value = e.target.elements[0].value
  resetBudget()
  resetExpense()
  for (let i = 0; i < value; i++) {
    API.postResquest("/budgets", { income: 0 }).then(resp => {
      const budget = resp
      createBudget(budget)
      showForms()
    })
  }
}

const createBudget = (data) => {
  const budget = new Budget(data.id, data.income)
  budgets = { ...budgets, [data.id]: budget }
  createBudgetAccordion(data)
  data.expenses.map((expense) => {
    const newExpense = new Expense(expense.id, expense.name, expense.budget_id, expense.amount)
    budget.expenses = { ...budget.expenses, [newExpense.id]: newExpense }
    return createNewExpenseFields(createExpense(newExpense))
  })
  return budget
}

const saveIncomeToBudget = (e) => {
  e.preventDefault()
  const value = e.target.previousElementSibling.value
  const id = e.target.parentElement.parentElement.previousSibling.id
  API.patchRequest(`/budgets/${id}`, { income: value }).then((resp) => {
    let budget = budgets[resp.id]
    budget.income = resp.income
    setPaycheckAmount(budget)
    document.getElementById('total').innerText = `Total: $${incomeTotal()}`
  })
}

const setPaycheckAmount = (budget) => {
  document.getElementById(budget.id).innerText = `Paycheck : $${budget.income}`
}

const createBudgetAccordion = (budget) => {
  let accordion = document.getElementById('uk-accordion')
  let accordionContainer = document.createElement('li')
  accordion.appendChild(accordionContainer)
  let accordionContent = document.createElement('div')
  accordionContent.setAttribute('class', 'uk-accordion-content')
  accordionContent.setAttribute('id', 'accordion-content')


  let title = document.createElement('a')
  title.setAttribute('class', 'uk-accordion-title')
  title.setAttribute('href', '#')
  title.setAttribute('id', `${budget.id}`)
  title.innerText = `Paycheck: $${budget.income}`
  accordionContainer.appendChild(title)

  let incomeform = document.createElement('form')
  incomeform.setAttribute('id', 'income-form')
  let input = document.createElement('input')
  input.setAttribute('id', 'income-amount')
  input.setAttribute('type', 'number')
  input.setAttribute('name', 'income')
  input.setAttribute('placeholder', 'Check amount')
  input.setAttribute('value', `${budget.income}`)

  incomeform.appendChild(input)
  let saveButton = document.createElement('button')
  saveButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
  saveButton.setAttribute('id', 'save-amount')
  saveButton.innerText = 'Save'
  saveButton.addEventListener('click', saveIncomeToBudget)
  incomeform.appendChild(saveButton)
  accordionContent.appendChild(incomeform)
  accordionContainer.appendChild(accordionContent)
  expenseForm(budget)
}

const incomeTotal = () => {
  return Object.values(budgets).reduce((acc, budget) => { return budget.income + acc }, 0)
}

const resetBudget = () => {
  API.deleteRequest('/budgets')
  budgets = {}
  document.getElementById('total').innerText = `Total: $0`
  document.getElementById('uk-accordion').innerHTML = ''
}

const parentBudget = (e) => {
  let id = e.target.parentElement.previousElementSibling.id
  let budget = budgets[id]
  return budget
}