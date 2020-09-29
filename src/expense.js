class Expense {

  static all = {}

  constructor(id, name, budget_id, amount) {
    this.id = id;
    this.name = name;
    this.budget_id = budget_id;
    this.amount = amount;
    this.constructor.all = { ...this.constructor.all, [id]: this }
    this.expenseForm = new ExpenseForm(this)
    this.expenseCell = null
  }

  static findById(id) {
    return Expense.all[id]
  }

  static createExpensesForBudget(budget) {
    return budget.expenses.map(expenseObj => {
      return new Expense(expenseObj.id, expenseObj.name, budget.id, expenseObj.amount)
    })
  }

  delete() {
    API.deleteRequest(`/expenses/${this.id}`)
    this.expenseForm.remove()
    this.expenseCell.remove()
    delete Expense.all[this.id]
    expenseAccordion.updateTotal()
    Budget.findById(this.budget_id).accordion.setPaycheckAmount()
    budget.accordion.setPaycheckAmount()
  }

  static reset() {
    Expense.all = {}
    expenseAccordion = null
  }

  update(body) {
    API.patchRequest(`/expenses/${this.id}`, body).then((resp) => {
      this.name = resp.name
      this.amount = resp.amount
      this.expenseCell.update()
      expenseAccordion.updateTotal()
    }).then(()=> Budget.findById(this.budget_id).accordion.setPaycheckAmount()) 
  }

 static total(){
    return Object.values(Expense.all).reduce((acc, expense) => { return expense.amount + acc }, 0)
  }


}
