import React, { useState, useEffect, useCallback } from 'react';
import * as csvConv from 'csvtojson';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { take, uniq, map, filter } from 'lodash';
import { Select, Typography } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const { Option } = Select;
const { Title } = Typography;

function App() {



  useEffect(() => {
    // getCSVData();
  }, []);
  
  return (
    <div style={{ display: 'inline-flex' }}>
      <div style={{ width: 400 }}>
        <Title level={4}>Datasource</Title>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={handleChangeDatasource}
        >
          {map(getUniqValuesByProperty(chartData, 'Datasource'), (opt, i) => <Option key={i+1} value={opt} title={opt}>{opt}</Option>)}
        </Select>

        <Title level={4}>Campaign</Title>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={handleChangeCampaign}
        >
          {map(getUniqValuesByProperty(chartData, 'Campaign'), (opt, i) => <Option key={i+1} value={opt} title={opt}>{opt}</Option>)}
        </Select>
      </div>

      <div style={{ flexGrow: 1 }}>
        <LineChart
          width={900}
          height={800}
          data={filteredChartData()}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Clicks"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="right" type="monotone" dataKey="Impressions" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}

export default App;
