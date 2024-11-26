'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Phone, ScanEye, TableOfContents, MailOpen } from 'lucide-react';

const MobileMenu = () => {
  const pathname = usePathname();

  const menuItems = [
      { icon: TableOfContents, label: 'Services', href: '/services' },
      { icon: Phone, label: 'Contact', href: 'tel:+91 95920 00818' },
      { icon: Home, label: 'Home', href: '/' },
    { icon: MailOpen, label: 'Email', href: 'mailto:info@giftechies.com' },
    { icon: ScanEye, label: 'Portfolio', href: '/portfolio' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
      <div className="flex h-16 items-center justify-around  bg-primary shadow-inner backdrop-blur-lg">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center space-y-1 p-2 transition-all ${
                active
                  ? 'gradient-color-text'
                  : 'text-secondary'
              }`}
            >
              <Icon size={18} className={`transition-all ${active ? 'scale-110 text-red-400 ' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;