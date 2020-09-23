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

  static getRequest(endPoint) {
    return fetch(URL + endPoint)
    .then(resp => resp.json())    
  }
  
  static patchRequest(endPoint, body){
    return fetch((URL + endPoint), {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
  }


  static deleteExpense(URL, id){
    return fetch(URL + '/expenses/' + id, {
      method: "DELETE"
    })
    .then(resp => resp.json());
  }

}