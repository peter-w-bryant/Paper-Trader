import React from 'react';
import ReactHighcharts from 'react-highcharts';

import { createDonutChart } from '@brightlayer-ui/highcharts';
import * as BLUIColors from '@brightlayer-ui/colors';

const mainConfig = {
    colors: [BLUIColors.blue[900], BLUIColors.blue[500], BLUIColors.blue[200]],
    // data: [10,20,50,5,15],
};

const graphStyles = {
    domProps: {
        style: {
            height: '100%',
        },
    },
};


export default () => {
    // <ReactHighcharts config={createDonutChart(mainConfig)} {...graphStyles} />
    <div style={{ height: '300px' }}>
            <ReactHighcharts config={createDonutChart(mainConfig)} {...graphStyles} />
        </div>
}