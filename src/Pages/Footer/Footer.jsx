import React from 'react'
import { GiMapleLeaf } from 'react-icons/gi';

const Footer = () => {
  return (
    <div>
        <div className="footer_wrap m-0 h-[2rem] bg-[#e8dce1b3]">
            <div className="footer_item mt-[2rem] flex justify-center items-center flex-wrap">
                <GiMapleLeaf className="footer_icon relative" />
                <h1 className='FontMs mt-[0.3rem] text-[#b725db] text-[1.1rem] px-[0.3rem]'>
                  StDivaa
                </h1>
                <GiMapleLeaf className="footer_icon" />
            </div>
        </div>
    </div>
  )
}

export default Footer