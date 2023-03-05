import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'

export default () => {
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {

        yAxis: [{
            offset: 20,

            labels: {
                formatter: function () {
                    return numberFormat.format(this.value)
                }
                ,
                x: -15,
                style: {
                    "color": "#000", "position": "absolute"

                },
                align: 'left'
            },
        },

        ],
        tooltip: {
            shared: true,
            formatter: function () {
                return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
            }
        },
        plotOptions: {
            series: {
                showInNavigator: true,
                gapSize: 6,

            }
        },
        rangeSelector: {
            selected: 1
        },
        title: {
            text: `Apple stock price`
        },
        chart: {
            height: 600,
        },

        credits: {
            enabled: false
        },

        legend: {
            enabled: true
        },
        xAxis: {
            type: 'date',
        },
        rangeSelector: {
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d',
            }, {
                type: 'day',
                count: 7,
                text: '7d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            },
            {
                type: 'all',
                text: 'All'
            }],
            selected: 4
        },
        series: [{
            name: 'Price',
            type: 'candle',

            data: [[1675209600000, 146.6100006104, 141.3200073242],
            [1675296000000, 151.1799926758, 148.1699981689],
            [1675382400000, 157.3800048828, 147.8300018311],
            [1675641600000, 153.1000061035, 150.7799987793],
            [1675728000000, 155.2299957275, 150.6399993896],
            [1675814400000, 154.5800018311, 151.1699981689],
            [1675900800000, 154.3300018311, 150.4199981689],
            [1675987200000, 151.3399963379, 149.2200012207],
            [1676246400000, 154.2599945068, 150.9199981689],
            [1676332800000, 153.7700042725, 150.8600006104],
            [1676419200000, 155.5, 152.8800048828],
            [1676505600000, 156.3300018311, 153.3500061035],
            [1676592000000, 153.0, 150.8500061035],
            [1676937600000, 151.3000030518, 148.4100036621],
            [1677024000000, 149.9499969482, 147.1600036621],
            [1677110400000, 150.3399963379, 147.2400054932],
            [1677196800000, 147.1900024414, 145.7200012207],
            [1677456000000, 149.1699981689, 147.4499969482],
            [1677542400000, 149.0800018311, 146.8300018311],
            [1677628800000, 147.2299957275, 145.0099945068],
            [1677715200000, 146.7100067139, 143.8999938965],
            [1677801600000, 151.1100006104, 147.3300018311]],
            tooltip: {
                valueDecimals: 2
            },

        }
        ]
    };
    return (
        <div>
            <ReactHighcharts config={configPrice}></ReactHighcharts>
        </div>
    )
}
