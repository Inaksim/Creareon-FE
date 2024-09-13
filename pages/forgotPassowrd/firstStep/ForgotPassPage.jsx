import React from 'react'
import LeftSide from '../../welcomePage/LeftSide'
import RightSide from './RightSide'

const ForgotPassPage = () => {
  return (
    <div className="flex">
    <div className="w-1/2">
      <LeftSide />
    </div>
    <div className="w-1/2">
      <RightSide />
    </div>
  </div>
  )
}

export default ForgotPassPage