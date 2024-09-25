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

const BookMarkChart = ({ userId }) => {
  const { data: bookmarkStats } = useUserBookMarksStats(userId);

  if (!bookmarkStats || bookmarkStats?.length < 1) {
    return (
      <div className="flex bg-gray-800 justify-center items-center w-100 h-[100px]">
        <h1 className="text-primary-foreground p-2">
          No data for graph! Add new bookmarks from explore tab
        </h1>
      </div>
    );
  }

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
