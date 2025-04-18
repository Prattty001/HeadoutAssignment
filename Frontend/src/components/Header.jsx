import { Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <Globe className="w-8 h-8 text-teal-dark" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-dark via-purple to-coral-dark text-transparent bg-clip-text">
          Globetrotter
        </h1>
      </div>
      <div className="text-sm text-gray-500">Test your world knowledge!</div>
    </header>
  );
};

export default Header;
