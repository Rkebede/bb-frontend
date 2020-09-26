class ExpenseForm {
  constructor(expense) {
    this.expense = expense
    this.renderExpenseFields()
  }

  renderExpenseFields() {
    let form = this.findOrCreateForm()
    let input = document.createElement('fieldset')
    input.setAttribute('id', this.expense.id)
    form.appendChild(input)
    let name = this.expenseName()
    input.appendChild(name)
    let amount = this.expenseAmount()

    input.appendChild(amount)
    let saveButton = this.saveExpenseButton()

    input.appendChild(saveButton)
    let deleteButton = this.deleteExpenseButton()

    input.appendChild(deleteButton)
  }

  findOrCreateForm() {
    let form = document.getElementById(this.expense.budget_id).nextElementSibling.lastChild
    if (!form) {
      form = document.createElement('form')
      form.setAttribute('id', 'expenses-form')
      document.getElementById('hidden-expenses').appendChild(form)
    }
    return form
  }

  expenseName() {
    let name = document.createElement('input')
    name.setAttribute('id', 'expense-name')
    name.setAttribute('type', 'text')
    name.setAttribute('name', 'name')
    name.setAttribute('placeholder', 'Expense Name')
    name.value = this.expense.name
    return name
  }

  expenseAmount() {
    let amount = document.createElement('input')
    amount.setAttribute('id', 'expense-amount')
    amount.setAttribute('type', 'text')
    amount.setAttribute('name', 'amount')
    amount.setAttribute('placeholder', 'Expense Amount')
    amount.value = this.expense.amount
    return amount
  }

  saveExpenseButton() {
    let saveButton = document.createElement('button', 'save')
    saveButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
    saveButton.innerText = 'Save'
    saveButton.addEventListener('click', saveValuesToExpense)
    return saveButton
  }

  deleteExpenseButton() {
    let deleteButton = document.createElement('button', 'delete')
    deleteButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', deleteExpense)
    return deleteButton
  }

}

const saveValuesToExpense = (e) => {
  e.preventDefault()
  const expense = Expense.all[e.target.parentElement.id]
  const name = e.target.parentElement.elements[0].value
  const amount = e.target.parentElement.elements[1].value
  expense.update({ name, amount })
}

const deleteExpense = (e) => {
  e.preventDefault()
  const expenseId = e.target.parentElement.id
  Expense.findById(expenseId).delete()
}

//budgetAccordion
const removeExpenseForm = () => {
  let form = document.getElementById('expenses-form')
  if (form) {
    document.getElementById('expenses-form').remove()
  }
}
