'use client';

import Link from 'next/link';
import { useState, use } from 'react';
import { Button } from '@/components/ui/button';
import { CircleIcon, Home, LogOut, Settings, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { signOut } from 'next-auth/react';
import { useUser } from '@/lib/auth/userContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { userPromise } = useUser();
  const user = use(userPromise);

  async function handleSignOut() {
    await signOut({callbackUrl: '/'});
  }

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href={`/`} className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-foreground">ACME</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer size-9">
                  <AvatarImage alt={user.name || ''} />
                  <AvatarFallback>
                    {user.email!
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href={`/dashboard`} className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>대시보드</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-foreground hover:bg-accent-foreground/90 text-background text-sm px-4 py-2 rounded-full"
            >
              <Link href={`/sign-up`}>회원가입</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {isSettingsOpen && (
        <div onClick={() => setIsSettingsOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div onClick={(e)=>e.stopPropagation()} className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">설정</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSettingsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}