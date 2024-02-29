'use client'
import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function App () {
  const [facts, setFacts] = useState([])
  console.log(facts, 'facts')
  const [listening, setListening] = useState(false)
  const isInitialRender = useRef(true)

  useEffect(() => {
    console.log('useEffect')
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    if (!listening) {
      const events = new EventSource('http://localhost:3500/api/events')

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        console.log(parsedData, 'parsedData')

        setFacts((facts) => facts.concat(parsedData))
      }

      setListening(true)
    }
  }, [listening, facts])

  return (
    <table className='stats-table'>
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
              <td>{fact.info}</td>
              <td>{fact.source}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export default App
