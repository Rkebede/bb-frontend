class ExpenseForm {
  constructor(expense) {
    this.expense = expense
    this.name = expense.name
    this.amount = expense.amount
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
    name.value = this.name
    name.addEventListener('change', (e)=>{this.name = e.target.value})
    return name
  }

  expenseAmount() {
    let amount = document.createElement('input')
    amount.setAttribute('id', 'expense-amount')
    amount.setAttribute('type', 'text')
    amount.setAttribute('name', 'amount')
    amount.setAttribute('placeholder', 'Expense Amount')
    amount.value = this.amount
    amount.addEventListener('change', (e)=>{this.name = e.target.value})
    return amount
  }

  saveExpenseButton() {
    let saveButton = document.createElement('button', 'save')
    saveButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
    saveButton.innerText = 'Save'
    saveButton.addEventListener('click', this.saveValuesToExpense)
    return saveButton
  }

  deleteExpenseButton() {
    let deleteButton = document.createElement('button', 'delete')
    deleteButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', this.deleteExpense)
    return deleteButton
  }

  saveValuesToExpense(e){
    e.preventDefault()
    this.expense.update({ name: this.name, amount: this.amount })
  }

  deleteExpense = (e) => {
    e.preventDefault()
    this.expense.delete()
  }
}

//budgetAccordion
const removeExpenseForm = () => {
  let form = document.getElementById('expenses-form')
  if (form) {
    document.getElementById('expenses-form').remove()
  }
}
