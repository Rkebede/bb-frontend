class Budget {

  static all = {}

  constructor(id, income = 0, expenses=[]) {
    this.income = income;
    this.id = id
    this.expenses = expenses
    this.constructor.all = {...this.constructor.all, [id]:this}
    new BudgetAccordion(this)
  };

  static findById(id) {
    return this.constructor.all[id]
  }

  static getBudgets() {
    API.getRequest("/budgets").then(resp => {
      if (resp.length !== 0) {
        this.createBudgets(resp)
        showForms()
        setIncomeType(resp.length)
        document.getElementById('total').innerText = `Total: $${incomeTotal()}`
      }
    })
  }

  static createBudgets(budgetObjs){
    budgetObjs.forEach((budgetObj) => {
      const expenses = Expense.createExpensesForBudget(budgetObj)
      new Budget(budgetObj.id, budgetObj.income, expenses)
    })
  }

  totalExpenses() {
    this.expenses.reduce((acc, expense) => {
      return acc + expense
    }, 0)
  }

  expensesMinusIncome() {
    return this.income - this.totalExpenses
  }

  expenseValues() {
    return Object.values(this.expenses)
  }
}



