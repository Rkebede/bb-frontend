const URL = 'http://localhost:3000'
class API {

  getAllBudgets(){
    return fetch('http://localhost:300/budgets')
    .then(resp => resp.json())
  }
  getAllExpenses(){
    return fetch('http://localhost:300/expenses')
    .then(resp => resp.json())
  }

  deleteExpense(id){
    return fetch(`http://localhost:300/expenses/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
  }

}