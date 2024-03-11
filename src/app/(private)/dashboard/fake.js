export const chartdata = [
  {
    date: '01',
    Septiembre: 60320

  },
  {
    date: '02',
    Septiembre: 55230

  },
  {
    date: '03',
    Septiembre: 52040

  },
  {
    date: '04',
    Septiembre: 45500

  },
  {
    date: '05',
    Septiembre: 68200

  },
  {
    date: '06',
    Septiembre: 38900

  },
  {
    date: '07',
    Septiembre: 75800

  },
  {
    date: '08',
    Septiembre: 82000

  },
  {
    date: '09',
    Septiembre: 29000

  },
  {
    date: '10',
    Septiembre: 34700

  },
  {
    date: '11',
    Septiembre: 43700

  },
  {
    date: '12',
    Septiembre: 45600

  },
  {
    date: '13',
    Septiembre: 48900

  },
  {
    date: '14',
    Septiembre: 39500

  },
  {
    date: '15',
    Septiembre: 64500

  },
  {
    date: '16',
    Septiembre: 71200

  },
  {
    date: '17',
    Septiembre: 63250

  },
  {
    date: '18',
    Septiembre: 77100

  },
  {
    date: '19',
    Septiembre: 34500

  },
  {
    date: '20',
    Septiembre: 34750

  },
  {
    date: '21',
    Septiembre: 31000

  },
  {
    date: '22',
    Septiembre: 48000

  },
  {
    date: '23',
    Septiembre: 65700

  },
  {
    date: '24',
    Septiembre: 32200

  },
  {
    date: '25',
    Septiembre: 31870

  },
  {
    date: '26',
    Septiembre: 31290

  },
  {
    date: '27',
    Septiembre: 54800

  },
  {
    date: '28',
    Septiembre: 70100

  },
  {
    date: '29',
    Septiembre: 31500

  },
  {
    date: '30',
    Septiembre: 65400

  },
  {
    date: '31',
    Septiembre: 65800

  }
]

export const dataFormatter = (number) => {
  return '$ ' + Intl.NumberFormat('us').format(number).toString()
}

export const dataFormatter2 = (number) => `${Intl.NumberFormat('us').format(number).toString()}%`

export const cities = [
  {
    name: 'New York',
    sales: 9800
  },
  {
    name: 'London',
    sales: 4567
  },
  {
    name: 'Hong Kong',
    sales: 3908
  },
  {
    name: 'San Francisco',
    sales: 2400
  },
  {
    name: 'Singapore',
    sales: 1908
  },
  {
    name: 'Zurich',
    sales: 1398
  }
]

export const chartdata2 = [
  {
    year: 1970,
    'Export Growth Rate': 2.04,
    'Import Growth Rate': 1.53
  },
  {
    year: 1971,
    'Export Growth Rate': 1.96,
    'Import Growth Rate': 1.58
  },
  {
    year: 1972,
    'Export Growth Rate': 1.96,
    'Import Growth Rate': 1.61
  },
  {
    year: 1973,
    'Export Growth Rate': 1.93,
    'Import Growth Rate': 1.61
  },
  {
    year: 1974,
    'Export Growth Rate': 1.88,
    'Import Growth Rate': 1.67
  }
]

export const valueFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`
