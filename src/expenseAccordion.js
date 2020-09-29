class ExpenseAccordion {

  constructor(){
    this.expenseTable = new ExpenseTable()
    this.title = null
    this.findOrCreateExpenseAccordion()
    new Piechart ()
  }

  findOrCreateExpenseAccordion() {
    let expenseAccordion = document.createElement('li')
    expenseAccordion.setAttribute('class','uk-sticky', 'bottom: true')
    accordionContainer.appendChild(expenseAccordion)
    const accordionContent = Accordion.createAccordionContent()
    this.title = Accordion.createAccordionTitle('all-expenses')
    this.title.innerText = `All Expenses : $${Expense.total()}`
    expenseAccordion.appendChild(this.title)
    expenseAccordion.appendChild(accordionContent)
    accordionContent.appendChild(this.expenseTable.render())
  }

  appendAllExpenses(){
    Object.values(Expense.all).forEach((expense) =>{
      this.appendExpense(expense)
    })
  }

  appendExpense(expense){
    expense.expenseCell = new ExpenseCell(expense)
  }

  updateTotal(){
    this.title.innerText = `All Expenses : $${Expense.total()}`
    document.getElementById('unallocated').innerText = `Unallocated Funds: $${Budget.incomeTotal() - Expense.total()}`
  }
}