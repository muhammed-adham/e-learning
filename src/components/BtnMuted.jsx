import React from 'react'
import "../styles/components/btnMuted.css"
import { Link } from 'react-router'

const BtnMuted = ({label}) => {
  return (
    <Link className='btn-muted'>{label}</Link>
  )
}

export default BtnMuted