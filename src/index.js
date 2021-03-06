let accordionContainer = document.getElementById('uk-accordion')
let expenseAccordion = null
let progressBar = null

IncomeTypeForm.setEventListeners()
Budget.getBudgets()

const showForms = () => {
  document.getElementById('hidden-dropdown').style.display = 'block'
  document.getElementById('paycheck-tab').style.display = 'block'
}

const createButton = (id, text, eventFn) => {
  let button = document.createElement('button')
  button.setAttribute('class', 'uk-button uk-button-default uk-button-small')
  button.setAttribute('id', id)
  button.disabled = true 
  button.innerText = text
  button.addEventListener('click', eventFn)
  return button
}
