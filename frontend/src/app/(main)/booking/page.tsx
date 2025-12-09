'use client';

import { useState, useEffect, memo, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { bookingService } from "@/features/booking/api/booking-service";
import { LoadingSpinner } from "@/components/events";
import { CustomCursor, CursorTrail } from "@/components/home";
import { FloatingChat } from "@/components/chat";
import { useAuth } from "@/components/providers/auth-provider";
import {
  BookingCardCompact,
  EmptyBookings,
  LoginPrompt,
  BookingsBackground,
} from "@/components/bookings";
import { BookingWithEvent } from "@/features/booking/types/booking-with-event";

const MemoizedNavbar = memo(Navbar);

function CursorWrapper() {
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const uniqueId = Date.now() + Math.random();
      setCursorTrail(prev => {
        const newTrail = [...prev, { id: uniqueId, x: e.clientX, y: e.clientY }];
        return newTrail.slice(-12);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverTarget = target.closest('a, button, [role="button"], input, textarea, select, [data-hover]');
      setIsHovering(!!isHoverTarget);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [cursorX, cursorY]);

  return (
    <CustomCursor
      cursorX={cursorX}
      cursorY={cursorY}
      cursorTrail={cursorTrail}
      isClicking={isClicking}
      isHovering={isHovering}
    />
  );
}

function StatCard({ value, label, color = "purple" }: { value: number; label: string; color?: string }) {
  const colorConfig = {
    purple: {
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      border: "border-purple-500/20",
      text: "text-purple-400",
      glow: "shadow-purple-500/10",
      icon: "bg-purple-500/20"
    },
    green: {
      gradient: "from-green-500/10 via-green-500/5 to-transparent",
      border: "border-green-500/20",
      text: "text-green-400",
      glow: "shadow-green-500/10",
      icon: "bg-green-500/20"
    },
    amber: {
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      border: "border-amber-500/20",
      text: "text-amber-400",
      glow: "shadow-amber-500/10",
      icon: "bg-amber-500/20"
    },
  };

  const config = colorConfig[color as keyof typeof colorConfig];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gradient-to-br ${config.gradient} backdrop-blur-sm rounded-2xl p-6 border ${config.border} ${config.glow} shadow-lg overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className={`text-4xl md:text-5xl font-bold ${config.text} mb-2`}>{value}</div>
        <div className="text-xs md:text-sm text-white/40 uppercase tracking-wider">{label}</div>
      </div>

      <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${config.icon} rounded-full blur-2xl opacity-20`} />
    </motion.div>
  );
}

export default function BookingsPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', user?.userId],
    queryFn: async () => {
      if (!user?.userId) {
        throw new Error('User not authenticated');
      }
      const response = await bookingService.getBookingsByUserId(user.userId);
      if (response.statusCode === 200 && response.payload) {
        return response.payload;
      }
      throw new Error(response.error || 'Failed to load bookings');
    },
    enabled: isAuthenticated && !!user?.userId,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await bookingService.deleteBooking({ id: bookingId });
      if (response.statusCode !== 200) {
        throw new Error(response.error || 'Failed to cancel booking');
      }
      return response.payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.userId] });
    },
  });

  const handleCancelBooking = useCallback((bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      cancelBookingMutation.mutate(bookingId);
    }
  }, [cancelBookingMutation]);

  const bookings = data || [];
  const now = new Date();
  
  const upcomingBookings = bookings.filter((b: BookingWithEvent) => 
    b.eventDatetime && new Date(b.eventDatetime) >= now
  ).sort((a: BookingWithEvent, b: BookingWithEvent) => 
    new Date(a.eventDatetime).getTime() - new Date(b.eventDatetime).getTime()
  );
  
  const pastBookings = bookings.filter((b: BookingWithEvent) => 
    !b.eventDatetime || new Date(b.eventDatetime) < now
  ).sort((a: BookingWithEvent, b: BookingWithEvent) => 
    new Date(b.eventDatetime).getTime() - new Date(a.eventDatetime).getTime()
  );

  const filteredBookings = filter === 'upcoming' ? upcomingBookings 
    : filter === 'past' ? pastBookings 
    : [...upcomingBookings, ...pastBookings];

  const totalTickets = bookings.reduce((sum: number, b: BookingWithEvent) => sum + b.quantity, 0);

  if (authLoading || (isAuthenticated && isLoading)) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white cursor-none">
        <CursorWrapper />
        <MemoizedNavbar />
        <BookingsBackground />
        <div className="relative z-10 pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <LoginPrompt />
          </div>
        </div>
        <FloatingChat />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white cursor-none">
        <CursorWrapper />
        <MemoizedNavbar />
        <BookingsBackground />
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-white/40 text-sm">{error instanceof Error ? error.message : 'Please try again later.'}</p>
          </div>
        </div>
        <FloatingChat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white cursor-none [&_a]:cursor-none [&_button]:cursor-none">
      <CursorWrapper />
      <MemoizedNavbar />
      <BookingsBackground />

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <p className="text-purple-400/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
                  Your Journey
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
                  My{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Bookings
                  </span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-2xl">
                  Track your upcoming cosmic adventures and manage your reservations
                </p>
              </div>
              <Link href="/event">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 hover:from-purple-500/30 hover:to-fuchsia-500/30 text-white font-medium rounded-xl border border-purple-500/30 transition-all duration-300 cursor-none shadow-lg shadow-purple-500/10"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Browse Events
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-fuchsia-500/0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {bookings.length === 0 ? (
            <EmptyBookings />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10"
              >
                <StatCard value={upcomingBookings.length} label="Upcoming Events" color="green" />
                <StatCard value={pastBookings.length} label="Past Events" color="purple" />
                <StatCard value={totalTickets} label="Total Tickets" color="amber" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                <div className="flex gap-1 p-1.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/5">
                  {[
                    { key: 'all', label: 'All', count: bookings.length },
                    { key: 'upcoming', label: 'Upcoming', count: upcomingBookings.length },
                    { key: 'past', label: 'Past', count: pastBookings.length },
                  ].map((tab) => (
                    <motion.button
                      key={tab.key}
                      onClick={() => setFilter(tab.key as typeof filter)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative px-6 py-2.5 text-sm font-medium rounded-lg transition-all cursor-none ${
                        filter === tab.key
                          ? 'bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 text-white shadow-lg shadow-purple-500/20'
                          : 'text-white/50 hover:text-white/80 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="relative z-10">{tab.label}</span>
                      <span className={`ml-2 text-xs ${filter === tab.key ? 'text-white/70' : 'text-white/30'}`}>
                        {tab.count}
                      </span>
                      {filter === tab.key && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {filteredBookings.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 px-4"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 mb-4">
                      <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white/60 mb-2">No {filter} bookings found</h3>
                    <p className="text-white/30 text-sm">Your {filter} bookings will appear here</p>
                  </motion.div>
                ) : (
                  filteredBookings.map((booking: BookingWithEvent, index: number) => (
                    <BookingCardCompact
                      key={booking.id}
                      booking={booking}
                      index={index}
                      onCancelBooking={handleCancelBooking}
                    />
                  ))
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>

      <FloatingChat />
    </div>
  );
}

