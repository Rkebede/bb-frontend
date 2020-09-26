class BudgetAccordion {
  constructor(budget) {
    this.budget = budget
    this.income = budget.income
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
    title.innerText = `Paycheck: $${this.income}`
    return title
  }

  createAccordionInput(){
    let input = document.createElement('input')
    input.setAttribute('id', 'income-amount')
    input.setAttribute('type', 'number')
    input.setAttribute('name', 'income')
    input.setAttribute('placeholder', 'Check amount')
    input.setAttribute('value', `${this.income}`)
    input.addEventListener('change', (e) => {this.income = e.target.value})
    return input 
  }

  createAccordionSaveButton(){
    let eventFn = (e) => {
      e.preventDefault()
      this.budget.setIncome(this.income)
    }
    let button = createButton('save-amount', 'Save', eventFn)
    return button
  }

  setPaycheckAmount() {
    document.getElementById(this.budget.id).innerText = `Paycheck : $${this.income}`
  }

  static renderIncomeTotal(){
    document.getElementById('total').innerText = `Total: $${Budget.incomeTotal()}`
  }

  renderExpenseFormContainer() {
    let accordion = document.getElementById(this.budget.id).nextElementSibling
    let expenseHeader = document.createElement('h1')
    expenseHeader.innerText = 'Expense'
    accordion.appendChild(expenseHeader)
    let eventFn = (e) => this.budget.addExpense()
    let button = createButton('new-expense', 'Add Expense', eventFn)
    accordion.appendChild(button)
    let form = document.createElement('form')
    form.setAttribute('id', 'expenses-form')
    accordion.appendChild(form)
  }

  // createButton(id, text, eventFn){
  //   let button = document.createElement('button')
  //   button.setAttribute('class', 'uk-button uk-button-default uk-button-small')
  //   button.setAttribute('id', id)
  //   button.innerText = text
  //   button.addEventListener('click', eventFn)
  //   return button
  // }

  
}