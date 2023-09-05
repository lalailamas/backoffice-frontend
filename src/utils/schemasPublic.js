import * as Yup from 'yup'

const errorMesagges = {
  required: 'validation.required',
  min: 'validation.minLength',
  min2: 'validation.minLength',
  max: 'validation.maxLength3',
  max2: 'validation.maxLength2',
  phone: 'validation.phone',
  html: 'validation.html',
  noSpecialCh: 'validation.noSpecialCh'
}
// const noHTML = async value =>
//   value && /<[a-z][\s\S]*>/i.test(value)
//     ? Promise.reject(errorMesagges.html)
//     : Promise.resolve()
Yup.addMethod(Yup.string, 'noHTML', function (args) {
  return this.matches(/^[^@#$%^&*()_+\-=[\]{};'"\\|<>/]*$/gm, args)
})
Yup.addMethod(Yup.string, 'noSpecialCh', function (args) {
  return this.matches(/^[^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/gm, args)
})

export const formConsultSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, errorMesagges.min2)
    .max(30, errorMesagges.max)
    .required(errorMesagges.required)
    .noSpecialCh(errorMesagges.noSpecialCh),
  email: Yup.string()
    .email(errorMesagges.email)
    .required(errorMesagges.required),
  message: Yup.string()
    .min(2, errorMesagges.min)
    .required(errorMesagges.required)
    .noHTML(errorMesagges.html),
  phone: Yup.string().matches(
    /^[0-9]+$/,
    errorMesagges.phone
  ).max(10, errorMesagges.phone)
})
