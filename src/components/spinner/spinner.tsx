import React, { useContext } from 'react'
import LoadingContext from '../context/loadingContext'
import './spinner.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Spinner = () => {
  const { isLoading } = useContext(LoadingContext)

  return (
    <>
      {isLoading && (
        <div className="spinner">
          <Loader
            type="Rings"
            color="#f90a48"
            height={80}
            width={80}
          />
        </div>
      )}
    </>
  )
}

export default Spinner