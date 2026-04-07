import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

interface FairyTale {
  id: number;
  title: string;
  content: string;
}

interface Props {
  tale: FairyTale | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const db = await open({
    filename: './fairy-tales.db',
    driver: sqlite3.Database,
  });

  const tale = await db.get<FairyTale>('SELECT * FROM fairy_tales WHERE id = ?', id);

  await db.close();

  return {
    props: {
      tale,
    },
  };
};

export default function FairyTale({ tale }: Props) {
  const router = useRouter();

  if (!tale) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Fairy Tale Not Found</h1>
          <Link href="/list" className="text-blue-600 hover:underline">Back to List</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{tale.title}</h1>
        <p className="text-lg leading-relaxed whitespace-pre-line mt-4">{tale.content}</p>
        <div className="mt-8 space-x-4">
          <Link href="/list" className="text-blue-600 hover:underline">Back to List</Link>
          <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}