'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { DialogTitle } from '@radix-ui/react-dialog';
import { navItems } from '@/constants/constant';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { ModeToggle } from './mode_toggler/ModeToggler';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useUser();
  
  if(!isLoaded) {
    return null;
  }
  const role = user?.publicMetadata.role;
  return (
    <header className="border-b">
      <nav className="flex justify-between items-center p-4 md:px-20 md:py-5">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="font-extrabold text-2xl md:text-3xl">
            Mera<span className="text-blue-500">Bizu</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6 md:gap-10">
          <ul className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-1 py-2 transition-colors text-base md:text-lg ${
                    pathname === item.href
                      ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-5 text-base md:text-lg">
            <SignedOut>
              <SignInButton/>
            </SignedOut>
            <SignedIn>
              {role === 'marketing_admin' && (
                <Link
                  href="/dashboard"
                  className={`px-1 py-2 transition-colors ${
                    pathname === '/dashboard'
                      ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <UserButton />
            </SignedIn>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[300px]">
              <div className="flex flex-col h-auto px-6">
                <DialogTitle className="text-xl font-bold px-2 py-4 border-b">
                  Menu
                </DialogTitle>

                <ul className="flex-1 py-4 space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-md transition-colors ${
                          pathname === item.href
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-4 px-4 space-y-4">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    {role === 'marketing_admin' && (
                      <Link
                        href="/dashboard"
                        className={`block py-3 rounded-md transition-colors ${
                          pathname === '/dashboard'
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <div className="px-4 py-2">
                      <UserButton />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}