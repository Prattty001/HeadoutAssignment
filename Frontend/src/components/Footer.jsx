import { Globe, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 px-4 text-center text-gray-500 text-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Globe className="h-4 w-4" />
        <span>Globetrotter</span>
        <Heart className="h-4 w-4 text-coral" />
      </div>
      <p>Test your geographical knowledge with fun clues and facts</p>
    </footer>
  );
};

export default Footer;
