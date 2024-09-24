import useUserBookMarksStats from "@/hooks/useUserBookMarksStats";
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

const BookMarkChart = () => {
  const { data: bookmarkStats } = useUserBookMarksStats();

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
