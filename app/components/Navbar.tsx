import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  Settings,
  TestTube,
  Menu,
  BookOpen,
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b bg-background py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link href="/" className="font-semibold text-lg">
            MyApp
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dozierende" className="flex items-center gap-1">
              <TestTube className="h-4 w-4" />
              Dozierende
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/vorlesungen" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Vorlesungen
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/kurse" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Kurse
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/planung" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Planung
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/studiengaenge"
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              Studiengänge
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/settings"
              className="flex items-center gap-1"
            >
              <Settings className="h-4 w-4" />
              Einstellungen
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href="/"
                  className="flex items-center gap-2 w-full"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dozierende"
                  className="flex items-center gap-2 w-full"
                >
                  <TestTube className="h-4 w-4" />
                  Dozierende
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/vorlesungen"
                  className="flex items-center gap-2 w-full"
                >
                  <BookOpen className="h-4 w-4" />
                  Vorlesungen
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/kurse"
                  className="flex items-center gap-2 w-full"
                >
                  <BookOpen className="h-4 w-4" />
                  Kurse
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/planung"
                  className="flex items-center gap-2 w-full"
                >
                  <BookOpen className="h-4 w-4" />
                  Planung
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/studiengaenge"
                  className="flex items-center gap-2 w-full"
                >
                  <BookOpen className="h-4 w-4" />
                  Studiengänge
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 w-full"
                >
                  <Settings className="h-4 w-4" />
                  Einstellungen
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
