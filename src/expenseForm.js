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
    name.setAttribute('class', `uk-input uk-width-1-3`)
    input.appendChild(name)
    let amount = this.expenseAmount()
    amount.setAttribute('class', `uk-input uk-width-1-3`)
    input.appendChild(amount)
    let saveButton = this.saveExpenseButton()
    input.appendChild(saveButton)
    let deleteButton = this.deleteExpenseButton()
    input.appendChild(deleteButton)
    
  }

  findOrCreateForm() {
    return document.getElementById(this.expense.budget_id).nextElementSibling.lastChild
  }

  expenseName() {
    let name = document.createElement('input')
    name.setAttribute('id', 'expense-name')
    name.setAttribute('type', 'text')
    name.setAttribute('name', 'name')
    name.setAttribute('placeholder', 'Expense Name')
    name.value = this.name
    name.addEventListener('change', (e) => { this.name = e.target.value })
    return name
  }

  expenseAmount() {
    let amount = document.createElement('input')
    amount.setAttribute('id', 'expense-amount')
    amount.setAttribute('type', 'text')
    amount.setAttribute('name', 'amount')
    amount.setAttribute('placeholder', 'Expense Amount')
    amount.value = this.amount
    amount.addEventListener('change', (e) => { this.amount = e.target.value })
    return amount
  }

  saveExpenseButton() {
    let eventFn = (e) => {
      e.preventDefault()
      this.expense.update({
        name: this.name, amount: this.amount
      })
    }
    let saveButton = createButton('save-expense-button', 'Save', eventFn)
    return saveButton
  }

  deleteExpenseButton() {
    let eventFn = (e) => {
      e.preventDefault()
      this.expense.delete()
    }
    let deleteButton = createButton('expense-delete-button', 'Delete', eventFn)
    return deleteButton
  }

  remove() {
    document.getElementById(this.expense.id).remove()
  }

}
