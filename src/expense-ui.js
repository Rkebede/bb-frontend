const createExpense = (expense) => {
  expenses = { ...expenses, [expense.id]: expense }
  return expense
}

const addExpense = (e) => {
  let budget = parentBudget(e)
  const body = { budget_id: budget.id, amount: 0, name: "" }
  API.postResquest('/expenses', body).then((resp) => {
    const expense = new Expense(resp.id, resp.name, resp.budget_id, resp.amount)
    budget.expenses = { ...budget.expenses, [expense.id]: createExpense(expense) }

    createNewExpenseFields(expense)

  })

}

const expenseForm = (budget) => {
  let accordion = document.getElementById(budget.id).nextElementSibling
  let expense = document.createElement('h1')
  expense.innerText = 'Expense'
  accordion.appendChild(expense)
  let button = document.createElement('button')
  button.setAttribute('id', 'new-expense')
  button.setAttribute('class', 'uk-button uk-button-default uk-button-small')
  button.innerText = 'Add Expense'
  button.addEventListener('click', addExpense)
  accordion.appendChild(button)
  let form = document.createElement('form')
  form.setAttribute('id', 'expenses-form')
  accordion.appendChild(form)
}

const createNewExpenseFields = (expense) => {
  let form = document.getElementById(expense.budget_id).nextElementSibling.lastChild
  if (!form) {
    form = document.createElement('form')
    form.setAttribute('id', 'expenses-form')
    document.getElementById('hidden-expenses').appendChild(form)
  }
  let input = document.createElement('fieldset')
  input.setAttribute('id', expense.id)
  form.appendChild(input)
  let name = document.createElement('input')
  name.setAttribute('id', 'expense-name')
  name.setAttribute('type', 'text')
  name.setAttribute('name', 'name')
  name.setAttribute('placeholder', 'Expense Name')
  name.value = expense.name
  input.appendChild(name)
  let amount = document.createElement('input')
  amount.setAttribute('id', 'expense-amount')
  amount.setAttribute('type', 'text')
  amount.setAttribute('name', 'amount')
  amount.setAttribute('placeholder', 'Expense Amount')
  amount.value = expense.amount
  input.appendChild(amount)
  let saveButton = document.createElement('button', 'save')
  saveButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
  saveButton.innerText = 'Save'
  input.appendChild(saveButton)
  saveButton.addEventListener('click', saveValuesToExpense)
  let deleteButton = document.createElement('button', 'delete')
  deleteButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
  deleteButton.innerText = 'Delete'
  input.appendChild(deleteButton)
  deleteButton.addEventListener('click', deleteExpense)

}

const saveValuesToExpense = (e) => {
  e.preventDefault()

  const expense = expenses[e.target.parentElement.id]
  const name = e.target.parentElement.elements[0].value
  const amount = e.target.parentElement.elements[1].value
  API.patchRequest(`/expenses/${expense.id}`, { name, amount }).then((resp) => {
    let expense = expenses[resp.id]
    expense.name = resp.name
    expense.amount = resp.amount
  })
}

const deleteExpense = (e) => {
  e.preventDefault()
  const expenseId = e.target.parentElement.id
  API.deleteRequest(`/expenses/${expenseId}`)
  document.getElementById(expenseId).remove()
  delete expenses[expenseId]
}

const resetExpense = () => {
  expenses = {}
  removeExpenseForm()
}

const removeExpenseForm = () => {
  let form = document.getElementById('expenses-form')
  if (form) {
    document.getElementById('expenses-form').remove()
  }
}
