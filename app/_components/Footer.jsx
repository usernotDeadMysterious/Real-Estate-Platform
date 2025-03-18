import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold">Pakistan Real Estates</h2>
            <p className="text-gray-400 mt-2">Find your dream home with ease.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              {/* <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li> */}
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/for-sale" className="text-gray-400 hover:text-white transition">
                  For Sale
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-gray-400 hover:text-white transition">
                  For Rent
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-gray-400 mt-2">Email: pak-real-estate-92@gmail.com</p>
            <p className="text-gray-400">Phone: +92316-9694343</p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Pakistan Real Estate. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
