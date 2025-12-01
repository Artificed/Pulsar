'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Masonry from "react-masonry-css";
import Navbar from "@/components/navbar";
import { eventService } from "@/features/event/api/event-service";
import { Event } from "@/features/event/types/event";

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Journey to the Edge of the Universe",
    description: "Experience a breathtaking voyage through billions of light-years, witnessing the birth and death of stars, the collision of galaxies, and the mysterious dark matter that holds everything together.",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
    datetime: "2025-12-15T19:00:00",
    durationMinutes: 120,
    location: "Main Dome",
    price: 25,
    capacity: 200,
    seatsAvailable: 45,
  },
  {
    id: "2",
    title: "The Aurora Borealis Experience",
    description: "Immerse yourself in the dancing lights of the polar skies in this stunning 360° projection show that brings the northern lights directly to you.",
    imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
    datetime: "2025-12-18T20:30:00",
    durationMinutes: 90,
    location: "Immersion Theater",
    price: 30,
    capacity: 150,
    seatsAvailable: 82,
  },
  {
    id: "3",
    title: "Mars: The Next Frontier",
    description: "Explore humanity's ambitious plans to colonize the Red Planet with cutting-edge visualization technology and insights from leading space scientists.",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&q=80",
    datetime: "2025-12-20T18:00:00",
    durationMinutes: 105,
    location: "Discovery Hall",
    price: 20,
    capacity: 180,
    seatsAvailable: 180,
  },
  {
    id: "4",
    title: "Black Holes: Monsters of the Cosmos",
    description: "Dive into the most mysterious and powerful objects in the universe. Witness the awesome power of singularities and learn what happens beyond the event horizon.",
    imageUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80",
    datetime: "2025-12-22T19:30:00",
    durationMinutes: 90,
    location: "Main Dome",
    price: 25,
    capacity: 200,
    seatsAvailable: 124,
  },
  {
    id: "5",
    title: "Stargazing Night: Winter Constellations",
    description: "Join our expert astronomers for a live telescope viewing session featuring Orion, Taurus, the Pleiades, and other winter celestial wonders.",
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
    datetime: "2025-12-25T21:00:00",
    durationMinutes: 180,
    location: "Observatory Deck",
    price: 15,
    capacity: 50,
    seatsAvailable: 12,
  },
  {
    id: "6",
    title: "Nebulae: Cosmic Nurseries",
    description: "Explore the stunning birthplaces of stars in this visual journey through the most beautiful nebulae in our galaxy, from the Orion Nebula to the Pillars of Creation.",
    imageUrl: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1200&q=80",
    datetime: "2025-12-28T19:00:00",
    durationMinutes: 90,
    location: "Main Dome",
    price: 22,
    capacity: 200,
    seatsAvailable: 156,
  },
  {
    id: "7",
    title: "The Moons of Jupiter",
    description: "Discover the fascinating worlds orbiting the gas giant Jupiter - from volcanic Io to icy Europa, which may harbor life beneath its frozen surface.",
    imageUrl: "https://images.unsplash.com/photo-1630839437035-dac17da580d0?w=1200&q=80",
    datetime: "2025-12-30T18:30:00",
    durationMinutes: 75,
    location: "Discovery Hall",
    price: 18,
    capacity: 150,
    seatsAvailable: 98,
  },
  {
    id: "8",
    title: "New Year's Cosmic Countdown",
    description: "Ring in 2026 under the stars! Join us for a special New Year's Eve celebration featuring a champagne toast and a breathtaking journey through the cosmos.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    datetime: "2025-12-31T22:00:00",
    durationMinutes: 150,
    location: "Main Dome",
    price: 75,
    capacity: 200,
    seatsAvailable: 34,
  },
  {
    id: "9",
    title: "Exoplanets: Worlds Beyond",
    description: "Learn about the thousands of planets discovered orbiting distant stars and the hunt for Earth-like worlds that might support life.",
    imageUrl: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=1200&q=80",
    datetime: "2026-01-05T19:00:00",
    durationMinutes: 90,
    location: "Immersion Theater",
    price: 25,
    capacity: 150,
    seatsAvailable: 150,
  },
  {
    id: "10",
    title: "Saturn's Rings: A Cosmic Wonder",
    description: "Dive deep into the spectacular ring system of Saturn, exploring the ice and rock particles that create one of the solar system's most iconic features.",
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&q=80",
    datetime: "2026-01-10T20:00:00",
    durationMinutes: 80,
    location: "Main Dome",
    price: 20,
    capacity: 200,
    seatsAvailable: 178,
  },
  {
    id: "11",
    title: "The Sun: Our Living Star",
    description: "Witness the raw power of our nearest star through spectacular solar imagery. Learn about solar flares, sunspots, and how the Sun influences life on Earth.",
    imageUrl: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=1200&q=80",
    datetime: "2026-01-12T14:00:00",
    durationMinutes: 75,
    location: "Discovery Hall",
    price: 18,
    capacity: 180,
    seatsAvailable: 145,
  },
  {
    id: "12",
    title: "Voyager: The Grand Tour",
    description: "Relive humanity's greatest space exploration achievement as we follow the Voyager spacecraft on their epic journey through the outer solar system and beyond.",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80",
    datetime: "2026-01-15T19:30:00",
    durationMinutes: 95,
    location: "Main Dome",
    price: 22,
    capacity: 200,
    seatsAvailable: 167,
  },
  {
    id: "13",
    title: "Cosmic Collisions",
    description: "Experience the violent beauty of the universe as galaxies merge, asteroids impact, and stars collide in this thrilling journey through cosmic catastrophes.",
    imageUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1200&q=80",
    datetime: "2026-01-18T20:00:00",
    durationMinutes: 85,
    location: "Immersion Theater",
    price: 28,
    capacity: 150,
    seatsAvailable: 8,
  },
  {
    id: "14",
    title: "Kids' Space Adventure",
    description: "A family-friendly journey through space designed for young explorers! Interactive activities, fun facts, and a chance to meet our robot astronaut mascot.",
    imageUrl: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1200&q=80",
    datetime: "2026-01-20T11:00:00",
    durationMinutes: 60,
    location: "Discovery Hall",
    price: 12,
    capacity: 100,
    seatsAvailable: 42,
  },
  {
    id: "15",
    title: "Dark Matter Mysteries",
    description: "Explore the invisible substance that makes up 85% of the universe's matter. What is dark matter, and how do scientists detect something that cannot be seen?",
    imageUrl: "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=1200&q=80",
    datetime: "2026-01-22T19:00:00",
    durationMinutes: 90,
    location: "Main Dome",
    price: 25,
    capacity: 200,
    seatsAvailable: 189,
  },
  {
    id: "16",
    title: "The Ice Giants: Uranus & Neptune",
    description: "Journey to the mysterious outer reaches of our solar system to explore the blue-green ice giants and their fascinating moon systems.",
    imageUrl: "https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4?w=1200&q=80",
    datetime: "2026-01-25T18:30:00",
    durationMinutes: 80,
    location: "Discovery Hall",
    price: 20,
    capacity: 180,
    seatsAvailable: 156,
  },
  {
    id: "17",
    title: "Lunar Eclipse Watch Party",
    description: "Join us for a special live viewing of the total lunar eclipse! Hot cocoa, blankets, and expert commentary as the Moon turns blood red.",
    imageUrl: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=1200&q=80",
    datetime: "2026-01-28T22:00:00",
    durationMinutes: 180,
    location: "Observatory Deck",
    price: 15,
    capacity: 75,
    seatsAvailable: 18,
  },
  {
    id: "18",
    title: "Space Station Life",
    description: "Experience what it's like to live and work aboard the International Space Station. From floating experiments to spacewalks, discover life in microgravity.",
    imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&q=80",
    datetime: "2026-02-01T17:00:00",
    durationMinutes: 90,
    location: "Immersion Theater",
    price: 24,
    capacity: 150,
    seatsAvailable: 134,
  },
  {
    id: "19",
    title: "Comets: Visitors from the Deep",
    description: "Track the spectacular journeys of comets as they swing through the inner solar system, leaving brilliant tails across the night sky.",
    imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&q=80",
    datetime: "2026-02-05T19:30:00",
    durationMinutes: 75,
    location: "Main Dome",
    price: 20,
    capacity: 200,
    seatsAvailable: 172,
  },
  {
    id: "20",
    title: "Valentine's Starlight Dinner",
    description: "A romantic evening under the stars with gourmet dining, champagne, and a private showing of the most romantic constellations and celestial legends.",
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
    datetime: "2026-02-14T19:00:00",
    durationMinutes: 180,
    location: "Main Dome",
    price: 150,
    capacity: 50,
    seatsAvailable: 6,
  },
  {
    id: "21",
    title: "Asteroid Mining: The Future of Resources",
    description: "Discover how mining asteroids could solve Earth's resource problems and fund humanity's expansion into the cosmos.",
    imageUrl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&q=80",
    datetime: "2026-02-18T18:00:00",
    durationMinutes: 85,
    location: "Discovery Hall",
    price: 22,
    capacity: 180,
    seatsAvailable: 165,
  },
  {
    id: "22",
    title: "Supermassive: Galaxy Centers",
    description: "Peer into the hearts of galaxies where supermassive black holes millions of times our Sun's mass control the fate of billions of stars.",
    imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&q=80",
    datetime: "2026-02-22T20:00:00",
    durationMinutes: 95,
    location: "Main Dome",
    price: 28,
    capacity: 200,
    seatsAvailable: 87,
  },
  {
    id: "23",
    title: "The Milky Way: Our Cosmic Home",
    description: "Take a comprehensive tour of our home galaxy, from the central bulge to the spiral arms, and discover our place in this vast cosmic city of stars.",
    imageUrl: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200&q=80",
    datetime: "2026-02-25T19:00:00",
    durationMinutes: 90,
    location: "Immersion Theater",
    price: 25,
    capacity: 150,
    seatsAvailable: 142,
  },
  {
    id: "24",
    title: "Telescope Workshop",
    description: "Learn to use your own telescope! This hands-on workshop covers setup, alignment, finding objects, and astrophotography basics. Telescope included!",
    imageUrl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=80",
    datetime: "2026-03-01T16:00:00",
    durationMinutes: 180,
    location: "Observatory Deck",
    price: 85,
    capacity: 20,
    seatsAvailable: 5,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    year: date.getFullYear(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
};

type CardVariant = 'tall' | 'standard' | 'compact';

const getCardVariant = (index: number): CardVariant => {
  const patterns: CardVariant[] = ['tall', 'standard', 'compact', 'standard', 'tall', 'compact', 'standard'];
  return patterns[index % patterns.length];
};

const breakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1,
};

const EventCard = ({ event, index, featured = false }: { event: Event; index: number; featured?: boolean }) => {
  const router = useRouter();
  const formattedDate = formatDate(event.datetime);
  const isLowSeats = event.seatsAvailable <= 20;
  const variant = getCardVariant(index);

  if (featured) {
    return (
      <div className="relative">
        <motion.div
          className="absolute -inset-[2px] rounded-[26px] z-0"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6, #ec4899)',
            backgroundSize: '300% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <motion.div
          className="absolute -inset-4 rounded-[40px] z-0 opacity-50"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="relative w-full rounded-3xl overflow-hidden cursor-pointer group z-10 bg-black"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => router.push(`/event/${event.id}`)}
        >
          <div className="relative aspect-[16/9]">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
            
            <motion.div
              className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
                filter: 'blur(40px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <motion.div 
              className="absolute top-6 md:top-8 left-6 md:left-8"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/30 flex items-center gap-2">
                <motion.svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </motion.svg>
                Featured Event
              </span>
            </motion.div>

            <div className="absolute top-6 md:top-8 right-6 md:right-8">
              <motion.div
                className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-white leading-none">{formattedDate.date}</div>
                <div className="text-sm uppercase tracking-wider text-purple-300 font-medium mt-1">{formattedDate.month}</div>
                <div className="text-xs text-white/60 mt-2 border-t border-white/10 pt-2">{formattedDate.time}</div>
              </motion.div>
            </div>

            <div className="max-w-2xl">
              <div className="mb-4">
                {isLowSeats ? (
                  <motion.span 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-medium backdrop-blur-sm"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Only {event.seatsAvailable} seats left!
                  </motion.span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-medium backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {event.seatsAvailable} seats available
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-purple-300 text-sm mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">{formattedDate.day}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight group-hover:text-purple-200 transition-colors">
                {event.title}
              </h2>

              <p className="text-slate-300/80 text-sm md:text-base mb-5 line-clamp-2 max-w-xl">
                {event.description}
              </p>

              <div className="flex items-center gap-5">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  ${event.price}
                  <span className="text-xs md:text-sm font-normal text-slate-400 ml-1">/ person</span>
                </div>
                <motion.button
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all text-sm md:text-base"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/event/${event.id}`);
                  }}
                >
                  Get Tickets →
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const variantStyles = {
    tall: {
      aspectClass: 'aspect-[3/4]',
      showDescription: true,
      titleSize: 'text-xl',
    },
    standard: {
      aspectClass: 'aspect-[4/3]',
      showDescription: false,
      titleSize: 'text-lg',
    },
    compact: {
      aspectClass: 'aspect-square',
      showDescription: false,
      titleSize: 'text-base',
    },
  };

  const style = variantStyles[variant];
  
  if (variant === 'tall') {
    return (
      <motion.div
        className="group cursor-pointer mb-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        onClick={() => router.push(`/event/${event.id}`)}
      >
        <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className={`relative ${style.aspectClass} overflow-hidden`}>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 text-center">
              <div className="text-2xl font-bold leading-none">{formattedDate.date}</div>
              <div className="text-xs uppercase text-purple-400 font-medium">{formattedDate.month}</div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 text-purple-300 text-xs mb-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
              </div>

              <h3 className={`${style.titleSize} font-bold mb-2 leading-tight group-hover:text-purple-300 transition-colors`}>
                {event.title}
              </h3>

              <p className="text-slate-300/70 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="text-xl font-bold">
                ${event.price}
                <span className="text-xs font-normal text-slate-400 ml-1">/ person</span>
              </div>
            </div>

            <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group cursor-pointer mb-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onClick={() => router.push(`/event/${event.id}`)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <div className={`relative ${style.aspectClass} overflow-hidden`}>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/10 text-center">
            <div className={`${variant === 'compact' ? 'text-base' : 'text-lg'} font-bold leading-none`}>{formattedDate.date}</div>
            <div className="text-[10px] uppercase text-purple-400">{formattedDate.month}</div>
          </div>

          <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className={`${variant === 'compact' ? 'p-3' : 'p-4'}`}>
          <div className="flex items-center gap-1.5 text-purple-400 text-[10px] mb-1.5">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/60">{formattedDate.time}</span>
          </div>

          <h3 className={`${style.titleSize} font-bold mb-2 leading-tight group-hover:text-purple-300 transition-colors line-clamp-2`}>
            {event.title}
          </h3>

          <div className={`${variant === 'compact' ? 'text-base' : 'text-lg'} font-bold`}>
            ${event.price}
            <span className="text-[10px] font-normal text-slate-500 ml-0.5">/ person</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        if (response.statusCode === 200 && response.payload?.events?.length > 0) {
          setEvents(response.payload.events);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const featuredEvent = events[0];
  const otherEvents = events.slice(1);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0a0118] to-black" />
        
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div 
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 60%)',
            filter: 'blur(100px)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 60%)',
            filter: 'blur(100px)',
            transform: 'translate(30%, 30%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="pt-32 md:pt-40 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <motion.div
                className="lg:w-[380px] lg:flex-shrink-0 lg:sticky lg:top-32"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-purple-400/70 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
                  Explore the Cosmos
                </p>  
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.1]">
                  Upcoming{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Events
                  </span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg">
                  Discover extraordinary cosmic experiences at Pulsar Planetarium.
                </p>
              </motion.div>

              <div className="flex-1 w-full">
                <EventCard event={featuredEvent} index={0} featured />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <h2 className="text-xl font-semibold text-white/80">More Events</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </motion.div>
          </div>
        </div>

        <div className="px-4 pb-24">
          <div className="max-w-7xl mx-auto">
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-5 w-auto"
              columnClassName="pl-5 bg-clip-padding"
            >
              {otherEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </Masonry>
          </div>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
