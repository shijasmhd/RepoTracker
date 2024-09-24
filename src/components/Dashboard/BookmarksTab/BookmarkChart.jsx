import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const fetchBookmarkStats = async () => {
  return [
    { date: "2023-05-01", count: 3 },
    { date: "2023-05-02", count: 5 },
    { date: "2023-05-03", count: 2 },
    { date: "2023-05-04", count: 7 },
    { date: "2023-05-05", count: 4 },
  ];
};

const BookMarkChart = () => {
  const { data: bookmarkStats } = useQuery({
    queryKey: ["bookmarkStats"],
    queryFn: fetchBookmarkStats,
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={bookmarkStats || []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis stroke="background" dataKey="date" />
        <YAxis stroke="background" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BookMarkChart;
