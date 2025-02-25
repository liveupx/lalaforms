import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
// Import other components and assets as needed
// Import your SVG assets here if available
// import HeroImage from '../assets/hero-image.svg';
// import FeatureIcon1 from '../assets/feature-icon-1.svg';
// import FeatureIcon2 from '../assets/feature-icon-2.svg';
// import FeatureIcon3 from '../assets/feature-icon-3.svg';
// import Logo from '../assets/logo.svg';
// Import your DemoForm if available
// import DemoForm from '../components/landing/DemoForm';

const Landing = () => {
  // Add missing state variables
  const [isScrolled, setIsScrolled] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="landing-page">
      {/* Header with Navigation */}
      <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              {/* Use an inline SVG or text if Logo import is not available */}
              {/* <img src={Logo} alt="LalaForms Logo" /> */}
              <h2>LalaForms</h2>
            </div>
            <nav className="navigation">
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/signup" className="signup-button">Try For Free</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Create Beautiful Online Forms in Minutes</h1>
              <p>LalaForms helps you build interactive forms, surveys and quizzes without coding. Collect responses, analyze results, and grow your business.</p>
              <div className="hero-buttons">
                <Link to="/signup" className="primary-button">Get Started Free</Link>
                <a href="#demo" className="secondary-button">See Demo</a>
              </div>
            </div>
            <div className="hero-image">
              {/* <img src={HeroImage} alt="LalaForms Interface" /> */}
              <div className="placeholder-image">Form Builder Interface</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features for Powerful Forms</h2>
            <p>Everything you need to create engaging forms and collect meaningful data</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              {/* <img src={FeatureIcon1} alt="Easy Builder" /> */}
              <div className="feature-icon">📝</div>
              <h3>Drag & Drop Builder</h3>
              <p>Create forms intuitively with our easy-to-use drag and drop interface. No coding required.</p>
            </div>
            <div className="feature-card">
              {/* <img src={FeatureIcon2} alt="Advanced Logic" /> */}
              <div className="feature-icon">🧠</div>
              <h3>Conditional Logic</h3>
              <p>Create dynamic forms that change based on user responses for a personalized experience.</p>
            </div>
            <div className="feature-card">
              {/* <img src={FeatureIcon3} alt="Analytics" /> */}
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>Get instant insights with powerful analytics on your form submissions and user behavior.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="demo-section">
        <div className="container">
          <div className="section-header">
            <h2>See LalaForms in Action</h2>
            <p>Try out this interactive demo to see how powerful and flexible our forms can be</p>
          </div>
          <div className="demo-container">
            {/* <DemoForm /> */}
            <div className="demo-placeholder">
              <h3>Interactive Form Demo</h3>
              <p>This is where the interactive demo form would appear.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that's right for you</p>
            <div className="pricing-toggle">
              <span className={!isYearly ? 'active' : ''}>Monthly</span>
              <label className="switch">
                <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                <span className="slider round"></span>
              </label>
              <span className={isYearly ? 'active' : ''}>Yearly <span className="save-badge">Save 20%</span></span>
            </div>
          </div>
          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Free</h3>
                <div className="price">
                  $0<span>/month</span>
                </div>
                <p>For individuals and small projects</p>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Up to 3 forms</li>
                  <li>100 submissions/month</li>
                  <li>Basic form elements</li>
                  <li>Email notifications</li>
                  <li>24-hour data retention</li>
                </ul>
              </div>
              <div className="pricing-action">
                <Link to="/signup" className="secondary-button">Get Started</Link>
              </div>
            </div>
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Pro</h3>
                <div className="price">
                  ${isYearly ? '19' : '24'}<span>/month</span>
                </div>
                <p>For professionals and growing businesses</p>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Unlimited forms</li>
                  <li>5,000 submissions/month</li>
                  <li>All form elements</li>
                  <li>Conditional logic</li>
                  <li>File uploads</li>
                  <li>Custom branding</li>
                  <li>Data export (CSV, Excel)</li>
                  <li>1 year data retention</li>
                </ul>
              </div>
              <div className="pricing-action">
                <Link to="/signup" className="primary-button">Choose Pro</Link>
              </div>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Business</h3>
                <div className="price">
                  ${isYearly ? '79' : '99'}<span>/month</span>
                </div>
                <p>For teams and organizations</p>
              </div>
              <div className="pricing-features">
                <ul>
                  <li>Everything in Pro</li>
                  <li>50,000 submissions/month</li>
                  <li>Advanced analytics</li>
                  <li>Team collaboration</li>
                  <li>Custom domains</li>
                  <li>Priority support</li>
                  <li>API access</li>
                  <li>Unlimited data retention</li>
                </ul>
              </div>
              <div className="pricing-action">
                <Link to="/signup" className="secondary-button">Choose Business</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Join thousands of happy customers using LalaForms</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"LalaForms transformed how we collect information from our clients. The interface is so intuitive and the forms look professional without any design work on our part."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>Jane Doe</h4>
                  <p>Marketing Director, XYZ Company</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As a non-technical person, I was able to create complex forms with conditional logic in minutes. The analytics help me understand my audience better."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JS</div>
                <div className="author-info">
                  <h4>John Smith</h4>
                  <p>Freelance Consultant</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The customer service is outstanding. Whenever I've had a question, the team has been quick to respond with helpful solutions."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AT</div>
                <div className="author-info">
                  <h4>Amy Turner</h4>
                  <p>Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Create Amazing Forms?</h2>
          <p>Join thousands of users who are building better forms and collecting better data with LalaForms</p>
          <Link to="/signup" className="primary-button">Get Started Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                {/* <img src={Logo} alt="LalaForms Logo" /> */}
                <h3>LalaForms</h3>
              </div>
              <p>Create beautiful forms without coding. Collect data and gain insights easily.</p>
              <div className="social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Product</h4>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#testimonials">Testimonials</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Support</h4>
                <ul>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} LalaForms. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;