import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaHospital } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* About Us */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-6">
              <FaHospital className="text-3xl text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-800">Our Hospital</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We are a community-focused hospital providing outstanding medical services with compassion and innovation.
              Our commitment is to your health and well-being, delivering excellence in healthcare since 1995.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:w-2/3">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-teal-200 pb-2">Contact Info</h3>
              <div className="space-y-3">
                <p className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition-colors">
                  <FaPhoneAlt className="text-teal-600" /> 
                  <a href="tel:+251911000000">+251-911-000-000</a>
                </p>
                <p className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition-colors">
                  <FaEnvelope className="text-teal-600" /> 
                  <a href="mailto:contact@ourhospital.et">contact@ourhospital.et</a>
                </p>
                <p className="flex items-start gap-3 text-gray-600">
                  <FaMapMarkerAlt className="text-teal-600 mt-1" />
                  <span>Bole Sub-city,<br />Addis Ababa, Ethiopia</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-teal-200 pb-2">Quick Links</h3>
              <ul className="space-y-2">
                {['Services', 'Doctors', 'Departments', 'Appointments', 'Emergency'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-teal-200 pb-2">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-colors">
                  <FaFacebook />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-colors">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-lg mb-12">
          <iframe
            title="Hospital Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.403626757623!2d38.77086917482258!3d8.98060489123062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85d0ef8a01cd%3A0xd6a8f2dbf3c63b9b!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1718600000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Our Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
