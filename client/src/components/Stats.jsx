import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  FaUserMd, 
  FaClinicMedical, 
  FaStethoscope, 
  FaUserPlus, 
  FaPills,
  FaHeartbeat,
  FaHospital,
  FaAmbulance,
  FaLaptopMedical
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUserMd className="text-3xl" />,
    label: "Medical Specialists",
    count: 87,
    start: 0,
    color: "from-teal-500 to-emerald-500",
    delay: 0.1
  },
  {
    icon: <FaStethoscope className="text-3xl" />,
    label: "Successful Procedures",
    count: 1240,
    start: 1000,
    color: "from-blue-500 to-indigo-500",
    delay: 0.2
  },
  {
    icon: <FaUserPlus className="text-3xl" />,
    label: "Daily Appointments",
    count: 356,
    start: 200,
    color: "from-purple-500 to-violet-600",
    delay: 0.3
  },
  {
    icon: <FaClinicMedical className="text-3xl" />,
    label: "Facility Locations",
    count: 5,
    start: 0,
    color: "from-rose-500 to-pink-600",
    delay: 0.4
  },
  {
    icon: <FaPills className="text-3xl" />,
    label: "Pharmacy Units",
    count: 12,
    start: 0,
    color: "from-amber-500 to-orange-500",
    delay: 0.5
  },
  {
    icon: <FaHeartbeat className="text-3xl" />,
    label: "Lives Saved",
    count: 5432,
    start: 5000,
    color: "from-red-500 to-orange-500",
    delay: 0.6
  },
  {
    icon: <FaHospital className="text-3xl" />,
    label: "Patient Beds",
    count: 240,
    start: 0,
    color: "from-cyan-500 to-sky-500",
    delay: 0.7
  },
  {
    icon: <FaAmbulance className="text-3xl" />,
    label: "Emergency Vehicles",
    count: 8,
    start: 0,
    color: "from-yellow-500 to-amber-500",
    delay: 0.8
  }
];

const StatsCounter = ({ start, end, duration = 2 }) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCount(prev => {
          const step = Math.ceil((end - start) / (duration * 30));
          if (prev + step >= end) {
            clearInterval(interval);
            return end;
          }
          return prev + step;
        });
      }, 1000 / 30);
      
      return () => clearInterval(interval);
    }
  }, [isInView, start, end, duration]);
  
  return <span ref={ref}>{count}</span>;
};

export default function Stats() {
  return (
    <section className="relative py-28 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden">
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
                Our Impact in Numbers
              </span>
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            Quantifying our commitment to healthcare excellence and community service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
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
                <motion.div 
                  className="bg-white rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-2"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className={`mb-4 bg-gradient-to-br ${item.color} text-white p-3 rounded-full inline-flex`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">
                    <StatsCounter start={item.start} end={item.count} duration={3} />+
                  </h3>
                  <p className="text-gray-600 font-medium">{item.label}</p>
                  
                  <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mt-4"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated progress bar */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Continuous Growth</h3>
              <p className="text-teal-100 mb-8 text-lg">
                Our commitment to expanding healthcare access has resulted in consistent growth across all service areas. We measure our success by our ability to serve more patients with better facilities each year.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: "Patient Satisfaction", value: 96, color: "bg-emerald-400" },
                  { label: "Annual Growth", value: 24, color: "bg-blue-400" },
                  { label: "Technology Investment", value: 87, color: "bg-purple-400" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-teal-100 font-medium">{item.label}</span>
                      <span className="text-white font-bold">{item.value}%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${item.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 * index + 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FaUserMd className="text-2xl" />, value: "98%", label: "Specialist Retention" },
                { icon: <FaStethoscope className="text-2xl" />, value: "99.7%", label: "Accuracy Rate" },
                { icon: <FaLaptopMedical className="text-2xl" />, value: "24/7", label: "Digital Access" },
                { icon: <FaAmbulance className="text-2xl" />, value: "12min", label: "Avg. Response Time" },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 * index + 0.7 }}
                >
                  <div className="text-white mb-3 inline-flex justify-center">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-teal-100 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}