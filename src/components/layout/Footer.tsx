import React from 'react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Contact Support', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ];

  return (
    <footer 
      className="w-full py-6 px-4 sm:px-6 lg:px-8 
                 bg-black/60 backdrop-filter backdrop-blur-lg 
                 border-t border-gray-700/50 
                 text-gray-400"
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
        <p className="text-xs sm:text-sm">
          &copy; {currentYear} LuxeDash. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm hover:text-gray-100 transition-colors duration-200"
                  aria-label={link.name}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;