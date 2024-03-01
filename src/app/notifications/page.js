'use client'
import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function App () {
  const [facts, setFacts] = useState('qwerty')
  console.log(facts, 'facts')
  const [listening, setListening] = useState(false)
  const isInitialRender = useRef(true)

  // useEffect(() => {
  //   if (isInitialRender.current) {
  //     isInitialRender.current = false
  //     return
  //   }
  //   if (!listening) {
  //     const events = new EventSource('https://dev.api.despnsa247.com/api/events/4')

  //     // events.onmessage = (event) => {
  //     //   const parsedData = JSON.parse(event.data)
  //     //   console.log(parsedData, 'parsedData')

  //     //   if (!facts.some((fact) => fact.id === parsedData.id)) {
  //     //     // Actualizar facts utilizando el operador spread para evitar arrays de arrays
  //     //     setFacts((facts) => facts.concat(parsedData))
  //     //   }
  //     // }

  //     setListening(true)
  //   }
  // }, [facts])
  // const factsRef = useRef()
  // useEffect(() => {
  //   factsRef.current = facts
  // }, [facts])

  const mockFunc = () => {
    const events = new EventSource('https://dev.api.despnsa247.com/api/events/4')

    events.onmessage = (event) => {
      // const parsedData = JSON.parse(event.data)
      // console.log(factsRef.current, 'factsRef dentro del onmessage')
      console.log(facts, 'facts dentro del onmessage')

      // if (!facts.some((fact) => fact.id === parsedData.id)) {
      // Actualizar facts utilizando el operador spread para evitar arrays de arrays
      setFacts('parsedData')
      // }
    }
  }

  useEffect(() => {
    console.log(facts, 'facts dentro del segundo useEffect')
  }, [facts])

  return (
    <div>
      <pre>{JSON.stringify(facts, null, 2)}</pre>

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
      <div>
        <button onClick={mockFunc}>updateVariable</button>
      </div>
    </div>
  )
}

export default App
