class BudgetAccordion {
  constructor(budget) {
    this.budget = budget
    this.renderBudgetAccordion()
  }

  renderBudgetAccordion() {
    let budgetAccordion = document.createElement('li')
    accordionContainer.appendChild(budgetAccordion)
    const accordionContent = this.createAccordionContent()
    const title = this.createAccordionTitle()
    budgetAccordion.appendChild(title)
    let incomeform = document.createElement('form')
    incomeform.setAttribute('id', 'income-form')
    const input = this.createAccordionInput()
    incomeform.appendChild(input)
    const saveButton = this.createAccordionSaveButton()
    incomeform.appendChild(saveButton)
    accordionContent.appendChild(incomeform)
    budgetAccordion.appendChild(accordionContent)
    expenseForm(this.budget)
  }

  createAccordionContent() {
    let accordionContent = document.createElement('div')
    accordionContent.setAttribute('class', 'uk-accordion-content')
    accordionContent.setAttribute('id', 'accordion-content')
    return accordionContent
  }

  createAccordionTitle(){
    let title = document.createElement('a')
    title.setAttribute('class', 'uk-accordion-title')
    title.setAttribute('href', '#')
    title.setAttribute('id', `${this.budget.id}`)
    title.innerText = `Paycheck: $${this.budget.income}`
    return title
  }

  createAccordionInput(){
    let input = document.createElement('input')
    input.setAttribute('id', 'income-amount')
    input.setAttribute('type', 'number')
    input.setAttribute('name', 'income')
    input.setAttribute('placeholder', 'Check amount')
    input.setAttribute('value', `${this.budget.income}`)
    return input 
  }

  createAccordionSaveButton() {
    let saveButton = document.createElement('button')
    saveButton.setAttribute('class', 'uk-button uk-button-default uk-button-small')
    saveButton.setAttribute('id', 'save-amount')
    saveButton.innerText = 'Save'
    saveButton.addEventListener('click', saveIncomeToBudget)
    return saveButton
  }


}