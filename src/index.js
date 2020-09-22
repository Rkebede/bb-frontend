const URL = 'http://localhost:3000'
let budgets = {}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('income-dropdown').addEventListener('submit', saveIncomeType)
})

const saveIncomeType = (e) => {
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
  document.getElementById('income-amount').addEventListener('submit', saveIncomeToBudget)
  document.getElementById('income').addEventListener('change', populateValue)
  addExpense()
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
 setOption(budget, option)
 checkList.appendChild(option)
}

const saveIncomeToBudget = (e) => {
    e.preventDefault()
    const value = e.target.elements[1].value
    const option = e.target.elements[0].selectedOptions[0]
    let budget = budgets[option.value]
    console.log(option)
    budget.income = parseInt(value)
    setOption(budget, option)
    document.getElementById('total').innerText = `Total: $${incomeTotal()}`
}

const populateValue = (e) => {
    e.preventDefault()
    const id = e.target.value 
    let budget = budgets[id]
    document.getElementById('amount').value = budget.income
}

const setOption = (budget, option) => {
  option.innerText = `Paycheck ${budget.id} : $${budget.income}`
}

const incomeTotal = () => {
  return Object.values(budgets).reduce((acc, budget) => {return budget.income + acc}, 0)
}

const addExpense = () => {
  document.getElementById('hidden-expenses').style.display = 'block'
  document.getElementById('new-expense').addEventListener('click', createNewExpenseFields)
  
}

const createNewExpenseFields = () => {
  const form = document.getElementById('expenses')
  let input = document.createElement('fieldset', 'expenses')

  form.appendChild(input)
  let name = document.createElement('input', 'expense-name')
  name.setAttribute('type', 'text')
  name.setAttribute('name', 'name')
  name.setAttribute('placeholder', 'Expense Name')
  input.appendChild(name)
  let amount = document.createElement('input', 'expense-amount')
  amount.setAttribute('type', 'text')
  amount.setAttribute('name', 'amount')
  amount.setAttribute('placeholder', 'Expense Amount')
  input.appendChild(amount)
  let saveButton = document.createElement('button', 'save')
  saveButton.innerText = 'Save'
  input.appendChild(saveButton)
}