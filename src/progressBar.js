class ProgressBar{
  
  constructor(max, value){
    this.max = max
    this.value = value
    this.setProgressBar()
  }

  setProgressBar() {
   let bar = document.getElementById('progress')
    bar.max = this.max
    if (this.value === 0){
      bar.value = this.max
      // bar.setAttribute('class', 'uk-progress-success')
    } else {
      document.getElementById('progress').value = this.value
    }
  }

  update(income, value){
    let bar = document.getElementById('progress')
    bar.max = (income)
    bar.value = (income - value)
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