import Datepicker from 'react-tailwindcss-datepicker'
import dayjs from 'dayjs'

function DatePicker ({ startDate, endDate, handleDateChange }) {
  const getLastYearDates = () => {
    const lastYearStartDate = dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD')
    const lastYearEndDate = dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')

    return { startDate: lastYearStartDate, endDate: lastYearEndDate }
  }

  const { startDate: startDateLastYear, endDate: endDateLastYear } = getLastYearDates()

  return (
    <div className='w-full border'>
      <Datepicker
        readOnly
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
              period: {
                start: startDateLastYear,
                end: endDateLastYear
              }
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
