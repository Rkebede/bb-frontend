class Accordion {

  static createAccordionContent() {
    let accordionContent = document.createElement('div')
    accordionContent.setAttribute('class', 'uk-accordion-content')
    accordionContent.setAttribute('id', 'accordion-content')
    return accordionContent
  }

  static createAccordionTitle(id, titleText) {
    let title = document.createElement('a')
    title.setAttribute('class', 'uk-accordion-title')
    title.setAttribute('href', '#')
    title.setAttribute('id', id)
    title.innerText = titleText
    return title
  }

  static createAccordionInput(value) {
    let input = document.createElement('input')
    input.setAttribute('id', 'income-amount')
    input.setAttribute('type', 'number')
    input.setAttribute('name', 'income')
    input.setAttribute('placeholder', 'Check amount')
    input.setAttribute('value', value)
    return input
  }
}
