import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
// The ContactForm component is not used here as the form is built directly for styling purposes.

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
    
    // Clear error when user starts typing
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
    
    // Validate all fields
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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    // The background gradient is applied here
    <div className="bg-gradient-to-b from-emerald-950 to-black text-white">
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
    </div>
  );
};

// Helper component for contact items
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