'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero section floating particles animation
      const createFloatingParticles = () => {
        const particles = [];
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          heroRef.current?.appendChild(particle);
          particles.push(particle);
        }
        
        particles.forEach((particle, index) => {
          gsap.to(particle, {
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            rotation: 360,
            duration: 10 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          });
        });
      };

      // Hero section wave animation
      const createWaveAnimation = () => {
        const wave = document.createElement('div');
        wave.className = 'absolute inset-0 opacity-10';
        wave.innerHTML = `
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path id="wave1" d="M0,400 Q300,300 600,400 T1200,400 V800 H0 Z" fill="url(#gradient1)"/>
            <path id="wave2" d="M0,450 Q300,350 600,450 T1200,450 V800 H0 Z" fill="url(#gradient2)"/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.3" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
                <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.2" />
              </linearGradient>
            </defs>
          </svg>
        `;
        heroRef.current?.appendChild(wave);

        gsap.to("#wave1", {
          attr: { d: "M0,400 Q300,500 600,400 T1200,400 V800 H0 Z" },
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        gsap.to("#wave2", {
          attr: { d: "M0,450 Q300,550 600,450 T1200,450 V800 H0 Z" },
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      };

      // Features section grid animation
      const createGridAnimation = () => {
        if (featuresRef.current) {
          const grid = document.createElement('div');
          grid.className = 'absolute inset-0 opacity-10';
          grid.innerHTML = `
            <div class="grid grid-cols-12 h-full gap-1">
              ${Array.from({ length: 120 }, (_, i) => 
                `<div class="grid-item w-full h-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded"></div>`
              ).join('')}
            </div>
          `;
          featuresRef.current.appendChild(grid);

          gsap.fromTo('.grid-item', {
            scale: 0,
            opacity: 0
          }, {
            scale: 1,
            opacity: 0.3,
            duration: 0.1,
            stagger: {
              amount: 3,
              grid: [12, 10],
              from: "center"
            },
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          });
        }
      };

      // How It Works section connection animation
      const createConnectionAnimation = () => {
        if (howItWorksRef.current) {
          const connections = document.createElement('div');
          connections.className = 'absolute inset-0 opacity-30';
          connections.innerHTML = `
            <svg class="w-full h-full" viewBox="0 0 1200 600">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#06b6d4" />
                  <stop offset="50%" style="stop-color:#8b5cf6" />
                  <stop offset="100%" style="stop-color:#10b981" />
                </linearGradient>
              </defs>
              <path id="connectionPath" d="M100,300 Q400,200 600,300 Q800,400 1100,300" 
                    stroke="url(#lineGradient)" stroke-width="2" fill="none"/>
            </svg>
          `;
          howItWorksRef.current.appendChild(connections);

          gsap.fromTo("#connectionPath", {
            strokeDasharray: "0 1000"
          }, {
            strokeDasharray: "1000 0",
            duration: 3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: howItWorksRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          });
        }
      };

      // Testimonials section bubble animation
      const createBubbleAnimation = () => {
        if (testimonialsRef.current) {
          const bubbles = [];
          for (let i = 0; i < 20; i++) {
            const bubble = document.createElement('div');
            const size = Math.random() * 60 + 20;
            bubble.className = `absolute rounded-full opacity-10 bg-gradient-to-r from-yellow-400 to-pink-400`;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.top = Math.random() * 100 + '%';
            testimonialsRef.current.appendChild(bubble);
            bubbles.push(bubble);
          }

          bubbles.forEach((bubble, index) => {
            gsap.to(bubble, {
              y: -100,
              x: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.5,
              rotation: 360,
              duration: 15 + Math.random() * 10,
              repeat: -1,
              ease: "sine.inOut",
              delay: index * 0.2
            });
          });
        }
      };

      // CTA section energy animation
      const createEnergyAnimation = () => {
        if (ctaRef.current) {
          const energy = document.createElement('div');
          energy.className = 'absolute inset-0 opacity-20';
          energy.innerHTML = `
            <div class="energy-field w-full h-full relative">
              ${Array.from({ length: 100 }, (_, i) => 
                `<div class="energy-particle absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>`
              ).join('')}
            </div>
          `;
          ctaRef.current.appendChild(energy);

          gsap.set('.energy-particle', {
            x: () => Math.random() * window.innerWidth,
            y: () => Math.random() * window.innerHeight
          });

          gsap.to('.energy-particle', {
            x: () => Math.random() * window.innerWidth,
            y: () => Math.random() * window.innerHeight,
            duration: () => Math.random() * 3 + 2,
            repeat: -1,
            ease: "none",
            stagger: {
              amount: 2,
              repeat: -1
            }
          });
        }
      };

      // Initialize all animations
      setTimeout(() => {
        createFloatingParticles();
        createWaveAnimation();
        createGridAnimation();
        createConnectionAnimation();
        createBubbleAnimation();
        createEnergyAnimation();
      }, 100);

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-[9999]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            LangFlow
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              How it Works
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              Pricing
            </Link>
            <Link href="/auth/signin" className="text-gray-300 hover:text-white transition-colors duration-300">
              Sign In
            </Link>
            <Link href="/auth/signup" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-black/40 backdrop-blur-xl border-t border-white/10`}>
          <div className="container mx-auto px-6 py-6 space-y-4">
            <Link 
              href="#features" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="/pricing" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/auth/signin" 
              className="block text-gray-300 hover:text-white transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup" 
              className="block w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24 pb-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium mb-6">
                ✨ The Future of AI Workflow Automation
              </div>
              <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-400 leading-tight">
                Build AI Workflows
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Without Code
                </span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Transform your ideas into powerful AI workflows with our intuitive visual builder. 
              No coding required – just drag, drop, and deploy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link 
                href="/auth/signup" 
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 text-center relative overflow-hidden"
              >
                <span className="relative z-10">Start Building Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
              <Link 
                href="#demo"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 text-center"
              >
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-16 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-cyan-400">50K+</div>
                <div className="text-gray-400">Workflows Created</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-400">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-400">10M+</div>
                <div className="text-gray-400">API Calls Daily</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-32 px-6 relative bg-gradient-to-b from-slate-900/50 via-purple-900/30 to-slate-800/60 overflow-hidden transition-all duration-1000 -mt-20">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-2 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rotate-45 animate-shimmer"></div>
        </div>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to build, deploy, and scale your AI workflows
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Visual Workflow Builder</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Create complex AI workflows with our intuitive drag-and-drop interface. No coding required.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  Drag & Drop Interface
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  Pre-built Components
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  Real-time Preview
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your workflows are secure with enterprise-grade security and compliance standards.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  End-to-End Encryption
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  SOC 2 Compliant
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  GDPR Ready
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Scale Infinitely</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                From prototype to production, scale your workflows to handle millions of requests.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Auto-scaling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Global CDN
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  99.9% Uptime SLA
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} id="how-it-works" className="py-32 px-6 relative bg-gradient-to-br from-slate-800/50 via-purple-800/30 to-purple-900/40 overflow-hidden transition-all duration-1000">
        {/* Animated Connecting Lines Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-32 h-px bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-px bg-gradient-to-r from-purple-500 to-green-500 animate-pulse delay-1000"></div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-green-500/50 animate-shimmer"></div>
            
            <div className="text-center group relative">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl group-hover:shadow-cyan-500/50 relative z-10">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-cyan-500/50 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-4">Design</h3>
                <p className="text-gray-300">
                  Use our visual builder to create your AI workflow by connecting pre-built components
                </p>
              </div>
            </div>

            <div className="text-center group relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl group-hover:shadow-purple-500/50 relative z-10">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-purple-500/50 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-4">Test</h3>
                <p className="text-gray-300">
                  Test your workflow in real-time with our built-in testing environment
                </p>
              </div>
            </div>

            <div className="text-center group relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl group-hover:shadow-green-500/50 relative z-10">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-green-500/50 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-4">Deploy</h3>
                <p className="text-gray-300">
                  Deploy your workflow to production with one click and monitor performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-32 px-6 relative bg-gradient-to-br from-purple-900/40 via-slate-800/30 to-cyan-900/30 overflow-hidden transition-all duration-1000">
        {/* Floating Testimonial Bubbles Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400/30 rounded-full blur-2xl animate-float delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-purple-400/30 rounded-full blur-2xl animate-float delay-500"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-400/30 rounded-full blur-2xl animate-float delay-1500"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-300">
              See what our users are saying
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/2 to-white/0 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "LangFlow has completely transformed how we build AI applications. What used to take weeks now takes hours."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                <div>
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-gray-400 text-sm">CTO, TechCorp</div>
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/2 to-white/0 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">
                "The visual interface is incredibly intuitive. Our entire team was productive within the first day."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <div>
                  <div className="text-white font-semibold">Mike Rodriguez</div>
                  <div className="text-gray-400 text-sm">Lead Developer, StartupXYZ</div>
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/2 to-white/0 backdrop-blur-sm border border-white/10 hover:border-green-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Amazing platform! We've reduced our development time by 80% and our AI workflows are more reliable than ever."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                <div>
                  <div className="text-white font-semibold">Emily Johnson</div>
                  <div className="text-gray-400 text-sm">AI Engineer, DataFlow Inc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 px-6 relative bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 overflow-hidden">
        {/* Animated Particle System Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-10 right-10 w-5 h-5 bg-green-400 rounded-full animate-ping delay-1500"></div>
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-cyan-400/50 rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl">
          <div className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            {/* Enhanced Background with Multiple Layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-lg border border-white/20 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent rounded-3xl"></div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 p-px">
              <div className="h-full w-full bg-slate-900/80 rounded-3xl backdrop-blur-lg"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="mb-8">
                <div className="inline-block p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Transform Your
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  AI Development?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers who are already building the future with LangFlow. 
                Start your journey today – it's completely free!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/auth/signup" 
                  className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-bold hover:from-cyan-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-cyan-500/50 text-center relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Building Free
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
                <Link 
                  href="/pricing"
                  className="group w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/20 transition-all duration-500 border-2 border-white/30 hover:border-cyan-400/50 text-center hover:scale-105 hover:-rotate-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    View Pricing
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </span>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">99.9% Uptime SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                LangFlow
              </div>
              <p className="text-gray-400">
                The most powerful AI workflow platform for modern developers.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">API Reference</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 LangFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms</Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
