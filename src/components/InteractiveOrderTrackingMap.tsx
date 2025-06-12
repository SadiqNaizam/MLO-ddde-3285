import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, Home, Store } from 'lucide-react';

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | null | undefined;

interface InteractiveOrderTrackingMapProps {
  orderId: string;
  deliveryProgress: number; // Percentage from 0 to 100
  estimatedTimeArrival: string; // e.g., "15 minutes", "Arriving soon", "Delivered"
  orderStatus: string; // e.g., "Confirmed", "Preparing", "Out for Delivery", "Delivered"
  restaurantName?: string;
  deliveryAddress?: string;
}

const InteractiveOrderTrackingMap: React.FC<InteractiveOrderTrackingMapProps> = ({
  orderId,
  deliveryProgress = 0,
  estimatedTimeArrival = "Calculating...",
  orderStatus = "Order Placed",
  restaurantName = "Restaurant", // Default placeholder
  deliveryAddress = "Your Location", // Default placeholder
}) => {
  console.log(`InteractiveOrderTrackingMap loaded for order: ${orderId}, progress: ${deliveryProgress}%`);

  // Constants for layout - truck icon is w-10 (2.5rem = 40px)
  const truckIconHalfWidthRem = '1.25rem'; // Half of 2.5rem

  const getStatusBadgeVariant = (status: string): BadgeVariant => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('delivered')) return 'default'; 
    if (lowerStatus.includes('out for delivery') || lowerStatus.includes('en route')) return 'secondary';
    if (lowerStatus.includes('preparing') || lowerStatus.includes('confirmed') || lowerStatus.includes('placed')) return 'outline';
    if (lowerStatus.includes('cancelled') || lowerStatus.includes('failed')) return 'destructive';
    return 'default';
  };

  const showEnRouteLabel = deliveryProgress > 0 && deliveryProgress < 100 &&
                           (orderStatus.toLowerCase().includes("out for delivery") || orderStatus.toLowerCase().includes("en route"));

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl bg-card/90 backdrop-blur-lg border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground">Order Tracking</CardTitle>
          <Badge variant={getStatusBadgeVariant(orderStatus)} className="capitalize text-xs sm:text-sm px-2.5 py-1">
            {orderStatus.toLowerCase()}
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground pt-1">Order ID: #{orderId.toUpperCase()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mock Map Area */}
        <div className="relative h-40 md:h-48 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/50 p-4 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/90 opacity-80"></div>
          
          <div 
            className="absolute top-1/2 h-[3px] bg-slate-600/70 rounded-full"
            style={{ left: '10%', right: '10%', transform: 'translateY(-50%)' }}
            aria-hidden="true"
          ></div>
          
          <div 
            className="absolute top-1/2 flex flex-col items-center text-center z-10"
            style={{ left: '10%', transform: 'translate(-50%, -50%)' }}
          >
            <Store className="h-7 w-7 text-green-400/90 filter drop-shadow-sm" strokeWidth={1.5}/>
            <span className="mt-1.5 text-[10px] font-medium text-green-300/80 max-w-[60px] sm:max-w-[70px] break-words leading-tight">
              {restaurantName}
            </span>
          </div>

          <div 
            className="absolute top-1/2 flex flex-col items-center text-center z-10"
            style={{ left: '90%', transform: 'translate(-50%, -50%)' }}
          >
            <Home className="h-7 w-7 text-blue-400/90 filter drop-shadow-sm" strokeWidth={1.5}/>
            <span className="mt-1.5 text-[10px] font-medium text-blue-300/80 max-w-[60px] sm:max-w-[70px] break-words leading-tight">
              {deliveryAddress}
            </span>
          </div>

          <motion.div
            className="absolute top-1/2 z-20 flex flex-col items-center"
            style={{ transform: 'translateY(-50%)' }} 
            initial={{ left: `calc(10% - ${truckIconHalfWidthRem})` }}
            animate={{ left: `calc(${(deliveryProgress / 100) * 80}% + 10% - ${truckIconHalfWidthRem})` }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            aria-label="Delivery vehicle location"
          >
            <Truck className="h-10 w-10 text-amber-400 filter drop-shadow-lg" strokeWidth={1.5} />
            {showEnRouteLabel && (
              <div className="mt-1 px-1.5 py-0.5 text-[10px] bg-black/70 backdrop-blur-sm text-white rounded-sm shadow-lg whitespace-nowrap">
                En Route
              </div>
            )}
          </motion.div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5 text-xs font-medium text-muted-foreground">
            <span className="capitalize">Status: {orderStatus.toLowerCase()}</span>
            <span>{deliveryProgress}%</span>
          </div>
          <Progress value={deliveryProgress} className="w-full h-2.5 [&>*]:bg-gradient-to-r [&>*]:from-amber-500 [&>*]:to-orange-500" aria-label={`Order progress: ${deliveryProgress}%`} />
        </div>

        <div className="flex items-center justify-between p-3.5 bg-slate-800/80 rounded-lg border border-slate-700/60 shadow-md">
          <div className="flex items-center space-x-2.5">
            <Clock className="h-5 w-5 text-sky-400" />
            <span className="text-sm font-medium text-foreground">Estimated Arrival:</span>
          </div>
          <span className="text-sm font-semibold text-sky-300">{estimatedTimeArrival}</span>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default InteractiveOrderTrackingMap;