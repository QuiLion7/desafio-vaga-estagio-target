import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="fixed z-50 top-0 flex h-[50px] w-full items-center justify-between px-4 bg-popover shadow-xl">
      <h1 className="bg-gradient-to-r from-red-900 via-red-600 to-red-600 bg-clip-text text-sm font-bold text-transparent md:text-base lg:text-lg uppercase">
        Target Sistemas
      </h1>
      <ModeToggle />
    </header>
  );
}
