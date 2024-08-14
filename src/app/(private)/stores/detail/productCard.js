function ProductCard ({ product, maxQuantity }) {
  return (
    <section className='w-[150px] h-[200px] flex flex-col items-center align-center  rounded shadow-lg'>
      <div className='flex flex-col items-center h-full'>
        <figure className='flex justify-center'>
          <img
            className='w-auto max-w-[50px] h-[50px]'
            src={product?.metadata.imageUrl}
            width={120}
            height={120}
            alt='Product'
          />
        </figure>
        <div className='flex flex-col justify-center text-center items-center align-center h-[120px]'>

          <h1 className='flex justify-center text-xs items-center text-d-title-purple font-semibold m-1'>{product?.productName}</h1>
          <h1 className='text-black-500 font-bold m-1 text-xs'>(Máximo: {maxQuantity} unidades)</h1>
        </div>

      </div>
    </section>
  )
}

export default ProductCard
