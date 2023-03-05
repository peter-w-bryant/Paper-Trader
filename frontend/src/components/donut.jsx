import React from 'react';
// @ts-ignore
import ReactHighcharts from 'react-highcharts';

// @ts-ignore
import { createDonutChart } from '@brightlayer-ui/highcharts';
import * as BLUIColors from '@brightlayer-ui/colors';

const mainConfig = {

        series: [{
            name: 'Browsers',
            data:[
                {name: 'Chrome', y: 61.41},
                { name: 'Internet Explorer', y: 11.84 }, 
                { name: 'Firefox', y: 10.85 }
            ]
        }],
};


const graphStyles = {
    domProps: {
        style: {
            height: '100%',
        },
    },
};

export default () => (
   
        <div style={{ height: '300px' }}>
            <ReactHighcharts config={createDonutChart(mainConfig)} {...graphStyles} />
        </div>
        
);



