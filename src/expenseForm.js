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

  // static findOrCreateExpenseAccordion() {
  //   if (!document.getElementById('all-expenses')) {
  //     let expenseAccordion = document.createElement('li')
  //     accordionContainer.appendChild(expenseAccordion)
  //     const accordionContent = Accordion.createAccordionContent()
  //     const title = Accordion.createAccordionTitle('all-expenses', 'All Expenses')
  //     expenseAccordion.appendChild(title)
  //     expenseAccordion.appendChild(accordionContent)
  //     accordionContent.innerHTML =
  //       `<table class="uk-table uk-table-striped">
  //     <thead>
  //         <tr>
  //             <th>Expense</th>
  //             <th>Amount</th>
  //             <th></th>
  //         </tr>
  //     </thead>
  //     <tbody>
  //         <tr>
  //             <td>Rent</td>
  //             <td>2000</td>
  //             <td>${deleteExpenseButton()}</td>
  //         </tr>
  //         <tr>
  //             <td>Table Data</td>
  //             <td>Table Data</td>
  //             <td>Table Data</td>
  //         </tr>
  //         <tr>
  //             <td>Table Data</td>
  //             <td>Table Data</td>
  //             <td>Table Data</td>
  //         </tr>
  //     </tbody>
  // </table>
  //         `
  //   }
  // }

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
