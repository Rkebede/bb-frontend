let budgets = {}
let expenses = {}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('income-dropdown').addEventListener('submit', saveIncomeType)
  API.getRequest("/budgets").then(resp => {
    if (resp.length !== 0) {
    resp.forEach((budget) => {
      createBudget(budget)
      createBudgetOption(budget)
    })      
    showForms()
    setIncomeType(resp.length)
    populateValue()
    document.getElementById('total').innerText = `Total: $${incomeTotal()}`
  }
  })
})

const showForms = () => {
  document.getElementById('hidden-dropdown').style.display = 'block'
  document.getElementById('paycheck-tab').style.display = 'block'
  document.getElementById('hidden-expenses').style.display = 'block'
  document.getElementById('income-amount').addEventListener('submit', saveIncomeToBudget)
  document.getElementById('income').addEventListener('change', (e) => {
    e.preventDefault()
    removeExpenseForm()
    populateValue(e)
  })
  document.getElementById('new-expense').addEventListener('click', addExpense)
}

const populateValue = (e) => {
  if (currentBudget() === undefined) {
    document.getElementById('amount').value = 0
  } else {
    document.getElementById('amount').value = currentBudget().income
    currentBudget().expenseValues().forEach((expense) => {
      createNewExpenseFields(expense)
    })
  }
}
