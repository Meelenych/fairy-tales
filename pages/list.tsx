import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FairyTalesController } from '../controllers/fairyTales';
import type { FairyTale } from '../types/fairyTale';
import Header from '../components/Header';

interface Props {
  tales: FairyTale[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tales = await FairyTalesController.getAll();

  return {
    props: {
      tales,
    },
  };
};

export default function List({ tales }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">All Fairy Tales</h1>
        <ul className="space-y-4">
          {tales.map((tale) => (
            <li key={tale.id} className="bg-white p-4 rounded-lg shadow">
              <Link href={`/fairy-tale/${tale.id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                {tale.title}
              </Link>
              <div className="text-gray-600 mt-2 text-sm">
                {tale.author && <p><strong>Author:</strong> {tale.author}</p>}
                {tale.country && <p><strong>Country:</strong> {tale.country}</p>}
                {tale.year && <p><strong>Year:</strong> {tale.year}</p>}
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}