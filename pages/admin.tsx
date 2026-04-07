import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import TalesManagement from '../components/TalesManagement';
import { FairyTale } from '../types/fairyTale';

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

export default function Admin() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/fairy-tales/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setStatsError('Failed to load dashboard statistics');
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleSave = () => {
    fetchStats(); // Refresh stats after any change
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

          <div className="space-y-8">
            <Dashboard stats={stats} loading={statsLoading} error={statsError} />

            <TalesManagement
              onStatsUpdate={handleSave}
            />
          </div>
        </div>
      </div>

    </div>
  );
}