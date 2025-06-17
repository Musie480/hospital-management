import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample image data
const images = [
  {
    src: "/gallery/doctor1.jpg",
    title: "Dr. Sarah Ahmed",
    description: "Cardiologist with 15+ years experience. Specializes in minimally invasive procedures.",
    category: "staff"
  },
  {
    src: "/gallery/room1.jpg",
    title: "Intensive Care Unit",
    description: "Modern ICU facility with round-the-clock monitoring and specialized care.",
    category: "facilities"
  },
  {
    src: "/gallery/equipment1.jpg",
    title: "MRI Machine",
    description: "High-resolution 3T MRI system for precise diagnostic imaging.",
    category: "equipment"
  },
  {
    src: "/gallery/doctor2.jpg",
    title: "Dr. James Wilson",
    description: "Neurologist with expertise in stroke prevention and treatment.",
    category: "staff"
  },
  {
    src: "/gallery/room2.jpg",
    title: "Operating Theater",
    description: "State-of-the-art surgical suite with advanced robotics.",
    category: "facilities"
  },
  {
    src: "/gallery/equipment2.jpg",
    title: "CT Scanner",
    description: "128-slice CT scanner for rapid and detailed imaging.",
    category: "equipment"
  },
  {
    src: "/gallery/doctor3.jpg",
    title: "Dr. Maria Garcia",
    description: "Pediatric specialist with 10 years of experience.",
    category: "staff"
  },
  {
    src: "/gallery/room3.jpg",
    title: "Rehabilitation Center",
    description: "Modern facilities for physical therapy and recovery.",
    category: "facilities"
  },
];

// Categories for filtering
const categories = [
  { id: "all", label: "All" },
  { id: "staff", label: "Medical Staff" },
  { id: "facilities", label: "Facilities" },
  { id: "equipment", label: "Equipment" },
];

const GalleryModal = ({ image, onClose, onNext, onPrev }) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="relative h-[50vh] lg:h-full bg-gray-200 border-2 border-dashed">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                    <p className="mt-2 text-gray-500">Image: {image.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col">
                <div className="mb-6">
                  <span className="inline-block bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">{image.title}</h2>
                  <div className="w-16 h-1 bg-teal-500 mb-4 rounded-full"></div>
                  <p className="text-gray-600 text-lg">{image.description}</p>
                </div>
                
                <div className="mt-auto flex justify-between pt-6 border-t border-gray-200">
                  <button
                    className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    onClick={onPrev}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>
                  
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:from-teal-600 hover:to-blue-700 transition-all"
                    onClick={onClose}
                  >
                    Close Gallery
                  </button>
                  
                  <button
                    className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    onClick={onNext}
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(images);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNext = () => {
    const currentIndex = images.findIndex(img => img === selected);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelected(images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex(img => img === selected);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelected(images[prevIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Animated heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg blur opacity-20"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                Our Medical Gallery
              </span>
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Explore our state-of-the-art facilities, meet our dedicated medical professionals, and see our advanced equipment.</p>
        </motion.div>

        {/* Category filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-teal-300'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-gray-100'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {filteredImages.map((img, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-2xl shadow-xl overflow-hidden cursor-pointer bg-white group relative border border-gray-100"
                onClick={() => setSelected(img)}
              >
                <div className="overflow-hidden h-64">
                  <div className="bg-gray-200 border-2 border-dashed w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                      <p className="mt-2 text-gray-500">{img.title}</p>
                    </div>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl mb-1">{img.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-2">{img.description}</p>
                  </div>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                  {img.category.charAt(0).toUpperCase() + img.category.slice(1)}
                </div>
                
                {/* Hover icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-blue-100 p-5 rounded-full mb-6">
              <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No images found</h3>
            <p className="text-gray-500 max-w-md mx-auto">Try selecting a different category or check back later as we add more content</p>
          </motion.div>
        )}
      </div>

      <GalleryModal
        image={selected}
        onClose={() => setSelected(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}