import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Star, TreePine, Mountain, Waves } from 'lucide-react';
import { useTouristSpots } from '../context/TouristSpotsContext';
import TouristSpotCard from '../components/TouristSpotCard';

const Home = () => {
  const { spots } = useTouristSpots();
  const featuredSpots = spots.slice(0, 6);
  const traditionalSpots = spots.filter(s => s.category === 'Traditional').slice(0, 6);
  const openSpots = spots.filter(spot => spot.isOpen).length;
  const totalSpots = spots.length;

  // Hero background images for the slider (custom: 2 dance + tourist spots)
  const heroImages = [
    'https://imgs.search.brave.com/ltBaBSPNbhzX3LThH4kRDgi_C7FVjGh__iY33vFOYQI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/bWVkaWEudGVzdGJv/b2suY29tL2Jsb2cv/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDcvZm9say1tdXNp/Yy1vZi1qaGFya2hh/bmQtNGVjZWU4MmMu/anBn',
    'https://imgs.search.brave.com/aYLlGrHA7sTe-RAbHqsp9WACDmChB1XUjOtFsxU_3xI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzJmL0NoaGF1X05y/aXR5YV8oNikuanBn',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpL7wuwiM0-HPJzKygiip4k9rJqv0BM4RL6Q&s', // Betla National Park
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // fallback tourist
    'https://images.unsplash.com/photo-1464983953574-0892a716854b', // fallback tourist
  ];

  // Sprite strip technique for seamless sliding
  const [currentImage, setCurrentImage] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentImage, heroImages.length]);

  // For the sprite strip, create a long div with all images side by side
  // We'll use a flex row and translateX to slide

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Sprite strip sliding background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-[2000ms] ease-in-out"
            style={{
              width: `${heroImages.length * 100}vw`,
              transform: `translateX(-${currentImage * 100}vw)`
            }}
          >
            {heroImages.map((img, idx) => (
              <div
                key={img + idx}
                className="h-full w-screen bg-cover bg-center opacity-40 border-4 border-red-500"
                style={{
                  backgroundImage: `url('${img}')`,
                  minWidth: '100vw',
                  minHeight: '100vh',
                  backgroundColor: '#eee',
                }}
              >
                {/* Fallback text for debugging */}
                <noscript>
                  <span className="text-red-700 bg-white p-2 block">Image failed to load</span>
                </noscript>
              </div>
            ))}
          </div>
        </div>
  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-900 to-green-800 z-10" style={{opacity:0.35}} />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the Beauty of 
            <span className="text-emerald-300 block">Jharkhand</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            From majestic waterfalls to serene forests, explore the hidden gems of India's heartland
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/explore"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Exploring</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/roomstay"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Find Accommodation
            </Link>
          </div>
        </div>
      </div>

      {/* Traditional Tourism */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Traditional Tourism</h2>
            <p className="text-xl text-gray-600">Explore Jharkhand’s heritage, arts, and pilgrimage sites</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {traditionalSpots.map(spot => (
              <TouristSpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalSpots}+</div>
              <div className="text-gray-600">Tourist Destinations</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{openSpots}</div>
              <div className="text-gray-600">Currently Open</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">4.3</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">Live Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600">Discover the most popular attractions in Jharkhand</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpots.map(spot => (
              <TouristSpotCard key={spot.id} spot={spot} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/explore"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Destinations</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-xl text-gray-600">Find attractions that match your interests</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Mountain className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Hill Stations</h3>
              <p className="text-green-100">Experience the cool climate and scenic beauty of Jharkhand's hills</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Waves className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Waterfalls</h3>
              <p className="text-blue-100">Discover majestic cascades and natural pools in pristine settings</p>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <TreePine className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">National Parks</h3>
              <p className="text-orange-100">Explore diverse wildlife and lush forests in protected reserves</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Plan Your Perfect Trip</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Book your accommodations and start your Jharkhand adventure today
          </p>
          <Link 
            to="/roomstay"
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-colors inline-flex items-center space-x-2"
          >
            <span>Find Hotels & Resorts</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

