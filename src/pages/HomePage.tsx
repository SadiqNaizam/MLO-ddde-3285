import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SlidersHorizontal, Utensils, Star } from 'lucide-react';

// Placeholder data for restaurants
const aiRecommendations = [
  {
    id: 'rec1',
    name: 'Sushi Heaven by AI',
    imageUrl: 'https://picsum.photos/seed/sushiheaven/600/400',
    imageAlt: 'Delicious sushi platter',
    description: 'Personalized just for you! Fresh sushi and sashimi, curated by our advanced AI.',
    rating: 4.8,
    deliveryTime: '25-35 min',
    cuisine: 'Japanese',
  },
  {
    id: 'rec2',
    name: 'AI\'s Pizzeria Choice',
    imageUrl: 'https://picsum.photos/seed/aipizza/600/400',
    imageAlt: 'Gourmet pizza',
    description: 'Our AI thinks you\'ll love this artisan pizza with unique toppings and a crispy crust.',
    rating: 4.6,
    deliveryTime: '30-40 min',
    cuisine: 'Italian',
  },
];

const featuredRestaurants = [
  {
    id: 'feat1',
    name: 'The Gilded Spoon',
    imageUrl: 'https://picsum.photos/seed/gildedspoon/600/400',
    imageAlt: 'Elegant dish from The Gilded Spoon',
    description: 'Experience fine dining delivered to your door. Exquisite tastes, premium ingredients.',
    rating: 4.9,
    deliveryTime: '40-50 min',
    cuisine: 'Modern European',
  },
  {
    id: 'feat2',
    name: 'Spice Route Express',
    imageUrl: 'https://picsum.photos/seed/spiceroute/600/400',
    imageAlt: 'Aromatic curry dish',
    description: 'Authentic flavors from across Asia. A journey for your taste buds.',
    rating: 4.7,
    deliveryTime: '30-45 min',
    cuisine: 'Pan-Asian',
  },
  {
    id: 'feat3',
    name: 'Burger Bliss Central',
    imageUrl: 'https://picsum.photos/seed/burgerbliss/600/400',
    imageAlt: 'Juicy gourmet burger',
    description: 'The ultimate gourmet burgers, handcrafted with passion and the freshest ingredients.',
    rating: 4.5,
    deliveryTime: '20-30 min',
    cuisine: 'American',
  },
];

const categories = [
  { name: 'Pizza', icon: <Utensils className="mr-2 h-4 w-4" />, color: "bg-red-500/80 hover:bg-red-600/80" },
  { name: 'Sushi', icon: <Utensils className="mr-2 h-4 w-4" />, color: "bg-blue-500/80 hover:bg-blue-600/80" },
  { name: 'Burgers', icon: <Utensils className="mr-2 h-4 w-4" />, color: "bg-yellow-500/80 hover:bg-yellow-600/80" },
  { name: 'Salads', icon: <Utensils className="mr-2 h-4 w-4" />, color: "bg-green-500/80 hover:bg-green-600/80" },
  { name: 'Desserts', icon: <Utensils className="mr-2 h-4 w-4" />, color: "bg-pink-500/80 hover:bg-pink-600/80" },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex flex-col">
      <Header cartItemCount={3} /> {/* Placeholder cart count */}
      <Sidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <ScrollArea className="flex-1 pt-20"> {/* pt-20 for fixed Header height (h-20) */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          
          {/* Filter Toggle Button - positioned more visibly */}
          <div className="flex justify-between items-center mb-6 mt-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Discover Your Next Meal
            </h1>
            <Button
              variant="outline"
              onClick={() => setIsSidebarOpen(true)}
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300"
              aria-label="Open filters sidebar"
            >
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filters
            </Button>
          </div>

          {/* AI-Powered Recommendations Section */}
          <section aria-labelledby="ai-recommendations-title">
            <h2 id="ai-recommendations-title" className="text-2xl font-semibold mb-6 text-purple-300">
              ✨ Personalized For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {aiRecommendations.map((resto) => (
                <Link to={`/restaurant-detail?id=${resto.id}`} key={resto.id} className="block hover:opacity-90 transition-opacity">
                  <GlassmorphicCard
                    title={resto.name}
                    imageUrl={resto.imageUrl}
                    imageAlt={resto.imageAlt}
                  >
                    <p className="text-sm text-neutral-300 mb-3">{resto.description}</p>
                    <div className="flex justify-between items-center text-xs text-neutral-400">
                      <span className="flex items-center"><Star className="w-4 h-4 text-yellow-400 mr-1" /> {resto.rating}</span>
                      <span>{resto.deliveryTime}</span>
                      <span>{resto.cuisine}</span>
                    </div>
                  </GlassmorphicCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Restaurants Section */}
          <section aria-labelledby="featured-restaurants-title">
            <h2 id="featured-restaurants-title" className="text-2xl font-semibold mb-6 text-purple-300">
              🌟 Featured Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredRestaurants.map((resto) => (
                <Link to={`/restaurant-detail?id=${resto.id}`} key={resto.id} className="block hover:opacity-90 transition-opacity">
                  <GlassmorphicCard
                    title={resto.name}
                    imageUrl={resto.imageUrl}
                    imageAlt={resto.imageAlt}
                  >
                    <p className="text-sm text-neutral-300 mb-3">{resto.description}</p>
                    <div className="flex justify-between items-center text-xs text-neutral-400">
                      <span className="flex items-center"><Star className="w-4 h-4 text-yellow-400 mr-1" /> {resto.rating}</span>
                      <span>{resto.deliveryTime}</span>
                      <span>{resto.cuisine}</span>
                    </div>
                  </GlassmorphicCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Category Selectors Section */}
          <section aria-labelledby="browse-categories-title">
            <h2 id="browse-categories-title" className="text-2xl font-semibold mb-6 text-purple-300">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="default"
                  className={`text-white backdrop-blur-sm border border-transparent hover:border-white/30 transition-all duration-300 rounded-full px-5 py-2.5 text-sm font-medium ${category.color}`}
                  onClick={() => console.log(`Category ${category.name} clicked`)} // Placeholder action
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </section>

        </main>
      </ScrollArea>

      <Footer />
    </div>
  );
};

export default HomePage;