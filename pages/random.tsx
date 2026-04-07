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
  tale: FairyTale;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await open({
    filename: './fairy-tales.db',
    driver: sqlite3.Database,
  });

  const tales = await db.all<FairyTale[]>('SELECT * FROM fairy_tales');
  const randomTale = tales[Math.floor(Math.random() * tales.length)];

  await db.close();

  return {
    props: {
      tale: randomTale,
    },
  };
};

export default function Random({ tale }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{tale.title}</h1>
        <p className="text-lg leading-relaxed whitespace-pre-line">{tale.content}</p>
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}