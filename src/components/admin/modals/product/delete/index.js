export default function DeleteProductModal (props) {
  const { product, showDeleteModal, toggleDeleteModal, confirm } = props

  return (

    <>
      <input type='checkbox' id='delete-product-modal' className='modal-toggle' checked={showDeleteModal} onChange={() => toggleDeleteModal()} />
      <div className='modal'>
        <div className='modal-box  w-11/12 max-w-xl'>
          <h3 className='font-bold text-lg mb-4'>Eliminar producto</h3>
          <p>Confirma que desea eliminar el producto: {product.short_name} (EAN: {product.ean})</p>
          {/* <pre>{JSON.stringify(editProduct,null,2)}</pre> */}
          {/* <pre>{JSON.stringify(product,null,2)}</pre> */}
          <div className='divider' />
          <div className='modal-action flex flex-row'>
            <button onClick={toggleDeleteModal} className='grow-0'>
              <label htmlFor='delete-product-modal' className='btn rounded-full'>Cancelar</label>
            </button>
            <div className='grow' />
            <div className='grow-0'>
              <button className='btn rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={() => confirm(product.id)}>Confirmar</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
