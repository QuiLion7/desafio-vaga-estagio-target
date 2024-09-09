"use client";

import {
  Monitor,
  Infinity,
  Hash,
  PlusCircle,
  Brain,
  ToggleLeft,
  MessagesSquare,
} from "lucide-react";

import { Link } from "react-scroll";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const navigationLinks = [
  { label: "Inicio", path: "home", icon: Monitor },
  { label: "Fibonacci", path: "fibonacci", icon: Infinity },
  { label: "Contagem", path: "contagem", icon: Hash },
  { label: "Soma", path: "soma", icon: PlusCircle },
  { label: "Lógica", path: "logica", icon: Brain },
  { label: "Interruptor", path: "interruptor", icon: ToggleLeft },
  { label: "Contato", path: "contact", icon: MessagesSquare },
];

const Nav = () => {
  return (
    <nav className="fixed bottom-2 z-50 flex w-full h-24 items-end justify-center overflow-hidden px-5 sm:px-2 lg:bottom-8">
      <div className="flex h-[50px] sm:h-[55px] w-full max-w-[380px] items-center justify-between rounded-full bg-primary p-2 text-2xl backdrop-blur-2xl">
        {navigationLinks.map((link, index) => (
          <TooltipProvider key={index} delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={link.path}
                  activeClass="bg-popover"
                  smooth={true}
                  spy={true}
                  className="group flex h-[45px] w-[45px] sm:h-[50px] sm:w-[50px] cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-secondary"
                >
                  <link.icon
                    size={0}
                    className="h-full p-3 w-full duration-300 group-hover:scale-[115%]"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="mb-1">
                <span className="text-xs">{link.label}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
