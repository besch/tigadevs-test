import React, { useState, useEffect, useCallback } from 'react';
import * as csvConv from 'csvtojson';
import csvData from './DAMKBAoDBwoDBAkOBAYFCw';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { take, uniq, map, filter } from 'lodash';
import { Select, Typography } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const { Option } = Select;
const { Title } = Typography;

function App() {

  const [chartData, setChartData] = useState([]);
  const [datasourceFilter, setDatasourceFilter] = useState([]);
  const [campaignFilter, setCampaignFilter] = useState([]);

  const getCSVData = () => {
    csvConv().fromString(csvData)
      .then(csvRow => setChartData(take(csvRow, 100)));
  };

  const handleChangeDatasource = value => {
    setDatasourceFilter(value);
  };

  const handleChangeCampaign = value => {
    setCampaignFilter(value);
  };

  const filteredChartData = useCallback(
    () => {
      if (chartData.length === 0) return [];

      const filteredByDataSource = datasourceFilter.length === 0 ? chartData : filter(chartData, item => datasourceFilter.includes(item.Datasource));
      const filteredByCampaignFilter = campaignFilter.length === 0 ? filteredByDataSource: filter(filteredByDataSource, item => campaignFilter.includes(item.Campaign));

      return filteredByCampaignFilter;
    },
    [datasourceFilter, campaignFilter, chartData]
  );

  const getUniqValuesByProperty = (data, propertyName) => uniq(map(data, propertyName));

  useEffect(() => {
    getCSVData();
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
