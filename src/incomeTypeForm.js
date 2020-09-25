class IncomeTypeForm {

  constructor() {
  }

  static setEventListeners() {
    document.getElementById('income-dropdown').addEventListener('submit', saveIncomeType)
  }
} 