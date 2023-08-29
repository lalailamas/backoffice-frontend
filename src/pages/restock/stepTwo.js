import React, { useEffect, useState } from 'react';
import { getInventoryByStore, getLayout } from '../api/store';

function StepTwo({ selectedStore, currentStep }) {
  const [inventory, setInventory] = useState([]);
  const [layout, setLayout] = useState([]);

  const shouldFetchData = selectedStore && currentStep === 2;

  useEffect(() => {
    if (shouldFetchData) {
      fetchInventoryAndLayout(selectedStore.external_id);
    }
  }, [shouldFetchData, selectedStore]);

  async function fetchInventoryAndLayout(storeId) {
    try {
      const inventoryResponse = await getInventoryByStore(storeId);
      console.log('la respuesta del coso');
      console.log(inventoryResponse);
      if (inventoryResponse.data) {
        setInventory(inventoryResponse.data);
        const layoutId = inventoryResponse.data.layoutId;
        //const layoutResponse = await getLayout(layoutId);
        //setLayout(layoutResponse.data);
      }
    } catch (error) {
      console.error('Error fetching inventory or layout:', error);
    }
  }

  return (
    <div>
    <pre>{JSON.stringify(inventory, null, 2)}</pre>
    </div>
  );
}

export default StepTwo;
