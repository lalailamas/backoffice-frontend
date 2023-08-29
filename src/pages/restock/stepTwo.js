import { useEffect, useState } from 'react';
import { getInventoryByStore, getLayout } from '../api/store';

function StepTwo({ selectedStore }) {
  const [inventory, setInventory] = useState([]);
  const [layout, setLayout] = useState([]);

  async function sendInventory() {
    try {
      const inventoryResponse = await getInventoryByStore(selectedStore.external_id);
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

  useEffect(() => {
    sendInventory();
  }, [selectedStore]);

  return (
    <div>
      <div>stepTwo</div>
      {/* Render layout data here */}
    </div>
  );
}

export default StepTwo;
