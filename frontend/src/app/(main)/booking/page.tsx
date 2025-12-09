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
  const colorClasses = {
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400",
    green: "from-green-500/20 to-green-500/5 border-green-500/20 text-green-400",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-4 border`}>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/50 mt-0.5">{label}</div>
    </div>
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

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <p className="text-white/40 text-sm mt-1">
                  {user?.email}
                </p>
              </div>
              <Link href="/event">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg border border-purple-500/20 transition-colors cursor-none"
                >
                  Browse Events
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
                transition={{ delay: 0.05 }}
                className="grid grid-cols-3 gap-3 mb-8"
              >
                <StatCard value={upcomingBookings.length} label="Upcoming" color="green" />
                <StatCard value={pastBookings.length} label="Completed" color="purple" />
                <StatCard value={totalTickets} label="Total Tickets" color="amber" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-1 p-1 bg-white/[0.03] rounded-lg mb-6 w-fit"
              >
                {[
                  { key: 'all', label: `All (${bookings.length})` },
                  { key: 'upcoming', label: `Upcoming (${upcomingBookings.length})` },
                  { key: 'past', label: `Past (${pastBookings.length})` },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as typeof filter)}
                    className={`px-4 py-2 text-sm rounded-md transition-all cursor-none ${
                      filter === tab.key
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="space-y-3"
              >
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-12 text-white/30">
                    No {filter} bookings found
                  </div>
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

