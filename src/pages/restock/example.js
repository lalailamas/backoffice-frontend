import AccordeonCard from 'components/common-back/Cards/AccordeonCard'
import BarProgress from 'components/common-back/Progress/BarProgress'
import { isValidUrl } from 'domain/utils'
import { getUnitsOfPortion } from 'lib/mappers'
import Image from 'next/image'

const ProductCard = ({
  id,
  name,
  unit,
  quantity,
  imageUrl,
  handlePickingProgress,
  replacementQuantity,
  lossQuantity,
  roomQuantity,
  totalProgress
}) => {
  const unitsPerPortion = getUnitsOfPortion(unit)
  const useUnits = unitsPerPortion && unitsPerPortion > 1

  const handlePickingProgressChange = ({
    key,
    value
  }) => {
    if (useUnits) {
      handlePickingProgress({
        productId: id,
        progressKey: key,
        progressValue: value / unitsPerPortion
      })
    } else {
      handlePickingProgress({
        productId: id,
        progressKey: key,
        progressValue: value
      })
    }
  }

  return (
    <AccordeonCard
      className='w-full md:w-[48%] lg:w-[30%]'
      header={
        <div className='flex gap-3 items-center'>
          <figure className=''>
            {isValidUrl(imageUrl) && (
              <Image
                className='w-auto max-w-[50px] h-[35px]'
                src={imageUrl}
                width={120}
                height={120}
                alt='Product'
              />
            )}
          </figure>
          <h2 className='capitalize font-semibold text-left'>{name}</h2>
          <p className='ml-auto font-semibold'>{quantity}</p>
        </div>
      }
      bottom={<BarProgress value={totalProgress} max={quantity} />}
    >
      <div className='text-sm'>
        {unit?.length && (
          <p className=''>
            <b>PorciÃ³n:</b> {unit}
          </p>
        )}
        {useUnits && (
          <p className=''>
            <b>Total unidades:</b> {unitsPerPortion}
          </p>
        )}
        <p className=''>
          <b>Total de porciones:</b> {quantity}
        </p>
        <div className='flex flex-col gap-3'>
          <div className='flex gap-3 w-full justify-between items-center'>
            <p>Merma: {useUnits ? '(unidades)' : ''}</p>
            <input
              type='number'
              placeholder='0'
              min={0}
              className='border-b-2 border-primary w-14 outline-none'
              value={Math.round(lossQuantity * unitsPerPortion)}
              onChange={(event) =>
                handlePickingProgressChange({
                  key: 'lossQuantity',
                  value: event.target.value
                })}
            />
          </div>
          <div className='flex gap-3 w-full justify-between items-center'>
            <p>Sala: {useUnits ? '(unidades)' : ''}</p>
            <input
              type='number'
              placeholder='0'
              min={0}
              className='border-b-2 border-primary w-14 outline-none'
              value={Math.round(roomQuantity * unitsPerPortion)}
              onChange={(event) =>
                handlePickingProgressChange({
                  key: 'roomQuantity',
                  value: event.target.value
                })}
            />
          </div>
          <div className='flex gap-3 w-full justify-between items-center'>
            <p>Reemplazo: {useUnits ? '(unidades)' : ''}</p>
            <input
              type='number'
              placeholder='0'
              min={0}
              className='border-b-2 border-primary w-14 outline-none'
              value={Math.round(replacementQuantity * unitsPerPortion)}
              onChange={(event) =>
                handlePickingProgressChange({
                  key: 'replacementQuantity',
                  value: event.target.value
                })}
            />
          </div>
          {useUnits && (
            <div className='w-full text-right font-semibold'>
              Unidades recolectadas:{' '}
              {Math.round(totalProgress * unitsPerPortion)}
            </div>
          )}
          <div className='w-full text-right font-semibold'>
            Porciones recolectadas: {Math.round(totalProgress * 100) / 100}
          </div>
        </div>
      </div>
    </AccordeonCard>
  )
}

export default ProductCard
