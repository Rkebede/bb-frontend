const URL = 'http://localhost:3000'
let budgets = {}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('income-dropdown').addEventListener('submit', saveIncomeType)
})

const saveIncomeType = (e) =>{
  e.preventDefault()
  document.getElementById('income').options.length = 0
  const value = e.target.elements[0].value
  if (value !== 1 ){
    for(let i=0; i < value; i++){
      const budget = createBudget(i+1)
      createBudgetOption(budget)
    } 
  } else {
    createBudget()
  }
  document.getElementById('hidden-dropdown').style.display = 'block'
  document.getElementById('hidden-budget').style.display = 'block'
  document.getElementById('income-amount').addEventListener('submit', saveIncomeToBudget)
}
const createBudget = (index) => {
  const budget =  new Budget(index)
  budgets = {...budgets, [index]: budget}
  return budget
}

const createBudgetOption = (budget) => {
 const checkList = document.getElementById('income')
 const option = document.createElement("option")
 option.value = budget.id
 option.innerText = `Paycheck ${budget.id}`
 checkList.appendChild(option)
}

const saveIncomeToBudget = (e) =>{
    e.preventDefault()
    const value = e.target.elements[1].value
    const id = e.target.elements[0].value 
    let budget = budgets[id]
    budget.income = value 
}
