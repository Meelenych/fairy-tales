import { GetServerSideProps } from 'next';
import Link from 'next/link';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

interface FairyTale {
  id: number;
  title: string;
  content: string;
}

interface Props {
  tales: FairyTale[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await open({
    filename: './fairy-tales.db',
    driver: sqlite3.Database,
  });

  const tales = await db.all<FairyTale[]>('SELECT * FROM fairy_tales');

  await db.close();

  return {
    props: {
      tales,
    },
  };
};

export default function List({ tales }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">All Fairy Tales</h1>
        <ul className="space-y-4">
          {tales.map((tale) => (
            <li key={tale.id} className="bg-white p-4 rounded-lg shadow">
              <Link href={`/fairy-tale/${tale.id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                {tale.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}