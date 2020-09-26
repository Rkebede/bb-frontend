
const saveIncomeToBudget = (e) => {
  e.preventDefault()
  const value = e.target.previousElementSibling.value
  const id = e.target.parentElement.parentElement.previousSibling.id
  Budget.findById(id).setIncome(value)
}

const parentBudget = (e) => {
  let id = e.target.parentElement.previousElementSibling.id
  let budget = Budget.findById(id)
  return budget
}