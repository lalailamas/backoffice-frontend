'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { findProductByEAN, updateProduct } from '@/api/product'
import { swallInfo, swallError } from '@/utils/sweetAlerts'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import { findReiteProductByEAN } from '@/api/product/reite'
import { listCategories } from '@/api/categories'
import DspLoader from '@/components/admin/common/loader'
import EditForm from './edit-form'

export default function EditProduct () {
  const searchParams = useSearchParams()
  const ean = searchParams.get('ean')
  // const [cachekey, setCachekey] = useState(0)
  const [allCategories, setAllCategories] = useState(false)
  const { handleSubmit, control, setValue, formState } = useForm()
  const [product, setProduct] = useState(null)
  const packVal = product?.pack ? product.pack : []
  const [packValues, setPackValues] = useState(packVal)
  const [skuVtexValues, setSkuVtexValues] = useState(product?.sku_vtex || [])
  const [skuSapValues, setSkuSapValues] = useState(product?.sku_sap || [])
  const [selectedFirstCategory, setSelectedFirstCategory] = useState('')
  const [selectedSecondCategory, setSelectedSecondCategory] = useState(null)
  const [selectedThirdCategory, setSelectedThirdCategory] = useState(null)
  const [isTrained, setIsTrained] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isGeneratedEan, setIsGeneratedEan] = useState(false)
  const nameRef = useRef()
  const vtexRef = useRef()
  const sapRef = useRef()
  const router = useRouter()

  // Cargar el producto por EAN
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await findProductByEAN(ean)
        if (response) {
          console.log(response, 'response')
          setProduct(response.data)
          Object.keys(response.data).forEach(key => {
            setValue(key, response.data[key])
          })
          setPackValues(response.data.pack || [])
          setSkuVtexValues(response.data.sku_vtex || [])
          setSkuSapValues(response.data.sku_sap || [])
          const reiteProduct = await findReiteProductByEAN(ean)
          setIsTrained(!!reiteProduct) // Producto entrenado si existe en Reite
        }
      } catch (error) {
        swallError('Error al obtener los datos del producto.', false)
      } finally {
        setLoading(false)
      }
    }

    if (ean) {
      setLoading(true)
      fetchProductData()
    }
  }, [ean, setValue])

  // Cargar categorías después de que el producto esté disponible
  useEffect(() => {
    const fetchCategories = async () => {
      if (product) {
        try {
          const categoriesResponse = await listCategories(100, 1)
          const categories = categoriesResponse.data.data
          setAllCategories(categories)

          // Buscar la categoría asociada al producto
          const firstCategory = categories.find(category => category.name === product.first_category)
          setSelectedFirstCategory(firstCategory)

          if (firstCategory) {
            const secondCategory = firstCategory.second_categories?.find(sc => sc.name === product.second_category)
            setSelectedSecondCategory(secondCategory)

            if (secondCategory) {
              const thirdCategory = secondCategory.third_categories?.find(tc => tc.name === product.third_category)
              setSelectedThirdCategory(thirdCategory)
            }
          }
        } catch (error) {
          swallError('Error al obtener las categorías.', false)
        }
      }
    }

    fetchCategories()
  }, [product])

  // Manejar la actualización del producto
  const onSubmit = async (data) => {
    console.log(data, 'data')
    try {
      const updatedProduct = {
        id: data.id,
        short_name: data.short_name || null,
        long_name: data.long_name || null,
        brand: data.brand,
        ean: parseInt(data.ean),
        sku_sap: skuSapValues.length > 0 ? skuSapValues : null,
        sku_vtex: skuVtexValues.length > 0 ? skuVtexValues : null,
        measure_unit: data.measure_unit,
        content_detail: parseInt(data.content_detail),
        proxy_duration: data.proxy_duration || 'No Perecible',
        pack: packValues.length > 0 ? packValues : null,
        first_category: selectedFirstCategory.id,
        second_category: selectedSecondCategory.id,
        third_category: selectedThirdCategory.id,
        autoshoppable_available: !!(data.sku_sap && data.sku_vtex),
        generated_ean: isGeneratedEan
      }
      console.log(updatedProduct, 'updatedProduct')
      console.log(JSON.stringify(updatedProduct, null, 2)) // Revisa los datos antes de la solicitud
      const response = await updateProduct(updatedProduct)
      if (response) {
        // setCachekey(cachekey + 1)
        swallInfo('Producto editado correctamente')
        router.push('/inventory')
      }
    } catch (error) {
      swallError('Error al editar el producto', false)
    }
  }

  // Para agregar valores al array sin duplicarlos y concatenarlos correctamente
  const handleAddValue = (value, setValuesFunction, currentValues) => {
    const numberValue = parseInt(value, 10)

    // Asegúrate de que el valor sea numérico y no esté ya en el array
    if (!isNaN(numberValue) && !currentValues.includes(numberValue)) {
      setValuesFunction([...currentValues, numberValue]) // Usa spread para agregar el nuevo valor
    } else {
      formState.errors.pack = 'Debe contener solo números y no estar duplicado'
    }
  }

  // Ejemplo de uso para pack:
  const handleAddPackValue = (value) => handleAddValue(value, setPackValues, packValues)

  // Ejemplo de uso para SKU VTEX:
  const handleAddSkuVtexValue = (value) => handleAddValue(value, setSkuVtexValues, skuVtexValues)

  // Ejemplo de uso para SKU SAP:
  const handleAddSkuSapValue = (value) => handleAddValue(value, setSkuSapValues, skuSapValues)

  // Para eliminar valores del array
  const handleDeleteValue = (value, setValuesFunction, currentValues) => {
    const updatedValues = currentValues.filter((item) => item !== value)
    setValuesFunction(updatedValues)
  }

  // Ejemplo de uso para pack:
  const handleDeletePackValue = (value) => handleDeleteValue(value, setPackValues, packValues)

  // Ejemplo de uso para SKU VTEX:
  const handleDeleteSkuVtexValue = (value) => handleDeleteValue(value, setSkuVtexValues, skuVtexValues)

  // Ejemplo de uso para SKU SAP:
  const handleDeleteSkuSapValue = (value) => handleDeleteValue(value, setSkuSapValues, skuSapValues)

  const getFirstCategoryOptions = () => {
    return allCategories?.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))
  }

  const getSecondCategoryOptions = () => {
    const selectedCategory = allCategories.find((category) => category.id === parseInt(selectedFirstCategory?.id))
    return selectedCategory?.second_categories?.map((secondCategory) => (
      <option key={secondCategory.id} value={secondCategory.id}>
        {secondCategory.name}
      </option>
    )) || []
  }

  const getThirdCategoryOptions = () => {
    const selectedCategory = allCategories.find((category) => category.id === parseInt(selectedFirstCategory?.id))
    const selectedSecondCat = selectedCategory?.second_categories?.find((secondCategory) => secondCategory.id === parseInt(selectedSecondCategory?.id))
    return selectedSecondCat?.third_categories?.map((thirdCategory) => (
      <option key={thirdCategory.id} value={thirdCategory.id}>
        {thirdCategory.name}
      </option>
    )) || []
  }

  useEffect(() => {
    console.log(packValues, 'packValues')
  }, [packValues])

  return (
    <>
      {loading
        ? <DspLoader />
        : product && allCategories && (
          <div className='flex flex-col p-8 mb-8'>
            <MainTitle>Editar Producto</MainTitle>
            <div className='container w-full px-16 flex-1 flex flex-col justify-center'>
              <div className='bg-white px-6 py-3'>
                <EditForm
                  product={product}
                  control={control}
                  allCategories={allCategories}
                  isTrained={isTrained}
                  formState={formState}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  handleAddPackValue={handleAddPackValue}
                  handleDeletePackValue={handleDeletePackValue}
                  packValues={packValues}
                  handleAddSkuVtexValue={handleAddSkuVtexValue}
                  handleDeleteSkuVtexValue={handleDeleteSkuVtexValue}
                  skuVtexValues={skuVtexValues}
                  handleAddSkuSapValue={handleAddSkuSapValue}
                  handleDeleteSkuSapValue={handleDeleteSkuSapValue}
                  skuSapValues={skuSapValues}
                  getFirstCategoryOptions={getFirstCategoryOptions}
                  getSecondCategoryOptions={getSecondCategoryOptions}
                  getThirdCategoryOptions={getThirdCategoryOptions}
                  selectedFirstCategory={selectedFirstCategory}
                  setSelectedFirstCategory={setSelectedFirstCategory}
                  selectedSecondCategory={selectedSecondCategory}
                  setSelectedSecondCategory={setSelectedSecondCategory}
                  selectedThirdCategory={selectedThirdCategory}
                  setSelectedThirdCategory={setSelectedThirdCategory}
                  router={router}
                  nameRef={nameRef}
                  vtexRef={vtexRef}
                  sapRef={sapRef}
                  isGeneratedEan={isGeneratedEan}
                  setIsGeneratedEan={setIsGeneratedEan}
                />
              </div>
            </div>
          </div>
        )}
    </>
  )
}
