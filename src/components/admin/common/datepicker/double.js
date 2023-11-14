import Datepicker from 'react-tailwindcss-datepicker'
import dayjs from 'dayjs'

function DatePicker ({ startDate, endDate, handleDateChange }) {
  // Lógica para traer información del año pasado
  // const getLastYearDates = () => {
  //   const currentDate = new Date()
  //   const currentYear = currentDate.getFullYear()

  //   const startDateLastYear = `01-01-${currentYear - 1}`
  //   console.log(startDateLastYear, 'inicio año pasado')
  //   const endDateLastYear = `31-12-${currentYear - 1}`
  //   console.log(endDateLastYear, 'final año pasado')

  //   return { startDate: startDateLastYear, endDate: endDateLastYear }
  // }
  const getLastYearDates = () => {
    // const currentYear = dayjs().year()
    const lastYearStartDate = dayjs().subtract(1, 'year').startOf('year').format('DD-MM-YYYY')
    console.log(lastYearStartDate, 'inicio año pasado')
    const lastYearEndDate = dayjs().subtract(1, 'year').endOf('year').format('DD-MM-YYYY')
    console.log(lastYearEndDate, 'fin año pasado')

    return { startDate: lastYearStartDate, endDate: lastYearEndDate }
  }
  return (
    <div className='w-full border'>
      <Datepicker
        primaryColor='purple'
        placeholder='Escoge rango de fechas'
        separator='-'
        value={{ startDate, endDate }}
        popoverDirection='down'
        onChange={handleDateChange}
        showShortcuts
        configs={{
          shortcuts: {
            today: 'Hoy',
            yesterday: 'Ayer',
            past: period => `Últimos ${period} días`,
            currentMonth: 'Este mes',
            pastMonth: 'Mes pasado',
            pastYear: {
              text: 'Año pasado',
              period: getLastYearDates()
              // period: {
              //   start: getLastYearDates().startDate,
              //   end: getLastYearDates().endDate
              // }
            }
          },
          displayFormat: 'DD/MM/YYYY',
          inputClassName: 'input input-bordered w-full',
          i18n: 'es',
          startWeekOn: 'mon'
        }}
      />
    </div>

  )
}

export default DatePicker
