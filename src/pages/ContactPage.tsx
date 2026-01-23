import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {[key: string]: string} = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-emerald-950 to-black text-white">
      <style>{`
        .wa-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .wa-inner {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }
        .wa-svg {
          width: 42px;
          height: 42px;
          fill: white;
        }
      `}</style>

      <div className="pt-40 pb-20 container-padding mx-auto max-w-4xl text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-emerald-200 mb-6"
        >
          Let's Collaborate
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-gray-300"
        >
          Reach out to start a conversation about your project or partnership ideas.
        </motion.p>
      </div>

      <section className="py-16 container-padding mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <ContactItem icon={Mail} title="Email" detail="manir@floracarbon.ai" href="mailto:manir@floracarbon.ai" />
            <ContactItem icon={Phone} title="Phone" detail="+91-7890960322" href="tel:+91-7890960322" />
            <ContactItem 
              icon={MessageCircle} 
              title="WhatsApp" 
              detail="Chat with us" 
              href="https://wa.me/917890960322?text=Hello!%20I'm%20interested%20in%20Flora%20Carbon's%20services." 
            />
            <ContactItem icon={MapPin} title="Office" detail="Corporate office - Millennium City IT Park, Tower II, Floor 6, DN Block, Sector V, Bidhannagar, Kolkata - 700091, India" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="bg-black/20 p-6 sm:p-8 rounded-2xl border border-emerald-800 backdrop-blur-sm">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-emerald-100">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We'll get back to you within one business day.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-emerald-300 hover:text-emerald-200 underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-emerald-100">Send a Message</h3>
                  <p className="text-gray-300 mb-8">We'll get back to you within one business day.</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full bg-emerald-900/30 p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 placeholder-gray-400 text-white ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-emerald-700 focus:ring-emerald-500'
                        }`}
                        required
                      />
                      {errors.name && (
                        <div className="flex items-center mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.name}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full bg-emerald-900/30 p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 placeholder-gray-400 text-white ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-emerald-700 focus:ring-emerald-500'
                        }`}
                        required
                      />
                      {errors.email && (
                        <div className="flex items-center mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <textarea 
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full bg-emerald-900/30 p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 placeholder-gray-400 text-white resize-none ${
                          errors.message ? 'border-red-500 focus:ring-red-500' : 'border-emerald-700 focus:ring-emerald-500'
                        }`}
                        required
                      />
                      {errors.message && (
                        <div className="flex items-center mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.message}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`btn-primary w-full !bg-emerald-600 hover:!bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        isSubmitting ? 'animate-pulse' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Realistic WhatsApp Circular Button */}
      <motion.a
        href="https://wa.me/917890960322"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center group"
      >
        <span className="absolute right-full mr-5 bg-black/80 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with us
        </span>
        <div className="wa-container">
          <div className="wa-inner">
            <svg viewBox="0 0 448 512" className="wa-svg">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
          </div>
        </div>
      </motion.a>
    </div>
  );
};

const ContactItem = ({ icon: Icon, title, detail, href }: any) => (
  <div className="flex items-start">
    <div className="bg-emerald-900/50 p-4 rounded-full mr-6 border border-emerald-700">
      <Icon className="h-6 w-6 text-emerald-300" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      {href ? (
        <a href={href} className="text-xl text-emerald-100 hover:text-emerald-300 transition-colors">
          {detail}
        </a>
      ) : (
        <p className="text-xl text-emerald-100">{detail}</p>
      )}
    </div>
  </div>
);

export default ContactPage;