export const BUSINESS_INFO = {
  name: "The Steak House on The Verandah",
  legalName: "The Steak House on The Verandah at Devon House",
  tagline: "Prime Dry-Aged Steaks & Caribbean Fusion on the Historic Devon House Verandah",
  cuisine: "Fine Dining Steakhouse & Caribbean Fusion",
  address: {
    street: "Devon House, 26 Hope Road",
    city: "Kingston 10",
    state: "Kingston",
    zip: "Jamaica, W.I.",
    formatted: "Devon House, 26 Hope Road, Kingston 10, Jamaica, W.I.",
  },
  coordinates: {
    lat: 18.0148763,
    lng: -76.7898652
  },
  phone: "+1 876-616-8831",
  secondaryPhone: "+1 876-403-6249",
  website: "steakhouseja.com",
  email: "reservations@steakhouseja.com",
  googleMapsLink: "https://www.google.com/maps/place/The+Steak+House+on+The+Verandah/@18.0148763,-76.7898652,17z",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=18.0148763,-76.7898652&t=&z=16&ie=UTF8&iwloc=&output=embed",
  
  hours: [
    { day: "Monday", open: "Closed", close: "Closed", note: "Private Events Available" },
    { day: "Tuesday", open: "11:30 AM", close: "10:00 PM", note: "Lunch & Dinner" },
    { day: "Wednesday", open: "11:30 AM", close: "10:00 PM", note: "Lunch & Dinner" },
    { day: "Thursday", open: "11:30 AM", close: "10:00 PM", note: "Lunch & Dinner" },
    { day: "Friday", open: "11:30 AM", close: "10:00 PM", note: "Verandah Acoustic Evenings" },
    { day: "Saturday", open: "11:30 AM", close: "10:00 PM", note: "Chef's Reserve Cuts" },
    { day: "Sunday", open: "11:30 AM", close: "10:00 PM", note: "Sunday Verandah Roasts" },
  ],

  history: [
    {
      year: "1881",
      title: "The Devon House Legacy",
      description: "George Stiebel, Jamaica's first black millionaire, built Devon House as a monument of Caribbean architectural magnificence and enduring hospitality."
    },
    {
      year: "2017",
      title: "Birth of The Verandah Steak House",
      description: "Crafted on the sweeping terrace of Devon House to marry traditional dry-aged prime butchery with Jamaica's bold culinary terroir and fresh mountain herbs."
    },
    {
      year: "2021",
      title: "Kingston's Culinary Benchmark",
      description: "Awarded critical acclaim for pioneering Scotch Bonnet Bone Marrow, Pimento-Smoked Ribeyes, and cellar-aged Jamaican rum cocktails."
    },
    {
      year: "Present",
      title: "An Unrivaled Dining Tradition",
      description: "Welcoming international dignitaries, local food connoisseurs, and celebratory gatherings for an unforgettable evening under the Kingston stars."
    }
  ],

  owner: {
    name: "Chef Brian & The Verandah Culinary Guild",
    role: "Executive Culinary Directors",
    quote: "Dining on the Verandah is a sensory journey. We honor historic Devon House by sourcing the finest cuts, aging them with artisanal patience, and infusing authentic Jamaican flavors like scotch bonnet, pimento wood smoke, and Blue Mountain herbs."
  },

  reviews: [
    {
      author: "Camille M.",
      location: "Kingston, Jamaica",
      source: "Google Review",
      rating: 5,
      date: "2 weeks ago",
      comment: "Unquestionably the best steakhouse in Jamaica. The 28-day dry-aged bone-in ribeye with the Scotch bonnet compound butter is transcendent. Dining on the lit verandah overlooking the gardens made our anniversary truly magical."
    },
    {
      author: "Julian T.",
      location: "Miami, FL",
      source: "TripAdvisor",
      rating: 5,
      date: "1 month ago",
      comment: "Whenever I fly into Kingston, dinner at The Steak House on the Verandah is mandatory. The pumpkin shrimp bisque followed by the smoked herring pasta was incredible. Outstanding wine list and impeccable service."
    },
    {
      author: "Dr. Andrew K.",
      location: "St. Andrew, Jamaica",
      source: "Google Review",
      rating: 5,
      date: "3 weeks ago",
      comment: "The ambiance at Devon House is unmatched. We had a party of 8 on the garden verandah; every steak was cooked to absolute perfection. The rum old fashioned crafted with 12-year reserve Jamaican rum is a work of art."
    },
    {
      author: "Nathalie S.",
      location: "London, UK",
      source: "Google Review",
      rating: 5,
      date: "2 months ago",
      comment: "Five stars in every department. World-class hospitality, tender USDA prime cuts, and an atmosphere that whispers colonial elegance. Do not skip the Scotch bonnet roasted bone marrow!"
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours() + now.getMinutes() / 60;
  
  if (day === 1) return false; // Monday closed
  return hour >= 11.5 && hour < 22; // 11:30 AM to 10:00 PM
};
