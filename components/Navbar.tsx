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
    <header>
      <nav className="flex justify-between items-center p-3 md:px-20 md:py-5">
        <Link href="/">
          <h1 className="font-extrabold text-2xl md:text-3xl">
            Mera<span className="text-blue-500">Bizu</span>
          </h1>
        </Link>
        <div className="flex items-center md:gap-10">
          <ul className="hidden md:flex space-x-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : ''
                  } hover:text-blue-500 hover:border-b-2 hover:border-blue-500`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className=" hidden md:flex items-center gap-5">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              {role === 'marketing_admin' ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`${
                      pathname === '/dashboard'
                        ? 'text-blue-500 border-b-2 border-blue-500'
                        : ''
                    } hover:text-blue-500 hover:border-b-2 hover:border-blue-500`}
                  >
                    Dashboard
                  </Link>
                  <UserButton />
                </>
              ) : (
                <UserButton />
              )}
            </SignedIn>
          </div>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <DialogTitle className="text-2xl px-4 py-2">Menu</DialogTitle>
            <ul className="space-y-2 mt-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 ${
                      pathname === item.href
                        ? 'text-blue-500 border-b-2 border-blue-500'
                        : ''
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <div className="flex flex-col px-4">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  {role === 'marketing_admin' ? (
                    <>
                      <Link
                        href="/dashboard"
                        className={`${
                          pathname === '/dashboard'
                            ? 'text-blue-500 border-b-2 border-blue-500'
                            : ''
                        } hover:text-blue-500 hover:border-b-2 hover:border-blue-500 pb-4`}
                      >
                        Dashboard
                      </Link>
                      <UserButton />
                    </>
                  ) : (
                    <UserButton />
                  )}
                </SignedIn>
              </div>
            </ul>
          </SheetContent>
        </Sheet>
        <ModeToggle/>
      </nav>
    </header>
  );
}