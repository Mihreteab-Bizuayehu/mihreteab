'use client';

import { Button, buttonVariants } from '@/components/ui/button';
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
    <div className="bg-gray-50 flex flex-col gap-4 p-4 dark:bg-gray-950 dark:text-white">
      <div className="flex p-4 mx-5 items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolios</h1>
        <Link
          href={'/dashboard/portfolio/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create
        </Link>
      </div>
      <section className="flex flex-col gap-y-10 px-3 sm:p-5 ">
        <Table>
          <TableCaption>A list of my recent portfolios.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-800 ">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<Loading />}>
            <TableBody>
              {portfolios.length > 0 ? (
                portfolios.map((portfolio) => (
                  <TableRow key={portfolio.id}>
                    <TableCell className="font-medium">
                      {portfolio.id}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={portfolio.imageUrl}
                        alt={portfolio.title}
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell>{portfolio.title}</TableCell>
                    <TableCell className="w-[500px]">
                      {truncateWords(portfolio.description, 5)}
                    </TableCell>
                    <TableCell className="w-[500px]">
                      <div className="flex items-center gap-4">
                        <Button
                          variant={'secondary'}
                          className="uppercase"
                          onClick={() => handleEdit(portfolio.id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant={'destructive'}
                          className="uppercase"
                          onClick={() => handleDelete(portfolio.id)}
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
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        No portfolios found
                      </p>
                      <Link
                        href="/dashboard/portfolio/create"
                        className={buttonVariants({
                          variant: 'default',
                          size: 'sm',
                        })}
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
  );
}
