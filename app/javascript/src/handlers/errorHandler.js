import { toastr } from 'react-redux-toastr'
import nn from 'nevernull'

export const handleRequstError = (error, history) => {
  if (error.response.status === 401) {
    history.push('/sign_in')
  }
  if (nn(error).response.data.errors.length() > 0) {
    const errorMessage = error.response.data.errors[0]
    toastr.error(errorMessage.title, errorMessage.detail)
  } else {
    console.log(error)
  }
}
