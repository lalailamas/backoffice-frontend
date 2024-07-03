/**
 * Truncate the product name if it exceeds the specified maximum length.
 *
 * @param {string} name - The name of the product.
 * @param {number} maxLength - The maximum allowed length for the product name.
 * @returns {string} - The truncated product name with '...' appended if it exceeds the max length.
 */
const truncateProductName = (name, maxLength) => {
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...'
  }
  return name
}

/**
 * StoreLayout component to display the store layout with trays and products.
 *
 * @param {Object} layout - The layout data for the store.
 * @param {Array} products - List of products available in the store.
 * @returns {JSX.Element} - The rendered StoreLayout component.
 */
const StoreLayout = ({ layout, products }) => {
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <h5 className='text-xl text-center mb-3  text-gray-900 dark:text-white'>{layout.name}</h5>
      {layout && layout.trays && layout.trays.map((tray, index) => (
        <div key={index} className='text-center border-gray-300'>
          <div className='bg-d-dark-dark-purple rounded-md'>
            <h2 className='text-d-soft-purple text-sm font-bold'>BANDEJA {index + 1}</h2>
          </div>
          {tray && tray.columns && (
            <ul className='flex flex-row gap-2 m-2 justify-center overflow-x-scroll'>
              {tray.columns.map((column, colIndex) => {
                const product = products.find((prod) => prod.productId === column.productId)
                return (
                  <li key={colIndex}>
                    {product
                      ? (
                        <div className='flex flex-col p-1 items-center w-[70px] h-[100px] border border-gray-200 rounded-lg shadow text-xs'>
                          <img
                            className='mt-2 w-auto max-w-[30px] h-[30px]'
                            src={product.metadata.imageUrl}
                            width={120}
                            height={120}
                            alt='Product'
                          />
                          <span
                            className={`${product.productName.length > 20 ? 'text-[10px]' : 'text-[12px]'} text-center`}
                          >
                            {truncateProductName(product.productName, 25)}
                          </span>
                        </div>
                        )
                      : <div className='flex flex-col p-1 items-center w-[70px] h-[100px] border border-gray-200 rounded-lg shadow text-xs'> <div className='text-red-500 text-xs'>Producto no encontrado</div></div>}
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
