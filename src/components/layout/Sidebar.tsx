import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SlidersHorizontal } from 'lucide-react';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface SidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  // In a real application, filter state and handlers would likely be props, e.g.:
  // onApplyFilters: (filters: AppliedFilters) => void;
  // initialFilters?: Partial<AppliedFilters>;
}

// Example structure for applied filters if passed to a parent
// export interface AppliedFilters {
//   priceRange: [number, number];
//   selectedDietary: string[];
//   selectedAllergens: string[];
//   selectedCuisine: string;
//   sortBy: string;
// }

// Constants for filter options
const dietaryOptions = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gluten-free', label: 'Gluten-Free' },
];

const allergenOptions = [
  { id: 'nuts', label: 'No Nuts' },
  { id: 'dairy', label: 'No Dairy' },
  { id: 'shellfish', label: 'No Shellfish' },
];

const cuisineOptions = [
  { value: 'any', label: 'Any Cuisine' },
  { value: 'italian', label: 'Italian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'indian', label: 'Indian' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'thai', label: 'Thai' },
];

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating (High to Low)' },
  { value: 'delivery_time', label: 'Delivery Time (Fastest)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
  { value: 'price_desc', label: 'Price (High to Low)' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onOpenChange }) => {
  console.log('Sidebar loaded');

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('any');
  const [sortBy, setSortBy] = useState<string>('popularity');

  const handleCheckedChange = (
    id: string,
    checked: CheckedState,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev =>
      checked === true ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', {
      priceRange,
      selectedDietary,
      selectedAllergens,
      selectedCuisine,
      sortBy,
    });
    // Example: props.onApplyFilters?.({ priceRange, selectedDietary, ... });
    onOpenChange(false); // Close sidebar after applying
  };

  const handleResetFilters = () => {
    setPriceRange([0, 100]);
    setSelectedDietary([]);
    setSelectedAllergens([]);
    setSelectedCuisine('any');
    setSortBy('popularity');
    console.log('Filters reset');
    // Example: props.onApplyFilters?.(defaultFilters); // or clear them
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[380px] bg-white/20 backdrop-blur-xl border-r border-white/30 p-0 flex flex-col shadow-2xl text-gray-800"
      >
        <SheetHeader className="p-6 pb-4 border-b border-white/30 flex-shrink-0">
          <SheetTitle className="text-2xl font-semibold flex items-center text-gray-900">
            <SlidersHorizontal className="mr-3 h-6 w-6 text-gray-700" />
            Filters & Sorting
          </SheetTitle>
          {/* Default SheetContent includes a SheetClose button (X icon) */}
        </SheetHeader>

        <ScrollArea className="flex-grow">
          <div className="p-6 space-y-6">
            <Accordion type="multiple" defaultValue={['dietary', 'price']} className="w-full">
              <AccordionItem value="dietary" className="border-b border-white/20">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-gray-800 py-3">Dietary Preferences</AccordionTrigger>
                <AccordionContent className="pt-3 pb-1 space-y-3">
                  {dietaryOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`diet-${option.id}`}
                        checked={selectedDietary.includes(option.id)}
                        onCheckedChange={(checked) => handleCheckedChange(option.id, checked, setSelectedDietary)}
                        className="border-gray-400/70 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500 transition-colors duration-150 rounded"
                      />
                      <Label htmlFor={`diet-${option.id}`} className="text-gray-700 cursor-pointer text-sm font-medium">{option.label}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="allergens" className="border-b border-white/20">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-gray-800 py-3">Allergen Filters</AccordionTrigger>
                <AccordionContent className="pt-3 pb-1 space-y-3">
                  {allergenOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`allergen-${option.id}`}
                        checked={selectedAllergens.includes(option.id)}
                        onCheckedChange={(checked) => handleCheckedChange(option.id, checked, setSelectedAllergens)}
                        className="border-gray-400/70 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500 transition-colors duration-150 rounded"
                      />
                      <Label htmlFor={`allergen-${option.id}`} className="text-gray-700 cursor-pointer text-sm font-medium">{option.label}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border-b border-white/20">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-gray-800 py-3">Price Range</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={200} // Example max price for a meal/order
                    step={5}
                    className="[&>span:nth-child(1)]:h-2 [&>span:nth-child(1)]:bg-gray-300/50 [&>span:nth-child(1)>span]:bg-sky-600 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-sky-600 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md hover:[&_[role=slider]]:bg-sky-700"
                  />
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cuisine" className="border-b border-white/20">
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-gray-800 py-3">Cuisine Type</AccordionTrigger>
                <AccordionContent className="pt-3 pb-1">
                  <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                    <SelectTrigger className="w-full bg-white/40 border-gray-400/50 text-gray-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white/30 rounded-md">
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 backdrop-blur-md border-gray-300/50 text-gray-800 rounded-md">
                      {cuisineOptions.map(cuisine => (
                        <SelectItem key={cuisine.value} value={cuisine.value} className="hover:bg-sky-100/70 focus:bg-sky-100/70 cursor-pointer py-2">
                          {cuisine.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sort" className="border-b-0"> {/* Last item no border */}
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-gray-800 py-3">Sort By</AccordionTrigger>
                <AccordionContent className="pt-3 pb-1">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full bg-white/40 border-gray-400/50 text-gray-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white/30 rounded-md">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 backdrop-blur-md border-gray-300/50 text-gray-800 rounded-md">
                      {sortOptions.map(sort => (
                        <SelectItem key={sort.value} value={sort.value} className="hover:bg-sky-100/70 focus:bg-sky-100/70 cursor-pointer py-2">
                          {sort.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>

        <SheetFooter className="p-4 px-6 border-t border-white/30 bg-transparent flex-shrink-0">
          <div className="flex w-full gap-3">
             <Button variant="outline" onClick={handleResetFilters} className="flex-1 bg-white/30 hover:bg-white/50 border-gray-400/50 text-gray-700 font-semibold rounded-md transition-colors duration-150">
                Reset
             </Button>
             <Button onClick={handleApplyFilters} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors duration-150">
                Apply Filters
             </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;