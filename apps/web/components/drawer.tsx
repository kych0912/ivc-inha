import React from 'react';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
const navigationItems = [
  { text: 'Media', href: '/media' },
  { text: 'Contact', href: '/contact' },
  { text: 'Recruit', href: '/recruit' }
];

export default function DrawerMenu() {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="">
          <AiOutlineMenu style={{ width: '2rem', height: '2rem' }} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="backdrop-blur-xl bg-black/20 shadow-none border-none">
        <VisuallyHidden asChild>
          <SheetTitle className="absolute w-1px h-1px p-0 overflow-hidden clip-rect-0 border-0">
            Navigation Menu
          </SheetTitle>
        </VisuallyHidden>
        <nav>
          <ul className="">
            {navigationItems.map((item) => (
              <li key={item.text}>
                <SheetTrigger asChild>
                  <Link 
                    href={item.href}
                    className="block w-full py-2 px-4 text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    <span className="text-2xl font-bold font-['SUIT_Variable']">
                      {item.text}
                    </span>
                  </Link>
                </SheetTrigger>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}