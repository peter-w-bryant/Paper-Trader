import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'

export default () => {
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const date = '02/01/2023';
    const priceData = fetch(`/historical-stock-info/AAPL/?start_date=${date}`, {    
        method: 'GET',    
    }).then(res => {
        return res.json();
    }).catch(err => console.log('err: ' + err));


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

            data: priceData,
            tooltip: {
                valueDecimals: 2
            },

        }
        ]
    };
    return (
        <div>
            {/* <ReactHighcharts config={configPrice}></ReactHighcharts> */}
            <button onClick={() => console.log(priceData)}>click</button>
        </div>
    )
}
