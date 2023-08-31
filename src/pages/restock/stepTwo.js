import React, { useEffect, useState } from 'react'
import { getInventoryByStore } from '../api/store'
import { getLayout } from '../api/layout'
import { getReiteData } from '../api/product/reite'
// import AccordeonCard from './acordeonCard'

function StepTwo ({ selectedStore, currentStep }) {
  const [inventory, setInventory] = useState([])
  const [layout, setLayout] = useState([])
  const [products, setProducts] = useState([])

  const shouldFetchData = selectedStore && currentStep === 2
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (shouldFetchData) {
      fetchInventoryAndLayout(selectedStore.external_id)
    }
  }, [shouldFetchData, selectedStore, render])

  async function fetchInventoryAndLayout (storeId) {
    try {
      const inventoryResponse = await getInventoryByStore(storeId)
      console.log('la respuesta del coso')
      console.log(inventoryResponse.data)
      if (inventoryResponse.data) {
        setInventory(inventoryResponse.data)
        const layoutId = selectedStore.layout_id
        const layoutResponse = await getLayout(layoutId)
        setLayout(layoutResponse.data)
        fetchProducts(inventoryResponse.data)
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
          const productResponse = await getReiteData(item.productId)
          return productResponse.data
        })
      )
      console.log('aca tengo los products', productsResponse)
      setProducts(productsResponse)
      setRender(true)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return (
    <div>
      {render && layout && layout.trays &&
    layout.trays.map((tray, index) => {
      return (
        <div key={index}>
          <h1>Tray</h1>
          {
            tray

              ? tray.columns.map((item, index) => {
                console.log('aca tengo el item', item)
                const product = products.filter((product) => product.productId === item.productId)
                console.log('aca tengo el product', product)
                // const quantityProd = inventory.products.find((prod) => parseInt(prod.productId) === parseInt(item.productId))

                // console.log('aca tengo el quantity', quantityProd)

                // console.log('aca tengo el product', product)
                // console.log('este es el id del tray.columns.map.item', item.productId)
                return (
                //  <AccordeonCard
                //    key={index} header={
                //      <div className='flex gap-3 items-center'>
                //        <figure className=''>
                //          {/* <img
                //            className='w-auto max-w-[50px] h-[35px]'
                //            src={product.metadata.imageUrl}
                //            width={120}
                //            height={120}
                //            alt='Product'
                //          /> */}
                //        </figure>
                //        <h2 className='capitalize font-semibold text-left'>{product.productName}</h2>
                //        <p className='ml-auto font-semibold'>{quantity}</p>
                //      </div>

                // }
                //  />
                  <div key={item}>
                    <pre>{JSON.stringify(item.productId, null, 2)}</pre>
                  </div>

                )
              })
              : <div>no hay nada</div>

            }
        </div>
      )
    })}
    </div>
  // <div>
  //   <pre>{JSON.stringify(products, null, 2)}</pre>
  // </div>
  )
}

export default StepTwo
