'use client'

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardItems } from '@/constants/constant';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { DialogTitle } from '../ui/dialog';

const SideMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] =useState(false);
  return (
    <div className="sm:w-1/6 w-1/12 h-[75vh] flex flex-col gap-4 pl-5 sm:pt-10 dark:text-white dark:bg-gray-950 ">
      <Command className="hidden md:block dark:bg-gray-950">
        <CommandList>
          <CommandGroup heading="Dashboard Menu">
            {dashboardItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={
                  pathname === item.href
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : ''
                }
              >
                <CommandItem>
                  <item.icon
                    className="mr-2 h-4 w-4"
                    size={item.size}
                    color={item.color}
                    strokeWidth={item.strokeWidth}
                  />
                  {item.name}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden flex justify-center items-center">
          <Menu className="w-10 h-10" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <DialogTitle className="text-2xl px-4 py-4">Menu</DialogTitle>
          <ul className="space-y-2 mt-2">
            {dashboardItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 ${
                    pathname === item.href
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : ''
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    className="mr-2 h-4 w-4"
                    size={item.size}
                    color={item.color}
                    strokeWidth={item.strokeWidth}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideMenu