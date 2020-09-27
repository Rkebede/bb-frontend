class ExpenseAccordion {

  constructor(){
    this.expenseTable = new ExpenseTable()
    this.findOrCreateExpenseAccordion()
  }

  findOrCreateExpenseAccordion() {
    if (!document.getElementById('all-expenses')) {
      let expenseAccordion = document.createElement('li')
      accordionContainer.appendChild(expenseAccordion)
      const accordionContent = Accordion.createAccordionContent()
      const title = Accordion.createAccordionTitle('all-expenses', 'All Expenses')
      expenseAccordion.appendChild(title)
      expenseAccordion.appendChild(accordionContent)
      accordionContent.appendChild(this.expenseTable.render())
    }
  }
}