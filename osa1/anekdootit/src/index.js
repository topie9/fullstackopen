import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({text, count}) => {
  return (
    <div>
      {text}<br></br>
      has {count} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat)
  )
  const [highestVote, setHighestVote] = useState([0, 0])

  const handleClickNewAnecdote = () => {
    // this randomInt value includes min (here 0) value and excludes max value
    let newRandom = Math.floor(Math.random() * (props.anecdotes.length))
    while (newRandom === selected) {
      newRandom = Math.floor(Math.random() * (props.anecdotes.length))
    }
    setSelected(newRandom)
  }

  const handleClickVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    
    let highestCount = [highestVote[0], highestVote[1]]
    if (votesCopy[selected] > highestVote[1]) {
      highestCount = [selected, votesCopy[selected]]     
    }
    setVotes(votesCopy)
    setHighestVote(highestCount)
  }

  return (
    <div>
      <Header name='Anecdote of the day' />
      <Anecdote text={props.anecdotes[selected]} count={votes[selected]} />
      <Button handleClick={handleClickVote} text='vote' />
      <Button handleClick={handleClickNewAnecdote} text='next anecdote' />
      <Header name='Anecdote with most votes' />
      <Anecdote text={props.anecdotes[highestVote[0]]} count={highestVote[1]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
   
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)