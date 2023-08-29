import { useEffect, useState } from 'react'
import { getInventoryByStore } from '../api/store'
import { getLayout } from '../api/layout'

function StepTwo (selectedStore) {
  const [inventory, setInventory] = useState([])
  const [layout, setLayout] = useState([])
  function sendInventory () {
    getInventoryByStore(selectedStore.external_id).then((response) => {
      if (response.data) {
        setInventory(response.data)
        setLayout(response.data.layoutId)
      }
    }).then(() => {
      getLayout(layout).then((response) => {
        console.log(response)
      })
    })
  }
  useEffect(() => {
    sendInventory()
  }, [selectedStore])
  return (
    <div>stepTwo</div>
  )
}

export default StepTwo
