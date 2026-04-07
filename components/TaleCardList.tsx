import { FairyTale } from '../types/fairyTale';

interface TaleCardListProps {
  tales: FairyTale[];
  deletingId: number | null;
  onEdit: (tale: FairyTale) => void;
  onToggleVisibility: (id: number) => void;
  onDelete: (tale: FairyTale) => void;
}

export default function TaleCardList({
  tales,
  deletingId,
  onEdit,
  onToggleVisibility,
  onDelete,
}: TaleCardListProps) {
  return (
    <div className="space-y-4">
      {tales.map((tale) => (
        <div key={tale.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{tale.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{tale.author || 'Unknown author'}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              tale.hidden ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {tale.hidden ? 'Hidden' : 'Visible'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-700">Country:</span> {tale.country || '-'}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Year:</span> {tale.year || '-'}
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-gray-700">Clicks:</span> {tale.clicks}
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="font-semibold">Preview</div>
            <p className="line-clamp-3 text-gray-600">{tale.content}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => onEdit(tale)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onToggleVisibility(tale.id)}
              className={`px-3 py-2 rounded-lg text-sm transition ${
                tale.hidden ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200'
              }`}
            >
              {tale.hidden ? 'Show' : 'Hide'}
            </button>
            <button
              onClick={() => onDelete(tale)}
              disabled={deletingId === tale.id}
              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition disabled:opacity-50"
            >
              {deletingId === tale.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
