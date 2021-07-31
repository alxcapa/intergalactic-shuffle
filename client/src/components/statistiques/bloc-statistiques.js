import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const byCountries = [
  {
    name: 'France',
    usersByCountries: 400
  },
  {
    name: 'England',
    usersByCountries: 230
  },
  {
    name: 'Japan',
    usersByCountries: 70
  },
  {
    name: 'Russia',
    usersByCountries: 600
  },
  {
    name: 'USA',
    usersByCountries: 400
  }
];



export default class BlocStats extends PureComponent {
  render() {
    return (
      <div className="bloc-stats">
        <h2>Users by Countries</h2>
        <ResponsiveContainer width="80%" height="77%">
          <LineChart width={500} height={300} data={byCountries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
            <Line type="monotone" dataKey="usersByCountries" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

      </div>
    )
  }
}



