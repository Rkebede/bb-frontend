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
    this.renderExpenseFormContainer()
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

  setPaycheckAmount() {
    document.getElementById(this.budget.id).innerText = `Paycheck : $${this.budget.income}`
  }

  static renderIncomeTotal(){
    document.getElementById('total').innerText = `Total: $${Budget.incomeTotal()}`
  }

  renderExpenseFormContainer() {
    let accordion = document.getElementById(this.budget.id).nextElementSibling
    let expenseHeader = document.createElement('h1')
    expenseHeader.innerText = 'Expense'
    accordion.appendChild(expenseHeader)
    let button = document.createElement('button')
    button.setAttribute('id', 'new-expense')
    button.setAttribute('class', 'uk-button uk-button-default uk-button-small')
    button.innerText = 'Add Expense'
    button.addEventListener('click', (e) => this.budget.addExpense())
    accordion.appendChild(button)
    let form = document.createElement('form')
    form.setAttribute('id', 'expenses-form')
    accordion.appendChild(form)
  }
}