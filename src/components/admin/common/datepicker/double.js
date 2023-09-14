/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-boolean-value */
import Datepicker from 'react-tailwindcss-datepicker'

function DatePicker ({ startDate, endDate, handleDateChange }) {
  return (
    <div id='datepicker'>
      <Datepicker
        primaryColor={'purple'}
        placeholder='Escoge rango de fechas'
        separator='-'
        value={{ startDate, endDate }}
        popoverDirection='down'
        onChange={handleDateChange}
        showShortcuts={true}
        displayFormat='DD/MM/YYYY'
        inputClassName='input input-bordered w-full'
        i18n='es'
        startWeekOn='mon'
      />
    </div>
  )
}

export default DatePicker
