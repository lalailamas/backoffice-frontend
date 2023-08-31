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

  useEffect(() => {
    if (shouldFetchData) {
      console.log('use effect call')
      fetchInventoryAndLayout(selectedStore.external_id)
    }
  }, [shouldFetchData, selectedStore])

  async function fetchInventoryAndLayout (storeId) {
    console.log('fetch')
    try {
      const [inventoryResponse, layoutResponse] = await Promise.all([
        getInventoryByStore(storeId),
        getLayout(selectedStore.layout_id),
      ]);

      setInventory(inventoryResponse.data);
      setLayout(layoutResponse.data);

      if (layoutResponse.data) {
        fetchProducts(inventoryResponse.data.products);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchProducts(productsList) {
    try {
      const productsResponse = await Promise.all(
        productsList.map(async (item) => {
          console.log('item query');
          console.log(item);
          const productResponse = await getReiteData(item.productId);
          return productResponse.data;
        })
      );
      console.log('productos done');
      console.log(productsResponse);
      setProducts(productsResponse);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <div>
      {products && layout && layout.trays &&
    layout.trays.map((tray, index) => {
      return (
        <div key={index}>
          <h1>Tray</h1>
          {
         tray.columns.map((item, index) => {
           <div key={item}>
             <pre>{JSON.stringify(item, null, 2)}</pre>
           </div>
         })

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
