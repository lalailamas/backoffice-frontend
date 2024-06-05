const StoreLayout = ({ store, layout, products }) => {
  return (
    <div className='p-2 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <h5 className='text-2xl text-center mb-3 font-bold  text-gray-900 dark:text-white'>{store?.name}</h5>

      {layout && layout.trays && layout.trays.map((tray, index) => (
        <div key={index} className='text-center border-gray-300'>
          <div className='bg-d-dark-dark-purple'>
            <h2 className='text-d-soft-purple text-sm font-bold'>BANDEJA {index + 1}</h2>
          </div>
          {tray && tray.columns && (
            <ul className='flex flex-row gap-2 justify-center overflow-x-auto'>
              {tray.columns.map((column, index) => {
                const product = products.find((prod) => prod.productId === column.productId)
                return (
                  <li key={index}>
                    {product
                      ? (
                        <div className='flex flex-col items-center w-[100px] h-[80px] border border-gray-200 rounded-lg shadow text-xs'>
                          <img
                            className='w-auto max-w-[30px] h-[30px]'
                            src={product.metadata.imageUrl}
                            width={120}
                            height={120}
                            alt='Product'
                          />
                          {product.productName}
                        </div>
                        )
                      : null}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default StoreLayout
