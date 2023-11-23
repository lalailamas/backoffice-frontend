'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import { Suspense, useState } from 'react'
import {
  Card,
  Text,
  Metric,
  TabPanel,
  Grid,
  Title,
  TabGroup,
  TabPanels,
  Col, Table,
  TableHead,
  TableRow,
  TableHeaderCell
  , AreaChart,
  Select,
  SelectItem
  , Badge, BadgeDelta,
  TableCell,
  TableBody
} from '@tremor/react'
import {
  SignalIcon,
  ClockIcon

} from '@heroicons/react/24/solid'

import { chartdata, dataFormatter } from './fake'
import DspLoader from '@/components/admin/common/loader'
// import { useRouter } from 'next/navigation'
// import DspLoader from '@/components/admin/common/loader'

export default function MyComponent () {
  const [value, setValue] = useState('')
  const [month, setMonth] = useState('')

  // const router = useRouter()

  // console.log(session, 'session DENTRO DEL MYCOMPONENT PERO FUERA DEL USEEFFECT')

  return (
    <div>

      <InsideLayout />
      <Suspense fallback={<DspLoader />}>
        <main className='p-12'>
          <Title>Dashboard</Title>

          <TabGroup className='mt-6 '>
            <TabPanels>
              <TabPanel>
                <div className='mt-6'>
                  <Card className='rounded-xl'>
                    <Text className='text-center'>Estado de las máquinas</Text>

                    <Grid numItems={1} numItemsSm={2} numItemsLg={5} className='gap-2 mt-3'>
                      <Card className='rounded-xl'>
                        <div className='text-center'>HUB Cenco
                          <br />
                          <Badge size='lg' icon={SignalIcon} color='emerald' />
                        </div>
                      </Card>
                      <Card className='rounded-xl' decorationColor='neutral'>
                        <div className='text-center'>Dieciocho 715
                          <br />
                          <Badge size='lg' icon={SignalIcon} color='red' />
                        </div>
                      </Card>
                      <Card className='rounded-xl'>
                        <div className='text-center'>Calle Nueva 120
                          <br />
                          <Badge size='lg' icon={SignalIcon} color='yellow' />
                        </div>
                      </Card>
                      <Card className='rounded-xl'>
                        <div className='text-center'>PUC Lo Contador
                          <br />
                          <Badge size='lg' icon={SignalIcon} color='emerald' />
                        </div>
                      </Card>
                      <Card className='rounded-xl'>
                        <div className='text-center'>PUC San Joaquín
                          <br />
                          <Badge size='lg' icon={SignalIcon} color='emerald' />
                        </div>
                      </Card>
                    </Grid>
                  </Card>

                </div>
                <Grid numItemsMd={1} numItemsLg={2} className='gap-5 mt-6'>
                  <div className='max-w-sm mx-auto space-y-6'>
                    <Select value={value} onValueChange={setValue} placeholder='Todas las tiendas' className='select-bordered rounded-full md:max-w-xs w-64'>
                      <SelectItem value='1'>Hub Cenco</SelectItem>
                      <SelectItem value='2'>Dieciocho 715</SelectItem>
                      <SelectItem value='3'>Calle Nueva 120</SelectItem>
                      <SelectItem value='4'>PUC Lo Contador</SelectItem>
                      <SelectItem value='5'>PUC San Joaquín</SelectItem>
                    </Select>
                  </div>
                  <div className='max-w-sm mx-auto space-y-6'>
                    <Select value={month} onValueChange={setMonth} placeholder='Mes' className='select-bordered rounded-full md:max-w-xs w-64'>
                      <SelectItem value='1'>Enero 2023</SelectItem>
                      <SelectItem value='2'>Febrero 2023</SelectItem>
                      <SelectItem value='3'>Marzo 2023</SelectItem>
                      <SelectItem value='4'>Abril 2023</SelectItem>
                      <SelectItem value='5'>Mayo 2023</SelectItem>
                      <SelectItem value='6'>Junio 2023</SelectItem>
                      <SelectItem value='7'>Julio 2023</SelectItem>
                      <SelectItem value='8'>Agosto 2023</SelectItem>
                      <SelectItem value='9'>Septiembre 2023</SelectItem>
                      <SelectItem value='10'>Octubre 2023</SelectItem>
                      <SelectItem value='11'>Noviembre 2023</SelectItem>
                      <SelectItem value='12'>Diciembre 2023</SelectItem>
                    </Select>
                  </div>
                </Grid>

                <Grid numItems={1} numItemsSm={1} numItemsMd={1} numItemsLg={2} className='gap-2 mt-3'>
                  <Card className='text-center h-96 mb-2'>
                    <Text>Ventas por día</Text>
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
                    <Title className='text-center'>TOP 5 SKU's</Title>
                    <Table className='mt-2'>
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>#</TableHeaderCell>
                          <TableHeaderCell className='hidden sm:block'>Img</TableHeaderCell>
                          <TableHeaderCell>SKU</TableHeaderCell>
                          <TableHeaderCell>Venta Mes vs MA</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell className='hidden sm:block' />
                          <TableCell>Coca Cola Zero 500ml (Bebidas)</TableCell>
                          <TableCell>$ 50.700 </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </Grid>

                <Grid numItems={1} numItemsSm={1} numItemsMd={1} numItemsLg={2} className='gap-2 mt-3'>

                  <Col numColSpan={1} numColSpanLg={1} className=''>

                    <Card className='gap-3'>
                      <Grid numItems={1} numItemsSm={3} numItemsLg={3} className='gap-2'>

                        <Card className=''>
                          <Text>Venta mes</Text>
                          <Metric>$ 1.705.000</Metric>
                        </Card>
                        <Card className=''>
                          <Text>vs Meta mes</Text>
                          <Metric>$ 1.914.715</Metric>
                          <BadgeDelta deltaType='moderateIncrease' isIncreasePositive size='xs'>
                            +12.3%
                          </BadgeDelta>

                        </Card>
                        <Card className=''>
                          <Text>vs Meta mes anterior</Text>
                          <Metric>$ 2.122.725</Metric>
                          <BadgeDelta deltaType='moderateDecrease' isincreasenegative='true' size='xs'>
                            -24.5%
                          </BadgeDelta>

                        </Card>
                      </Grid>
                    </Card>

                    <Card className='mt-2'>
                      <Grid numItems={1} numItemsSm={3} numItemsLg={3} className='gap-2'>
                        <Card>
                          <Text>Venta acumuladas</Text>
                          <Metric>KPI 1</Metric>
                        </Card>
                        <Card>
                          <Text>vs meta año</Text>
                          <Metric>KPI 2</Metric>
                        </Card>

                      </Grid>
                    </Card>
                    <Card className='mt-2'>
                      <Grid numItems={1} numItemsSm={3} numItemsLg={3} className='gap-2'>
                        <Card>
                          <Text>Ticket promedio</Text>
                          <Metric>KPI 1</Metric>
                        </Card>
                        <Card>
                          <Text>vs meta mes</Text>
                          <Metric>KPI 2</Metric>
                        </Card>
                        <Card>
                          <Text>vs meta mes anterior</Text>
                          <Metric>KPI 3</Metric>
                        </Card>
                      </Grid>
                    </Card>

                    <Card className='mt-2 h-80'>
                      <Title className='text-center'>Mejores categorías</Title>
                      <Table className='mt-5'>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell>#</TableHeaderCell>
                            <TableHeaderCell>Categoría</TableHeaderCell>
                            <TableHeaderCell>Venta Mes vs MA</TableHeaderCell>
                            <TableHeaderCell>% Share vs MA</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </Card>
                    <Card className='mt-2 h-80'>
                      <Title className='text-center'>Peores categorías</Title>
                      <Table className='mt-5'>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell>#</TableHeaderCell>
                            <TableHeaderCell>Categoría</TableHeaderCell>
                            <TableHeaderCell>Venta Mes vs MA</TableHeaderCell>
                            <TableHeaderCell>% Share vs MA</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                      </Table>

                    </Card>

                  </Col>

                  <Col numColSpan={1} numColSpanLg={1} className=''>

                    <Card className=''>
                      <Grid numItems={1} numItemsSm={3} numItemsLg={3} className='gap-2'>

                        <Card className=''>
                          <Text># DE REPOSICIONES</Text>
                          <Metric>15</Metric>
                        </Card>
                        <Card className=''>
                          <Text># PRODUCTOS MERMADOS</Text>
                          <Metric>28</Metric>
                        </Card>
                        <Card className=''>
                          <Text>vs mes anterior</Text>
                          <BadgeDelta deltaType='moderateDecrease' isIncreasePositive size='xs'>
                            -23.2%
                          </BadgeDelta>
                          <Metric>(35)</Metric>

                        </Card>
                      </Grid>
                    </Card>

                    <Card className='mt-2'>
                      <Grid numItems={1} numItemsSm={3} numItemsLg={3} className='gap-2'>

                        <Card className=''>
                          <Text># DE RETIROS</Text>
                          <Metric>12</Metric>
                        </Card>
                        <Card className=''>
                          <Text>Retiros por merma</Text>
                          <Metric>8</Metric>
                        </Card>
                        <Card className=''>
                          <Text>Retiros por cambio</Text>
                          <Metric>4</Metric>

                        </Card>
                      </Grid>
                    </Card>

                    <Card className='mt-2'>
                      <Grid numItems={1} numItemsSm={3} numItemsLg={3} className='gap-2'>

                        <Card className=''>
                          <Text>TIEMPO PROMEDIO REPOSICIÓN</Text>
                          <Metric>7.22 min</Metric>
                        </Card>
                        <div className='flex justify-center m-10'>
                          <Badge icon={ClockIcon} size='xl' className='hidden sm:block' />
                        </div>
                        <Card className=''>
                          <Text>TIEMPO PROMEDIO TRANSACCIÓN</Text>
                          <Metric>6,43 seg</Metric>
                        </Card>

                      </Grid>
                    </Card>

                    <Card className='mt-2'>
                      <Title className='text-center mb-4'>Transacciones Mes</Title>
                      <Grid numItems={1} numItemsSm={4} numItemsLg={4} className='gap-2'>

                        <Card className=''>
                          <Text>TIEMPO PROMEDIO REPOSICIÓN</Text>
                          <Metric>325</Metric>
                        </Card>
                        <Card className=''>
                          <Text>vs meta mes</Text>
                          <BadgeDelta deltaType='moderateDecrease' isIncreasePositive size='xs'>
                            -5.4%
                          </BadgeDelta>
                          <Metric>(336 TRX)</Metric>
                        </Card>

                        <Card className=''>
                          <Text>vs mes anterior</Text>
                          <BadgeDelta deltaType='moderateIncrease' isIncreasePositive size='xs'>
                            +9,8%
                          </BadgeDelta>
                          <Metric>(304 TRX)</Metric>
                        </Card>

                        <Card className=''>
                          <Text>TRX POR USUARIO</Text>
                          <Metric>2,1</Metric>
                        </Card>

                      </Grid>
                    </Card>
                    <Card className='mt-2 hidden sm:block h-fit'>
                      <Title className='text-center mb-10'>Clientes</Title>
                      <img src='/persona.png' className='mt-6 w-36 absolute hidden sm:block' />
                      <div className='flex flex-col sm:flex-row w-auto h-auto justify-end'>
                        <div className='flex sm:flex-col gap-11 mt-20 mr-2'>
                          <Text className='mb-10'>Total</Text>

                          <div className='mr-2'>
                            <Text className=''>vs MA</Text>
                          </div>

                          <Text className='mt-6 ml-2'>vs</Text>
                        </div>
                        <div className='flex justify-end'>
                          <Grid numItems={9} numItemsSm={1} numItemsLg={3} className='gap-2 w-96 text-center'>

                            <Col numColSpan={1} numColSpanLg={1}>
                              <Text className='mb-2'>CLIENTES REGISTRADOS</Text>
                              <Card className=''>
                                <Metric>0</Metric>
                              </Card>
                            </Col>

                            <Col>
                              <Text className='mb-2'>CLIENTES ACTIVOS</Text>
                              <Card className=''>
                                <Metric>0</Metric>
                              </Card>
                            </Col>

                            <Col>
                              <Text className='mb-2'>% DE TASA ACTIVOS</Text>
                              <Card className=''>
                                <Metric>0</Metric>
                              </Card>
                            </Col>

                            <Card className=''>
                              <Metric>0</Metric>
                              <BadgeDelta deltaType='moderateIncrease' isincreasenegative='true' size='xs'>
                                0%
                              </BadgeDelta>
                            </Card>
                            <Card className=''>
                              <Metric>0</Metric>
                              <BadgeDelta deltaType='moderateIncrease' isincreasenegative='true' size='xs'>
                                0%
                              </BadgeDelta>
                            </Card>

                            <Card className=''>
                              <Metric>0</Metric>
                              <BadgeDelta deltaType='moderateIncrease' isincreasenegative='true' size='xs'>
                                0%
                              </BadgeDelta>
                            </Card>

                            <Card className=''>
                              <Metric>0</Metric>
                              <BadgeDelta deltaType='moderateIncrease' isincreasenegative='true' size='xs'>
                                0%
                              </BadgeDelta>
                            </Card>

                            <Card className=''>
                              <Metric>0</Metric>
                              <BadgeDelta deltaType='moderateIncrease' isincreasenegative='true' size='xs'>
                                0%
                              </BadgeDelta>
                            </Card>

                            <Card className=''>
                              <Metric>0</Metric>
                              <BadgeDelta deltaType='moderateIncrease' isincreasenegative='true' size='xs'>
                                0%
                              </BadgeDelta>
                            </Card>

                          </Grid>
                        </div>
                      </div>
                    </Card>

                  </Col>
                </Grid>

              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
      </Suspense>
    </div>
  )
}
