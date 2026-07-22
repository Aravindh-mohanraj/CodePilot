"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Building2, 
  Terminal, 
  EyeOff, 
  FileJson, 
  Bot, 
  LineChart, 
  Bookmark, 
  Mic, 
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const stats = [
    { value: "15,000+", label: "Questions" },
    { value: "500+", label: "Companies" },
    { value: "50+", label: "Topics" },
    { value: "100K+", label: "Test Cases" }
  ];

  const features = [
    {
      title: "AI Generated Questions",
      description: "Infinite practice possibilities with questions tuned to your specific weakness and experience level.",
      icon: Sparkles
    },
    {
      title: "Company-wise Prep",
      description: "Access curated question banks from Big Tech companies including Google, Meta, and Netflix.",
      icon: Building2
    },
    {
      title: "Coding Playground",
      description: "A fully featured IDE in your browser supporting 25+ languages with high-speed execution.",
      icon: Terminal
    },
    {
      title: "Hidden Test Cases",
      description: "Prepare for edge cases that real interviewers look for. Our AI validates your logic against thousands of edge inputs.",
      icon: EyeOff
    },
    {
      title: "JSON Export",
      description: "Take your progress with you. Export your solution history, notes, and metrics in standard JSON format.",
      icon: FileJson
    },
    {
      title: "AI Assistant",
      description: "24/7 technical mentor to explain complex algorithms and provide architectural advice.",
      icon: Bot
    },
    {
      title: "Skill Mapping",
      description: "Visualize your progress across different domains like System Design, DSA, and Frontend.",
      icon: LineChart
    },
    {
      title: "Smart Bookmarks",
      description: "Organize hard questions into collections and set automated reminders for spaced repetition.",
      icon: Bookmark
    },
    {
      title: "Mock Interviews",
      description: "Simulate real-world pressure with AI-driven voice and chat interviews that feel real.",
      icon: Mic
    }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-[#0d0d15] text-on-surface select-none relative overflow-hidden">
      {/* Decorative Atmosphere Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-2xl pb-3xl z-10">
        <div className="max-w-container-max mx-auto px-lg w-full grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariant}
            className="space-y-xl"
          >
            {/* AI badge pill */}
            <motion.div 
              variants={fadeUpVariant}
              className="inline-flex items-center gap-sm px-md py-xs bg-surface-container-high/50 backdrop-blur-md rounded-full border border-outline-variant/30 text-primary font-label-md text-label-md w-fit"
            >
              <Sparkles className="w-4 h-4" />
              POWERED BY GPT-4 &amp; CLAUDE 3
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={fadeUpVariant}
              className="font-display-lg text-display-lg-mobile md:text-display-lg font-black leading-tight tracking-tighter"
            >
              <span className="ai-gradient-text">Master Every Interview</span><br/>
              <span className="text-on-surface">with PrepForge AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeUpVariant}
              className="font-body-md text-on-surface-variant max-w-xl text-lg leading-relaxed"
            >
              An AI-powered interview intelligence platform that automatically discovers, categorizes, generates and validates coding and technical interview questions. Stay ahead of the curve with real-time company insights.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={fadeUpVariant}
              className="flex flex-wrap gap-md pt-md items-center"
            >
              <Link href={isAuthenticated ? "/dashboard" : "/auth?mode=signup"}>
                <button className="bg-primary text-on-primary font-bold px-xl py-lg rounded-xl flex items-center gap-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20 cursor-pointer">
                  Start Solving 
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/explore">
                <button className="bg-surface-container border border-outline-variant/30 text-on-surface font-semibold px-xl py-lg rounded-xl hover:bg-surface-container-high active:scale-95 transition-all cursor-pointer">
                  Explore Questions
                </button>
              </Link>
              <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors font-semibold px-md py-lg group cursor-pointer">
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right Graphics Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full"></div>
            
            {/* Main glass card with brain illustration */}
            <div className="glass-card p-4 rounded-3xl relative float-animation ai-glow w-full max-w-[480px] mx-auto border border-white/5">
              <div 
                className="w-full aspect-square rounded-2xl bg-cover bg-center border border-white/5 shadow-2xl" 
                style={{ backgroundImage: `url('/images/hero-brain.png')` }}
              />
              
              {/* Floating recently generated badge */}
              <div className="absolute -bottom-6 -left-6 glass-card p-md rounded-xl flex items-center gap-md ai-glow border border-white/10 shadow-2xl">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-label-md text-on-surface-variant tracking-wider uppercase">RECENTLY GENERATED</p>
                  <p className="text-body-md font-bold text-on-surface">LRU Cache in Rust</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-3xl bg-[#0d0d15] relative z-10 border-t border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-lg">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariant}
            className="grid grid-cols-2 md:grid-cols-4 gap-lg"
          >
            {stats.map((stat) => (
              <motion.div 
                key={stat.label}
                variants={fadeUpVariant}
                className="glass-card p-xl rounded-2xl text-center hover:shadow-primary/20 hover:border-primary/30 transition-all border border-white/5 shadow-xl group cursor-default"
              >
                <h3 className="font-display-lg text-primary text-4xl mb-xs font-black tracking-tight group-hover:scale-105 transition-transform">
                  {stat.value}
                </h3>
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs opacity-75">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section className="py-3xl relative z-10 bg-[#0d0d15]">
        <div className="max-w-container-max mx-auto px-lg">
          
          {/* Section Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-2xl"
          >
            <h2 className="font-headline-md text-headline-md md:text-display-lg font-black mb-md text-on-surface">
              Engineered for <span className="text-primary">Performance</span>
            </h2>
            <p className="text-on-surface-variant font-body-md max-w-2xl mx-auto text-lg leading-relaxed">
              Our specialized AI engine doesn&apos;t just scrape the web—it constructs unique challenges and provides deep architectural feedback.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariant}
            className="grid grid-cols-1 md:grid-cols-3 gap-lg"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={feature.title}
                  variants={fadeUpVariant}
                  className="glass-card p-xl rounded-2xl group hover:shadow-primary/20 hover:border-primary/30 transition-all border border-white/5 flex flex-col h-full cursor-default"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-lg group-hover:bg-primary/20 transition-colors border border-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-headline-sm text-headline-sm mb-md text-on-surface font-bold leading-tight">
                    {feature.title}
                  </h4>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
