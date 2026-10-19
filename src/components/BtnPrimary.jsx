import React from 'react'
import { Link } from 'react-router'
import '../styles/components/btnPrimary.css'

const BtnPrimary = ({buttonText, buttonLink}) => {
  return (
    <Link to={buttonLink} className="btn-primary">{buttonText}</Link>
  )
}

export default BtnPrimary