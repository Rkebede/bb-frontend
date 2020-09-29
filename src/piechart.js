class Piechart{
  
  constructor(){
    this.createPiechart()
  }

  createPiechart(){
    let div = document.createElement('div')
    div.setAttribute('id', 'piechart')
    div.setAttribute('class', "piechart")
    let title = document.createElement('h1')
    title.innerText = 'Expense Analysis'
    let tab = document.getElementById('paycheck-tab')
    tab.appendChild(title)
    tab.appendChild(div)
  }

}