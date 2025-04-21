export default function StatsCard({
    title,
    value
  }: {
    title: string;
    value: number;
  }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
      </div>
    );
  }