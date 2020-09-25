let budgets = {}
let expenses = {}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('income-dropdown').addEventListener('submit', saveIncomeType)
  API.getRequest("/budgets").then(resp => {
    if (resp.length !== 0) {
      resp.forEach((budget) => {
        createBudget(budget)
      })
      showForms()
      setIncomeType(resp.length)
      document.getElementById('total').innerText = `Total: $${incomeTotal()}`
    }
  })

})

const showForms = () => {
  document.getElementById('hidden-dropdown').style.display = 'block'
  document.getElementById('paycheck-tab').style.display = 'block'
}
