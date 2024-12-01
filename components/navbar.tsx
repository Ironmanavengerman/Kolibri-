import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Search } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl font-bold">
              Kolibri v1
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative mr-2">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Sök..."
                className="pl-8 bg-primary-foreground text-primary w-[200px] focus-visible:ring-primary"
              />
            </div>
            <Button
              variant="ghost"
              asChild
              className="hover:bg-transparent transition-transform duration-200 hover:scale-105"
            >
              <Link href="/dashboard">Översikt</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="hover:bg-transparent transition-transform duration-200 hover:scale-105"
            >
              <Link href="/my-associations">Mina Föreningar</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="hover:bg-transparent transition-transform duration-200 hover:scale-105"
            >
              <Link href="/arkiv">Arkiv</Link>
            </Button>
            <Button
              asChild
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link href="/new-deed">Ny inteckning</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <span>Gustav Sjöberg</span>
                  <User className="w-5 h-5 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="w-full">
                    Inställningar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/logout" className="w-full">
                    Logga ut
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
