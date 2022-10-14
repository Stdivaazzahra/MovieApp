import React from 'react'
import { GiMapleLeaf } from 'react-icons/gi';
import './Footer.css';

const Footer = () => {
  return (
    <div>
        <div className="footer_wrap">
            <div className="footer_item">
                <GiMapleLeaf className="footer_icon" />
                <h1>StDivaa</h1>
                <GiMapleLeaf className="footer_icon" />
            </div>
        </div>
    </div>
  )
}

export default Footer