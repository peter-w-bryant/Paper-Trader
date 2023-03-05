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
            type: 'spline',

            data: [[1675209600000, 143.9650039673],
            [1675296000000, 149.67499542235],
            [1675382400000, 152.60500335695],
            [1675641600000, 151.9400024414],
            [1675728000000, 152.93499755855],
            [1675814400000, 152.875],
            [1675900800000, 152.375],
            [1675987200000, 150.2799987793],
            [1676246400000, 152.58999633785],
            [1676332800000, 152.31500244145],
            [1676419200000, 154.1900024414],
            [1676505600000, 154.8400039673],
            [1676592000000, 151.92500305175],
            [1676937600000, 149.85500335695],
            [1677024000000, 148.55500030515],
            [1677110400000, 148.79000091555],
            [1677196800000, 146.45500183105],
            [1677456000000, 148.30999755855],
            [1677542400000, 147.9550018311],
            [1677628800000, 146.11999511715],
            [1677715200000, 145.3050003052],
            [1677801600000, 149.22000122075]],
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
