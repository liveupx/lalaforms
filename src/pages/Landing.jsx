// src/pages/Landing.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import HeroImage from '../assets/hero-image.svg';
import FeatureIcon1 from '../assets/feature-icon-1.svg';
import FeatureIcon2 from '../assets/feature-icon-2.svg';
import FeatureIcon3 from '../assets/feature-icon-3.svg';
import Logo from '../assets/logo.svg';
import DemoForm from '../components/landing/DemoForm';

const Landing = () => {


  // Near the top of your component, add:
const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <img src={Logo} alt="Lalaforms Logo" />
              <span>Lalaforms</span>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#templates">Templates</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faqs">FAQs</a></li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Log in</Link>
              <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Create Beautiful Forms <span className="gradient-text">Without Code</span></h1>
            <p className="hero-subtitle">
              Lalaforms makes it easy to create stunning forms for surveys, feedback, registrations, 
              and more. Get started in minutes, no coding required.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">Start Building - Free Forever</Link>
              <Link to="/templates" className="btn btn-outline btn-large">Explore Templates</Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">5,000+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">100,000+</span>
                <span className="stat-label">Forms Created</span>
              </div>
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src={HeroImage} alt="Lalaforms Builder Interface" />
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2>Everything You Need to Create Amazing Forms</h2>
            <p className="section-description">
              Powerful features made simple for everyone. No coding required.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={FeatureIcon1} alt="Drag & Drop" />
              </div>
              <h3>Intuitive Drag & Drop</h3>
              <p>Build forms with our easy-to-use drag and drop interface. No technical skills required.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={FeatureIcon2} alt="Logic Jumps" />
              </div>
              <h3>Smart Logic Jumps</h3>
              <p>Create dynamic forms that change based on user answers. Deliver personalized experiences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={FeatureIcon3} alt="Integrations" />
              </div>
              <h3>Powerful Integrations</h3>
              <p>Connect with your favorite tools like Google Sheets, Slack, Zapier, and more.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={FeatureIcon1} alt="Themes" />
              </div>
              <h3>Beautiful Themes</h3>
              <p>Choose from professionally designed themes or customize your own to match your brand.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={FeatureIcon2} alt="Analytics" />
              </div>
              <h3>Detailed Analytics</h3>
              <p>Get insights on form performance with comprehensive submission analytics.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={FeatureIcon3} alt="Payments" />
              </div>
              <h3>Payment Collection</h3>
              <p>Collect payments directly through your forms with Stripe integration.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Try It Out</span>
            <h2>See How Easy It Is</h2>
            <p className="section-description">
              Experience Lalaforms in action with this interactive demo
            </p>
          </div>
          <div className="demo-container">
            <DemoForm />
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pricing</span>
            <h2>Simple, Transparent Pricing</h2>
            <p className="section-description">
              Start free, upgrade when you need more
            </p>
          </div>
          <div className="pricing-toggle">
            <span className={!isYearly ? 'active' : ''}>Monthly</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isYearly} 
                onChange={() => setIsYearly(!isYearly)} 
              />
              <span className="slider round"></span>
            </label>
            <span className={isYearly ? 'active' : ''}>Yearly <span className="save-badge">Save 18%</span></span>
          </div>
          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-card-header">
                <h3>Free</h3>
                <div className="price">
                  <span className="amount">$0</span>
                  <span className="period">/month</span>
                </div>
                <p className="pricing-description">Perfect for getting started</p>
              </div>
              <ul className="pricing-features">
                <li>Unlimited forms</li>
                <li>100 submissions/month</li>
                <li>Basic form blocks</li>
                <li>Email notifications</li>
                <li>Basic analytics</li>
              </ul>
              <div className="pricing-cta">
                <Link to="/signup" className="btn btn-outline btn-full">Get Started</Link>
              </div>
            </div>
            
            <div className="pricing-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-card-header">
                <h3>Pro</h3>
                <div className="price">
                  <span className="amount">${isYearly ? '99' : '10'}</span>
                  <span className="period">{isYearly ? '/year' : '/month'}</span>
                </div>
                <p className="pricing-description">For professionals and small teams</p>
              </div>
              <ul className="pricing-features">
                <li>Everything in Free</li>
                <li>Unlimited submissions</li>
                <li>Remove Lalaforms branding</li>
                <li>Custom "Thank you" pages</li>
                <li>File uploads (unlimited)</li>
                <li>Custom domain</li>
                <li>All integrations</li>
                <li>Payment collection</li>
                <li>Team collaboration</li>
              </ul>
              <div className="pricing-cta">
                <Link to="/signup?plan=pro" className="btn btn-primary btn-full">Get Pro</Link>
              </div>
            </div>

            <div className="pricing-card">
              <div className="pricing-card-header">
                <h3>Enterprise</h3>
                <div className="price">
                  <span className="amount">Custom</span>
                </div>
                <p className="pricing-description">For organizations with advanced needs</p>
              </div>
              <ul className="pricing-features">
                <li>Everything in Pro</li>
                <li>Dedicated support</li>
                <li>Custom integrations</li>
                <li>Enhanced security</li>
                <li>SLA guarantees</li>
                <li>Onboarding assistance</li>
              </ul>
              <div className="pricing-cta">
                <Link to="/contact-sales" className="btn btn-outline btn-full">Contact Sales</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2>What Our Users Say</h2>
          </div>
          <div className="testimonials-slider">
            {/* Testimonials would be implemented as a carousel */}
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Lalaforms has transformed how we collect customer feedback. The interface is intuitive and the integrations save us hours of work every week."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>Jane Doe</h4>
                  <p>Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Beautiful Forms?</h2>
            <p>Join thousands of users who are already creating amazing forms with Lalaforms.</p>
            <Link to="/signup" className="btn btn-primary btn-large">Get Started Free</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <img src={Logo} alt="Lalaforms Logo" />
                <span>Lalaforms</span>
              </div>
              <p>The easiest way to create beautiful forms without writing code.</p>
              <div className="social-links">
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#templates">Templates</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#integrations">Integrations</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/docs">Documentation</a></li>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/api">API</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/legal">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Lalaforms. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/terms">Terms of Service</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
