class ProgressBar{
  
  constructor(max, value){
    this.max = max
    this.value = value
    this.setProgressBar()
  }

  setProgressBar() {
    document.getElementById('progress').max = this.max
    document.getElementById('progress').value = this.max
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