import { useState, useEffect, useRef } from 'react';
import { 
  Scissors, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Menu, 
  X, 
  ChevronRight,
  MessageCircle,
  Baby,
  Heart,
  CreditCard,
  Calendar,
  Sparkles,
  User,
  Shield,
  Accessibility
} from 'lucide-react';

// Types
interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// Sample gallery images using the provided salon photos
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    alt: "Pars Hairstyling salon interior with professional setup"
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    alt: "Hair styling station with mirrors and tools"
  },
  {
    src: "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=800&q=80",
    alt: "Professional haircut in progress"
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
    alt: "Kid's first haircut experience"
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80",
    alt: "Gentle care for baby's first haircut"
  },
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    alt: "Pars Hairstyling salon storefront in Eindhoven"
  }
];

// Initial reviews data
const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sarah de Vries",
    rating: 5,
    comment: "Friendly service and good atmosphere. The staff made me feel right at home!",
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "Mark van den Berg",
    rating: 5,
    comment: "He gave me advice about my haircut and we had a great conversation. Really knows his craft!",
    date: "2024-12-10"
  },
  {
    id: 3,
    name: "Emma Jansen",
    rating: 5,
    comment: "A nice barbershop run by a friendly owner. My go-to place in Eindhoven!",
    date: "2024-12-05"
  },
  {
    id: 4,
    name: "Thomas Bakker",
    rating: 5,
    comment: "Great attention to detail and very professional. Highly recommend!",
    date: "2024-11-28"
  }
];

// Services data
const services = [
  {
    icon: <Scissors className="w-8 h-8" />,
    title: "Haircuts",
    description: "Expert cuts for men, women, and children. From classic styles to modern trends.",
    for: "Men / Women / Kids"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Hair Styling & Grooming",
    description: "Professional styling for any occasion. Look your best for events or everyday life.",
    for: "All hair types"
  },
  {
    icon: <User className="w-8 h-8" />,
    title: "Beard Trimming & Shaping",
    description: "Precision beard grooming to complement your haircut and facial features.",
    for: "Men"
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Hair Consultation",
    description: "Personalized advice on the best styles and treatments for your hair type and face shape.",
    for: "Free consultation"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Maintenance & Touch-ups",
    description: "Quick trims and touch-ups to keep your style looking fresh between full cuts.",
    for: "All clients"
  }
];

// Experience features
const experienceFeatures = [
  {
    icon: <User className="w-6 h-6" />,
    title: "Personalized Style Consultation",
    description: "Every visit begins with understanding your unique style preferences and lifestyle needs."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Hair Health Advice",
    description: "Expert tips on maintaining healthy hair and recommendations for the right products."
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: "Modern & Classic Cuts",
    description: "Whether you want the latest trend or a timeless classic, we deliver perfection."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Customer Comfort Experience",
    description: "Relax in a welcoming environment with attention to your comfort throughout the visit."
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const reviewFormRef = useRef<HTMLFormElement>(null);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Calculate average rating
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <Scissors className="w-8 h-8 text-[#C9A962]" />
              <span className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                Pars<span className="text-[#C9A962]">.</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-gray-300 hover:text-[#C9A962] transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('booking')}
                className="px-5 py-2.5 bg-[#C9A962] text-[#1A1A1A] font-semibold rounded-full hover:bg-[#D4BC7E] transition-all duration-200 text-sm"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass mt-3 mx-4 rounded-2xl p-4 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {['About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-gray-300 hover:text-[#C9A962] transition-colors py-2"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('booking')}
                className="w-full py-3 bg-[#C9A962] text-[#1A1A1A] font-semibold rounded-full"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
            alt="Pars Hairstyling salon interior"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className={`transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Rating Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30 mb-8">
              <Star className="w-4 h-4 text-[#C9A962] fill-[#C9A962]" />
              <span className="text-sm font-medium text-[#C9A962]">{averageRating} Rating</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-300">{reviews.length}+ Reviews</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Pars<span className="text-[#C9A962]">.</span>Hairstyling
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 font-light max-w-3xl mx-auto" style={{ fontFamily: 'Playfair Display, serif' }}>
              Expert Hair Styling in Eindhoven
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              With a Personal Touch — Where professionalism meets warmth, and every haircut tells a story.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('booking')}
                className="group px-8 py-4 bg-[#C9A962] text-[#1A1A1A] font-semibold rounded-full hover:bg-[#D4BC7E] transition-all duration-300 flex items-center space-x-2 text-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:+31618420338"
                className="group px-8 py-4 border-2 border-[#C9A962] text-[#C9A962] font-semibold rounded-full hover:bg-[#C9A962] hover:text-[#1A1A1A] transition-all duration-300 flex items-center space-x-2 text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Location Badge */}
            <div className="mt-12 flex items-center justify-center space-x-2 text-gray-400">
              <MapPin className="w-4 h-4 text-[#C9A962]" />
              <span className="text-sm">Grote Berg 52, 5611 KL Eindhoven, Netherlands</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#C9A962]/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#C9A962] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80"
                  alt="Pars Hairstyling professional at work"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#C9A962] text-[#1A1A1A] p-6 rounded-2xl shadow-2xl">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm font-medium">Years Experience</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-[#C9A962] font-medium mb-4 tracking-wider uppercase text-sm">About Us</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Where Style Meets <span className="text-[#C9A962]">Warmth</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  At Pars Hairstyling, we believe that a great haircut is more than just a service—it's an experience. 
                  Located in the heart of Eindhoven, our salon has been a trusted destination for those seeking 
                  professional styling with a personal touch.
                </p>
                <p>
                  Our friendly and welcoming atmosphere sets us apart. From the moment you walk in, you'll feel 
                  at ease. Our experienced hairdresser takes the time to understand your needs, offering 
                  personalized advice that suits your lifestyle and preferences.
                </p>
                <p>
                  Whether you're looking for a bold new look or maintaining your signature style, we're here 
                  to make sure you leave feeling confident and refreshed. Great conversations, expert care, 
                  and a clean, comfortable environment—that's the Pars promise.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Friendly & Welcoming",
                  "Expert Styling Advice", 
                  "Clean & Comfortable",
                  "Great Conversations"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#C9A962] rounded-full" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 bg-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[#C9A962] font-medium mb-4 tracking-wider uppercase text-sm">Our Services</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Premium <span className="text-[#C9A962]">Hair Care</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From classic cuts to modern styling, we offer a full range of services tailored to your needs.
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-[#1A1A1A] border border-[#C9A962]/20 hover:border-[#C9A962]/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-xl bg-[#C9A962]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A962]/20 transition-colors">
                  <div className="text-[#C9A962]">{service.icon}</div>
                </div>
                <span className="text-xs font-medium text-[#C9A962] uppercase tracking-wider">{service.for}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 sm:py-32 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[#C9A962] font-medium mb-4 tracking-wider uppercase text-sm">The Pars Difference</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Hair Care & <span className="text-[#C9A962]">Style Experience</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We go beyond the cut. Discover what makes every visit to Pars Hairstyling special.
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {experienceFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A] border border-[#C9A962]/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#C9A962] flex items-center justify-center mb-4 text-[#1A1A1A]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 sm:py-32 bg-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[#C9A962] font-medium mb-4 tracking-wider uppercase text-sm">Testimonials</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our <span className="text-[#C9A962]">Clients Say</span>
            </h2>
            
            {/* Rating Summary */}
            <div className="inline-flex items-center space-x-4 px-8 py-4 rounded-2xl bg-[#1A1A1A] border border-[#C9A962]/20">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#C9A962]">{averageRating}</p>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(parseFloat(averageRating)) ? 'text-[#C9A962] fill-[#C9A962]' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px bg-[#C9A962]/20" />
              <div className="text-left">
                <p className="text-2xl font-bold">{reviews.length}</p>
                <p className="text-gray-400 text-sm">Happy Reviews</p>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-200 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#C9A962]/10 hover:border-[#C9A962]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A962]/20 flex items-center justify-center">
                      <span className="text-[#C9A962] font-semibold">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-[#C9A962] fill-[#C9A962]' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">"{review.comment}"</p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-400 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-8 rounded-2xl bg-[#1A1A1A] border border-[#C9A962]/20">
              <h3 className="text-xl font-semibold mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                Share Your Experience
              </h3>
              <form ref={reviewFormRef} onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#2D2D2D] border border-[#C9A962]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] transition-colors"
                    required
                  />
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-[#2D2D2D] border border-[#C9A962]/20 text-white focus:outline-none focus:border-[#C9A962] transition-colors"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>{rating} Stars</option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Share your experience..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#2D2D2D] border border-[#C9A962]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] transition-colors resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C9A962] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#D4BC7E] transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 sm:py-32 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[#C9A962] font-medium mb-4 tracking-wider uppercase text-sm">Gallery</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Inside Our <span className="text-[#C9A962]">Salon</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Take a look at our welcoming space and the work we do.
            </p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-1000 delay-200 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-xl ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 sm:py-32 bg-gradient-to-br from-[#C9A962] to-[#A68B4B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${visibleSections.has('booking') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Calendar className="w-16 h-16 text-[#1A1A1A] mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Book Your Appointment
            </h2>
            <p className="text-[#1A1A1A]/80 text-lg mb-10 max-w-2xl mx-auto">
              Ready for a fresh look? Book your appointment today and experience the Pars difference. 
              We recommend booking in advance to secure your preferred time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+31618420338"
                className="group px-8 py-4 bg-[#1A1A1A] text-white font-semibold rounded-full hover:bg-[#2D2D2D] transition-all duration-300 flex items-center space-x-3 text-lg shadow-xl"
              >
                <Phone className="w-5 h-5" />
                <span>+31 6 18420338</span>
              </a>
              <a
                href="https://wa.me/31618420338"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-white text-[#1A1A1A] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3 text-lg shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center space-x-2 text-[#1A1A1A]/70">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Appointment Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 bg-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Contact Info */}
            <div>
              <p className="text-[#C9A962] font-medium mb-4 tracking-wider uppercase text-sm">Contact Us</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Visit Us in <span className="text-[#C9A962]">Eindhoven</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Located in the vibrant center of Eindhoven, we're easy to find and always happy to welcome you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-gray-400">Grote Berg 52, 5611 KL</p>
                    <p className="text-gray-400">Eindhoven, Netherlands</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href="tel:+31618420338" className="text-gray-400 hover:text-[#C9A962] transition-colors">
                      +31 6 18420338
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <p className="text-gray-400">By Appointment Only</p>
                    <p className="text-gray-500 text-sm">Contact us to schedule</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-96 rounded-2xl overflow-hidden border border-[#C9A962]/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.015362710891!2d5.4768!3d51.4416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6d9c2b1c4b5b5%3A0x1234567890abcdef!2sGrote%20Berg%2052%2C%205611%20KL%20Eindhoven%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pars Hairstyling Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Extra Info Section */}
      <section id="info" className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${visibleSections.has('info') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Accessibility */}
            <div className="p-6 rounded-xl bg-[#2D2D2D] border border-[#C9A962]/10 text-center">
              <Accessibility className="w-8 h-8 text-[#C9A962] mx-auto mb-3" />
              <h4 className="font-semibold text-sm mb-2">Accessibility</h4>
              <p className="text-gray-500 text-xs">Wheelchair accessible entrance & parking</p>
            </div>

            {/* Family Friendly */}
            <div className="p-6 rounded-xl bg-[#2D2D2D] border border-[#C9A962]/10 text-center">
              <Baby className="w-8 h-8 text-[#C9A962] mx-auto mb-3" />
              <h4 className="font-semibold text-sm mb-2">Family Friendly</h4>
              <p className="text-gray-500 text-xs">Good for kids of all ages</p>
            </div>

            {/* LGBTQ+ Friendly */}
            <div className="p-6 rounded-xl bg-[#2D2D2D] border border-[#C9A962]/10 text-center">
              <Heart className="w-8 h-8 text-[#C9A962] mx-auto mb-3" />
              <h4 className="font-semibold text-sm mb-2">Inclusive Space</h4>
              <p className="text-gray-500 text-xs">LGBTQ+ friendly & Transgender safe space</p>
            </div>

            {/* Payment */}
            <div className="p-6 rounded-xl bg-[#2D2D2D] border border-[#C9A962]/10 text-center">
              <CreditCard className="w-8 h-8 text-[#C9A962] mx-auto mb-3" />
              <h4 className="font-semibold text-sm mb-2">Payment</h4>
              <p className="text-gray-500 text-xs">NFC mobile payments accepted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0F0F0F] border-t border-[#C9A962]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Scissors className="w-8 h-8 text-[#C9A962]" />
                <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Pars<span className="text-[#C9A962]">.</span>Hairstyling
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Expert hair styling in Eindhoven with a personal touch. Where professionalism meets warmth.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center text-gray-400 hover:text-[#C9A962] hover:bg-[#C9A962]/10 transition-all" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center text-gray-400 hover:text-[#C9A962] hover:bg-[#C9A962]/10 transition-all" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-[#C9A962] transition-colors text-sm"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Grote Berg 52</li>
                <li>5611 KL Eindhoven</li>
                <li>Netherlands</li>
                <li className="pt-2">
                  <a href="tel:+31618420338" className="text-[#C9A962] hover:underline">
                    +31 6 18420338
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#C9A962]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Pars Hairstyling. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-[#C9A962] fill-[#C9A962]" />
              <span className="text-sm text-gray-400">{averageRating} rating • {reviews.length} reviews</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
