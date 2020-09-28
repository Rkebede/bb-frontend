class ExpenseTable {
  constructor(){
      this.tableBody = null
  }

  render() { 
    let table = document.createElement('table')
    table.setAttribute('class', 'uk-table uk-table-hover') 
    let tableHeaders = document.createElement('thead')
    table.appendChild(tableHeaders)
    let row = document.createElement('tr')
    tableHeaders.appendChild(row)
    let expenseHeader = document.createElement('th')
    expenseHeader.setAttribute('id', 'expenseHeader')
    expenseHeader.innerText = "Expenses"
    row.appendChild(expenseHeader)
    let amountHeader = document.createElement('th')
    amountHeader.setAttribute('id', 'amountHeader')
    row.appendChild(amountHeader)
    amountHeader.innerText = "Amount"
    this.tableBody = document.createElement('tbody')
    table.appendChild(this.tableBody)
    return table     
}

  addExpenseCell(expenseCell){
    let table = this.tableBody
    let row = document.createElement('tr')
    row.setAttribute('id', `cell-${expenseCell.expense.id}`)
    let name = document.createElement('td')
    name.setAttribute('id', `cell-name`)
    name.innerText = expenseCell.expense.name
    let amount = document.createElement('td')
    amount.innerText = expenseCell.expense.amount
    amount.setAttribute('id', 'cell-amount')
    let deleteButton = document.createElement('td')
    deleteButton.appendChild(expenseCell.expense.expenseForm.deleteExpenseButton())
    row.appendChild(name)
    row.appendChild(amount)
    row.appendChild(deleteButton)
    table.appendChild(row)
  }

}
