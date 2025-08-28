import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
// The ContactForm component is not used here as the form is built directly for styling purposes.

const ContactPage: React.FC = () => {
  return (
    // The background gradient is applied here
    <div className="bg-gradient-to-b from-emerald-950 to-black text-white">
      <div className="pt-40 pb-20 container-padding mx-auto max-w-4xl text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-center text-3xl md:text-4xl font-bold text-emerald-200 mb-12"
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
            <ContactItem icon={Phone} title="Phone" detail="+91 81696 01563" href="tel:+918169601563" />
            <ContactItem icon={MapPin} title="Office" detail="Saltlake, Kolkata, India" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="bg-black/20 p-8 rounded-2xl border border-emerald-800 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-6 text-emerald-100">Send a Message</h3>
              <p className="text-gray-300 mb-8">We'll get back to you within one business day.</p>
              <form className="space-y-4">
                  <input type="text" placeholder="Name" className="w-full bg-emerald-900/30 p-3 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400" />
                  <input type="email" placeholder="Email" className="w-full bg-emerald-900/30 p-3 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400" />
                  <textarea placeholder="Your Message" rows={4} className="w-full bg-emerald-900/30 p-3 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"></textarea>
                  <button type="submit" className="btn-primary w-full !bg-emerald-600 hover:!bg-emerald-500">Submit</button>
              </form>
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