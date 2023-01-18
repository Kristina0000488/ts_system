import React, { memo } from 'react';

import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  
} from '@devexpress/dx-react-chart-material-ui';

import { ChartData } from '../../types';

import './Chart.css';


interface ChartProps 
{
    chartData: ChartData;
    valueField: string;
    argumentField: string;
}


function CustomChart(props: ChartProps) 
{
    const { valueField, argumentField, chartData } = props;
    
    return (
        <Paper>
            <Chart
                data={ chartData }
            >
            <PieSeries
                valueField={ valueField }
                argumentField={ argumentField }
            />
            </Chart>
        </Paper>
    );
}

export default memo(CustomChart);