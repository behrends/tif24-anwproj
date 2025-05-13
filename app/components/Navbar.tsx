import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link
            href="/test"
            className="text-gray-300 hover:text-white"
          >
            Test
          </Link>
          <Link
            href="/settings"
            className="text-gray-300 hover:text-white"
          >
            Einstellungen
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
