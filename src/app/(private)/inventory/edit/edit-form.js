/* eslint-disable camelcase */
import { Controller } from 'react-hook-form'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import ButtonCancel from '@/components/admin/common/buttons/ButtonCancel'
import { proxy_duration, measure_unit } from '@/lib/constants'// eslint-disable-line

export default function EditForm ({
  product,
  control,
  isTrained,
  allCategories,
  formState,
  handleSubmit,
  onSubmit,
  handleAddPackValue,
  handleDeletePackValue,
  packValues,
  getFirstCategoryOptions,
  getSecondCategoryOptions,
  getThirdCategoryOptions,
  selectedFirstCategory,
  setSelectedFirstCategory,
  selectedSecondCategory,
  setSelectedSecondCategory,
  selectedThirdCategory,
  setSelectedThirdCategory,
  router,
  nameRef,
  vtexRef,
  sapRef,
  handleAddSkuVtexValue,
  handleDeleteSkuVtexValue,
  skuVtexValues,
  handleAddSkuSapValue,
  handleDeleteSkuSapValue,
  skuSapValues,
  isGeneratedEan,
  setIsGeneratedEan
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}>
      {/* Campo EAN */}
      <div className='pb-4'>
        <label className='label'>EAN</label>
        <Controller
          name='ean'
          control={control}
          render={({ field }) => (
            <input {...field} type='text' className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple' disabled />
          )}
        />
        {/* Indicador de entrenamiento */}
        {isTrained
          ? <span className='text-green-500'>Producto entrenado</span>
          : <span className='text-red-500'>Producto no entrenado</span>}
      </div>
      <div className='col-span-12 md:col-span-2 form-control w-full flex-column items-center'>
        <div className='flex items-center pt-4 mt-4'>
          <input
            type='checkbox'
            id='generatedEanCheckbox'
            checked={isGeneratedEan}
            onChange={(e) => setIsGeneratedEan(e.target.checked)}
            className='mr-1 checkbox checkbox-lg'
          />
          <label className='label'>
            <span className='label-text'>EAN <br /> generado</span>
          </label>
        </div>

      </div>

      {/* Campo SKU VTEX */}
      <div className='pb-4'>
        <label className='label'>SKU VTEX</label>
        <Controller
          name='sku_vtex'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='flex input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'>
              <input {...field} type='text' placeholder='Agregar SKU VTEX' className='w-full mr-2' />
              <button type='button' onClick={() => handleAddSkuVtexValue(field.value)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>
              </button>
            </div>
          )}
        />
        {skuVtexValues.length > 0 && skuVtexValues.map((value, index) => (
          <span key={index} className='flex justify-between bg-gray-200 rounded px-2 py-1 m-1'>
            {value}
            <button type='button' onClick={() => handleDeleteSkuVtexValue(value)}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
            </button>
          </span>
        ))}
      </div>

      {/* Campo SKU SAP */}
      <div className='pb-4'>
        <label className='label'>SKU SAP</label>
        <Controller
          name='sku_sap'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <div className='flex input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'>
              <input {...field} type='text' placeholder='Agregar SKU SAP' className='w-full mr-2' />
              <button type='button' onClick={() => handleAddSkuSapValue(field.value)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>
              </button>
            </div>
          )}
        />
        {skuSapValues.length > 0 && skuSapValues.map((value, index) => (
          <span key={index} className='flex justify-between bg-gray-200 rounded px-2 py-1 m-1'>
            {value}
            <button type='button' onClick={() => handleDeleteSkuSapValue(value)}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
            </button>
          </span>
        ))}
      </div>
      {/* Campo Nombre Corto */}
      <div className='pb-4'>
        <label className='label'>Nombre Corto</label>
        <Controller
          name='short_name'
          control={control}
          defaultValue=''
          rules={{ required: 'Requerido' }}
          render={({ field }) => (
            <>
              <input type='text' placeholder='Nombre corto' {...field} className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple' />
              {formState.errors.short_name && (
                <p className='text-error'>{formState.errors.short_name.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Campo Marca */}
      <div className='pb-4'>
        <label className='label'>Marca</label>
        <Controller
          name='brand'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <>
              <input type='text' placeholder='Marca' {...field} className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple' />
              {formState.errors.brand && (
                <p className='text-error'>{formState.errors.brand.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Campo Vida útil */}
      <div className='pb-4'>
        <label className='label'>Vida útil</label>
        <Controller
          name='proxy_duration'
          control={control}
          defaultValue='No Perecible'
          render={({ field }) => (
            <select className='select select-sm select-bordered rounded-full w-full md:max-w-xs' {...field}>
              <option disabled value=''>Elija una</option>
              {Object.keys(proxy_duration).map(
                (key) => <option key={key} value={proxy_duration[key]}>{proxy_duration[key]}</option>
              )}
            </select>
          )}
        />
      </div>

      {/* Campo Pack */}
      <div className='pb-4'>
        <label className='label'>Pack</label>
        <Controller
          name='pack'
          control={control}
          defaultValue=''
          rules={{
            validate: value => !value || /^\d+$/.test(value) || 'Debe contener solo números'
          }}
          render={({ field }) => (
            <div className='flex input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'>
              <input {...field} type='text' placeholder='Agregar pack' value={field.value || ''} className=' w-full mr-2' />
              <button type='button' onClick={() => handleAddPackValue(field.value)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>
              </button>
            </div>
          )}
        />
        {packValues.length > 0 && packValues.map((value, index) => (
          <span key={index} className='flex justify-between bg-gray-200 rounded px-2 py-1 m-1'>
            {value}
            <button type='button' onClick={() => handleDeletePackValue(value)}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
            </button>
          </span>
        ))}
      </div>

      {/* Campo Contenido Neto */}
      <div className='col-span-12 md:col-span-3 form-control w-full'>
        <label className='label'>
          <span className='label-text'>Contenido neto</span>
        </label>
        <Controller
          name='content_detail'
          control={control}
          defaultValue=''
          rules={{ validate: value => /^\d+$/.test(value) || 'Debe contener solo números' }}
          render={({ field }) => (
            <>
              <input type='text' placeholder='Contenido neto' {...field} className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple' />
              {formState.errors.content_detail && (
                <p className='text-error'>{formState.errors.content_detail.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Campo Medida */}
      <div className='col-span-12 md:col-span-3 form-control w-full'>
        <label className='label'>
          <span className='label-text'>Medida</span>
        </label>
        <Controller
          name='measure_unit'
          control={control}
          rules={{ required: 'Seleccione una' }}
          defaultValue=''
          render={({ field }) => (
            <select className='select select-sm select-bordered rounded-full w-full md:max-w-xs' {...field}>
              <option disabled value=''>Elija una</option>
              {Object.keys(measure_unit).map(
                (key) => <option key={key} value={key}>{measure_unit[key]}</option>
              )}
            </select>
          )}
        />
        {formState.errors.measure_unit && (
          <p className='text-error'>{formState.errors.measure_unit.message}</p>
        )}
      </div>

      {/* Selector de Categorías */}
      <div className='pb-4'>
        <label className='label'>Título</label>
        <Controller
          name='first_category'
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={selectedFirstCategory?.id || ''}
              onChange={(e) => {
                const selectedCat = allCategories.find(cat => cat.id === parseInt(e.target.value))
                setSelectedFirstCategory(selectedCat)
                field.onChange(e.target.value)
              }}
              className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
            >
              <option disabled value=''>Seleccionar Categoría</option>
              {getFirstCategoryOptions()}
            </select>
          )}
        />
      </div>

      {/* Select de Subcategoría */}
      {selectedFirstCategory && (
        <div className='pb-4'>
          <label className='label'>Categoría</label>
          <Controller
            name='second_category'
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={selectedSecondCategory?.id || ''}
                onChange={(e) => {
                  const selectedSecCat = selectedFirstCategory.second_categories?.find(cat => cat.id === parseInt(e.target.value))
                  setSelectedSecondCategory(selectedSecCat)
                  field.onChange(e.target.value)
                }}
                className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
              >
                <option disabled value=''>Seleccionar Subcategoría</option>
                {getSecondCategoryOptions()}
              </select>
            )}
          />
        </div>
      )}

      {/* Select de Categoría Terciaria */}
      {selectedSecondCategory && (
        <div className='pb-4'>
          <label className='label'>SubCategoría</label>
          <Controller
            name='third_category'
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={selectedThirdCategory?.id || ''}
                onChange={(e) => {
                  const selectedThirdCat = selectedSecondCategory?.third_categories?.find(cat => cat.id === parseInt(e.target.value))
                  setSelectedThirdCategory(selectedThirdCat)
                  field.onChange(e.target.value)
                }}
                className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
              >
                <option disabled value=''>Seleccionar Tercera Categoría</option>
                {getThirdCategoryOptions()}
              </select>
            )}
          />
        </div>
      )}

      <div className='py-4 mt-6 gap-4 flex justify-center'>
        <ButtonPrimary text='Guardar cambios' onClick={handleSubmit(onSubmit)} />
        <ButtonCancel text='Cancelar' onClick={() => router.push('/inventory')} />
      </div>
    </form>
  )
}
