/* eslint-disable multiline-ternary */
import React from 'react'

const cardImages = {
  visa: '/img/visa.svg',
  mastercard: '/img/mastercard.svg',
  maestro: '/img/maestro.svg'
}

const CreditCard = ({ cardType, imageUrl }) => {
  return (
    <div className='p-2'>
      <img
        src={imageUrl}
        alt={cardType}
        width={100}
        height={60}

      />
    </div>
  )
}

function CreditCardDisplay ({ cardholder, cardNumber, expiredMonth, expiredYear, cardType }) {
  const cardData = {
    cardholder,
    cardNumber: `**** **** **** ${cardNumber}`,
    expiredMonth,
    expiredYear
  }

  const creditCardImage = cardType || '/img/default-card.svg'
  const cardImage = cardImages[creditCardImage] || '/img/default-card.svg'

  return (
    <div className='m-4'>
      <div className='credit-card w-full sm:w-auto mx-auto rounded-xl bg-white'>
        <header className='flex flex-col justify-center items-center'>
          <div className='bg-d-gray shadow-xl rounded-2xl h-[200px] w-[300px]'>
            <div>
              {cardImage ? ( // Verifica si cardImage existe
                <CreditCard cardType={creditCardImage} imageUrl={cardImage} />
              ) : (
                // Si cardImage no existe, muestra un texto en su lugar
                <div className='text-left px-4 py-4'>Nombre banco</div>
              )}
            </div>
            <div className='front bg-transparent text-sm  text-black'>
              <p className='number mt-5 ml-5 sm:text-xl'>{cardData.cardNumber}</p>
              <p className='ml-5 mt-3'>{cardData.cardholder}</p>
              <div className='flex justify-end mr-5'>
                <div className=''>
                  <span>{cardData.expiredMonth}</span>
                  {cardData.expiredMonth && <span>/</span>}
                  <span>{cardData.expiredYear}</span>
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
                <label className='text-gray-700'>Expiración</label>
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
