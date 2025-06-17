import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timelineData = [
  {
    year: "1995",
    title: "Hospital Founded",
    shortDesc: "Established with 50 beds and a vision to serve.",
    details: "The hospital was founded by a group of visionary doctors committed to providing accessible healthcare. Starting with just 50 beds and a dedicated team of 30 medical professionals, we began our journey with a mission to serve the community with compassion and excellence.",
    images: ["/gallery/founders.jpg"],
  },
  {
    year: "2005",
    title: "First ICU Launched",
    shortDesc: "Modern ICU launched with life-saving equipment.",
    details: "Our state-of-the-art Intensive Care Unit was equipped with cutting-edge technology to handle critical cases. With 12 dedicated ICU beds, advanced monitoring systems, and specially trained staff, we significantly improved our capacity to save lives in emergency situations.",
    images: ["/gallery/icu_opening.jpg"],
  },
  {
    year: "2018",
    title: "New Wing Opened",
    shortDesc: "Added 3 new operating theatres and 100 beds.",
    details: "To accommodate the growing patient count and expand our services, we opened a new wing featuring three modern operating theaters, a dedicated pediatric unit, and an additional 100 patient beds. This expansion allowed us to reduce wait times and serve more patients efficiently.",
    images: ["/gallery/new_wing.jpg"],
  },
  {
    year: "2021",
    title: "Telemedicine Launch",
    shortDesc: "Digital healthcare services introduced.",
    details: "Embracing technology to improve accessibility, we launched our telemedicine platform. This initiative allowed patients in remote areas to consult with specialists, receive follow-up care, and access medical advice without traveling to our facility.",
    images: ["/gallery/telemedicine.jpg"],
  },
  {
    year: "2023",
    title: "Research Center",
    shortDesc: "Center for Medical Research established.",
    details: "Our new research center focuses on innovative treatments for chronic diseases. Partnering with leading universities, we're conducting clinical trials and developing new protocols to improve patient outcomes in oncology, cardiology, and neurology.",
    images: ["/gallery/research-center.jpg"],
  },
];

export default function Timeline() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-blue-50" id="timeline">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Journey Through Time
          </motion.h2>
          <motion.p 
            className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A legacy of medical excellence and compassionate care spanning decades
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-blue-500 hidden md:block"></div>
          
          {/* Horizontal line for mobile */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500 md:hidden"></div>

          <div className="space-y-12 md:space-y-0">
            {timelineData.map((event, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline marker */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-600 to-blue-700 border-4 border-white shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white text-xs font-bold">{event.year}</span>
                  </motion.div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* Content */}
                <motion.div 
                  className={`w-full md:w-1/2 p-1 ${index % 2 === 0 ? 'md:pr-12 md:pl-1' : 'md:pl-12 md:pr-1'}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                          <p className="text-gray-600 mt-1">{event.shortDesc}</p>
                        </div>
                        <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {event.year}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium hover:from-teal-600 hover:to-blue-600 transition-all duration-300 flex items-center"
                      >
                        {openIndex === index ? (
                          <>
                            <span>Hide Details</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>View Details</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 pt-5 border-t border-gray-100">
                              <p className="text-gray-700">{event.details}</p>
                              <div className="mt-4 grid grid-cols-2 gap-2">
                                {event.images && event.images.map((img, i) => (
                                  <div key={i} className="rounded-lg overflow-hidden border border-gray-200">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: timelineData.length * 0.1 + 0.5 }}
        >
          <p className="text-gray-600 italic">Continuing our journey of excellence in healthcare</p>
        </motion.div>
      </div>
    </section>
  );
}