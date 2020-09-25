class BudgetAccordion {
  constructor(budget) {
    this.budget = budget
    this.renderBudgetAccordion()
  }

  renderBudgetAccordion() {
    let budgetAccordion = document.createElement('li')
    accordionContainer.appendChild(budgetAccordion)
    let accordionContent = document.createElement('div')
    accordionContent.setAttribute('class', 'uk-accordion-content')
    accordionContent.setAttribute('id', 'accordion-content')


    let title = document.createElement('a')
    title.setAttribute('class', 'uk-accordion-title')
    title.setAttribute('href', '#')
    title.setAttribute('id', `${this.budget.id}`)
    title.innerText = `Paycheck: $${this.budget.income}`
    budgetAccordion.appendChild(title)

    let incomeform = document.createElement('form')
    incomeform.setAttribute('id', 'income-form')
    let input = document.createElement('input')
    input.setAttribute('id', 'income-amount')
    input.setAttribute('type', 'number')
    input.setAttribute('name', 'income')
    input.setAttribute('placeholder', 'Check amount')
    input.setAttribute('value', `${this.budget.income}`)

    incomeform.appendChild(input)
    let saveButton = document.createElement('button')
    saveButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
    saveButton.setAttribute('id', 'save-amount')
    saveButton.innerText = 'Save'
    saveButton.addEventListener('click', saveIncomeToBudget)
    incomeform.appendChild(saveButton)
    accordionContent.appendChild(incomeform)
    budgetAccordion.appendChild(accordionContent)
    expenseForm(this.budget)
  }



}