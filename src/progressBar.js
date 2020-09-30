class ProgressBar{
  
  constructor(){
    this.setProgressBar()
  }

  setProgressBar() {
   let bar = document.getElementById('progress')
    bar.max = Budget.incomeTotal()
    if (this.value === 0){
      bar.value = Budget.incomeTotal()
      // bar.setAttribute('class', 'uk-progress-success')
    } else {
      document.getElementById('progress').value = Budget.incomeTotal() - Expense.total()
    }
  }

  update(income, value){
    let bar = document.getElementById('progress')
    bar.max = Budget.incomeTotal()
    bar.value = (Budget.incomeTotal() - Expense.total())
    // if (bar.value < (bar.max * 0.3)){
    //   bar.setAttribute('class', 'uk-progress-danger')
    // } else {
    //   bar.setAttribute('class', 'uk-progress-success')
    // }
  }

  reset(){
    let bar = document.getElementById('progress')
    bar.value = 0
    bar.max = 0
  }
}