import Link from 'next/link';
import { DrawerMenu } from '@ivc-inha/ui';
import { AiOutlineMail } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';

import { RiKakaoTalkFill } from 'react-icons/ri';
function Copyright() {
    return (
      <p className="text-sm text-gray-500">
        {'Copyright © '}
        <Link className="text-inherit" href="/">
          IVC
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </p>
    );
  }
  

function Footer(){
    return(
    <footer className="flex w-full justify-between py-4 px-4 mt-auto bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto max-w-sm">
          <p className="text-base">
            Inha Venture Club
          </p>
          <Copyright />
        </div>
  
        <div className="container gap-4 mx-auto max-w-sm flex justify-end items-center px-0">
          <a className="text-inherit" href="https://www.instagram.com/ivc_inha/?hl=ko">
            <BsInstagram size={27} className="logo" />
          </a>
          <a className="text-inherit">
            <RiKakaoTalkFill size={27} className="logo" />
          </a>
          <a className="text-inherit" href="mailto:inha.venture.club@gmail.com">
            <AiOutlineMail size={27} className="logo" />
          </a>
        </div>
      </footer>
    )
}

export default function LandingLayout({children}: {children: React.ReactNode}) {
    return (
    <>
        <header className="flex-grow text-white">
        <div className="fixed w-full backdrop-blur-3xl bg-black/20 shadow-none">
            <div className="flex items-center h-[70px] px-4">
            <Link href="/" className="no-underline text-white">
                <h1 className="hidden sm:block pr-5 text-2xl font-bold font-['SUIT_Variable'] text-white">
                Inha Venture Club
                </h1>
            </Link>
            <Link href="/" className="no-underline text-white">
                <h1 className="block sm:hidden pr-5 text-2xl font-bold font-['SUIT_Variable'] text-white">
                IVC
                </h1>
            </Link>

            <div className="flex-grow"></div>
            
            <div className="hidden md:flex">
                <Link href="/media" className="no-underline text-white">
                <h1 className="pr-5 text-2xl font-bold font-['SUIT_Variable'] text-white">
                    Media
                </h1>
                </Link>
                <Link href="/contact" className="no-underline text-white">
                <h1 className="pr-5 text-2xl font-bold font-['SUIT_Variable'] text-white">
                    Contact
                </h1>
                </Link>
                <Link href="/recruit" className="no-underline text-white">
                <h1 className="pr-5 text-2xl font-bold font-['SUIT_Variable'] text-white">
                    Recruit
                </h1>
                </Link>
            </div>
            
            <div className="flex md:hidden">
                <DrawerMenu />
            </div>
            </div>
        </div>
        </header>
        <div className="bg-[#1b1b1b] w-full">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            {children}
            </div>
        </div>
        <Footer />
    </>
  );
}