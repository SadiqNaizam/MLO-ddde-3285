import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Utensils } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  console.log('Header loaded');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 
                    bg-slate-900/75 backdrop-blur-lg 
                    border-b border-slate-300/20 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-300"
          aria-label="DeluxeEats Home"
        >
          <Utensils className="h-7 w-7 text-purple-400" />
          <span className="text-xl sm:text-2xl font-semibold tracking-tight">DeluxeEats</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-2 sm:px-4">
          <div className="relative w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md">
            <Search className="absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-full 
                         text-sm sm:text-base
                         bg-slate-800/60 border border-slate-700/70 
                         placeholder-slate-500 text-slate-200
                         focus:bg-slate-700/80 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 
                         transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="relative text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-full transition-colors duration-300"
          >
            <Link to="/cart-checkout" aria-label={`View Cart, ${cartItemCount} items`}>
              <ShoppingCart className="h-[20px] w-[20px] sm:h-[22px] sm:w-[22px]" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 sm:h-[18px] sm:w-[18px] items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white transform translate-x-1/3 -translate-y-1/3 ring-2 ring-slate-900/75">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-full transition-colors duration-300"
          >
            <Link to="/user-profile" aria-label="User Profile">
              <User className="h-[20px] w-[20px] sm:h-[22px] sm:w-[22px]" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;