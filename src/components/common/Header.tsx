'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Menu from "./Menu";
import Image from 'next/image';
import {IMenu} from '@/lib/types/imenu'
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState<IMenu[]>([]) ;
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);


  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);
  
    useEffect(() => {
    fetchMenus();
  }, []);

  async function fetchMenus() {
      setLoading(true);
      try {
        const res = await fetch("/api/menus");
        const data = await res.json();       
        if (data.success) {
          setMenu(data.data);
          setError(null);
        } else {
          setError("Không thể tải danh sách menu");
        }
      } catch {
        setError("Lỗi kết nối đến máy chủ");
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPast100vh = window.scrollY > window.innerHeight;
      setIsScrolled(scrolledPast100vh);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHome]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerClass = (!isHome || isMenuOpen || isScrolled)
    ? 'bg-white text-black shadow'
    : 'bg-transparent text-white';

  return (
    <header className={`lg:px-4 py-2 fixed w-full text-xs transition-all z-20 duration-300 ${headerClass}`}>
      <div className="container flex justify-between mx-auto">
        <div className="logo lg:w-[20%] w-full cursor-pointer">
          <Link href={'/'}>
              <Image
                src="/logo/saigon247_logo.png"
                alt="Logo"
                width={75}
                height={75}
              />
          </Link>
        </div>

        <div className="list_menu hidden w-full items-center lg:flex">
          <ul className="flex w-full gap-6 justify-center items-center">
            <li className="item font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </li>

            {menu && menu.map((item, idx) => {
                  return(
                    <li key={item.name || idx} className="item font-bold uppercase"><Link href={item.link}>{item.name}</Link></li>
                  )
            })}

            <li className="item font-bold cursor-pointer" onClick={toggleMenu}>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              )}
            </li>
          </ul>
        </div>

        <div className="contact lg:flex hidden items-center w-[28%] justify-end font-semibold">
          <div className="phone mr-3 cursor-pointer"><a href="tel:0489 21 21 21">0489 21 21 21</a></div>
          <div className="account font-semibold mr-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </div>
          <div className="button_contact px-4 py-2 rounded-xs bg-[#e7247a] text-white cursor-pointer transition-all">
            <a href="tel:0489 21 21 21">Liên hệ ngay</a>
          </div>
        </div>

        <div className="bar-menu lg:hidden flex items-center w-full justify-end">
          <div className="button_contact mr-3 px-4 py-2 rounded-xs bg-[#e7247a] text-white cursor-pointer transition-all">
            <a href="tel:0489 21 21 21">Liên hệ ngay</a>
          </div>
          <div className="font-semibold cursor-pointer" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Menu laptop */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-opacity-50 mt-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          onClick={toggleMenu}
        >
          <Menu isOpen={isMenuOpen} />
        </motion.div>
      )}
    </header>
  );
}
