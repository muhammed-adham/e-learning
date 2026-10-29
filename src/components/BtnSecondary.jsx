import React from 'react'
import "../styles/components/btnSecondary.css"
import { Link } from 'react-router'

const BtnSecondary = ({buttonLink, buttonText}) => {
  return (
    <Link to={buttonLink} className="btn-secondary"><h6>{buttonText}</h6></Link>
  )
}

export default BtnSecondary