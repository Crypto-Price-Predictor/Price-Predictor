import React from 'react'

const Section2 = () => {
  return (
    <div>
        <div className='flex flex-col pt-5 px-10 text-gray-400' style={{ fontFamily: 'Montserrat' }}>
            <h2 className='text-center text-3xl'>Our Features</h2>
            <div className='flex-row flex items-center justify-center px-16 pt-5 gap-5'>
                <div className='flex flex-col bg-base-200 bg-opacity-70 w-1/2 h-1/4  rounded-3xl p-5'>
                    <h3 className='text-xl'>Addvanced Price Prediction</h3>
                    <p className='pt-2'>Leverage advanced algorithms to predict cryptocurrency price trends with precision, helping you make confident investment choices</p>
                </div>
                <div className='flex flex-col bg-base-200 bg-opacity-70 w-1/2 h-1/4  rounded-3xl p-5'>
                    <h3 className='text-xl'>Smart Portfolio Management</h3>
                    <p className='pt-2'>Easily organize and track your cryptocurrency investments, ensuring your portfolio is optimized for growth</p>
                </div>
            </div>

            <div className='flex-row flex items-center justify-center px-16 pt-5 gap-5'>
                <div className='flex flex-col bg-base-200 bg-opacity-70 w-1/2 h-1/4  rounded-3xl p-5'>
                    <h3 className='text-xl'>Real-Time Risk Analysis</h3>
                    <p className='pt-2'>Continuously monitor and assess risks in real-time, helping you make informed decisions and minimize potential losses</p>
                </div>
                <div className='flex flex-col bg-base-200 bg-opacity-70 w-1/2 h-1/4  rounded-3xl p-5'>
                    <h3 className='text-xl'>Apply Technical Analysis Tools</h3>
                    <p className='pt-2'>Utilize advanced technical analysis tools to evaluate market trends and refine your trading strategies</p>
                </div>
            </div>

            <div className='flex-row flex items-center justify-center px-16 pt-5 gap-5'>
                <div className='flex flex-col bg-base-200 bg-opacity-70 w-1/2 h-1/4  rounded-3xl p-5'>
                    <h3 className='text-xl'>Support for Several Cryptocurrencies</h3>
                    <p className='pt-2'>Manage and trade across multiple cryptocurrencies, giving you the flexibility to diversify your investments</p>
                </div>
                <div className='flex flex-col bg-base-200 bg-opacity-70 w-1/2 h-1/4  rounded-3xl p-5'>
                    <h3 className='text-xl'>Adjustable Prediction Time Period</h3>
                    <p className='pt-2'>Customize your predictions by selecting daily or hourly timeframes, giving you control over how you monitor market trends</p>
                </div>
            </div>

            <div className='flex-row flex items-center justify-center px-16 pt-5 gap-5'>
                <div className='flex flex-col bg-base-200 bg-opacity-70 w-1/2 h-1/4  rounded-3xl p-5'>
                    <h3 className='text-xl'>User-Friendly Dashboard</h3>
                    <p className='pt-2'>Navigate your investments effortlessly with a clean, intuitive dashboard that puts all the tools and insights you need at your fingertips</p>
                </div>
            </div>

            <hr id='working' className='my-10 border-t border-white' />

        </div>
    </div>
  )
}

export default Section2