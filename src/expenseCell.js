class ExpenseCell {

  constructor(expense){
    this.expense = expense
    expenseAccordion.expenseTable.addExpenseCell(this)
  }


  remove() {
    document.getElementById(this.expense.id).remove()
  }


}