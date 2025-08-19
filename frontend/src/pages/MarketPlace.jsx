import React from 'react'
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom"


import { data } from '../data'
function MarketPlace() {
  const marketElements = data.map(item => {
    return (
      <div key={item.id} className="market">
          <img src={item.image} alt={`Photo of ${item.name}`} />
          <h2>{item.name}</h2>
          <p>{item.price} CFA</p>
          <div className="contact">
            <h3>Contacts</h3>
            <div className="contact-icons">
            <Link to={`tel:${item.contacts.phone}`}><IoIosCall className='icons-contact'/></Link>
            <Link to={`https://wa.me/${item.contacts.whatsapp}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp className='icons-contact'/></Link>
            <Link to={item.contacts.tiktok} target="_blank" rel="noopener noreferrer"><FaTiktok className='icons-contact'/></Link>
            <Link to={item.contacts.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF className='icons-contact'/></Link>
          </div>

          </div>
      </div>
    )
  })
  return (
    <div className='market-container'>
        {marketElements}
    </div>
  )
}

export default MarketPlace
