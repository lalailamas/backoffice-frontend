'use client'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function NewLayout () {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('id')
  const router = useRouter()

  const layout = {
    trays: [
      {
        columns: [
          {
            productId: 1
          },
          {
            productId: 2
          },
          {
            productId: 3
          }
        ]
      },
      {
        columns: [
          {
            productId: 4
          },
          {
            productId: 5
          },
          {
            productId: 6
          },
          {
            productId: 7
          }
        ]
      },
      {
        columns: [
          {
            productId: 8
          },
          {
            productId: 9
          },
          {
            productId: 10
          },
          {
            productId: 11
          }
        ]
      },
      {
        columns: [
          {
            productId: 12
          },
          {
            productId: 13
          },
          {
            productId: 14
          },
          {
            productId: 15
          },
          {
            productId: 16
          },
          {
            productId: 17
          },
          {
            productId: 18
          }
        ]
      }
    ]
  }

  const products = [
    {
      productId: 1,
      productName: 'Product 1',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 2,
      productName: 'Product 2',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 3,
      productName: 'Product 3',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 4,
      productName: 'Product 4',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 5,
      productName: 'Product 5',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 6,
      productName: 'Product 6',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 7,
      productName: 'Product 7',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 8,
      productName: 'Product 8',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 9,
      productName: 'Product 9',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 10,
      productName: 'Product 10',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 11,
      productName: 'Product 11',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 12,
      productName: 'Product 12',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 13,
      productName: 'Product 13',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 14,
      productName: 'Product 14',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 15,
      productName: 'Product 15',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 16,
      productName: 'Product 16',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 17,
      productName: 'Product 17',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    },
    {
      productId: 18,
      productName: 'Product 18',
      metadata: {
        imageUrl: '/img/favicon.ico'
      }
    }
  ]

  const handleSaveNewLayout = () => {
    console.log(`Redirecting to storeId: ${storeId}`)
    router.push(`/layout_dream/layout_comparison?id=${storeId}&layout=${encodeURIComponent(JSON.stringify(layout))}&products=${encodeURIComponent(JSON.stringify(products))}`)
  }

  return (
    <div className='p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex justify-end p-4'>
        <ButtonPrimary text='Nuevo Layout' onClick={() => handleSaveNewLayout()} />
      </div>
      <h5 className='text-2xl text-center mb-3 font-bold text-gray-900 dark:text-white'>
        Tienda 1
      </h5>

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

export default NewLayout
