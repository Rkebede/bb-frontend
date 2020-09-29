class ExpenseCell {

  constructor(expense){
    this.expense = expense
    expenseAccordion.expenseTable.addExpenseCell(this)
  }


  remove() {
    document.getElementById(`cell-${this.expense.id}`).remove()
  }

  update(){
    let cell = document.getElementById(`cell-${this.expense.id}`)
    cell.querySelector('#cell-name').innerText = this.expense.name
    cell.querySelector('#cell-amount').innerText = this.expense.amount
    expenseAccordion.updateTotal()
  }


}