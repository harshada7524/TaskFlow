import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const data = [
  { day: "Mon", tasks: 4 },
  { day: "Tue", tasks: 6 },
  { day: "Wed", tasks: 3 },
  { day: "Thu", tasks: 8 },
  { day: "Fri", tasks: 5 },
  { day: "Sat", tasks: 7 },
  { day: "Sun", tasks: 4 }
];

export default function CompletionChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Task Completion
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="tasks"
            fill="#6366F1"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}