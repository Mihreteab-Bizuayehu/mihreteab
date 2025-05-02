'use client';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { truncateWords } from '@/constants/constant';
import { Suspense, useEffect, useState } from 'react';
import { deletePortfolio, getPortfolios } from '@/app/actions/portfolio';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PortfolioTypes } from '@/types/DataType';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState<PortfolioTypes[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPortfolios() {
      const data = await getPortfolios();
      if ('error' in data) {
        setPortfolios;
      } else {
        setPortfolios(data);
      }
    }
    fetchPortfolios();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/dashboard/portfolio/create?id=${id}`);
  };
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this portfolio?'
    );
    if (!confirmDelete) return;

    try {
      setPortfolios((prev) => prev.filter((portfolio) => portfolio.id !== id));
      const deleted = await deletePortfolio(id.toString());
      if (!deleted) {
        throw new Error('Something went wrong during deletion.');
      }
      toast.success('Portfolio deleted successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(`Delete failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Portfolios
          </h1>
          <Link
            href="/dashboard/portfolio/create"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Create
          </Link>
        </header>

        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400 p-4 text-center">
              A list of my recent portfolios.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-transparent">
                <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                  Id
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Image
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <Suspense fallback={<Loading />}>
              <TableBody>
                {portfolios.length > 0 ? (
                  portfolios.map((portfolio) => (
                    <TableRow
                      key={portfolio.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                    >
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {portfolio.id}
                      </TableCell>
                      <TableCell>
                        <Image
                          src={portfolio.imageUrl}
                          alt={portfolio.title}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">
                        {portfolio.title}
                      </TableCell>
                      <TableCell className="max-w-[500px] truncate text-gray-600 dark:text-gray-300">
                        {truncateWords(portfolio.description, 5)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => handleEdit(portfolio.id)}
                            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 uppercase"
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => handleDelete(portfolio.id)}
                            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/40 uppercase"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <p className="text-gray-500 dark:text-gray-400">
                          No portfolios found
                        </p>
                        <Link
                          href="/dashboard/portfolio/create"
                          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                          Create New Portfolio
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Suspense>
          </Table>
        </section>
      </div>
    </div>
  );
}
