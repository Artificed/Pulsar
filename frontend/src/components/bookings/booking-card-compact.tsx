'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookingWithEvent } from "@/features/booking/types/booking-with-event";

interface BookingCardProps {
  booking: BookingWithEvent;
  index: number;
  onCancelBooking?: (bookingId: string) => void;
}

function formatEventDate(datetime: string) {
  const date = new Date(datetime);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
  };
}

function getTimeUntil(datetime: string) {
  const eventDate = new Date(datetime);
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMs < 0) return { label: 'Completed', isPast: true, isUrgent: false };
  if (diffHours < 24) return { label: `${diffHours}h left`, isPast: false, isUrgent: true };
  if (diffDays < 7) return { label: `${diffDays}d left`, isPast: false, isUrgent: false };
  return { label: `${diffDays} days`, isPast: false, isUrgent: false };
}

export default function BookingCardCompact({ booking, index, onCancelBooking }: BookingCardProps) {
  const router = useRouter();
  const dateInfo = booking.eventDatetime ? formatEventDate(booking.eventDatetime) : null;
  const timeInfo = booking.eventDatetime ? getTimeUntil(booking.eventDatetime) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative ${timeInfo?.isPast ? 'opacity-60' : ''}`}
    >
      <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-purple-500/20 transition-all duration-300">
        {dateInfo && (
          <div className="flex-shrink-0 w-16 text-center">
            <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-xl p-2 border border-purple-500/10">
              <div className="text-[10px] text-purple-400 font-medium">{dateInfo.month}</div>
              <div className="text-2xl font-bold text-white leading-none">{dateInfo.day}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{dateInfo.weekday}</div>
            </div>
          </div>
        )}

        <div className="flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden">
          {booking.eventImageUrl ? (
            <img
              src={booking.eventImageUrl}
              alt={booking.eventTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                {booking.eventTitle}
              </h3>
              <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
                <span>{booking.eventLocation}</span>
                {dateInfo && (
                  <>
                    <span>•</span>
                    <span>{dateInfo.time}</span>
                  </>
                )}
              </div>
            </div>

            {timeInfo && (
              <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium ${
                timeInfo.isPast 
                  ? 'bg-white/5 text-white/40' 
                  : timeInfo.isUrgent 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {timeInfo.label}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white/50">
                <span className="text-white font-medium">{booking.quantity}</span> ticket{booking.quantity !== 1 ? 's' : ''}
              </span>
              <span className="text-white/30">•</span>
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                ${(booking.eventPrice * booking.quantity).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => router.push(`/event/${booking.eventId}`)}
                className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors cursor-none"
              >
                View
              </button>
              {!timeInfo?.isPast && onCancelBooking && (
                <button
                  onClick={() => onCancelBooking(booking.id)}
                  className="text-xs px-3 py-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors cursor-none"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
