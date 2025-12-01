'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { eventService } from "@/features/event/api/event-service";
import { Event } from "@/features/event/types/event";
import {
  CosmicBackground,
  EventsGrid,
  EventsHeader,
  FeaturedEventCard,
  LoadingSpinner,
  mockEvents,
} from "@/components/events";

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
    return <LoadingSpinner />;
  }

  const featuredEvent = events[0];
  const otherEvents = events.slice(1);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <CosmicBackground />

      <div className="relative z-10">
        <div className="pt-32 md:pt-36 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <EventsHeader />
              <div className="flex-1 w-full">
                <FeaturedEventCard event={featuredEvent} />
              </div>
            </div>
          </div>
        </div>

        <EventsGrid events={otherEvents} />

        <div className="h-16" />
      </div>
    </div>
  );
}
