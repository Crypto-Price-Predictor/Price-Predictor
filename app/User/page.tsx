import React from 'react';
import NavBar from './../components/NavBar';
import SlideMenu from '../components/SlideMenu';
import TopicGraph from '../components/TopicGraph'; // Updated import
import TimeSelecter from '../components/TimeSelecter';
import CurrSelecter from '../components/CurrSelecter';
import AboutPred from '../components/AboutPred';
import AboutStability from '../components/AboutStability';

const Dashboard = () => {
    
    const series = [{
        name: 'Actual', // Name of the series
        data: [23, 44, 56, 75, 56, 55, 60, 69] // Data points for the series
    }, {
        name: 'Predict',
        data: [36, 46, 60, 70, 60, 40, 60, 72]
    }
    ];
    
    // Categories for the x-axis
    const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

    //AboutPred parameters
    const parameters = ['Prediction accuracy (MSE)', 'Prediction Error (Presentage error)', 'Some other parameters']
    const values = ['0.2', '2.5%', 'xxx']

    return (
        <div>
            <NavBar />
            <div className="flex"> 
                <SlideMenu />
                <div className='flex-grow flex-col w-4/5 p-4'>
                    <div className='flex bg-base-200 p-2 rounded-lg'>
                    <CurrSelecter/>
                    <TimeSelecter/>
                    </div>
                    <div className="flex-grow"> 
                        <TopicGraph series={series} categories={categories} />
                    </div>
                </div>

                <div className="flex-col w-1/5 p-4 pl-0">
                    <div className=''>
                        <AboutPred parameters={parameters} values={values}/>
                    </div>
                    <div className=''>
                        <AboutStability/>
                    </div>
                </div>
                
                



                 
                
            </div>
        </div>
    );
}

export default Dashboard;
