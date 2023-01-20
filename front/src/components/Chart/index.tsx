import React, { memo } from 'react';
/*
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries
} from '@devexpress/dx-react-chart-material-ui';
*/
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { ChartData } from '../../types';

import './Chart.css';


interface ChartProps 
{
    chartData: ChartData;
}

ChartJS.register(ArcElement, Tooltip, Legend);

function CustomChart(props: ChartProps) 
{
    const { chartData } = props;

    return (
        <Pie
           // options={...}
            data={ chartData }
           // {...props}
        />
    );
}

export default memo(CustomChart);