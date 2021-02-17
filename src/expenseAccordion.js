class ExpenseAccordion {

  constructor() {
    this.expenseTable = new ExpenseTable()
    this.title = null
    this.findOrCreateExpenseAccordion()
  }

  findOrCreateExpenseAccordion() {
    let expenseAccordion = document.createElement('li')
    expenseAccordion.setAttribute('class', 'uk-sticky', 'bottom: true')
    accordionContainer.appendChild(expenseAccordion)
    const accordionContent = Accordion.createAccordionContent()
    this.title = Accordion.createAccordionTitle('all-expenses')
    this.title.innerText = `All Expenses : $${Expense.total()}`
    expenseAccordion.appendChild(this.title)
    expenseAccordion.appendChild(accordionContent)
    accordionContent.appendChild(this.expenseTable.render())
    let search = document.createElement('input')
    search.setAttribute('id', 'search')
    search.setAttribute('placeholder', 'Search by Amount')
    let saveSearch = document.createElement('button')
    saveSearch.setAttribute('id', 'saveSearch')
    saveSearch.innerText = "Search"
    
    saveSearch.addEventListener('click', (e)=>{
      let searchInput = e.target.previousElementSibling.value
      // for(let x in Expense.all){ 
      //   if (Expense.all[x].amount > searchInput){
      //     Expense.all[x].expenseCell.remove()
      //   }
      // }

      //  let filtered = Object.values(Expense.all).filter((expense) =>{ 
      //     expense.expenseCell.remove()
      //     return expense.amount <= searchInput
      //   })
      //   filtered.forEach((expense) => { new ExpenseCell(expense)})

      Object.values(Expense.all).forEach((expense) => { 
        if (expense.amount > searchInput){ expense.expenseCell.remove()}
       })

    })
    expenseAccordion.appendChild(search)
    expenseAccordion.appendChild(saveSearch)
  }

  appendAllExpenses() {
    Object.values(Expense.all).forEach((expense) => {
      this.appendExpense(expense)
    })
  }

  appendExpense(expense) {
    expense.expenseCell = new ExpenseCell(expense)
  }

  updateTotal() {
    this.title.innerText = `All Expenses : $${Expense.total()}`
    document.getElementById('unallocated').innerText = `Unallocated Funds: $${Budget.incomeTotal() - Expense.total()}`
  }
}