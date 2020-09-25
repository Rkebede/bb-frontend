let accordionContainer = document.getElementById('uk-accordion')

document.addEventListener('DOMContentLoaded', () => {
  IncomeTypeForm.setEventListeners()
  Budget.getBudgets()


})

const showForms = () => {
  document.getElementById('hidden-dropdown').style.display = 'block'
  document.getElementById('paycheck-tab').style.display = 'block'
}
