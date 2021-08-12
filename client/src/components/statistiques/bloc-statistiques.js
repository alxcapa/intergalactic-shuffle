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


export default class BlocStats extends PureComponent {
  render() {

    if (!this.props.dataStats) return <div class="loader"> <p>LOADING</p> </div>

    console.log(Object.keys(this.props.dataStats.data));
    let [one, two, three, four] = Object.keys(this.props.dataStats.data);
    let [v1, v2, v3, v4] = Object.values(this.props.dataStats.data)
    console.log("number", this.props.dataStats.data)



    const byCountries = [
      {
        name: one,
        usersByCountries: v1
      },
      {
        name: two,
        usersByCountries: v2
      },
      {
        name: three,
        usersByCountries: v3
      },
      {
        name: four,
        usersByCountries: v4
      }
    ];



    // function countries() {

    //   let countries = this.props.dataStats.data.locations
    //   let france = 0

    //   for (let i = 0; i < countries; i++) {

    //     if (countries[i] === france) {
    //       france = + 1
    //     }

    //   }

    //   console.log("france", france)
    // }




    console.log("props stats", this.props.dataStats.data)


    return (
      <div className="bloc-stats">
      <br/>   <br/> <br/>
        <h2>CHALLENGER LOCATION</h2>
        <br/>   
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



