import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FairyTalesController } from '../controllers/fairyTales';
import type { FairyTale } from '../types/fairyTale';
import Header from '../components/Header';

interface Props {
  tale: FairyTale;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tales = await FairyTalesController.getAll();
  const randomTale = tales[Math.floor(Math.random() * tales.length)];

  return {
    props: {
      tale: randomTale,
    },
  };
};

export default function Random({ tale }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{tale.title}</h1>
        <div className="text-gray-600 mb-6 text-sm space-y-1">
          {tale.author && <p><strong>Author:</strong> {tale.author}</p>}
          {tale.country && <p><strong>Country:</strong> {tale.country}</p>}
          {tale.year && <p><strong>Year:</strong> {tale.year}</p>}
        </div>
        <p className="text-lg leading-relaxed whitespace-pre-line">{tale.content}</p>
        </div>
      </div>
    </div>
  );
}