import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import CreateRepoModal from "../components/Modal/CreateRepoModal";
import { Menu, X } from "lucide-react";

function LayoutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navList = (
    <>
      <Link to="/" className="hover:text-gray-300">
        Repositories
      </Link>
      <Link to="/error-test" className="hover:text-gray-300">
        Error Test
      </Link>
      <Link to="/nonexistent-page" className="hover:text-gray-300">
        404 Test
      </Link>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-md"
        aria-label="Create new repository"
      >
        Create Repo
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300">
            GitHub Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">{navList}</nav>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 px-2">
            <nav className="flex flex-col gap-4">{navList}</nav>
          </div>
        )}
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>GitHub Portfolio App - Built with React</p>
        </div>
      </footer>

      {isModalOpen && <CreateRepoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default LayoutPage;
