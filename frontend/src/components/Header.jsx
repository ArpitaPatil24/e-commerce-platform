const Header = () => {
    return (
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="logo" className="h-18 w-18" />
            <h1 className="text-2xl font-bold text-blue-600">Furni<span className="text-gray-800">Store</span></h1>
          </div>
          <nav className="space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
          </nav>
        </div>
      </header>
    );
  };  
  
  export default Header;
  