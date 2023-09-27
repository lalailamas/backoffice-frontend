'use client'
import { Categories, Seasons } from '@/lib/constants'
import { useEffect, useState } from 'react'

export default function DeleteROrderModal (props) {
  const { rorder, showDeleteModal, toggleDeleteModal, confirm } = props
  const [editROrder, setEditROrder] = useState({})

  // const [ean,setEan] = useState('');
  // const [category,setCategory] = useState('');
  // const [name,setName] = useState('');
  // const [image,setImage] = useState(null);
  // const [brand,setBrand] = useState('');
  // const [perishable,setPerishable] = useState(false);
  // const [stock,setStock] = useState(0);
  // const [expirationDate,setExpirationDate] = useState(null);

  const handleChange = (key, value) => {
    console.log(editROrder)
    setEditROrder((current) => {
      current[key] = value
      return current
    })
    // var clone = JSON.parse(JSON.stringify(editROrder));
    // clone[key] = value;
    // setEditROrder(clone);
  }

  const handleSave = () => {
    save(editROrder)
  }

  useEffect(
    () => {
      if (rorder) {
        setEditROrder(rorder)
      }
    },
    [rorder]
  )

  return (

    <>
      <input type='checkbox' id='delete-rorder-modal' className='modal-toggle' checked={showDeleteModal} onChange={() => toggleDeleteModal()} />
      <div className='modal'>
        <div className='modal-box  w-11/12 max-w-xl'>
          <h3 className='font-bold text-lg mb-4'>Eliminar rordero</h3>

          <p>Confirma que desea eliminar la órden de reabastecimiento: {rorder.name} (ID: {rorder.id})</p>

          {/* <pre>{JSON.stringify(editROrder,null,2)}</pre> */}
          {/* <pre>{JSON.stringify(rorder,null,2)}</pre> */}
          <div className='divider' />
          <div className='modal-action flex flex-row'>

            <div className='grow-0'>
              <label htmlFor='delete-rorder-modal' className='btn rounded-full'>Cancelar</label>

            </div>

            <div className='grow' />

            <div className='grow-0'>

              <button className='btn rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={() => confirm(rorder.id)}>Confirmar</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
