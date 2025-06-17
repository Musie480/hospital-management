import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaHandsHelping, FaHeartbeat, FaStethoscope, FaUserMd } from "react-icons/fa";

const items = [
  {
    title: "Our Mission",
    icon: <FaBullseye className="text-4xl" />,
    description: "To deliver exceptional healthcare with compassion, innovation, and integrity to all members of our community.",
    color: "from-red-500 to-orange-500",
    delay: 0.1
  },
  {
    title: "Our Vision",
    icon: <FaEye className="text-4xl" />,
    description: "To be the most trusted healthcare institution, advancing medicine and improving lives through excellence in patient care.",
    color: "from-blue-500 to-indigo-600",
    delay: 0.3
  },
  {
    title: "Our Values",
    icon: <FaHandsHelping className="text-4xl" />,
    description: "Integrity, empathy, excellence, innovation, and respect for every individual we serve.",
    color: "from-green-500 to-teal-600",
    delay: 0.5
  }
];

const coreValues = [
  { icon: <FaHeartbeat className="text-2xl" />, title: "Compassion", description: "Treating every patient with kindness and understanding" },
  { icon: <FaStethoscope className="text-2xl" />, title: "Excellence", description: "Delivering the highest standard of medical care" },
  { icon: <FaUserMd className="text-2xl" />, title: "Innovation", description: "Embracing cutting-edge medical technologies" }
];

export default function Philosophy() {
  return (
    <section className="relative py-28 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden" id="philosophy">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-teal-400/10 to-blue-500/10"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg blur opacity-20"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                Our Guiding Principles
              </span>
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            The foundation of exceptional care that defines our approach to medicine and patient relationships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl group-hover:blur-0 from-white to-white z-0"></div>
              
              <div className={`bg-gradient-to-br ${item.color} p-0.5 rounded-2xl h-full`}>
                <div className="bg-white rounded-2xl p-8 h-full flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-2">
                  <div className={`mb-6 bg-gradient-to-br ${item.color} text-white p-4 rounded-full inline-flex`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{item.description}</p>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Our Commitment to Excellence</h3>
              <p className="text-teal-100 mb-6 text-lg">
                At Serenity Medical Center, we believe that exceptional healthcare is built on a foundation of strong values and dedicated professionals. Our commitment extends beyond medical treatment to creating a healing environment where patients feel valued and respected.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coreValues.map((value, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <div className="text-white mb-2 inline-flex justify-center">
                      {value.icon}
                    </div>
                    <h4 className="font-bold text-white">{value.title}</h4>
                    <p className="text-teal-100 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="flex items-center mb-6">
                <div className="bg-white p-3 rounded-full mr-4">
                  <FaUserMd className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Patient-Centered Approach</h4>
                  <div className="w-12 h-0.5 bg-white mt-2"></div>
                </div>
              </div>
              
              <p className="text-teal-100 mb-6">
                We prioritize the needs and preferences of our patients, ensuring they are active participants in their care decisions. Our team takes the time to listen, understand, and address each patient's unique concerns.
              </p>
              
              <div className="flex items-center">
                <div className="bg-white p-3 rounded-full mr-4">
                  <FaStethoscope className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Continuous Improvement</h4>
                  <div className="w-12 h-0.5 bg-white mt-2"></div>
                </div>
              </div>
              
              <p className="text-teal-100 mt-6">
                Our medical team regularly participates in professional development and stays current with the latest medical advancements to provide cutting-edge care.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}