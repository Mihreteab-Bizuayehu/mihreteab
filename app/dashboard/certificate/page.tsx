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
import { deleteCertificate, getCertificates } from '@/app/actions/certificate';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CertificateTypes } from '@/types/DataType';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';

export default function Certificates() {
  const [certificates, setCertificates] = useState<CertificateTypes[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCertificates() {
      const response = await getCertificates();
      if ('error' in response) {
        toast.error(`Failed to load certificates: ${response.error}`);
        setCertificates([]);
      } else {
        setCertificates(response);
      }
    }

    fetchCertificates();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/dashboard/certificate/create?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this certificate?'
    );
    if (!confirmDelete) return;

    try {
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));

      const deleted = await deleteCertificate(id.toString());

      if (!deleted) {
        throw new Error('Something went wrong during deletion.');
      }

      toast.success('Certificate deleted successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(`Delete failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Certificates
          </h1>
          <Link
            href="/dashboard/certificate/create"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Create Certificate
          </Link>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400 p-4 text-center">
              A list of my recent certificates.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700 hover:bg-transparent">
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  ID
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
                {certificates.length > 0 ? (
                  certificates.map((certificate) => (
                    <TableRow
                      key={certificate.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
                    >
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        {certificate.id}
                      </TableCell>
                      <TableCell>
                        <Image
                          src={certificate.imageUrl}
                          alt={certificate.title}
                          width={50}
                          height={50}
                          className="object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">
                        {certificate.title}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 max-w-[500px] truncate">
                        {truncateWords(certificate.description, 5)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={() => handleEdit(certificate.id)}
                            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 uppercase"
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => handleDelete(certificate.id)}
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
                    <TableCell colSpan={5} className="py-10 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <p className="text-gray-500 dark:text-gray-400">
                          No certificates found
                        </p>
                        <Link
                          href="/dashboard/certificate/create"
                          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                          Create New Certificate
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
