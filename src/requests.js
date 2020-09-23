let URL = 'http://localhost:3000'
class API {

  static postResquest(endPoint, body) {
    return fetch((URL + endPoint), {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
  }

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