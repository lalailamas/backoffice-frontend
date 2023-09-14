import React from 'react'
import { Controller } from 'react-hook-form'
import Datepicker from 'react-tailwindcss-datepicker'

export const DatePickerField = ({ name, control, rules, label, ...rest }) => {
  return (
    <div className='col-span-12 md:col-span-3 form-control w-full'>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Datepicker
            displayFormat='DD/MM/YYYY'
            i18n='es'
            startWeekOn='mon'
            primaryColor='purple'
            value={field.value}
            popoverDirection='down'
            inputClassName='input input-bordered w-full'
            useRange={false}
            asSingle
            onChange={(date) => {
              field.onChange(date)
            }}
            inputId={`${name}_id`}
            {...rest}
          />
        )}
      />
    </div>
  )
}
