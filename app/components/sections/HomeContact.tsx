'use client';

import React, { useState } from 'react';

export function HomeContact() {
  // 1. State to store the input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // 2. State to handle the loading/success status
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // 3. Handle typing in the inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handle the Submit button click
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page reload
    setStatus('sending');

    try {
      // The actual API call to YOUR Backend
      const res = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="w-full py-20 px-6 bg-[#0A0A10]" id="contact">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 inline-block">
            Let's Connect
          </h2>
          <p className="text-gray-400 mt-4">
            Have a project in mind? Send me a message.
          </p>
        </div>

        {/* The Form */}
        <div className="bg-[#10121A] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          {status === 'success' ? (
            // Success Message View
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-400">I'll get back to you as soon as possible.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-blue-400 hover:text-blue-300 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            // Input Fields View
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A10] border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A10] border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A10] border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A10] border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}