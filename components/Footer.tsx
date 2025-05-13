'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems, socialLinks } from '@/constants/constant'

export default function Footer () {
  const pathname = usePathname();
  return (
    <div className=" p-6 md:p-10 text-center">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-10">
        <nav>
          <ul className="flex flex-wrap gap-5 text-sm sm:text-base font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 dark:text-gray-200'
                  } hover:text-blue-600 transition-all duration-200`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ul className="flex gap-5">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon
                    className="hover:scale-110 transition-transform duration-200"
                    size={22}
                    color={link.color}
                    strokeWidth={2}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        &copy;{' '}
        {new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
          new Date()
        )}{' '}
        — Created by{' '}
        <span className="font-semibold text-blue-600">Mihreteab</span>. All
        rights reserved.
      </p>
    </div>
  );
}