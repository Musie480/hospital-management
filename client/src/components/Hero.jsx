import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Mock assets - in a real project these would be imported
const background = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1953&q=80";
const doctorImage = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const stethoscopeIcon = "https://cdn-icons-png.flaticon.com/512/684/684908.png";

export default function Hero() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Enhanced background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-75"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-indigo-900/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0 z-1 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 16}px`,
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full opacity-30" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center bg-blue-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30 mb-6"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-200 text-sm font-medium">
                24/7 Emergency Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Exceptional <span className="text-teal-400">Healthcare</span> <br />
              <span className="text-blue-300">For Every Patient</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: "120px" } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-teal-400 to-blue-500 my-8 mx-auto lg:mx-0 rounded-full"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl text-blue-100 max-w-xl mb-10 leading-relaxed"
            >
              Where compassionate care meets cutting-edge technology. Our team of specialists is dedicated to providing exceptional healthcare services tailored to your needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center"
                onClick={() => navigate("/appointment")}
              >
                <span>Book Appointment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white/30 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
                onClick={() => navigate("/DepartmentsServices")}
              >
                Our Services
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              {[
                { value: "200+", label: "Medical Staff" },
                { value: "24/7", label: "Emergency Care" },
                { value: "95%", label: "Patient Satisfaction" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-teal-400">{item.value}</div>
                  <div className="text-blue-200 text-sm">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl transform rotate-3 z-0"></div>
              <div className="relative bg-gray-200 border-2 border-dashed rounded-2xl w-full h-[500px] overflow-hidden z-10">
                <img 
                  src={doctorImage} 
                  alt="Medical professional" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating card element */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-6 left-10 bg-white rounded-2xl shadow-xl p-6 w-64 z-20"
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <img src={stethoscopeIcon} alt="Medical icon" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Expert Care</h3>
                  <p className="text-sm text-gray-600 mt-1">Board-certified specialists</p>
                </div>
              </div>
            </motion.div>

            {/* Another floating element */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute -top-8 right-0 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl px-6 py-3 text-white shadow-lg"
            >
              <div className="text-lg font-bold">Since 1995</div>
              <div className="text-sm">Trusted Healthcare</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
      >
        <div className="text-blue-300 text-sm mb-2">Scroll to explore</div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}