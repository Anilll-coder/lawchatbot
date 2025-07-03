import React from 'react'
import { Suspense } from 'react'

const Suspenses = ({children}) => {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}

export default Suspenses
