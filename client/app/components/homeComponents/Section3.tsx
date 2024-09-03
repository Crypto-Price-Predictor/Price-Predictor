import React from 'react'

const Section3 = () => {
  return (
    <div>
        <div className='flex flex-col pt-5 px-10 text-gray-400' style={{ fontFamily: 'Montserrat' }}>

            <h2 className='text-center text-3xl'>How It Works</h2>

            <div className='px-16'>
                <div>

                    <div className='flex flex-row bg-gradient-to-r from-black/70 to-base-200/70 rounded-3xl text-left m-5'>
                        <div className='w-2/3 p-5 '>
                            <h3 className='text-xl'>Sign Up or Log In</h3>
                            <p className='pt-5 '>Create an account or log in if you already have one. Once logged in, you'll be directed to your Dashboard.</p>
                        </div>
                        <div className='w-1/3 p-5'>
                        <ul className="list-disc list-inside ">
                            <li>Create an account manually with your email</li>
                            <li>Register through Google</li>
                        </ul>
                        </div>
                    </div>

                    <div className='flex flex-row  bg-gradient-to-r from-black/70 to-base-200/70 rounded-3xl text-left m-5'>
                        <div className='w-2/3 p-5 '>
                                <h3 className='text-xl'>Explore Your Dashboard</h3>
                                <p className='pt-5'>Explore your personalized Dashboard where you can gain insights into future cryptocurrency trends and track historical performance. The Dashboard provides a comprehensive view of predictions, real prices, and investment metrics, allowing you to make informed decisions and optimize your strategies effortlessly</p>
                            </div>
                            <div className='w-1/3 p-5 '>
                            <ul className="list-disc list-inside">
                                <li>View predictions for the next 7 time steps</li>
                                <li>Track past prediction history</li>
                                <li>Compare predictions with real prices</li>
                                <li>Change cryptocurrencies</li>
                                <li>Adjust the investment period (hourly or daily)</li>
                                <li>Apply technical analysis tools</li>
                                <li>Monitor prediction errors</li>
                                <li>ssess prediction stability over time</li>
                                <li>Update account details</li>
                            </ul>
                            </div>
                    </div>

                    <div className='flex flex-row  bg-gradient-to-r from-black/70 to-base-200/70 rounded-3xl text-left m-5'>
                        <div className='w-2/3 p-5 '>
                            <h3 className='text-xl'>Risk Analysis and Portfolio Management</h3>
                            <p className='pt-5'>Navigate to the risk analysis interface to manage your transactions by updating buy or sell details on the web page. Instantly receive real-time risk assessments and profit estimates. The interface provides valuable insights and recommendations to help you optimize your portfolio, effectively minimizing losses and maximizing profits</p>
                        </div>
                        <div className='w-1/3 p-5 '>
                        <ul className="list-disc list-inside">
                            <li>Automatically calculate real-time risk</li>
                            <li>Generate profit estimates</li>
                            <li>Receive insights and recommendations</li>
                            <li>Manage portfolio effectively</li>
                            <li>Minimize losses and Maximize profits</li>
                        </ul>
                        </div>
                    </div>

                    <div className='flex flex-row bg-gradient-to-r from-black/70 to-base-200/70 rounded-3xl text-left m-5'>
                        <div className='w-2/3 p-5 '>
                            <h3 className='text-xl'>Analyze Market Sentiment</h3>
                            <p className='pt-5'>Access sentiment analysis through your dashboard, where you can view relevant news articles and their analysis to make informed trading decisions</p>
                        </div>
                        <div className='w-1/3 p-5 '>
                        <ul className="list-disc list-inside">
                            <li>Show Articles</li>
                            <li>Analize and Dashbording Trend</li>
                        </ul>
                        </div>
                    </div>

                </div>
            </div>

            <hr id="about" className='my-10 border-t border-white' />

        </div>
    </div>
  )
}

export default Section3