const setIncomeType = (budgetCount) => {
  if (budgetCount > 0 ){
    document.getElementById('income-type').value = budgetCount
  }
}

const saveIncomeType = (e) => {
  e.preventDefault()
  document.getElementById('income').options.length = 0
  const value = e.target.elements[0].value
  resetBudget()
  resetExpense()
  for(let i=0; i < value; i++){
    API.postResquest("/budgets",{income: 0}).then(resp => {
      const budget = resp
      createBudget(budget)
      createBudgetOption(budget)
    })
  }
  showForms()
}

const createBudget = (data) => {
  const budget =  new Budget(data.id, data.income)
  budgets = {...budgets, [data.id]: budget}
  budget.expenses = data.expenses.map((expense) => {
    const newExpense = new Expense(expense.id, expense.name, expense.budget_id, expense.amount)
    return createExpense(newExpense)
  })
  return budget
}

const createBudgetOption = (budget) => {
 const checkList = document.getElementById('income')
 const option = document.createElement("option")
 option.value = budget.id
 setOption(budget, option)
 checkList.appendChild(option)
}

const saveIncomeToBudget = (e) => {
  e.preventDefault()
  const value = e.target.elements[1].value
  const option = e.target.elements[0].selectedOptions[0]
  API.patchRequest(`/budgets/${option.value}`,{income: value}).then((resp) =>{
    let budget = budgets[resp.id]
    budget.income = resp.income
    setOption(budget, option)
    document.getElementById('total').innerText = `Total: $${incomeTotal()}`
  })
}

const setOption = (budget, option) => {
  option.innerText = `Paycheck : $${budget.income}`
}

const incomeTotal = () => {
  return Object.values(budgets).reduce((acc, budget) => {return budget.income + acc}, 0)
}

const currentBudget = () => {
  const id = document.getElementById('income').value
  return budgets[id]
}

const resetBudget = () => {
  API.deleteRequest('/budgets')
  budgets = {}
  document.getElementById('total').innerText = `Total: $0` 
  populateValue()
}