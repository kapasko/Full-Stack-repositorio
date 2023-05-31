import { useState } from 'react'

const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }
const copy = { ...points }

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  let anecdote = 0
  let value = 0

  const changeAnecdote = () => {
    //console.log("before", selected)

    return (
      setSelected(Math.floor(Math.random() * anecdotes.length))
    )
  }

  const addVote = () => {
    //console.log("points before", copy)
    copy[selected] += 1
  }

  const mostVoted = () => {
    for (let i = 0; i < anecdotes.length; i++) {
      //console.log("copy[i + 1] ja copy[i]", copy[i])
      //console.log("apumuuttuja i", i)

      if (copy[i] > value) {
        anecdote = i
        value = copy[i]
      }
      //console.log("arvo", value)
      //console.log("äänestetyin anekdootti", anecdote)
    }

    return (
      <div>
        <p>{anecdotes[anecdote]}</p>
        <p>has {copy[anecdote]} votes</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <p>has {copy[selected]} votes</p>
      </div>
      <div>
        <Button text="vote" handleClick={addVote} />
        <Button text="next anecdote" handleClick={changeAnecdote} />
      </div>
      <h1>Anecdote with most votes</h1>
      {mostVoted()}
    </div>
  )
}

export default App