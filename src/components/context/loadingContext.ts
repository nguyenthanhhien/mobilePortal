import { createContext } from 'react'

const LoadingContext = createContext({
  isLoading: false,
  showLoading: () => {},
  dismissLoading: () => {}
})

export default LoadingContext