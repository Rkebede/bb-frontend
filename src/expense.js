class Expense {

  static all = {}

  constructor(id, name, budget_id, amount) {
    this.id = id;
    this.name = name;
    this.budget_id = budget_id;
    this.amount = amount;
    this.constructor.all = { ...this.constructor.all, [id]: this }
    this.expenseForm = new ExpenseForm(this)
    this.expenseCell = new ExpenseCell(this)
  }

  static findById(id) {
    return Expense.all[id]
  }

  static createExpensesForBudget(budget) {
    return budget.expenses.map(expenseObj => {
      new Expense(expenseObj.id, expenseObj.name, budget.id, expenseObj.amount)
    })
  }

  delete() {
    API.deleteRequest(`/expenses/${this.id}`)
    this.expenseForm.remove()
    delete Expense.all[this.id]
  }

  static reset() {
    Expense.all = {}
  }

  update(body) {
    API.patchRequest(`/expenses/${this.id}`, body).then((resp) => {
      this.name = resp.name
      this.amount = resp.amount
    })
  }

}
