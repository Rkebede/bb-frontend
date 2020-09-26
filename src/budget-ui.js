
const saveIncomeToBudget = (e) => {
  e.preventDefault()
  const value = e.target.previousElementSibling.value
  const id = e.target.parentElement.parentElement.previousSibling.id
  Budget.findById(id).setIncome(value)
}

const setPaycheckAmount = (budget) => {
  document.getElementById(budget.id).innerText = `Paycheck : $${budget.income}`
}

const incomeTotal = () => {
  return Object.values(Budget.all).reduce((acc, budget) => { return budget.income + acc }, 0)
}

const resetBudget = () => {
  API.deleteRequest('/budgets')
  Budget.all = {}
  document.getElementById('total').innerText = `Total: $0`
  document.getElementById('uk-accordion').innerHTML = ''
}

const parentBudget = (e) => {
  let id = e.target.parentElement.previousElementSibling.id
  let budget = Budget.findById(id)
  return budget
}