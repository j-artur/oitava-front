"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  HiArrowRightStartOnRectangle,
  HiBars3,
  HiOutlineCalendarDays,
  HiOutlineCog8Tooth,
  HiOutlineHome,
  HiOutlineIdentification,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiXMark,
} from "react-icons/hi2";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

export const Sidenav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const lg = screenWidth >= 1024;

  useEffect(() => {
    const eventListener = (e: UIEvent) => {
      setScreenWidth(window.innerWidth);
    };

    document.addEventListener("resize", eventListener);

    return () => {
      document.removeEventListener("resize", eventListener);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 flex h-full shrink-0 flex-col overflow-hidden border-r border-border-dark bg-bg-white transition-[width]",
        {
          "w-0 lg:w-16": !isOpen,
          "w-full lg:w-80": isOpen,
        },
      )}
      onMouseEnter={() => lg && setIsOpen(true)}
      onMouseLeave={() => lg && setIsOpen(false)}
    >
      <div className="fixed z-50 flex h-20 w-20 items-center justify-center lg:hidden">
        {isOpen ? (
          <Button
            variant="ghost"
            size="nav"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full bg-bg-white hover:bg-bg-hover"
          >
            <HiXMark size={24} className="text-primary-dark" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="nav"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full bg-primary-normal hover:bg-primary-dark"
          >
            <HiBars3 size={24} className="text-white" />
          </Button>
        )}
      </div>
      <div className="grow flex-col border-b border-border-dark">
        <div className="flex h-40 shrink-0 items-center justify-center">
          {isOpen ? (
            <Image src="/logo.png" width={180} height={60} alt="Oitava Rosado" />
          ) : (
            <Image src="/logo-image.png" width={60} height={60} alt="Oitava Rosado" />
          )}
        </div>
        <ul className="grow">
          <NavItem href="/home" icon={HiOutlineHome} isOpen={isOpen} setIsOpen={setIsOpen}>
            Início
          </NavItem>
          <NavItem href="/users" icon={HiOutlineUserGroup} isOpen={isOpen} setIsOpen={setIsOpen}>
            Usuários
          </NavItem>
          <NavItem href="/doctors" icon={HiOutlineUserCircle} isOpen={isOpen} setIsOpen={setIsOpen}>
            Médicos
          </NavItem>
          <NavItem
            href="/patients"
            icon={HiOutlineIdentification}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            Pacientes
          </NavItem>
          <NavItem
            href="/appointments"
            icon={HiOutlineCalendarDays}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            Agendamentos
          </NavItem>
        </ul>
      </div>
      <div className="flex flex-col pb-20">
        <NavItem href="/settings" icon={HiOutlineCog8Tooth} isOpen={isOpen} setIsOpen={setIsOpen}>
          Configurações
        </NavItem>
        <NavItem
          href="/logout"
          icon={HiArrowRightStartOnRectangle}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          Sair
        </NavItem>
      </div>
    </div>
  );
};

type NavItemProps = {
  href: string;
  icon: IconType;
  children: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const NavItem: FC<NavItemProps> = props => {
  const pathname = usePathname();

  return (
    <Link href={props.href} className="flex" onClick={() => props.setIsOpen(false)}>
      <li
        className={cn(
          "flex h-12 flex-1 items-center gap-2 border-r-2 border-t border-transparent px-6 text-text-secondary",
          "hover:bg-bg-hover",
          {
            "border-r-primary-light border-t-border-light bg-bg-active font-semibold text-primary-normal":
              pathname === props.href,
          },
        )}
      >
        <props.icon size={20} className="shrink-0" />
        <p
          className={cn("overflow-hidden transition-[width]", {
            "w-full": props.isOpen,
            "w-0": !props.isOpen,
          })}
        >
          {props.children}
        </p>
      </li>
    </Link>
  );
};
