import React, { useState } from 'react'
import LoadingContext from '../context/loadingContext'

const LoadingProvider = ({ children }: any) => {
  /**
   * Loading state/controls
   */

//   const showLoading = () => {
//     toggleLoading(prevState => {
//         return {
//           ...prevState,
//           loadingCount: prevState.loadingCount + 1
//         }
//       })
//       let a = loading.loadingCount
//   }

//   const closeLoading = () => {
    

//       toggleLoading(prevState => {
//         return {
//           ...prevState,
//           loadingCount:
//             prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0
//         }
//       })
//     let a = loading.loadingCount
//   }

//   const loadingState = {
//     loadingCount: 0,
//     showLoading,
//     closeLoading
//   }

  const [isLoading, toggleLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{
        isLoading: isLoading, showLoading: () => toggleLoading(true), dismissLoading: () => toggleLoading(false)}} >
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
