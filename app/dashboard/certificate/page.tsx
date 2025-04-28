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
import { deleteCertificate, getCertificates } from '@/app/actions/certificate';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CertificateTypes } from '@/types/DataType';
import Loading from '@/components/loading';

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
    <div className="bg-gray-50 flex flex-col gap-4 p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex p-4 mx-5 items-center justify-between">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <Link
          href="/dashboard/certificate/create"
          className={buttonVariants({ variant: 'default' })}
        >
          Create
        </Link>
      </div>

      <section className="flex flex-col gap-y-10 px-3 sm:p-5">
        <Table>
          <TableCaption>A list of my recent certificates.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-800">
              <TableHead>Id</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<Loading />}>
            <TableBody>
              {certificates.length > 0 ? (
                certificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell>{certificate.id}</TableCell>
                    <TableCell>
                      <Image
                        src={certificate.imageUrl}
                        alt={certificate.title}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell>{certificate.title}</TableCell>
                    <TableCell className="w-[500px]">
                      {truncateWords(certificate.description, 5)}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <div className="flex items-center gap-4">
                        <Button
                          variant={'secondary'}
                          className="uppercase"
                          onClick={() => handleEdit(certificate.id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant={'destructive'}
                          className="uppercase"
                          onClick={() => handleDelete(certificate.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        No certificates found
                      </p>
                      <Link
                        href="/dashboard/certificate/create"
                        className={buttonVariants({
                          variant: 'default',
                          size: 'sm',
                        })}
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
  );
}
