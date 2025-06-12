import React, { useState } from 'react';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, MapPin, CreditCard, History, Settings2, Utensils, Edit3 } from 'lucide-react';

// Mock data for placeholders
const mockUser = {
  fullName: 'Alex Mercer',
  email: 'alex.mercer@example.com',
  phone: '+1 (555) 123-4567',
};

const mockAddresses = [
  { id: '1', type: 'Home', line1: '123 Luxe Avenue', city: 'Metropolis', zip: '10001', isDefault: true },
  { id: '2', type: 'Work', line1: '456 Business Drive', city: 'Metropolis', zip: '10002', isDefault: false },
];

const mockPaymentMethods = [
  { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: '2', type: 'MasterCard', last4: '5555', expiry: '08/26', isDefault: false },
];

const mockOrderHistory = [
  { id: 'ORD789', date: '2024-07-15', restaurant: 'Gourmet Burger Kitchen', total: '$35.50', status: 'Delivered' },
  { id: 'ORD790', date: '2024-07-22', restaurant: 'Sushi Heaven', total: '$62.00', status: 'Delivered' },
  { id: 'ORD791', date: '2024-07-28', restaurant: 'Pizza Palace', total: '$28.75', status: 'Processing' },
];

const dietaryPreferencesOptions = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
];

const allergenOptions = [
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'tree-nuts', label: 'Tree Nuts' },
  { id: 'shellfish', label: 'Shellfish' },
  { id: 'soy', label: 'Soy' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const [userProfile, setUserProfile] = useState(mockUser);
  const [dietarySwitches, setDietarySwitches] = useState<Record<string, boolean>>({
    vegan: false,
    vegetarian: true,
    'gluten-free': false,
    'dairy-free': true,
  });
  const [allergenSwitches, setAllergenSwitches] = useState<Record<string, boolean>>({
    peanuts: true,
    'tree-nuts': false,
    shellfish: false,
    soy: false,
  });

  const handleDietaryChange = (id: string, checked: boolean) => {
    setDietarySwitches(prev => ({ ...prev, [id]: checked }));
  };
  const handleAllergenChange = (id: string, checked: boolean) => {
    setAllergenSwitches(prev => ({ ...prev, [id]: checked }));
  };

  const tabTriggerClasses = "data-[state=active]:bg-purple-600/80 data-[state=active]:text-white data-[state=inactive]:text-slate-300 hover:text-white hover:bg-purple-500/60 rounded-md transition-all duration-200 px-3 py-2 text-sm font-medium flex-1 text-center flex items-center justify-center gap-2";
  const cardClasses = "bg-slate-800/50 backdrop-blur-lg border border-slate-700/60 shadow-xl rounded-xl text-slate-100";
  const inputClasses = "bg-slate-700/50 border-slate-600/80 placeholder-slate-400 text-slate-100 focus:bg-slate-700/70 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md";
  const labelClasses = "text-sm font-medium text-slate-300";
  const buttonPrimaryClasses = "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-md transition-all duration-300 shadow-md hover:shadow-lg";
  const buttonSecondaryClasses = "bg-slate-700/70 hover:bg-slate-600/90 border border-slate-600 text-slate-200 font-medium rounded-md transition-all duration-300";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
      <Header cartItemCount={3} /> {/* Placeholder cart count */}
      
      <ScrollArea className="flex-1 pt-20 pb-4"> {/* pt-20 for fixed header (h-20) */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              User Profile
            </h1>
            <p className="mt-2 text-lg text-slate-400">Manage your account settings and preferences.</p>
          </div>

          <Tabs defaultValue="personal-info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8 bg-slate-800/70 backdrop-blur-md border border-slate-700/50 p-1.5 rounded-lg shadow-lg">
              <TabsTrigger value="personal-info" className={tabTriggerClasses}><User size={18}/>Personal Info</TabsTrigger>
              <TabsTrigger value="addresses" className={tabTriggerClasses}><MapPin size={18}/>Addresses</TabsTrigger>
              <TabsTrigger value="payment" className={tabTriggerClasses}><CreditCard size={18}/>Payment</TabsTrigger>
              <TabsTrigger value="orders" className={tabTriggerClasses}><History size={18}/>Order History</TabsTrigger>
              <TabsTrigger value="dietary" className={tabTriggerClasses}><Utensils size={18}/>Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal-info">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-purple-300 flex items-center gap-2"><User size={24}/>Personal Information</CardTitle>
                  <CardDescription className="text-slate-400">Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div>
                      <Label htmlFor="fullName" className={labelClasses}>Full Name</Label>
                      <Input id="fullName" type="text" value={userProfile.fullName} onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})} className={`${inputClasses} mt-1`} placeholder="Enter your full name" />
                    </div>
                    <div>
                      <Label htmlFor="email" className={labelClasses}>Email Address</Label>
                      <Input id="email" type="email" value={userProfile.email} onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} className={`${inputClasses} mt-1`} placeholder="Enter your email" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className={labelClasses}>Phone Number</Label>
                      <Input id="phone" type="tel" value={userProfile.phone} onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})} className={`${inputClasses} mt-1`} placeholder="Enter your phone number"/>
                    </div>
                    <Button type="submit" className={`${buttonPrimaryClasses} w-full sm:w-auto`} onClick={(e) => {e.preventDefault(); console.log("Personal info saved", userProfile)}}>Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card className={cardClasses}>
                <CardHeader>
                   <CardTitle className="text-2xl font-semibold text-purple-300 flex items-center gap-2"><MapPin size={24}/>Delivery Addresses</CardTitle>
                  <CardDescription className="text-slate-400">Manage your saved delivery locations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className={`${buttonPrimaryClasses} mb-6 w-full sm:w-auto`} onClick={() => console.log("Add new address clicked")}>Add New Address</Button>
                  <div className="space-y-4">
                    {mockAddresses.map(addr => (
                      <div key={addr.id} className="p-4 bg-slate-700/40 rounded-lg border border-slate-600/70 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-100">{addr.type} {addr.isDefault && <span className="text-xs text-purple-400 ml-2">(Default)</span>}</p>
                          <p className="text-sm text-slate-300">{addr.line1}, {addr.city}, {addr.zip}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-slate-600/50"><Edit3 size={16} className="mr-1" /> Edit</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-purple-300 flex items-center gap-2"><CreditCard size={24}/>Payment Methods</CardTitle>
                  <CardDescription className="text-slate-400">Manage your saved payment options.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className={`${buttonPrimaryClasses} mb-6 w-full sm:w-auto`} onClick={() => console.log("Add new payment method clicked")}>Add New Payment Method</Button>
                  <div className="space-y-4">
                     {mockPaymentMethods.map(pm => (
                      <div key={pm.id} className="p-4 bg-slate-700/40 rounded-lg border border-slate-600/70 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-100">{pm.type} ending in {pm.last4} {pm.isDefault && <span className="text-xs text-purple-400 ml-2">(Default)</span>}</p>
                          <p className="text-sm text-slate-300">Expires: {pm.expiry}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-slate-600/50"><Edit3 size={16} className="mr-1" /> Edit</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-purple-300 flex items-center gap-2"><History size={24}/>Order History</CardTitle>
                  <CardDescription className="text-slate-400">View your past orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockOrderHistory.length > 0 ? (
                    <ul className="space-y-4">
                      {mockOrderHistory.map(order => (
                        <li key={order.id} className="p-4 bg-slate-700/40 rounded-lg border border-slate-600/70 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <p className="font-semibold text-slate-100">Order {order.id} - {order.restaurant}</p>
                            <p className="text-sm text-slate-300">Date: {order.date} | Total: {order.total}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-600/30 text-green-300 border border-green-500/50' : 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/50'}`}>{order.status}</span>
                            <Button variant="link" className="text-purple-400 hover:text-purple-300 px-1 py-0 h-auto">View Details</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-400 text-center py-4">You have no past orders.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dietary">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-purple-300 flex items-center gap-2"><Utensils size={24}/>Dietary Preferences & Allergens</CardTitle>
                  <CardDescription className="text-slate-400">Set your dietary needs and allergen alerts. This will help us personalize your experience.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-slate-200 mb-3 flex items-center gap-2"><Settings2 size={20} />Dietary Options</h3>
                      <div className="space-y-3">
                        {dietaryPreferencesOptions.map(opt => (
                           <div key={opt.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-md border border-slate-600/50">
                            <Label htmlFor={`diet-${opt.id}`} className={`${labelClasses} cursor-pointer`}>{opt.label}</Label>
                            <Switch
                              id={`diet-${opt.id}`}
                              checked={dietarySwitches[opt.id] || false}
                              onCheckedChange={(checked) => handleDietaryChange(opt.id, checked)}
                              className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-slate-600"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                     <div>
                      <h3 className="text-lg font-medium text-slate-200 mb-3 flex items-center gap-2"><Settings2 size={20} />Allergen Alerts</h3>
                       <div className="space-y-3">
                        {allergenOptions.map(opt => (
                           <div key={opt.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-md border border-slate-600/50">
                            <Label htmlFor={`allergen-${opt.id}`} className={`${labelClasses} cursor-pointer`}>Avoid {opt.label}</Label>
                            <Switch
                              id={`allergen-${opt.id}`}
                              checked={allergenSwitches[opt.id] || false}
                              onCheckedChange={(checked) => handleAllergenChange(opt.id, checked)}
                              className="data-[state=checked]:bg-rose-500 data-[state=unchecked]:bg-slate-600"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className={`${buttonPrimaryClasses} w-full sm:w-auto`} onClick={(e) => {e.preventDefault(); console.log("Preferences saved", {dietarySwitches, allergenSwitches})}}>Save Preferences</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default UserProfilePage;