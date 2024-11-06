import Link from 'next/link'
import { useState } from 'react'

export default function ProductsTable (props) {
  const { products, showTraining, showExpiration } = props
  const [expandedRows, setExpandedRows] = useState([])

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <>
      {products && (
        <div className='overflow-x-auto'>
          <table key={showTraining + '_' + showExpiration} className='table text-d-dark-dark-purple table-zebra w-full max-[431px]:hidden'>
            <thead className=''>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>EAN</th>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Título</th>
                <th>Vida útil</th>
                <th>Marca</th>
                <th>Contenido</th>
                <th>Editar</th>

              </tr>
            </thead>
            <tbody className=''>
              {products.map((product, index) => (

                <tr key={index}>
                  <td />
                  <td>{product.ean}</td>
                  <td>
                    <div className='w-8 h-8'>
                      {product.imageUrl
                        ? (
                          <img className='object-contain w-full h-full' src={product.imageUrl} alt={product.short_name} />
                          )
                        : (
                          <img className='object-contain w-full h-full' src='./img/favicon.ico' alt='despnsa' />

                          )}
                    </div>
                  </td>
                  <td>{capitalizeWords(product.short_name)}</td>
                  <td>{capitalizeWords(product.first_category)}</td>
                  <td>{capitalizeWords(product.proxy_duration)}</td>
                  <td>{capitalizeWords(product.brand)}</td>
                  <td>{product.content}</td>
                  <td>
                    <Link href={`/inventory/edit?ean=${product.ean}&first_category=${product.first_category}`}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6 inline-block text-d-dark-dark-purple hover:text-d-soft-soft-purple transition duration-300 ease-in-out align-middle'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          <div className='md:hidden'>
            {products.map((product, index) => (
              <div key={index} className='pb-2'>
                <div className='flex justify-between w-full md:hidden bg-d-soft-purple p-2 rounded-md'>
                  <div className=''>
                    <h3>
                      <span className='mr-20 font-bold'>EAN</span>
                      {product.ean}
                    </h3>
                  </div>
                  <button
                    className='btn'
                    onClick={() => {
                      const newExpandedRows = [...expandedRows]
                      if (newExpandedRows.includes(index)) {
                        newExpandedRows.splice(newExpandedRows.indexOf(index), 1)
                      } else {
                        newExpandedRows.push(index)
                      }
                      setExpandedRows(newExpandedRows)
                    }}
                  >
                    <svg width='19' height='8' viewBox='0 0 19 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g id='&#240;&#159;&#166;&#134; icon &#34;arrow down 1&#34;'>
                        <path id='Vector' d='M9.24372 7.31144C8.52431 7.31144 7.8049 7.08182 7.26021 6.6311L0.559468 1.08641C0.261427 0.839788 0.261427 0.431587 0.559468 0.184966C0.857508 -0.0616553 1.35082 -0.0616553 1.64886 0.184966L8.3496 5.72966C8.84291 6.13786 9.64453 6.13786 10.1378 5.72966L16.8386 0.184966C17.1367 -0.0616553 17.63 -0.0616553 17.928 0.184966C18.226 0.431587 18.226 0.839788 17.928 1.08641L11.2272 6.6311C10.6825 7.08182 9.96313 7.31144 9.24372 7.31144Z' fill='#292D32' />
                      </g>
                    </svg>

                  </button>
                </div>
                {/* Detalles colapsables */}
                {expandedRows.includes(index) && (
                  <div className='mt-2 p-2'>
                    <div className='grid grid-cols-2 gap-4'>
                      {/* <h2 className='font-semibold'>Categoría</h2>
                      <div>
                        <span className='bg-d-soft-green rounded-full p-2'>{product.category}</span>
                      </div> */}

                      <h2 className='font-semibold'>Producto</h2>
                      <span>{capitalizeWords(product.short_name)}</span>

                      <h2 className='font-semibold'>Marca</h2>
                      <span>{product.brand}</span>
                    </div>
                    <div className='border-b-2 mt-6' />

                    <div className='grid grid-cols-2 gap-4 mt-4'>
                      <h2 className='font-semibold'>SKU vtex</h2>
                      <span>
                        <div>{product.sku_vtex || 'No posee'}</div>
                      </span>

                      <h2 className='font-semibold'>SKU Sap</h2>
                      <div>{product.sku_sap}</div>

                      <h2 className='font-semibold'>Contenido</h2>
                      <span>{product.content}</span>
                    </div>
                  </div>

                )}
              </div>

            ))}

          </div>

        </div>
      )}
    </>
  )
}
