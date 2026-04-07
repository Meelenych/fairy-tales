import { useState, useEffect } from 'react';

interface Stats {
  total: number;
  visible: number;
  hidden: number;
  mostPopular: Array<{
    id: number;
    title: string;
    clicks: number;
  }>;
}

interface DashboardProps {
  stats: Stats | null;
  loading: boolean;
  error: string;
}

export default function Dashboard({ stats, loading, error }: DashboardProps) {

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Tales</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.total || 0}</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Visible Tales</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.visible || 0}</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Hidden Tales</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.hidden || 0}</p>
        </div>
      </div>

      {/* Most Popular Tales */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Most Popular Tales</h3>
        {stats?.mostPopular && stats.mostPopular.length > 0 ? (
          <div className="space-y-3">
            {stats.mostPopular.map((tale, index) => (
              <div key={tale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{tale.title}</h4>
                    <p className="text-sm text-gray-600">ID: {tale.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">{tale.clicks}</p>
                  <p className="text-sm text-gray-600">clicks</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tales available yet.</p>
        )}
      </div>
    </div>
  );
}