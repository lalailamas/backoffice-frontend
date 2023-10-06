'use client'
// import React, { useState, useEffect } from 'react'
import InsideLayout from '@/components/admin/layouts/inside'
import DatePicker from '@/components/admin/common/datepicker/double'
import useGetStores2 from '@/hooks/useStores2'
import {
  DonutChart, Card, Text, Metric, Grid, Title, AreaChart, BadgeDelta, MultiSelect, MultiSelectItem, LineChart, Table, TableHead,
  TableRow, TableHeaderCell, TableBody, TableCell, Legend, CategoryBar
} from '@tremor/react'

import { chartdata, dataFormatter, valueFormatter, cities, chartdata2, dataFormatter2 } from '../dashboard/fake'

function Marketing () {
  const { stores, error } = useGetStores2()

  //   const [selectedStores, setSelectedStores] = useState([])
  //   const [selectedStoreId, setSelectedStoreId] = useState(null)

  //   useEffect(() => {
  //     // Cargar datos de tiendas cuando cambia selectedStoreId
  //     if (selectedStoreId) {
  //       console.log(selectedStoreId, 'id tienda')
  //       setSelectedStores([])
  //     } else {
  //       setSelectedStores([]) // Resetea el array de tiendas seleccionadas cuando no hay selección
  //     }
  //   }, [selectedStoreId])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Manejar cambios en la selección del select
  //   const handleStoreChange = (e) => {
  //     const storeId = e.target.value
  //     if (selectedStores.includes(storeId)) {
  //       setSelectedStores(selectedStores.filter((id) => id !== storeId))
  //     } else {
  //       setSelectedStores([...selectedStores, storeId])
  //     }
  //   }

  return (
    <div className='h-screen'>

      <InsideLayout />
      <main className='p-12'>
        <Title>Dashboard Marketing </Title>
        <div className='flex flex-row p-4'>
          <MultiSelect className='w-80' placeholderSearch placeholder='Tiendas'>
            {stores && stores.map((store) => (
              <MultiSelectItem key={store.id} value={store.id}>
                {store.name}
              </MultiSelectItem>
            ))}

          </MultiSelect>

          <DatePicker />

        </div>
        <Grid numItems={1} numItemsSm={1} numItemsMd={1} numItemsLg={2} className='gap-2 mt-3'>
          <Card className='text-center h-96 mb-2'>
            <Text>Consumidores</Text>
            <AreaChart
              className='h-72 mt-4 text-sm'
              data={chartdata}
              index='date'
              categories={['Septiembre']}
              colors={['indigo']}
              valueFormatter={dataFormatter}
              key={chartdata.length}
            />
          </Card>
          <Card className='text-center h-96 mb-2'>
            <Text>Export/Import Growth Rates</Text>
            <LineChart
              className='h-72 mt-4'
              data={chartdata2}
              index='year'
              categories={['Export Growth Rate', 'Import Growth Rate']}
              colors={['emerald', 'gray']}
              valueFormatter={dataFormatter2}
              yAxisWidth={40}
            />
          </Card>
        </Grid>
        <Grid numItems={1} numItemsSm={1} numItemsMd={1} numItemsLg={2} className='gap-2 mt-3'>
          <Card className='text-center h-96 mb-2'>
            <Text>Consumidores</Text>
            <AreaChart
              className='h-72 mt-4 text-sm'
              data={chartdata}
              index='date'
              categories={['Septiembre']}
              colors={['indigo']}
              valueFormatter={dataFormatter}
              key={chartdata.length}
            />
          </Card>
          <Card className=''>
            <Text className='text-center'>Sales</Text>
            <DonutChart
              className='mt-6'
              data={cities}
              category='sales'
              index='name'
              valueFormatter={valueFormatter}
              colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
            />
            <Legend
              className='mt-3'
              categories={cities.map((city) => city.name)} // Utiliza el nombre de cada ciudad como categoría
              colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
            />
          </Card>

        </Grid>

        <Grid numItems={1} numItemsSm={1} numItemsMd={1} numItemsLg={3} className='gap-2 mt-3'>
          <Card className=''>
            <Text>Venta total</Text>
            <Metric>$ 1.705.000</Metric>
          </Card>
          <Card className=''>
            <Text>Productos vendidos</Text>
            <Metric>58</Metric>
          </Card>
          <Card className=''>
            <Text>Producto más vendido</Text>
            <Metric>Coca-Cola Zero 350ml </Metric>
          </Card>
          <Card className=''>
            <Text>Cupones usados</Text>
            <Metric>6</Metric>
          </Card>
          <Card className=''>
            <Text>Transacciones</Text>
            <BadgeDelta deltaType='moderateDecrease' size='xs'>
              +5.3%
            </BadgeDelta>
            <Metric>167</Metric>

          </Card>
          <Card className=''>
            <Text>Ticket promedio</Text>
            <BadgeDelta deltaType='moderateIncrease' isIncreasePositive size='xs'>
              +12.3%
            </BadgeDelta>
            <Metric>$ 3.500</Metric>

          </Card>
        </Grid>

        <Grid numItems={1} numItemsSm={1} numItemsMd={1} numItemsLg={3} className='gap-2 mt-3'>
          <Card className=''>
            <Text>Usuarios activos</Text>
            <BadgeDelta deltaType='moderateIncrease' isIncreasePositive size='xs'>
              +12.3%
            </BadgeDelta>
            <Metric>114</Metric>

          </Card>
          <Card className=''>
            <Text>Nuevos usuarios</Text>
            <BadgeDelta deltaType='moderateIncrease' isIncreasePositive size='xs'>
              +12.3%
            </BadgeDelta>
            <Metric>35</Metric>

          </Card>
          <Card className=''>
            <Text>Usuarios inactivos</Text>
            <BadgeDelta deltaType='moderateIncrease' isIncreasePositive size='xs'>
              +12.3%
            </BadgeDelta>
            <Metric>27</Metric>

          </Card>

        </Grid>

        <Grid numItems={1} numItemsSm={1} numItemsMd={1} numItemsLg={2} className='gap-2 mt-3'>
          <Card>
            <Text>Total Usuarios</Text>
            <Metric>10.483</Metric>
            <CategoryBar className='mt-4' values={[114, 27]} colors={['emerald', 'red']} />
            <Legend
              className='mt-3'
              categories={['Activos', 'Inactivos']}
              colors={['emerald', 'red']}
            />
          </Card>

          <Card className=''>
            <Text>Rating Usuarios</Text>
            <div className='flex flex-row gap-2 mt-5'>
              <div class='flex flex-col lg:flex-row items-center mt-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='text-green-400 w-20 h-16'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                  />
                </svg>
                <div class='text-center'>
                  <h2 class='text-3xl font-bold'>0%</h2>
                  <h4 class='inline text-gray-500 text-sm'>Conforme</h4>
                </div>
              </div>
              <div class='flex flex-col lg:flex-row items-center mt-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='text-gray-400 w-20 h-16'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15.182 15.182a25.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                  />
                </svg>
                <div class='text-center'>
                  <h2 class='text-3xl font-bold '>0%</h2>
                  <h4 class='inline text-gray-500 text-sm'>Neutral</h4>
                </div>
              </div>
              <div class='flex flex-col lg:flex-row items-center mt-5'>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='text-red-300 w-20 h-16'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                  />
                </svg>
                <div class='text-center'>
                  <h2 class='text-3xl font-bold'>0%</h2>
                  <h4 class='inline text-gray-500 text-sm'>Inconforme</h4>
                </div>
              </div>
            </div>
          </Card>

        </Grid>

        <Card className='text-center h-96 mb-2 mt-4'>
          <Title className='text-center'>Usuarios</Title>
          <Table className='mt-2'>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Mail</TableHeaderCell>
                <TableHeaderCell>Teléfono</TableHeaderCell>
                <TableHeaderCell>Última transacción</TableHeaderCell>
                <TableHeaderCell>Cantidad transacciones</TableHeaderCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Daddy Yankee</TableCell>
                <TableCell> kingofkings@reggeaton.cl </TableCell>
                <TableCell>+ 52 238 0284 02</TableCell>
                <TableCell>$ 5.600 </TableCell>
                <TableCell>6 </TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>

  )
}

export default Marketing
