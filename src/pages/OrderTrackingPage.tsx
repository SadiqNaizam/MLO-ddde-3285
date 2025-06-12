import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveOrderTrackingMap from '@/components/InteractiveOrderTrackingMap';

// Shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Lucide Icons
import { Phone, Star, ClipboardList, Utensils } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  // Sample data for the page
  const orderDetails = {
    id: "DXE10023",
    restaurantName: "Elysian Bites",
    deliveryAddress: "123 Luxe Lane, Metro City",
    status: "Out for Delivery", // "Order Confirmed", "Preparing", "Out for Delivery", "Delivered"
    mapProgress: 60, // Geographical progress for the map when "Out for Delivery"
    estimatedTime: "Approx. 8 mins",
    courier: {
      name: "Javier Rodriguez",
      avatarUrl: "https://i.pravatar.cc/150?u=javiercourier",
      phone: "(555) 987-6543",
      rating: 4.9,
    },
    itemsPreview: "Artisan Pizza, Truffle Pasta", // A brief summary
    placedAt: "10:30 AM",
  };

  const getOverallProgress = (status: string): number => {
    if (status === "Delivered") return 100;
    if (status === "Out for Delivery") return 75;
    if (status === "Preparing") return 50;
    if (status === "Order Confirmed") return 25;
    return 0;
  };

  const overallProgressValue = getOverallProgress(orderDetails.status);
  const courierNameFallback = orderDetails.courier.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-slate-100 pt-20">
      <Header cartItemCount={3} /> {/* Example cart count */}

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-8">
        {/* Interactive Map Section - Central Element */}
        <section className="w-full max-w-2xl">
          <InteractiveOrderTrackingMap
            orderId={orderDetails.id}
            deliveryProgress={orderDetails.status === "Out for Delivery" ? orderDetails.mapProgress : (orderDetails.status === "Delivered" ? 100 : 0)}
            estimatedTimeArrival={orderDetails.estimatedTime}
            orderStatus={orderDetails.status}
            restaurantName={orderDetails.restaurantName}
            deliveryAddress={orderDetails.deliveryAddress}
          />
        </section>

        {/* Courier Information Card */}
        <section className="w-full max-w-2xl">
          <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-50 flex items-center">
                <Utensils className="mr-3 h-5 w-5 text-purple-400" />
                Your Courier
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="h-20 w-20 border-2 border-purple-500/50">
                <AvatarImage src={orderDetails.courier.avatarUrl} alt={orderDetails.courier.name} />
                <AvatarFallback className="bg-slate-700 text-purple-300 text-2xl">{courierNameFallback}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-slate-100">{orderDetails.courier.name}</h3>
                <div className="flex items-center text-sm text-slate-400 mt-1">
                  <Star className="h-4 w-4 text-amber-400 mr-1.5" fill="currentColor" />
                  <span>{orderDetails.courier.rating}/5.0 stars</span>
                </div>
                <a 
                  href={`tel:${orderDetails.courier.phone}`} 
                  className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors mt-2 group"
                >
                  <Phone className="h-4 w-4 mr-1.5 group-hover:animate-pulse" />
                  <span>{orderDetails.courier.phone}</span>
                </a>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto bg-purple-600/20 border-purple-500/70 text-purple-300 hover:bg-purple-600/40 hover:text-purple-200 transition-colors">
                Contact Courier
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Order Summary & Overall Progress Card */}
        <section className="w-full max-w-2xl">
          <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-50 flex items-center">
                <ClipboardList className="mr-3 h-5 w-5 text-sky-400" />
                Order Summary & Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Order from: <span className="font-medium text-slate-200">{orderDetails.restaurantName}</span></p>
                <p className="text-sm text-slate-400">Items: <span className="font-medium text-slate-200">{orderDetails.itemsPreview}</span></p>
                <p className="text-sm text-slate-400">Placed at: <span className="font-medium text-slate-200">{orderDetails.placedAt}</span></p>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-xs font-medium text-slate-300">
                  <span>Overall Status: {orderDetails.status}</span>
                  <span>{overallProgressValue}%</span>
                </div>
                <Progress value={overallProgressValue} className="w-full h-2.5 bg-slate-700 [&>*]:bg-gradient-to-r [&>*]:from-sky-500 [&>*]:to-cyan-500" aria-label={`Overall order progress: ${overallProgressValue}%`} />
              </div>
              <div className="pt-2">
                <Link to="/restaurant-detail" state={{ restaurantId: "RESTAURANT_ID_PLACEHOLDER" }}> {/* Pass restaurant ID if needed by RestaurantDetailPage */}
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                    View Restaurant Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTrackingPage;