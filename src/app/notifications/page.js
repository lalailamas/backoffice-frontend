'use client'
import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function App () {
  const [facts, setFacts] = useState([])
  const factsRef = useRef(facts)
  console.log(facts, 'facts')
  const [listening, setListening] = useState(false)
  const isInitialRender = useRef(true)

  const [events, setEvents] = useState(null)
  console.log(events, 'events')

  const [counter, setCounter] = useState(0)
  const counterRef = useRef(counter)

  const [clickCounter, setClickCounter] = useState(0)

  console.log('Re-Rendered')

  const _setCounter = (newCounter) => {
    counterRef.current = newCounter
    setCounter(newCounter)
  }
  const _setFacts = (newFacts) => {
    factsRef.current = newFacts
    setFacts(newFacts)
  }

  useEffect(() => {
    if (!listening) {
      console.log('Declaring innerEvents')
      const innerEvents = new EventSource('http://localhost:3500/api/events/4')
      // console.log(innerEvents, 'innerEvents')

      innerEvents.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        console.log(parsedData, 'parsedData[0]')
        console.log('Event Number ' + counterRef.current)

        _setCounter(counterRef.current + 1)
        const repeated = factsRef.current.find((fact) => fact.id === parsedData.id)
        if (repeated === undefined) {
          _setFacts(factsRef.current.concat(parsedData))
        }
      }
      setListening(true)
      setEvents(innerEvents)
    }
  }
  , [listening]
  )

  const counterUp = () => {
    setClickCounter(clickCounter + 1)
  }

  return (
    <div>
      <pre>{JSON.stringify(factsRef.current, null, 2)}</pre>
      <pre>{JSON.stringify(counterRef.current, null, 2)}</pre>
      <pre>{JSON.stringify(facts, null, 2)}</pre>

      <div>
        <button onClick={counterUp}>Contador ({clickCounter})</button>
      </div>
      {/* <table className='stats-table'>
        <thead>
          <tr>
            <th>Fact</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {
          facts.map((fact, i) =>
            <tr key={i}>
              <td>{fact.title}</td>
              <td>{fact.body}</td>
            </tr>
          )
        }
        </tbody>
      </table> */}

      {/*
      <div>

        <button onClick={mockFunc}>Agregar nuevo</button>
      </div>
      <div>
        <button onClick={addTwo}>Agrega los 2 existentes</button>
      </div>
      <div>
        <button onClick={reset}>Reset</button>
      </div> */}
    </div>
  )
}

export default App
