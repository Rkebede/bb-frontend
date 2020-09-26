const saveIncomeType = (e) => {
  e.preventDefault()
  const value = e.target.elements[0].value
  resetBudget()
  resetExpense()
  Budget.createBudgets(value)
}

const saveIncomeToBudget = (e) => {
  e.preventDefault()
  const value = e.target.previousElementSibling.value
  const id = e.target.parentElement.parentElement.previousSibling.id
  API.patchRequest(`/budgets/${id}`, { income: value }).then((resp) => {
    let budget = Budget.all[resp.id]
    budget.income = resp.income
    setPaycheckAmount(budget)
    document.getElementById('total').innerText = `Total: $${incomeTotal()}`
  })
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