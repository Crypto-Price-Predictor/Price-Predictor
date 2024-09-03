import React from 'react'

const Section4 = () => {
  return (
    <div>
      <div className='flex flex-col pt-5 px-10 text-gray-400' style={{ fontFamily: 'Montserrat' }}>

        <h2 className='text-center text-3xl'>About Us</h2>

        <div className='w-1/2 flex items-center justify-center mx-auto py-5'>
          <p className='text-center'>
          At CryptoVision, we're a team of passionate data scientists, engineers, and cryptocurrency enthusiasts committed to empowering investors with cutting-edge tools. Our mission is to simplify cryptocurrency investing by providing accurate predictions, intelligent portfolio management, and real-time risk analysis. We believe in the future of digital currencies and strive to make it accessible, secure, and profitable for everyone. Join us as we navigate the ever-evolving world of crypto with confidence and precision
          </p>
        </div>
        
        <h2 id='disclaimer' className='text-center text-3xl'>Disclaimer</h2>

        <div className='w-1/2 flex items-center justify-center mx-auto py-5'>
          <p className='text-center'>
          CryptoVision is designed to provide insights and predictions regarding cryptocurrency prices. However, it is important to understand that this tool does not guarantee any specific outcomes, including profits or losses. All investment decisions based on the information provided by this tool are made at your own risk. We strongly recommend conducting additional research and consulting with financial experts before making any investment decisions
          </p>
        </div>

        <div className=''>
          <hr className='my-10 border-t border-white' />
        </div>
        

      </div>
    </div>
  )
}

export default Section4