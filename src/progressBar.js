class ProgressBar {

  constructor() {
    this.setProgressBar()
  }

  setProgressBar() {
    let bar = document.getElementById('progress')
    bar.max = Budget.incomeTotal()
    if (this.value === 0) {
      bar.value = Budget.incomeTotal()
    } else {
      document.getElementById('progress').value = Budget.incomeTotal() - Expense.total()
    }
  }

  update() {
    let bar = document.getElementById('progress')
    bar.max = Budget.incomeTotal()
    bar.value = (Budget.incomeTotal() - Expense.total())
  }

  reset() {
    let bar = document.getElementById('progress')
    bar.value = 0
    bar.max = 0
  }
}