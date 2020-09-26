class IncomeTypeForm {

  constructor() {
  }

  static setEventListeners() {
    document.getElementById('income-dropdown').addEventListener('submit', saveIncomeType)
  }

  static setIncomeType = (budgetCount) => {
    if (budgetCount > 0) {
      document.getElementById('income-type').value = budgetCount
    }
  }

  
} 