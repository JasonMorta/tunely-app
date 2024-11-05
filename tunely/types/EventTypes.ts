// src/types/EventTypes.ts

// Venue Opening Hours Interface
// Example structure: { "Monday": "8 am–12 am", "Tuesday": "8 am–12 am", ... }
export interface VenueOpeningHours {
  Monday?: string;
  Tuesday?: string;
  Wednesday?: string;
  Thursday?: string;
  Friday?: string;
  Saturday?: string;
  Sunday?: string;
  [key: string]: string | undefined; // Add index signature
}

// Performer Contact Interface
interface PerformerContact {
  alternativeContact?: {
    email?: string[];
    name?: string;
    phone?: string;
  };
  email?: string | string[];
  name?: string;
  phone?: string;
  website?: string;
}

// Performer Social Media Interface
interface PerformerSocialMedia {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string;
  pinterest?: string;
  reddit?: string;
  snapchat?: string;
  tiktok?: string | null;
  twitter?: string;
  whatsapp?: string;
  youtube?: string;
}

// Performer Interface
interface Performer {
  contact?: string | PerformerContact;
  email?: string;
  image?: string;
  name?: string;
  otherLinks?: Record<string, string>;
  performerImage?: string;
  socialMedia?: PerformerSocialMedia;
}

// Venue Accessibility Interface
interface VenueAccessibility {
  [key: string]: any; // Define specific keys if known
}

// Venue Amenities Interface
interface VenueAmenities {
  [key: string]: any; // Define specific keys if known
}

// Venue Contact Interface
interface VenueContact {
  [key: string]: any; // Define specific keys if known
}

// Venue Social Media Interface
interface VenueSocialMedia {
  [key: string]: any; // Define specific keys if known
}

// Venue Links Interface
interface VenueLinks {
  [key: string]: string;
}

interface Attending {
  total: number;
  confirmed: number;
  interested: number;
}

// Venue Interface
export interface Venue {
  accessibility?: VenueAccessibility;
  address?: string;
  amenities?: VenueAmenities;
  capacity?: number;
  contact?: VenueContact;
  name?: string;
  openingHours?: VenueOpeningHours; // Updated to use the VenueOpeningHours type
  socialMedia?: VenueSocialMedia;
  venueLinks?: VenueLinks;
  images?: [string];
}

// Event Date Interface
interface EventDate {
  endDay?: string;
  endTime?: string;
  startDay?: string;
  startTime?: string;
}

// Links Interface
interface EventLinks {
  eventPageLink?: string;
  soundCloudLink?: string;
  spotifyLink?: string;
  ticketLink?: string;
}

// Organizer Interface
interface Organizer {
  email?: string;
  name?: string;
  phone?: string;
  website?: string;
}

// Pricing Interface
interface Pricing {
  currency?: string;
  price?: string;
  discounts?: any[]; // Define specific structure if known
  ticketTypes?: any[]; // Define specific structure if known
}

// Recurrence Interface
interface Recurrence {
  endDate?: string;
  frequency?: string;
  interval?: number;
  isRecurring?: boolean;
}

// Social Media Interface
interface EventSocialMedia {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string;
  pinterest?: string;
  reddit?: string;
  snapchat?: string;
  tiktok?: string | null;
  twitter?: string;
  whatsapp?: string;
  youtube?: string;
}

// Sponsor Interface
interface Sponsor {
  [key: string]: any; // Define specific keys if known
}

// Media Interface
interface Media {
  images?: any[]; // Define specific structure if known
}

interface Likes {
  likes: number;
  dislikes: number;
}

// Venue within Event Interface (for some events)
interface EventVenue {
  accessibility?: VenueAccessibility;
  address?: string;
  amenities?: VenueAmenities;
  capacity?: number;
  name?: string;
  openingHours?: VenueOpeningHours; // Updated to use the VenueOpeningHours type
  venueLinks?: VenueLinks;
}

// Main Event Interface with All Optional Fields
export interface EventData {
  id?: string; // Optional id field
  PERFORMER?: Performer;
  VENUE?: Venue;
  additionalInfo?: string;
  ageRestriction?: string;
  approved?: boolean;
  covidPolicies?: string;
  createdAt?: string;
  createdBy?: string;
  description?: string;
  entryRequirements?: string;
  eventDate?: EventDate;
  insurance?: string;
  links?: EventLinks;
  organizer?: Organizer;
  permits?: string;
  pricing?: Pricing;
  recurrence?: Recurrence;
  status?: string;
  updatedAt?: string;
  updatedBy?: string;
  contact?: any; // For some events
  performerName?: string; // For some events
  media?: Media;
  time?: string; // For some events
  venue?: EventVenue; // For some events
  sponsors?: Sponsor[][];
  socialMedia?: EventSocialMedia;
  likes?: Likes;
  attending?: Attending;
}
