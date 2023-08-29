import React, { useEffect, useState } from 'react'
import { getInventoryByStore } from '../api/store'
import { getLayout } from '../api/layout'
import { getProduct } from '../api/product'

function StepTwo ({ selectedStore, currentStep }) {
  const [inventory, setInventory] = useState([])
  const [layout, setLayout] = useState([])
  const [products, setProducts] = useState([])

  const shouldFetchData = selectedStore && currentStep === 2

  useEffect(() => {
    if (shouldFetchData) {
      fetchInventoryAndLayout(selectedStore.external_id)
    }
  }, [shouldFetchData, selectedStore])

  async function fetchInventoryAndLayout (storeId) {
    try {
      const inventoryResponse = await getInventoryByStore(storeId)
      //   console.log('la respuesta del coso')
      //   console.log(inventoryResponse)
      if (inventoryResponse.data) {
        setInventory(inventoryResponse.data)
        const layoutId = selectedStore.layout_id
        const layoutResponse = await getLayout(layoutId)
        setLayout(layoutResponse.data)
        if (layoutResponse.data) {
          fetchProducts(inventoryResponse.data)
        }
      }
    } catch (error) {
      console.error('Error fetching inventory or layout:', error)
    }
  }
  async function fetchProducts (inventory) {
    console.log('entré al fetchProducts')
    try {
      const productsResponse = await Promise.all(
        inventory.products.map(async (item) => {
          const productResponse = await getProduct(item.productId)
          return productResponse.data
        })
      )
      setProducts(productsResponse)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return (
    <div>
      <pre>{JSON.stringify(inventory, null, 2)}</pre>
    </div>
  )
}

export default StepTwo
