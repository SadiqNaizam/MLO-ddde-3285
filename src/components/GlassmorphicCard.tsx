import React from 'react';
import { cn } from '@/lib/utils'; // Assumed to be available for utility class name composition

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
  contentClassName?: string;
  imageContainerClassName?: string;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  title,
  imageUrl,
  imageAlt,
  contentClassName,
  imageContainerClassName,
}) => {
  console.log('GlassmorphicCard loaded');

  // Base glassmorphic styles designed for a luxurious, modern feel.
  // These aim for the "frosted glass" effect with soft, glowing borders
  // and high legibility as per the project's aesthetic goals.
  const glassmorphicClasses = cn(
    "bg-black/25",        // Semi-transparent dark background (rgba(0,0,0,0.25))
    "backdrop-blur-xl",   // Strong blur for the frosted glass effect
    "border border-white/10", // Delicate, light border (rgba(255,255,255,0.1))
    "rounded-2xl",        // Smooth, modern rounded corners (1rem)
    "shadow-xl",          // Soft shadow for depth and a subtle "glow"
    "overflow-hidden",    // Ensures content (like images) respects rounded corners
    "transition-all duration-300 ease-in-out", // Smooth transitions for hover effects
    "hover:shadow-2xl hover:border-white/20", // Enhanced shadow and border on hover
    "group", // Added for potential group-hover effects on children like the image
    className             // Allows consumers to pass additional Tailwind classes
  );

  const finalImageAlt = imageAlt || title || 'Card image'; // Sensible default for image alt text

  return (
    <div className={glassmorphicClasses}>
      {imageUrl && (
        <div className={cn("w-full aspect-video overflow-hidden", imageContainerClassName)}>
          <img
            src={imageUrl}
            alt={finalImageAlt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className={cn("p-4 md:p-6", contentClassName)}> {/* Responsive padding */}
        {title && (
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3 leading-tight">
            {title}
          </h3>
        )}
        <div className="text-neutral-200 text-sm md:text-base leading-relaxed"> {/* Responsive text size for content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassmorphicCard;