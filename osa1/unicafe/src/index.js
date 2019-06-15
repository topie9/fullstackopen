import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  // average when every good = 1, neutral = 0 and bad = -1 in value
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  // percentage of positive feedback
  const positive = good / total * 100

  return (
    <div>
      <table>
        <tbody>
          <Statistic name='good' value={good} />
          <Statistic name='neutral' value={neutral} />
          <Statistic name='bad' value={bad} />
          <Statistic name='all' value={good + neutral + bad} />
          <Statistic name='average' value={average} />
          <Statistic name='positive' value={positive + ' %'} /> 
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header name='give feedback' />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)