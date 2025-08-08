"use client";

import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Shield, AlertTriangle, CheckCircle, Send } from 'lucide-react';

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
    <div className="min-h-screen w-[100%] bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Smart Contact Form</h1>
          </div>
          <p className="text-gray-600">Protected by intelligent spam detection</p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-pulse ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
            notification.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
            'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
            {notification.type === 'error' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm">{notification.message}</span>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Get in Touch
          </h2>
          
          <div className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Phone and Subject Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+94 70 123 4567"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="What's this about?"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
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
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-blue-800">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Protected by Smart Detection</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              This form uses intelligent spam detection to filter malicious content and protect against unwanted messages.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Smart Contact System. Built with Next.js & React.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetectionForm;