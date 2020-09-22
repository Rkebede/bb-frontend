let URL = 'http://localhost:3000'
class API {

  static getAllBudgets() {
    return fetch(URL + '/budgets')
    .then(resp => resp.json())
    .then(resp => json(resp)) 
    
  }
  static getAllExpenses() {
    return fetch(URL + '/expenses')
    .then(resp => resp.json())
    .then(resp => json(resp)) 
  }

  static deleteExpense(URL, id){
    return fetch(URL + '/expenses/' + id, {
      method: "DELETE"
    })
    .then(resp => resp.json());
  }

}