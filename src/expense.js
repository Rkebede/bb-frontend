class Expense {
  
  static all = {}

  constructor(id, name, budget_id, amount) {
    this.id = id;
    this.name = name;
    this.budget_id = budget_id;
    this.amount = amount;
    this.constructor.all = {...this.constructor.all, [id]:this}
    createNewExpenseFields(this)

  };

  static createExpensesForBudget(budget){
    return budget.expenses.map(expenseObj => {
      new Expense(expenseObj.id, expenseObj.name, budget.id, expenseObj.amount)
    })
  }

}
