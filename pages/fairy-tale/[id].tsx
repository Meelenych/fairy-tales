import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FairyTalesController } from '../../controllers/fairyTales';
import type { FairyTale } from '../../types/fairyTale';
import Header from '../../components/Header';

interface Props {
  tale: FairyTale | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const tale = await FairyTalesController.getById(parseInt(id, 10));

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
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Fairy Tale Not Found</h1>
            <Link href="/list" className="text-blue-600 hover:underline">Back to List</Link>
          </div>
        </div>
      </div>
    );
  }

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
        <p className="text-lg leading-relaxed whitespace-pre-line mt-4">{tale.content}</p>
        <div className="mt-8">
          <Link href="/list" className="text-blue-600 hover:underline">Back to List</Link>
        </div>
        </div>
      </div>
    </div>
  );
}