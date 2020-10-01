class IncomeTypeForm {

  static setEventListeners() {
    document.getElementById('income-dropdown').addEventListener('change', (e) => { return e.target.nextElementSibling.disabled = false })
    document.getElementById('income-dropdown').addEventListener('submit', this.saveIncomeType)
  }

  static setIncomeType = (budgetCount) => {
    if (budgetCount > 0) {
      document.getElementById('income-type').value = budgetCount
    }
  }

  static saveIncomeType(e) {
    e.preventDefault()
    const value = e.target.elements[0].value
    Budget.reset().then( () =>{
      Expense.reset()
      Budget.createBudgets(value)
    })
    
  }
} 