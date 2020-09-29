class ProgressBar{
  
  constructor(max, value){
    this.max = max
    this.value = value
    this.setProgressBar()
  }

  setProgressBar() {
    document.getElementById('progress').max = this.max
    if (this.value === 0){
      document.getElementById('progress').value = this.max
    } else {
      document.getElementById('progress').value = this.value
    }
  }

  update(income, value){
    document.getElementById('progress').max = (income)
    document.getElementById('progress').value = (income - value)
  }

  // colorChange(){
  //   if (this.max > this.value)
  //     document.getElementById('progress').
  // }

}