import "./chart.css"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
  } from "recharts";
function Chart({aspect , title}) {
    const data = [
        {
          name: "January",
          total: 4000,
        },
        {
          name: "February",
          total: 3000,
        },
        {
          name: "March",
          total: 2000,
        },
        {
          name: "Aprial",
          total: 2780,
        },
        {
          name: "May",
          total: 1890,
        },
        {
          name: "June",
          total: 2390,
        },
      ];
      
    return (
        <div className="chart">
        <div className="title" style={{padding:10}}>
            <select>
                <option value="">Today</option>
                <option value="">Last Week</option>
                <option value="">Last Month</option>
                <option value="">Last 6 month</option>
            </select>
        </div>
      <ResponsiveContainer width="100%"  aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
          
        </AreaChart>
      </ResponsiveContainer>
    </div>
    );
}

export default Chart;