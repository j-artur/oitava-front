"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import {
  HiArrowRightStartOnRectangle,
  HiOutlineCalendarDays,
  HiOutlineCog8Tooth,
  HiOutlineHome,
  HiOutlineIdentification,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { cn } from "~/lib/utils";

export const Sidenav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-50 flex h-full shrink-0 flex-col overflow-hidden border-r border-border-dark bg-bg-white transition-[width]",
        {
          "w-16": !isOpen,
          "w-80": isOpen,
        },
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="grow flex-col border-b border-border-dark">
        <div className="flex h-40 shrink-0 items-center justify-center">
          {isOpen ? (
            <Image src="/logo.png" width={180} height={60} alt="Oitava Rosado" />
          ) : (
            <Image src="/logo-image.png" width={60} height={60} alt="Oitava Rosado" />
          )}
        </div>
        <ul className="grow">
          <NavItem href="/" icon={HiOutlineHome} isOpen={isOpen}>
            Início
          </NavItem>
          <NavItem href="/users" icon={HiOutlineUserGroup} isOpen={isOpen}>
            Usuários
          </NavItem>
          <NavItem href="/doctors" icon={HiOutlineUserCircle} isOpen={isOpen}>
            Médicos
          </NavItem>
          <NavItem href="/patients" icon={HiOutlineIdentification} isOpen={isOpen}>
            Pacientes
          </NavItem>
          <NavItem href="/appointments" icon={HiOutlineCalendarDays} isOpen={isOpen}>
            Agendamentos
          </NavItem>
        </ul>
      </div>
      <div className="flex flex-col pb-20">
        <NavItem href="/settings" icon={HiOutlineCog8Tooth} isOpen={isOpen}>
          Configurações
        </NavItem>
        <NavItem href="/logout" icon={HiArrowRightStartOnRectangle} isOpen={isOpen}>
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
};

const NavItem: FC<NavItemProps> = props => {
  const pathname = usePathname();

  return (
    <a href={props.href} className="flex">
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
    </a>
  );
};
