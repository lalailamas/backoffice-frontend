import React from 'react'
import Image from 'next/image'

const cardImages = {
  visa: '/img/visa.svg',
  mastercard: '/img/mastercard.svg',
  maestro: '/img/maestro.svg'
}

const CreditCard = ({ cardType, imageUrl }) => {
  return (
    <div className='p-2'>
      <Image
        src={imageUrl}
        alt={cardType}
        width={100}
        height={60}

      />
    </div>
  )
}

function CreditCardDisplay () {
  // Datos hardcodeados para la tarjeta de crédito
  const cardData = {
    cardholder: 'Beyoncé Knowles',
    cardNumber: '**** **** **** 3456',
    expiredMonth: '12',
    expiredYear: '25'
  }

  const creditCardImage = 'maestro'

  return (
    <div className='m-4'>
      <div className='credit-card w-full sm:w-auto mx-auto rounded-xl bg-white'>
        <header className='flex flex-col justify-center items-center'>
          <div className='bg-d-gray shadow-xl rounded-2xl h-[200px] w-[300px]'>
            <div className=''>
              <CreditCard cardType={creditCardImage} imageUrl={cardImages[creditCardImage]} />
              <div className='front bg-transparent text-lg  text-black'>
                <p className='number mt-5 ml-2 sm:text-xl'>{cardData.cardNumber}</p>
                <div className='flex justify-evenly gap-8'>
                  <p>{cardData.cardholder}</p>
                  <div className=''>
                    <span>{cardData.expiredMonth}</span>
                    {cardData.expiredMonth && <span>/</span>}
                    <span>{cardData.expiredYear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </header>
        <main className='mt-2 p-4'>
          <div>
            <div className='my-3'>
              <label className='text-gray-700'>Nombre</label>
              <input
                type='text'
                className='block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                placeholder='Card holder'
                value={cardData.cardholder}
                readOnly
              />
            </div>
            <div className='my-3'>
              <label className='text-gray-700'>Número de la tarjeta</label>
              <input
                type='text'
                className='block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                placeholder='Card number'
                value={cardData.cardNumber}
                readOnly
              />
            </div>
            <div className='my-3 flex flex-col'>
              <div className='mb-2'>
                <label className='text-gray-700'>Expired</label>
                <input
                  type='text'
                  className='block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                  placeholder='Card number'
                  value={`${cardData.expiredMonth} / ${cardData.expiredYear}`}
                  readOnly
                />
              </div>

            </div>
          </div>
        </main>

      </div>
    </div>
  )
}

export default CreditCardDisplay
