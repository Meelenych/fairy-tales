import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-8">Fairy Tales</h1>
        <p className="text-xl mb-8">Discover magical stories from around the world</p>
        <div className="space-x-4">
          <Link href="/random" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Random Fairy Tale
          </Link>
          <Link href="/list" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            All Fairy Tales
          </Link>
        </div>
      </div>
    </div>
  );
}