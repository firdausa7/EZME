import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">

          {/* Logo */}
          <div className="nav-logo">
            <a 
              href="#home" 
              className="logo"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              EZME
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            <a 
              href="#home" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              Home
            </a>

            <a 
              href="#collections" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('collections');
              }}
            >
              Collections
            </a>

            <a 
              href="#story" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('story');
              }}
            >
              Our Story
            </a>

            <a 
              href="#craft" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('craft');
              }}
            >
              Craftsmanship
            </a>
          </div>

          {/* Navigation Icons */}
          <div className="nav-actions">
            <button className="nav-icon" aria-label="Search">
              <i className="fas fa-search"></i>
            </button>

            <button className="nav-icon" aria-label="User Account">
              <i className="fas fa-user"></i>
            </button>

            <button className="nav-icon cart-icon" aria-label="Shopping Cart">
              <i className="fas fa-shopping-bag"></i>
              <span className="cart-badge">2</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <a 
              href="#home" 
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              Home
            </a>

            <a 
              href="#collections"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('collections');
              }}
            >
              Collections
            </a>

            <a 
              href="#story"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('story');
              }}
            >
              Our Story
            </a>

            <a 
              href="#craft"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('craft');
              }}
            >
              Craftsmanship
            </a>
          </div>
        </div>

        {/* Backdrop */}
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-backdrop"
            onClick={closeMobileMenu}
          ></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

