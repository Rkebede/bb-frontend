let URL = 'http://localhost:3000'

class API {

  static postResquest(endPoint, body) {
    return fetch((URL + endPoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .catch(this.errorHandling)
  }

  static getRequest(endPoint) {
    return fetch(URL + endPoint)
    .then(resp => resp.json())
    .catch(this.errorHandling)
  }

  static patchRequest(endPoint, body) {
    return fetch((URL + endPoint), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .catch(this.errorHandling)
  }

  static deleteRequest(endPoint, id = "") {
    return fetch(URL + endPoint + id, {
      method: "DELETE"
    })
    .catch(this.errorHandling)
  }

  static errorHandling(error) {
    let element = document.createElement('div')
    element.setAttribute('class', 'uk-alert-danger')
    let close = document.createElement('a')
    close.setAttribute('class', 'uk-alert-close')
    let closeComponent = UIkit.close(close)
    let alert = UIkit.alert(element)
    alert.$el.innerText = error.message
    alert.$el.appendChild(closeComponent.$el)
    document.getElementById('body').prepend(alert.$el)
  }

}