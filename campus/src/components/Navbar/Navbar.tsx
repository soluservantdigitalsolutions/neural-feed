const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <button className="text-gray-500 focus:outline-none lg:hidden">
        <svg
          className="h-6 w-6 fill-current "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
          <path d="M4 6h16M4 12h16M4 18h16" />
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="text-center">
        <img
          src="/path/to/logo.png"
          alt="NeuralFeed Campus Logo"
          className="mx-auto h-12 w-auto"
        />
      </div>
      <div className="text-right">
        <a
          href="#join"
          className="inline-block text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          Join
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
