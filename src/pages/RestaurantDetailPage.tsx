import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassmorphicCard from '@/components/GlassmorphicCard';

// Shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // For review cards

// Lucide Icons
import { Star, Clock, MapPin, Utensils, Info as InfoIcon, MessageSquare, PlusCircle, MinusCircle, Trash2 } from 'lucide-react';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const restaurantData = {
  name: "The Gilded Spoon",
  description: "Experience culinary artistry where traditional flavors meet modern elegance. Each dish is crafted with the freshest ingredients and a passion for perfection.",
  address: "123 Luxury Lane, Gourmet City, GC 45678",
  operatingHours: "Mon-Fri: 11:00 AM - 10:00 PM | Sat-Sun: 10:00 AM - 11:00 PM",
  coverImageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  logoUrl: "https://picsum.photos/seed/logo/100/100", // Placeholder logo
};

const menuItems: Dish[] = [
  { id: 'app1', name: 'Truffle Risotto Bites', description: 'Creamy Arborio rice infused with black truffle, breaded and fried to golden perfection.', price: 18, imageUrl: 'https://images.unsplash.com/photo-1598866594240-6c1739951996?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', category: 'Appetizers' },
  { id: 'app2', name: 'Seared Scallops & Caviar', description: 'Pan-seared jumbo scallops served with a delicate lemon butter sauce and a dollop of Ossetra caviar.', price: 28, imageUrl: 'https://images.unsplash.com/photo-1610832805908-2e94a1830a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', category: 'Appetizers' },
  { id: 'main1', name: 'Filet Mignon "Rossini"', description: 'Prime cut filet mignon, pan-seared foie gras, truffle sauce, served on a toasted brioche.', price: 55, imageUrl: 'https://images.unsplash.com/photo-1550304934-4a6d0dd89140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', category: 'Main Courses' },
  { id: 'main2', name: 'Lobster Thermidor', description: 'A classic French dish with succulent lobster meat in a rich, creamy wine sauce, gratinated with Parmesan.', price: 65, imageUrl: 'https://images.unsplash.com/photo-1625943555474-5599181f378a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', category: 'Main Courses' },
  { id: 'des1', name: 'Gold Leaf Chocolate Sphere', description: 'Dark chocolate sphere filled with white chocolate mousse, berries, and edible gold.', price: 22, imageUrl: 'https://images.unsplash.com/photo-1606901305940-e7362396a52a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', category: 'Desserts' },
  { id: 'drink1', name: 'Sparkling Elderflower Presse', description: 'Refreshing and elegant, with a hint of citrus.', price: 12, imageUrl: 'https://images.unsplash.com/photo-1600443144265-92f61900b4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', category: 'Drinks' },
];

const reviews = [
  { id: 'rev1', user: 'Alice Wonderland', rating: 5, comment: "Absolutely divine! The Filet Mignon was cooked to perfection. Service was impeccable. A truly luxurious experience." },
  { id: 'rev2', user: 'Bob The Builder', rating: 4, comment: "Great food and beautiful ambiance. The Lobster Thermidor was rich and flavorful. A bit pricey, but worth it for a special occasion." },
  { id: 'rev3', user: 'Charlie Brown', rating: 5, comment: "The Gold Leaf Chocolate Sphere was a work of art and tasted heavenly! Staff were very attentive." },
];

const menuCategories = Array.from(new Set(menuItems.map(item => item.category)));

const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');
  const [cartCount, setCartCount] = useState(0); // Simple cart count for header
  const [cartItems, setCartItems] = useState<Record<string, number>>({}); // { dishId: quantity }

  const handleAddToCart = (dish: Dish) => {
    setCartItems(prev => ({ ...prev, [dish.id]: (prev[dish.id] || 0) + 1 }));
    setCartCount(prev => prev + 1); // This is total items, not unique items
    toast.success(`${dish.name} added to cart!`, {
      description: `Price: $${dish.price.toFixed(2)}`,
      action: {
        label: "View Cart",
        onClick: () => console.log("Navigate to cart (not implemented in this page)"), // Placeholder
      },
    });
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(null).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} />
    ));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-slate-100">
      <Header cartItemCount={Object.values(cartItems).reduce((sum, qty) => sum + qty, 0)} />
      
      <div className="flex-1 flex flex-col pt-20"> {/* pt-20 for fixed Header (h-20) */}
        <ScrollArea className="flex-1">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial="hidden" animate="visible" variants={cardVariants}>
              <Breadcrumb className="mb-6 text-sm">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="hover:text-purple-300 transition-colors">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-slate-400">{restaurantData.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

            {/* Restaurant Branding Section */}
            <motion.section 
              className="mb-10"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <GlassmorphicCard
                imageUrl={restaurantData.coverImageUrl}
                imageAlt={`${restaurantData.name} ambiance`}
                title={restaurantData.name}
                className="border-purple-500/20 hover:border-purple-400/30"
                imageContainerClassName="aspect-[16/7] md:aspect-[16/6]"
              >
                <p className="text-slate-300 mb-3 text-base">{restaurantData.description}</p>
                <div className="flex items-center text-sm text-slate-400 mb-1">
                  <MapPin className="h-4 w-4 mr-2 text-purple-400" /> {restaurantData.address}
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <Clock className="h-4 w-4 mr-2 text-purple-400" /> {restaurantData.operatingHours}
                </div>
              </GlassmorphicCard>
            </motion.section>

            {/* Tabs for Menu, Info, Reviews */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...cardVariants, visible: { ...cardVariants.visible, transition: { ...cardVariants.visible.transition, delay: 0.2 } } }}
            >
              <Tabs defaultValue="menu" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 text-slate-300 rounded-lg mb-6">
                  {['Menu', 'Info', 'Reviews'].map(tab => (
                     <TabsTrigger 
                        key={tab} 
                        value={tab.toLowerCase()}
                        className="py-3 text-sm sm:text-base font-medium data-[state=active]:bg-purple-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md transition-all duration-200"
                      >
                        {tab}
                      </TabsTrigger>
                  ))}
                </TabsList>

                {/* Menu Content */}
                <TabsContent value="menu">
                  <Accordion type="multiple" defaultValue={menuCategories.slice(0,1)} className="w-full space-y-6">
                    {menuCategories.map((category, catIndex) => (
                      <AccordionItem 
                        value={category} 
                        key={category}
                        className="bg-black/10 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-lg overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 text-lg sm:text-xl font-semibold hover:no-underline text-purple-300 hover:bg-slate-700/30 transition-colors duration-200">
                          <div className="flex items-center">
                            <Utensils className="h-5 w-5 mr-3 text-purple-400" /> {category}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-2 sm:px-4 py-4 border-t border-slate-700/30">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {menuItems.filter(item => item.category === category).map((dish, dishIndex) => (
                              <motion.div
                                key={dish.id}
                                initial="hidden"
                                animate="visible"
                                custom={dishIndex}
                                variants={{
                                  hidden: { opacity: 0, scale: 0.9 },
                                  visible: (i: number) => ({
                                    opacity: 1,
                                    scale: 1,
                                    transition: { delay: i * 0.1 + catIndex * 0.05, duration: 0.4, ease: "easeOut" },
                                  }),
                                }}
                              >
                                <GlassmorphicCard
                                  title={dish.name}
                                  imageUrl={dish.imageUrl}
                                  imageAlt={dish.name}
                                  className="h-full flex flex-col"
                                  contentClassName="flex-grow flex flex-col justify-between"
                                >
                                  <div>
                                    <p className="text-slate-300 mb-2 text-xs sm:text-sm line-clamp-2">{dish.description}</p>
                                    <p className="text-lg font-semibold text-purple-300 mb-3">${dish.price.toFixed(2)}</p>
                                  </div>
                                  <Button 
                                    onClick={() => handleAddToCart(dish)} 
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-200 group flex items-center justify-center text-sm py-2.5"
                                    aria-label={`Add ${dish.name} to cart`}
                                  >
                                    <PlusCircle className="h-4 w-4 mr-2 transform group-hover:rotate-90 transition-transform duration-300" />
                                    Add to Cart
                                  </Button>
                                </GlassmorphicCard>
                              </motion.div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                {/* Info Content */}
                <TabsContent value="info">
                  <GlassmorphicCard title="Restaurant Information" className="border-blue-500/20 hover:border-blue-400/30">
                    <div className="space-y-4 text-slate-300">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-100">Location</h4>
                          <p>{restaurantData.address}</p>
                          <Button variant="link" className="text-blue-400 hover:text-blue-300 px-0 py-1 h-auto text-sm" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(restaurantData.address)}`, "_blank")}>
                            View on Map
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
                        <div>
                           <h4 className="font-semibold text-slate-100">Operating Hours</h4>
                           <p className="whitespace-pre-line">{restaurantData.operatingHours.replace(/ \| /g, '\n')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <InfoIcon className="h-5 w-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-100">About Us</h4>
                          <p>{restaurantData.description}</p>
                        </div>
                      </div>
                       {/* Placeholder for more info, e.g., contact, amenities */}
                        <div className="border-t border-slate-700/50 pt-4">
                            <h4 className="font-semibold text-slate-100 mb-2">Contact & Reservations</h4>
                            <p>Phone: (555) 123-4567</p>
                            <p>Email: reservations@gildedspoon.com</p>
                            <Button variant="outline" className="mt-2 bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300">
                                Book a Table (External)
                            </Button>
                        </div>
                    </div>
                  </GlassmorphicCard>
                </TabsContent>

                {/* Reviews Content */}
                <TabsContent value="reviews">
                  <GlassmorphicCard title="Customer Reviews" className="border-green-500/20 hover:border-green-400/30">
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <motion.div
                          key={review.id}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: (i: number) => ({
                                opacity: 1,
                                x: 0,
                                transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
                              }),
                          }}
                        >
                          <Card className="bg-slate-800/50 border border-slate-700/60 shadow-md text-slate-200">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-md font-semibold text-slate-100 flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-2 text-green-400"/> {review.user}
                                </CardTitle>
                                <div className="flex">{renderStars(review.rating)}</div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-slate-300">{review.comment}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                      {reviews.length === 0 && <p className="text-slate-400">No reviews yet. Be the first to review!</p>}
                    </div>
                  </GlassmorphicCard>
                </TabsContent>
              </Tabs>
            </motion.div>
            
          </main>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default RestaurantDetailPage;