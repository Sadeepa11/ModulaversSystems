"use client";

import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Shield, AlertTriangle, CheckCircle, Send, Sparkles } from 'lucide-react';

const ContactDetectionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Spam detection patterns
  const spamPatterns = [
    /viagra|casino|lottery|winner|congratulations/i,
    /click here|act now|limited time/i,
    /make money|work from home|guaranteed/i,
    /free gift|special offer|urgent/i
  ];

  const suspiciousPatterns = [
    /\$\d+|money|cash|prize/i,
    /http[s]?:\/\/|www\./i,
    /phone.*number|call.*now/i
  ];

  // Detect spam/suspicious content
  const detectSpam = (text) => {
    const content = `${text.name} ${text.email} ${text.message} ${text.subject}`.toLowerCase();
    
    let spamScore = 0;
    let riskLevel = 'low';
    let flags = [];

    // Check for spam patterns
    spamPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        spamScore += 3;
        flags.push('Contains spam keywords');
      }
    });

    // Check for suspicious patterns
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        spamScore += 1;
        flags.push('Contains suspicious content');
      }
    });

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text.email)) {
      spamScore += 2;
      flags.push('Invalid email format');
    }

    // Check for excessive caps
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (capsRatio > 0.5) {
      spamScore += 2;
      flags.push('Excessive capital letters');
    }

    // Check message length
    if (text.message.length < 10) {
      spamScore += 1;
      flags.push('Message too short');
    }

    // Determine risk level
    if (spamScore >= 5) riskLevel = 'high';
    else if (spamScore >= 2) riskLevel = 'medium';

    return { spamScore, riskLevel, flags };
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsSubmitting(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const detection = detectSpam(formData);
    
    // Check if message should be blocked
    if (detection.riskLevel === 'high') {
      setNotification({
        type: 'error',
        message: `Message blocked due to spam detection. Risk factors: ${detection.flags.join(', ')}`
      });
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone || 'Not provided'}
📝 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

---
⚠️ *Risk Level:* ${detection.riskLevel.toUpperCase()}
🔍 *Spam Score:* ${detection.spamScore}
${detection.flags.length > 0 ? `🚩 *Flags:* ${detection.flags.join(', ')}` : '✅ *No flags detected*'}

📅 *Submitted:* ${new Date().toLocaleString()}`;

    // WhatsApp number (your number)
    const whatsappNumber = '94705103507';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    setNotification({
      type: 'success',
      message: 'Opening WhatsApp with your message...'
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      subject: ''
    });

    setIsSubmitting(false);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen w-[100%] bg-dark-bg py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/5 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/10">
            <Sparkles className="w-4 h-4 mr-2" />
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
              Great
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have a project in mind or want to learn more about our services? Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-pulse ${
            notification.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
            notification.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
            'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
            {notification.type === 'error' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm">{notification.message}</span>
          </div>
        )}

        {/* Contact Form Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Panel */}
          <div className="bg-dark-card/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl md:col-span-1">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
                <p className="text-white/60 text-sm">We are always open to discuss new projects or partnerships.</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase">Email</p>
                  <p className="text-white text-sm">info@modulavers.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase">Phone</p>
                  <p className="text-white text-sm">+94 70 510 3507</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-accent">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase">Security</p>
                  <p className="text-white text-sm">Protected by Smart Detection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-dark-card/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl md:col-span-2">
            <div className="space-y-6">
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
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Subject Row */}
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
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20"
                    placeholder="Project Inquiry"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-white/20 resize-none"
                    placeholder="Tell us more about your project..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
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
                    Send via WhatsApp
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Protected by Smart Detection</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    This form uses intelligent spam detection to filter malicious content and protect against unwanted messages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/20 text-xs">
          <p>© 2026 Modulavers Systems. Built with Next.js & React.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetectionForm;