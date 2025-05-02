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
    <div className="sm:w-1/6 w-16 h-[75vh] flex flex-col gap-6 pl-4 sm:pl-6 sm:pt-8 dark:text-white dark:bg-gray-900 bg-white shadow-lg border-r border-gray-200 dark:border-gray-800">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden flex justify-center items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 px-0 bg-white dark:bg-gray-900"
        >
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
            <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Menu
            </DialogTitle>
          </div>
          <ul className="space-y-1 mt-2">
            {dashboardItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    size={item.size}
                    color={item.color}
                    strokeWidth={item.strokeWidth}
                    className={`mr-3 h-5 w-5 ${
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400'
                        : `${item.color}`
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>

      <Command className="hidden md:block rounded-lg overflow-hidden dark:bg-gray-900">
        <CommandList>
          <CommandGroup
            heading={
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Dashboard Menu
              </div>
            }
          >
            {dashboardItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={`block transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <CommandItem className="flex items-center px-4 py-3">
                  <item.icon
                    size={item.size}
                    color={item.color}
                    strokeWidth={item.strokeWidth}
                    className={`mr-3 h-5 w-5 ${
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400'
                        : `${item.color}`
                    }`}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default SideMenu