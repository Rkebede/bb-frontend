let budgets = {}
let expenses = {}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('income-dropdown').addEventListener('submit', saveIncomeType)
  API.getRequest("/budgets").then(resp => {
    resp.forEach((budget) => {
      createBudget(budget)
      createBudgetOption(budget)
      showBudgetForms()
    })
    populateValue()
    document.getElementById('total').innerText = `Total: $${incomeTotal()}`
  })
})

const showBudgetForms = () => {
  document.getElementById('hidden-dropdown').style.display = 'block'
  document.getElementById('hidden-expenses').style.display = 'block'
  document.getElementById('income-amount').addEventListener('submit', saveIncomeToBudget)
  document.getElementById('income').addEventListener('change', (e) => {
    e.preventDefault()
    populateValue()
  })
  document.getElementById('new-expense').addEventListener('click', addExpense)
}

const setIncomeType = (budgetCount) => {
  if (budgetCount > 0 ){
    document.getElementById('income-type').value = budgetCount
  }
}
const saveIncomeType = (e) => {
  e.preventDefault()
  document.getElementById('income').options.length = 0
  const value = e.target.elements[0].value
  restBudget()
  for(let i=0; i < value; i++){
    API.postResquest("/budgets",{income: 0}).then(resp => {
      console.log(resp)
      const budget = resp
      createBudget(budget)
      createBudgetOption(budget)
    })
  }
  showBudgetForms()
}

const restBudget = () => {
  API.deleteRequest('/budgets')
  budgets = {}
  document.getElementById('total').innerText = `Total: $0`
  populateValue()
}

const createBudget = (data) => {
  const budget =  new Budget(data.id, data.income)
  budgets = {...budgets, [data.id]: budget}
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
    populateValue()
    document.getElementById('total').innerText = `Total: $${incomeTotal()}`
  })
}

const populateValue = () => {
  if (currentBudget() === undefined) {
    document.getElementById('amount').value = 0
  } else {
    document.getElementById('amount').value = currentBudget().income
  }
}

const setOption = (budget, option) => {
  option.innerText = `Paycheck : $${budget.income}`
}

const incomeTotal = () => {
  return Object.values(budgets).reduce((acc, budget) => {return budget.income + acc}, 0)
}

const addExpense = () => {
  const expense = new Expense()
  currentBudget().expenses.push(expense)
  expense.budget_id = currentBudget().id
  expense.id = currentBudget().expenses.length
  expenses = {...expenses, [expense.id]: expense}
  createNewExpenseFields(expense.id)
}

const currentBudget = () => {
  const id = document.getElementById('income').value
  return budgets[id]
}

const createNewExpenseFields = (id) => {
  const form = document.getElementById('expenses')
  let input = document.createElement('fieldset', 'expenses')
  input.setAttribute('id', id)
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
  saveButton.addEventListener('click', saveValuesToExpense)
}

const saveValuesToExpense = (e) => {
  e.preventDefault()
  const expense = expenses[e.target.parentElement.id]
  const name = e.target.parentElement.elements[0].value
  const amount = e.target.parentElement.elements[1].value
  expense.name = name 
  expense.amount = amount
}

