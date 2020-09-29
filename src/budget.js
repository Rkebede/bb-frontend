class Budget {

  static all = {}

  constructor(id, income = 0, expenses = []) {
    this.income = income;
    this.id = id
    this.expenses = expenses
    this.constructor.all = { ...this.constructor.all, [id]: this }
    this.accordion = new BudgetAccordion(this)
  }

  static findById(id) {
    return this.all[id]
  }

  static getBudgets() {
    API.getRequest("/budgets").then(resp => {
      if (resp.length !== 0) {
        resp.forEach((budgetObj) => {
          const budget = new Budget(budgetObj.id, budgetObj.income)
          if (budgetObj.expenses.length > 0) {
            budget.expenses = Expense.createExpensesForBudget(budgetObj)
            budget.accordion.setPaycheckAmount()          
          }
        })
        if (!expenseAccordion){        
          expenseAccordion = expenseAccordion || new ExpenseAccordion()
          expenseAccordion.appendAllExpenses()
        }
        showForms()
        IncomeTypeForm.setIncomeType(resp.length)
        BudgetAccordion.renderIncomeTotal()
      }
    })
  }

  static createBudgets(budgetCount) {
    for (let i = 0; i < budgetCount; i++) {
      API.postResquest("/budgets", { income: 0 }).then(resp => {
        new Budget(resp.id, resp.income, resp.expenses)
        showForms()
      })
    }
  }

  setIncome(incomeAmount) {
    API.patchRequest(`/budgets/${this.id}`, { income: incomeAmount }).then((resp) => {
      this.income = resp.income
      this.accordion.setPaycheckAmount()
      BudgetAccordion.renderIncomeTotal()
    })
  }

  static incomeTotal() {
    return Object.values(this.all).reduce((acc, budget) => { return budget.income + acc }, 0)
  }

  static reset() {
    API.deleteRequest('/budgets')
    this.all = {}
    document.getElementById('total').innerText = `Total Income : $0`
    document.getElementById('unallocated').innerText = `Unallocated Funds : $0`
    document.getElementById('uk-accordion').innerHTML = ''
  }

  addExpense() {
    const body = { budget_id: this.id, amount: 0, name: "" }
    API.postResquest('/expenses', body).then((resp) => {
      const expense = new Expense(resp.id, resp.name, resp.budget_id, resp.amount)
      this.expenses.push(expense)
      expenseAccordion = expenseAccordion || new ExpenseAccordion()
      expenseAccordion.appendExpense(expense)
    })
  }

  expenseTotal() {
    return this.expenses.reduce((acc, expense) => {
      return expense.amount + acc
    }, 0)
  }
}





