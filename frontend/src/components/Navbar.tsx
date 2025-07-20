
import React from "react";
import { Button } from "./ui/button";
import { Atom, HomeIcon, NotepadText, UsersRound } from "lucide-react";
import ModeToggle from "./ModeToggle";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between ">
          {/*Logo */}
          <div className="flex items-center space-x-2">
            <Atom className="h-6 w-6 text-primary" />
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              Projeto Stefanini
            </Link>
          </div>
          {/*navbar components*/}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/membros">
              
                <UsersRound className="h-5 w-5" />
                <span className="hidden md:inline">Membros</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/posts">
              
                <NotepadText className="h-5 w-5" />
                <span className="hidden md:inline">Postagens</span>
              </Link>
            </Button>
          
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="h-5 w-5" />
                <span className="hidden md:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle/>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
