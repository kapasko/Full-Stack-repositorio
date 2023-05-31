import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text1, text2, value }) => (
  <tr>
    <td>{text1}</td>
    <td>{value} {text2}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all, sum, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text1="good" value={good} />
        <StatisticLine text1="neutral" value={neutral} />
        <StatisticLine text1="bad" value={bad} />
        <StatisticLine text1="all" value={all} />
        <StatisticLine text1="average" value={sum / all} />
        <StatisticLine text1="positive" value={(positive / all) * 100} text2="%" />  
      </tbody>
    </table>
  )
}

const Feedback = ({ good, neutral, bad, all, sum, positive }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} sum={sum} positive={positive} />
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setSum(sum + 1)
    setPositive(positive + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setSum(sum - 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header text="statistics" />
      <Feedback good={good} neutral={neutral} bad={bad} all={all} sum={sum} positive={positive} />
    </div>
  )
}

export default App