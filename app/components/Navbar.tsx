import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Settings,
  Menu,
  BookOpen,
  LayoutDashboard,
  Users,
  Calendar,
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b bg-background py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link href="/dashboard" className="font-semibold text-lg">
            DHBW Vorlesungsplanung
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/dashboard"
              className="flex items-center gap-1"
            >
              <LayoutDashboard className="h-4 w-4" />
              📊 Dashboard
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/studiengaenge"
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              📚 Studiengänge
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/planning"
              className="flex items-center gap-1"
            >
              <Calendar className="h-4 w-4" />
              📅 Quartale
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/lecturers"
              className="flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              👥 Dozierende
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/settings"
              className="flex items-center gap-1"
            >
              <Settings className="h-4 w-4" />
              ⚙️ Admin
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
                  href="/dashboard"
                  className="flex items-center gap-2 w-full"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  📊 Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/studiengaenge"
                  className="flex items-center gap-2 w-full"
                >
                  <BookOpen className="h-4 w-4" />
                  📚 Studiengänge
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/planning"
                  className="flex items-center gap-2 w-full"
                >
                  <Calendar className="h-4 w-4" />
                  📅 Quartale
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/lecturers"
                  className="flex items-center gap-2 w-full"
                >
                  <Users className="h-4 w-4" />
                  👥 Dozierende
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 w-full"
                >
                  <Settings className="h-4 w-4" />
                  ⚙️ Admin
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
