import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    option: transactionTypeOptions[0].optionId,
    transactionList: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeOption = event => {
    this.setState({option: event.target.value})
  }

  onClickButton = event => {
    event.preventDefault()
    const {title, amount, option} = this.state

    if (title === '' || amount === '') {
      alert('Enter Valid Details')
    } else {
      const newItem = {
        id: v4(),
        title,
        amount,
        option,
      }
      if (option === 'INCOME') {
        this.setState(prevState => ({
          income: prevState.income + parseInt(amount),
          balance: prevState.balance + parseInt(amount),
        }))
      } else {
        this.setState(prevState => ({
          expenses: prevState.expenses + parseInt(amount),
          balance: prevState.balance - parseInt(amount),
        }))
      }
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newItem],
        title: '',
        amount: '',
        option: prevState.option,
      }))
    }
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const {amount} = transactionList // error
    console.log(amount)
    const filteredTransactions = transactionList.filter(each => each.id !== id)
    this.setState({transactionList: filteredTransactions})
    // if (option === 'INCOME') {
    //   //   const {income, balance} = this.state
    //   //   this.setState({income: income - amount})
    //   //   this.setState({balance: balance - amount})

    //   this.setState(prevState => ({
    //     income: prevState.income - parseInt(amount),
    //     balance: prevState.balance - parseInt(amount),
    //   }))
    // } else {
    //   //   const {expenses, balance} = this.state
    //   //   this.setState({expenses: expenses - amount})
    //   //   this.setState({balance: balance - amount})
    //   this.setState(prevState => ({
    //     expenses: prevState.expenses - parseInt(amount),
    //     balance: prevState.balance - parseInt(amount),
    //   }))
    // }
  }

  render() {
    const {
      transactionList,
      amount,
      title,
      income,
      balance,
      expenses,
    } = this.state

    return (
      <div className="bg">
        <div className="greeting-card">
          <h1 className="person-name">Hi, Naidu</h1>
          <p className="welcome-msg">
            Welcome back to your <span className="app-name">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          newBalance={balance}
          income={income}
          expenses={expenses}
        />
        <div className="transactions-container">
          <form className="transactions-input" onSubmit={this.onClickButton}>
            <h1 className="transaction-heading">Add Transaction</h1>
            <div className="inputs-container">
              <label htmlFor="title" className="label-text">
                TITLE
              </label>
              <input
                className="inputs-box"
                type="text"
                id="title"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
                value={title}
              />
            </div>
            <div className="inputs-container">
              <label htmlFor="amount" className="label-text">
                AMOUNT
              </label>
              <input
                className="inputs-box"
                type="text"
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={amount}
              />
            </div>
            <div className="inputs-container">
              <label htmlFor="type" className="label-text">
                TYPE
              </label>
              <select
                id="type"
                className="inputs-box"
                onChange={this.onChangeOption}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <div className="transactions-container-list transactions-input">
            <h1>History</h1>
            <ul className="list-items-container">
              <li className="list-items">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  details={eachTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
