'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems, socialLinks } from '@/constants/constant'

export default function Footer () {
  const pathname = usePathname();
  return (
    <div className="p-4 text-center ">
      <div className="flex sm:flex-row flex-col justify-between items-center sm:px-50 py-5 gap-10">
        <nav>
          <ul className="flex gap-4">
            {navItems.map((item) => (
              <li key={item.label}>
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
        </nav>
        <div className="flex ">
          <ul className="flex gap-4">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} target="_blank">
                  <link.icon
                    className="font-bold"
                    size={20}
                    color={link.color}
                    strokeWidth={2}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-sm text-gray-500 py-5 dark:text-gray-300">
        &copy; Alrights Reserved{' '}
        {new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
          new Date()
        )}{' '}
        Created By Mihreteab
      </p>
    </div>
  );
}