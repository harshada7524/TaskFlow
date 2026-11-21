import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { week: "Week 1", tasks: 3 },
  { week: "Week 2", tasks: 8 },
  { week: "Week 3", tasks: 6 },
  { week: "Week 4", tasks: 12 },
  { week: "Week 5", tasks: 16 }
];

export default function TimelineChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Project Timeline
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#8B5CF6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}