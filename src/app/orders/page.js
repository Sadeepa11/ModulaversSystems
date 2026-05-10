'use client';

import React, { useState } from 'react';
import { ShoppingCart, User, Mail, Phone, MessageSquare, Send, Sparkles, Shield, CheckCircle, Briefcase, DollarSign, Calendar } from 'lucide-react';
import Link from 'next/link';
import SoftwareCompanyFooter from '../componets/Footer';

export default function OrdersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    deadline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const services = [
    'Web Development',
    'UI/UX Designing',
    'Video Editing',
    'Graphic Designing',
    'Digital Marketing',
    'SEO'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `*New Order Request* 🚀

👤 *Client Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone || 'Not provided'}
🛠️ *Service:* ${formData.service}
💰 *Budget:* ${formData.budget || 'Not specified'}
📅 *Deadline:* ${formData.deadline || 'Not specified'}

📝 *Project Details:*
${formData.message}

---
Submitted via Modulavers Systems Orders`;

    // WhatsApp number
    const whatsappNumber = '94765772504';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    setNotification({
      type: 'success',
      message: 'Opening WhatsApp with your order details...'
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      budget: '',
      deadline: '',
      message: ''
    });

    setIsSubmitting(false);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/5 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/10">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Place Your Order
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's Start Your
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
                Project
              </span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Fill out the form below to send your order request directly to our team via WhatsApp.
            </p>
          </div>

          {/* Notification */}
          {notification && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-pulse ${
              notification.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'
            }`}>
              {notification.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <Shield className="w-5 h-5 flex-shrink-0" />}
              <span className="text-sm">{notification.message}</span>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-gradient-to-br from-dark-card/80 to-dark-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-primary/30 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Service Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20"
                      placeholder="+94 70 123 4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Select Service *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20 appearance-none"
                      required
                    >
                      <option value="" disabled className="bg-gray-900">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-gray-900">{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget and Deadline Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Budget Range
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20"
                      placeholder="e.g. $1000 - $3000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Expected Deadline
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20"
                      placeholder="e.g. 2 weeks"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Project Details *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20 resize-none"
                    placeholder="Tell us more about your project requirements..."
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 px-6 rounded-xl font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Order via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <SoftwareCompanyFooter />
    </div>
  );
}
