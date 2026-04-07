import { useState, useEffect } from 'react';
import { FairyTale } from '../types/fairyTale';
import DeleteTaleModal from './DeleteTaleModal';
import AddTaleModal from './AddTaleModal';
import EditTaleModal from './EditTaleModal';
import TaleCardList from './TaleCardList';

interface TalesManagementProps {
  onStatsUpdate: () => void;
}

export default function TalesManagement({ onStatsUpdate }: TalesManagementProps) {
  const [tales, setTales] = useState<FairyTale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taleToDelete, setTaleToDelete] = useState<FairyTale | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingTale, setEditingTale] = useState<FairyTale | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchTales();
  }, []);

  const fetchTales = async () => {
    try {
      const response = await fetch('/api/fairy-tales');
      if (!response.ok) {
        throw new Error('Failed to fetch tales');
      }
      const data = await response.json();
      setTales(data);
    } catch (err) {
      setError('Failed to load fairy tales');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (tale: FairyTale) => {
    setTaleToDelete(tale);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!taleToDelete) return;

    setDeletingId(taleToDelete.id);
    try {
      const response = await fetch(`/api/fairy-tales/${taleToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tale');
      }

      setTales(tales.filter(tale => tale.id !== taleToDelete.id));
      onStatsUpdate();
      setDeleteModalOpen(false);
      setTaleToDelete(null);
    } catch (err) {
      setError('Failed to delete fairy tale');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddTale = () => {
    setAddModalOpen(true);
  };

  const handleAddSave = () => {
    fetchTales();
    onStatsUpdate();
    setAddModalOpen(false);
  };

  const handleAddCancel = () => {
    setAddModalOpen(false);
  };

  const handleEditClick = (tale: FairyTale) => {
    setEditingTale(tale);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    await fetchTales();
    onStatsUpdate();
    setIsEditModalOpen(false);
    setEditingTale(null);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingTale(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTaleToDelete(null);
  };

  const handleToggleVisibility = async (id: number) => {
    try {
      const response = await fetch(`/api/fairy-tales/${id}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle visibility');
      }

      setTales(tales.map(tale =>
        tale.id === id ? { ...tale, hidden: !tale.hidden } : tale
      ));
      onStatsUpdate();
    } catch (err) {
      setError('Failed to toggle visibility');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Manage Fairy Tales</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Fairy Tales</h2>
        <button
          onClick={handleAddTale}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add New Tale
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {tales.length === 0 ? (
        <p className="text-gray-600">No fairy tales found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tales.map((tale) => (
                  <tr key={tale.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{tale.title}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{tale.author || '-'}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{tale.country || '-'}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{tale.year || '-'}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{tale.clicks}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        tale.hidden
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {tale.hidden ? 'Hidden' : 'Visible'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditClick(tale)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(tale.id)}
                        className={`hover:text-gray-900 ${
                          tale.hidden ? 'text-green-600' : 'text-yellow-600'
                        }`}
                      >
                        {tale.hidden ? 'Show' : 'Hide'}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(tale)}
                        disabled={deletingId === tale.id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {deletingId === tale.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden">
            <TaleCardList
              tales={tales}
              deletingId={deletingId}
              onEdit={handleEditClick}
              onToggleVisibility={handleToggleVisibility}
              onDelete={handleDeleteClick}
            />
          </div>
        </>
      )}
      <DeleteTaleModal
        tale={taleToDelete}
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onDelete={handleDeleteConfirm}
      />
      <AddTaleModal
        isOpen={addModalOpen}
        onClose={handleAddCancel}
        onSave={handleAddSave}
      />
      <EditTaleModal
        tale={editingTale}
        isOpen={isEditModalOpen}
        onClose={handleEditCancel}
        onSave={handleEditSave}
      />
    </div>
  );
}