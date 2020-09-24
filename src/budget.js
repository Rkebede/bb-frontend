class Budget {
  constructor (id, income = 0){
    this.income = income; 
    this.id = id 
    this.expenses = []
  };

  totalExpenses(){
    this.expenses.reduce((acc, expense) => {
      return acc + expense
    }, 0)
  }

  expensesMinusIncome(){
   return this.income - this.totalExpenses 
  }
}


