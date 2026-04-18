"use client";
import React, { useState } from 'react';
import { MessageSquare, Send, X, Bug, MessageCircle, Link } from 'lucide-react';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Feedback');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = "johniskros@gmail.com";
    const subject = `[TheraMatch ${category}] From ${name || 'User'}`;
    const body = `Name: ${name}\nCategory: ${category}\n\nMessage:\n${message}`;
    
    // The totally free, zero-infra way: mailto
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex-center"
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '100%', 
            background: 'linear-gradient(135deg, #00E5FF, #3B82F6)', 
            border: 'none', 
            boxShadow: '0 8px 32px rgba(0, 229, 255, 0.3)',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageSquare size={30} />
        </button>
      )}

      {/* Feedback Form Card */}
      {isOpen && (
        <div style={{ 
          width: '350px', 
          background: 'rgba(15, 23, 42, 0.9)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '24px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          padding: '24px',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            .fb-input {
              width: 100%;
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 12px;
              padding: 12px;
              color: white;
              font-size: 0.9rem;
              margin-bottom: 12px;
              outline: none;
            }
            .fb-input:focus {
              border-color: #00E5FF;
            }
          `}} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#FFF' }}>Send Feedback</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <input 
              className="fb-input" 
              placeholder="Your Name (Optional)" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            
            <select 
              className="fb-input" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ appearance: 'none' }}
            >
              <option value="Feedback">General Feedback</option>
              <option value="Bug">Report a Bug</option>
              <option value="Connect">Connect / Support</option>
            </select>

            <textarea 
              className="fb-input" 
              placeholder="How can we help?" 
              rows={4} 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ resize: 'none' }}
            />

            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                padding: '14px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, #00E5FF, #3B82F6)', 
                border: 'none', 
                color: 'white', 
                fontWeight: '700', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Send size={18} />
              Submit Inquiry
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
