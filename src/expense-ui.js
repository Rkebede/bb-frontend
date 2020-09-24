const createExpense = (expense) => {
  expenses = {...expenses, [expense.id]: expense}
  createNewExpenseFields(expense)
  return expense
}

const addExpense = () => {
  const body = {budget_id: currentBudget().id, amount: 0, name: ""}
  API.postResquest('/expenses', body).then((resp) => {
    const expense = new Expense(resp.id, resp.name, resp.budget_id, resp.amount)
    currentBudget().expenses.push(createExpense(expense))
  })
}

const createNewExpenseFields = (expense) => {
  const form = document.getElementById('expenses-form')
  let input = document.createElement('fieldset', 'expenses')
  input.setAttribute('id', expense.id)
  form.appendChild(input)
  let name = document.createElement('input')
  name.setAttribute('id', 'name')
  name.setAttribute('type', 'text')
  name.setAttribute('name', 'name')
  name.setAttribute('placeholder', 'Expense Name')
  name.value = expense.name
  input.appendChild(name)
  let amount = document.createElement('input', 'expense-amount')
  amount.setAttribute('id', 'amount')
  amount.setAttribute('type', 'text')
  amount.setAttribute('name', 'amount')
  amount.setAttribute('placeholder', 'Expense Amount')
  amount.value = expense.amount
  input.appendChild(amount)
  let saveButton = document.createElement('button', 'save')
  saveButton.innerText = 'Save'
  input.appendChild(saveButton)
  saveButton.addEventListener('click', saveValuesToExpense)
}

const saveValuesToExpense = (e) => {
  e.preventDefault()
  const expense = expenses[e.target.parentElement.id]
  const name = e.target.parentElement.elements[0].value
  const amount = e.target.parentElement.elements[1].value
  API.patchRequest(`/expenses/${expense.id}`,{name, amount}).then((resp) =>{
    let expense = expenses[resp.id]
    expense.name = resp.name
    expense.amount = resp.amount
  })
}

const resetExpense = () => {
  expenses = {}
  document.getElementById('expenses-form').reset()
}