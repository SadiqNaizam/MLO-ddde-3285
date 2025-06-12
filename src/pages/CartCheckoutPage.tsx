import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassmorphicCard from '@/components/GlassmorphicCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label'; // For RadioGroup items

// Lucide Icons
import { CreditCard, MapPin, Phone, User, ShoppingCart, Lock, ArrowRight, Info, Edit3, Trash2, CheckCircle } from 'lucide-react';

// Form Schema Definition
const formSchema = z.object({
  // Delivery Details
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  addressLine1: z.string().min(5, { message: "Address line 1 is too short." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City name is too short." }),
  postalCode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Invalid postal code format." }),
  country: z.string().min(2, { message: "Please select a country."}),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number. Include country code." }),

  // Payment Details
  paymentMethod: z.enum(["card", "paypal"], { required_error: "Please select a payment method." }),
  cardHolderName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(), // MM/YY
  cardCvv: z.string().optional(),

  // Bill Splitting & Discount
  billSplitting: z.enum(["individual", "split_evenly"], { required_error: "Please select a bill option."}).default("individual"),
  discountCode: z.string().optional(),

  // Terms and Conditions
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions to proceed.",
  }),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "card") {
    if (!data.cardHolderName || data.cardHolderName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Cardholder name is required for card payment.", path: ["cardHolderName"] });
    }
    if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid card number (13-19 digits).", path: ["cardNumber"] });
    }
    if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid expiry date (MM/YY).", path: ["cardExpiry"] });
    }
    if (!data.cardCvv || !/^\d{3,4}$/.test(data.cardCvv)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid CVV (3-4 digits).", path: ["cardCvv"] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof formSchema>;

// Placeholder Order Data
const orderItems = [
  { id: '1', name: 'Exquisite Truffle Pasta', price: 32.50, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1588013273468-31508566421f?auto=format&fit=crop&w=300&q=60' },
  { id: '2', name: 'Artisan Elixir (Drink)', price: 9.00, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23eda2c5a5?auto=format&fit=crop&w=300&q=60' },
];
const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const taxRate = 0.07; // 7%
const tax = subtotal * taxRate;
const deliveryFee = 5.99;
const total = subtotal + tax + deliveryFee;


const CartCheckoutPage = () => {
  console.log('CartCheckoutPage loaded');
  const navigate = useNavigate();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(orderItems.reduce((sum, item) => sum + item.quantity, 0));


  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      country: "USA", // Default
      phone: "",
      paymentMethod: "card",
      cardHolderName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      billSplitting: "individual",
      discountCode: "",
      agreeToTerms: false,
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout data submitted:", data);
    // Here you would typically send data to your backend
    setIsConfirmDialogOpen(true);
  };

  const handleNavigateToTracking = () => {
    setIsConfirmDialogOpen(false);
    navigate('/order-tracking'); // Path from App.tsx
  };
  
  const inputStyles = "bg-slate-700/50 border-slate-600 placeholder-slate-400 text-slate-100 focus:bg-slate-600/70 focus:ring-purple-500 focus:border-purple-500 rounded-md";
  const labelStyles = "text-purple-300";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white pt-20 selection:bg-purple-500 selection:text-white">
      <Header cartItemCount={cartItemCount} />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left Column: Order Summary & Discounts */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <GlassmorphicCard title="Order Summary" className="shadow-purple-500/10">
              <div className="space-y-4">
                {orderItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-slate-100">{item.name}</h4>
                      <p className="text-sm text-slate-300">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-100">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator className="bg-white/10 my-4" />
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-slate-300">Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-300">Tax ({(taxRate * 100).toFixed(0)}%):</span> <span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-300">Delivery Fee:</span> <span>${deliveryFee.toFixed(2)}</span></div>
                  <Separator className="bg-white/10 my-2" />
                  <div className="flex justify-between text-lg font-bold"><span className="text-slate-100">Total:</span> <span className="text-purple-400">${total.toFixed(2)}</span></div>
                </div>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard title="Discount Code" className="shadow-purple-500/10">
              <FormField
                control={form.control}
                name="discountCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelStyles}>Have a discount code?</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input placeholder="Enter code" {...field} className={inputStyles} />
                      </FormControl>
                      <Button type="button" variant="outline" className="bg-purple-600/70 hover:bg-purple-500/70 border-purple-500 text-white">Apply</Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </GlassmorphicCard>

            <GlassmorphicCard title="Bill Splitting" className="shadow-purple-500/10">
                <FormField
                  control={form.control}
                  name="billSplitting"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="individual" id="bill-individual" className="border-slate-500 text-purple-500 focus:ring-purple-500" /></FormControl>
                            <Label htmlFor="bill-individual" className="font-normal text-slate-200 cursor-pointer">Pay full amount</Label>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="split_evenly" id="bill-split" className="border-slate-500 text-purple-500 focus:ring-purple-500" /></FormControl>
                            <Label htmlFor="bill-split" className="font-normal text-slate-200 cursor-pointer">Split bill evenly (feature coming soon)</Label>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </GlassmorphicCard>
          </div>

          {/* Right Column: Delivery & Payment Form */}
          <div className="lg:col-span-3">
            <GlassmorphicCard title="Provide Your Details" className="shadow-purple-500/20">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Delivery Address Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-purple-300 flex items-center"><MapPin className="mr-2 h-5 w-5" /> Delivery Address</h3>
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem><FormLabel className={labelStyles}>Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="addressLine1" render={({ field }) => (
                      <FormItem><FormLabel className={labelStyles}>Address Line 1</FormLabel><FormControl><Input placeholder="123 Luxe Street" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="addressLine2" render={({ field }) => (
                      <FormItem><FormLabel className={labelStyles}>Address Line 2 (Optional)</FormLabel><FormControl><Input placeholder="Apartment, suite, etc." {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel className={labelStyles}>City</FormLabel><FormControl><Input placeholder="Metropolis" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel className={labelStyles}>Postal Code</FormLabel><FormControl><Input placeholder="90210" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormLabel className={labelStyles}>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className={inputStyles}><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                            <SelectContent className="bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100">
                              <SelectItem value="USA" className="hover:!bg-purple-600/50 focus:!bg-purple-600/50">United States</SelectItem>
                              <SelectItem value="Canada" className="hover:!bg-purple-600/50 focus:!bg-purple-600/50">Canada</SelectItem>
                              <SelectItem value="UK" className="hover:!bg-purple-600/50 focus:!bg-purple-600/50">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select><FormMessage />
                        </FormItem>
                      )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel className={labelStyles}>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="+1 (555) 123-4567" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </section>

                  <Separator className="bg-white/10" />

                  {/* Payment Method Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-purple-300 flex items-center"><CreditCard className="mr-2 h-5 w-5" /> Payment Method</h3>
                    <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                      <FormItem><FormLabel className={labelStyles}>Choose Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4 pt-1">
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="card" id="card" className="border-slate-500 text-purple-500 focus:ring-purple-500" /></FormControl>
                              <Label htmlFor="card" className="font-normal text-slate-200 cursor-pointer">Credit/Debit Card</Label>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="paypal" id="paypal" className="border-slate-500 text-purple-500 focus:ring-purple-500" /></FormControl>
                              <Label htmlFor="paypal" className="font-normal text-slate-200 cursor-pointer">PayPal</Label>
                            </FormItem>
                          </RadioGroup>
                        </FormControl><FormMessage />
                      </FormItem>
                    )} />

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 border border-slate-700 rounded-lg bg-slate-800/30 mt-4">
                        <FormField control={form.control} name="cardHolderName" render={({ field }) => (
                          <FormItem><FormLabel className={labelStyles}>Cardholder Name</FormLabel><FormControl><Input placeholder="Jane M. Doe" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cardNumber" render={({ field }) => (
                          <FormItem><FormLabel className={labelStyles}>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                            <FormItem><FormLabel className={labelStyles}>Expiry Date (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="cardCvv" render={({ field }) => (
                            <FormItem><FormLabel className={labelStyles}>CVV</FormLabel><FormControl><Input placeholder="•••" {...field} className={inputStyles} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                         <p className="text-xs text-slate-400 flex items-center"><Lock className="w-3 h-3 mr-1.5 text-green-400"/> Your card information is encrypted and secure.</p>
                      </div>
                    )}
                     {paymentMethod === 'paypal' && (
                        <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30 mt-4">
                            <p className="text-slate-200">You will be redirected to PayPal to complete your payment securely.</p>
                            <Button type="button" variant="outline" className="mt-3 w-full bg-blue-600/80 hover:bg-blue-500/80 border-blue-500 text-white">
                                Proceed with PayPal
                            </Button>
                        </div>
                    )}
                  </section>
                  
                  <Separator className="bg-white/10" />

                  <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 bg-slate-800/30 border border-slate-700">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-slate-500 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-600" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal text-slate-200 cursor-pointer">
                          I agree to the <Link to="/terms" className="text-purple-400 hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                  
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    disabled={form.formState.isSubmitting}
                  >
                    <Lock className="mr-2 h-5 w-5" /> Confirm & Pay ${total.toFixed(2)}
                  </Button>
                </form>
              </Form>
            </GlassmorphicCard>
          </div>
        </div>
        <div className="text-center mt-8">
            <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center justify-center">
                <ArrowRight className="mr-2 h-4 w-4 transform rotate-180" /> Continue Shopping
            </Link>
        </div>
      </main>

      <Footer />

      {/* Order Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-slate-800/90 backdrop-blur-lg border-slate-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-400 flex items-center">
                <CheckCircle className="h-7 w-7 mr-2 text-green-400" />
                Order Confirmed!
            </DialogTitle>
            <DialogDescription className="text-slate-300 pt-2">
              Thank you for your purchase. Your order is being processed. You can track its progress now.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-slate-200">
            <p><strong>Order ID:</strong> #ORD{Math.floor(10000 + Math.random() * 90000)}</p>
            <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
            <p className="mt-2">An email confirmation has been sent to your registered address.</p>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              onClick={handleNavigateToTracking}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white"
            >
              Track My Order <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsConfirmDialogOpen(false); 
                navigate('/'); // Navigate to home
              }}
              className="w-full sm:w-auto mt-2 sm:mt-0 border-slate-600 hover:bg-slate-700 hover:text-white"
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default CartCheckoutPage;