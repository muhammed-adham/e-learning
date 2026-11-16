import React from 'react'
import "../styles/components/btnSecondary.css"
import { Link } from 'react-router'

const BtnSecondary = ({buttonLink, buttonText, buttonIcon}) => {
  return (
    <Link to={buttonLink} className="btn-secondary">{buttonIcon}<h6>{buttonText}</h6></Link>
  )
}

export default BtnSecondary