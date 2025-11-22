import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Code, 
  Cpu, 
  Globe, 
  Database,
  Smartphone,
  Zap,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  User,
  Trophy,
  Star,
  CheckCircle2,
  Terminal,
  Layout,
  Settings,
  Brain,
  Monitor,
  ExternalLink, // Added for the website link icon
  Download, // Added for Resume
  ArrowUp // Added for Back to Top
} from 'lucide-react';

// --- Optimized Animation Components ---

// 0. Terminal Preloader
const Preloader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const textLines = [
    "> Initializing secure connection...",
    "> Loading neural modules...",
    "> Optimizing interface graphics...",
    "> Access Granted. Welcome, User."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, textLines[currentLine]]);
      currentLine++;
      if (currentLine >= textLines.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-neutral-950 z-[100] flex items-center justify-center font-mono text-emerald-500 p-8">
      <div className="w-full max-w-lg">
        {lines.map((line, i) => (
          <div key={i} className="mb-2 text-lg md:text-xl opacity-0 animate-nav-enter" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            {line}
          </div>
        ))}
        <div className="w-3 h-6 bg-emerald-500 animate-pulse inline-block ml-1"></div>
      </div>
    </div>
  );
};

// 1. Spotlight Card Effect (Mouse Tracking) - Optimized with Direct DOM Manipulation
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(16, 185, 129, 0.25)" }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (divRef.current) {
      divRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 transition-all duration-500 hover:border-neutral-700 ${className}`}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--spotlight-opacity': '0',
        '--spotlight-color': spotlightColor
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-10"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 40%)`,
        }}
      />
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};

// 2. Directional Reveal Component (Smoother Physics & Reversible)
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on intersection to allow re-animation when scrolling up/down
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up": return "translate-y-20 scale-95";
        case "down": return "-translate-y-20 scale-95";
        case "left": return "-translate-x-20 scale-95";
        case "right": return "translate-x-20 scale-95";
        default: return "translate-y-20";
      }
    }
    return "translate-x-0 translate-y-0 scale-100";
  };

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1200ms] cubic-bezier(0.17, 0.55, 0.55, 1) ${getTransform()} ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'} ${className}`}
    >
      {children}
    </div>
  );
};

// 3. Typewriter Effect Component
const Typewriter = ({ words, wait = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) return;

    if ( subIndex === words[index].length + 1 && !reverse ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? wait : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, wait]);

  return (
    <span className="inline-block">
      {words[index].substring(0, subIndex)}
      <span className={`inline-block w-[3px] h-[1em] ml-1 align-middle bg-emerald-400 ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
};

// 4. Tech Background Animation (Circuit Board + AI Neural Network)
const TechBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // --- Configuration ---
    const gridSize = 50; 
    const numSignals = 15; // Reduced for performance
    const numNodes = 30;   // Reduced for performance
    const connectionDistance = 150;

    // --- Classes ---
    
    class Signal {
      constructor() {
        this.reset();
        this.progress = Math.random() * (Math.max(width, height));
      }
      
      reset() {
        this.horizontal = Math.random() > 0.5;
        if (this.horizontal) {
            this.x = -100; 
            this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
            this.speed = 2 + Math.random() * 2;
        } else {
            this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
            this.y = -100; 
            this.speed = 2 + Math.random() * 2;
        }
        this.progress = 0;
        this.color = Math.random() > 0.7 ? '#10b981' : '#3b82f6'; // Emerald or Blue
        this.size = Math.random() * 2 + 1;
      }
      
      update() {
        this.progress += this.speed;
        const maxDist = this.horizontal ? width + 200 : height + 200;
        if (this.progress > maxDist) {
           this.reset();
        }
      }
      
      draw(ctx) {
        const headX = this.horizontal ? this.x + this.progress : this.x;
        const headY = this.horizontal ? this.y : this.y + this.progress;
        const tailLength = 150;
        
        const gradient = ctx.createLinearGradient(
          this.horizontal ? headX - tailLength : headX,
          this.horizontal ? headY : headY - tailLength,
          headX,
          headY
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, this.color);
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        ctx.moveTo(this.horizontal ? headX - tailLength : headX, this.horizontal ? headY : headY - tailLength);
        ctx.lineTo(headX, headY);
        ctx.stroke();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(headX, headY, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 1.5 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw(ctx) {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- Initialization ---
    const signals = [];
    for(let i = 0; i < numSignals; i++) signals.push(new Signal());
    
    const nodes = [];
    for(let i = 0; i < numNodes; i++) nodes.push(new Node());

    // --- Animation Loop ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // 1. Draw Grid (Faint)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for(let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw AI Neural Network (Nodes & Connections)
      nodes.forEach((node, i) => {
        node.update();
        node.draw(ctx);
        
        // Connect to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / connectionDistance)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }
      });

      // 3. Draw Circuit Signals
      signals.forEach(signal => {
        signal.update();
        signal.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

// --- Main Application ---

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
      {/* --- Global Styles & Keyframes --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');
        
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        h1, h2, h3 { font-family: 'Inter', sans-serif; letter-spacing: -0.02em; }
        
        /* Smooth Scrollbar */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #262626; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #404040; }

        /* Grid Background Animation */
        .bg-grid {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; will-change: transform; }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse-glow { animation: pulse-glow 8s ease-in-out infinite; will-change: transform, opacity; }

        /* Nav Entrance Animation */
        @keyframes nav-enter {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-nav-enter { 
          opacity: 0; 
          animation: nav-enter 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards; 
          will-change: transform, opacity;
        }
        
        /* Text Reveal Animation */
        @keyframes text-reveal {
            from { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); transform: translateY(100%); opacity: 0; }
            to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translateY(0); opacity: 1; }
        }
        .text-reveal-word {
            display: inline-block;
            animation: text-reveal 1s cubic-bezier(0.2, 1, 0.3, 1) forwards;
            opacity: 0;
            will-change: transform, opacity, clip-path;
        }
      `}</style>

      {/* --- Background Noise Texture --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      {/* --- Tech Background Animation --- */}
      <TechBackground />
      
      {/* --- Ambient Glows --- */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse-glow"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      {/* --- Navbar --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-neutral-950/80 backdrop-blur-md border-neutral-800 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <div 
            className="text-xl font-bold tracking-tighter flex items-center gap-2 animate-nav-enter"
            style={{ animationDelay: '0ms' }}
            onClick={() => scrollTo('hero')}
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-neutral-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]">Y</div>
            <span className="hover:text-emerald-400 transition-colors">YOGESH</span>
          </div>

          <ul className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            {['About', 'Work', 'Education', 'Skills', 'Contact'].map((item, i) => (
              <li key={item} className="animate-nav-enter" style={{ animationDelay: `${100 + (i * 50)}ms` }}>
                <button 
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="hover:text-emerald-400 transition-all duration-300 relative group hover:-translate-y-1"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>

          <div className="md:hidden animate-nav-enter" style={{ animationDelay: '200ms' }}>
            <button className="text-neutral-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-neutral-950 z-40 flex items-center justify-center transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="flex flex-col gap-8 text-2xl font-light text-center">
          {['About', 'Work', 'Education', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <button onClick={() => scrollTo(item.toLowerCase())} className="hover:text-emerald-400 transition-colors">{item}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* --- Hero Section --- */}
      <section id="hero" className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <Reveal delay={0} direction="right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-emerald-400 text-xs font-medium tracking-wide uppercase mb-6 hover:bg-neutral-800 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Available for hire
              </div>
            </Reveal>
            
            <div className="overflow-hidden mb-6">
              <div className="space-y-2">
                <Reveal delay={100}>
                  <h2 className="text-2xl md:text-3xl text-neutral-300 font-light">Hi, I'm <span className="text-white font-bold">Yogesh</span></h2>
                </Reveal>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] text-white">
                   <span className="block overflow-hidden">
                     <span className="text-reveal-word" style={{animationDelay: '200ms'}}>I</span>{' '}
                     <span className="text-reveal-word" style={{animationDelay: '250ms'}}>am</span>{' '}
                     <span className="text-reveal-word" style={{animationDelay: '300ms'}}>a</span>
                   </span>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 bg-[length:200%_auto] animate-gradient-x">
                      <Typewriter 
                        words={[
                          "UI/UX Developer",
                          "AI Enthusiast",
                          "ML Developer",
                          "Full Stack Dev"
                        ]} 
                      />
                   </span>
                </h1>
              </div>
            </div>
            
            <Reveal delay={400} direction="up">
              <p className="text-lg text-neutral-400 mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0">
                I engineer high-performance digital experiences that merge aesthetic precision with architectural code. Fast, scalable, and visually stunning.
              </p>
            </Reveal>
            
            <Reveal delay={600} direction="up">
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollTo('work')}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold rounded-lg transition-all hover:scale-[1.05] active:scale-[0.98] flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                  View Projects <ArrowUpRight size={18} />
                </button>
                <button 
                  onClick={() => scrollTo('education')}
                  className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white rounded-lg transition-all flex items-center gap-2 hover:-translate-y-1"
                >
                  Education
                </button>
                <a 
                  href="public/Resume.pdf" 
                  download="Yogesh_Resume.pdf"
                  className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white rounded-lg transition-all flex items-center gap-2 hover:-translate-y-1"
                >
                  <Download size={18} /> Resume
                </a>
              </div>
            </Reveal>
          </div>

          {/* Hero Visual - Floating Animation */}
          <Reveal delay={700} direction="left">
            <div className="relative hidden lg:block perspective-1000">
              <div className="relative z-10 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl animate-float hover:rotate-y-12 transition-transform duration-700 transform-style-3d group">
                <div className="flex items-center gap-2 mb-4 border-b border-neutral-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse delay-100"></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="h-24 bg-neutral-800/50 rounded-lg border border-neutral-800 group hover:border-emerald-500/50 transition-colors"></div>
                    <div className="h-24 bg-neutral-800/50 rounded-lg border border-neutral-800 group hover:border-blue-500/50 transition-colors"></div>
                  </div>
                </div>
                {/* Floating Elements around card */}
                <div className="absolute -right-8 top-10 p-3 bg-emerald-900/30 backdrop-blur-md border border-emerald-500/30 rounded-lg animate-float" style={{ animationDelay: '1s' }}>
                    <Code className="text-emerald-400" />
                </div>
                <div className="absolute -left-8 bottom-20 p-3 bg-blue-900/30 backdrop-blur-md border border-blue-500/30 rounded-lg animate-float" style={{ animationDelay: '2.5s' }}>
                    <Cpu className="text-blue-400" />
                </div>
              </div>
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl -z-10 transform translate-y-10 translate-x-10"></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-32 px-6 bg-neutral-950 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="right">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative aspect-square rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                 <img 
                   src="public/profile.jpg" 
                   alt="Yogesh M" 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute bottom-6 right-6 bg-neutral-950/90 border border-emerald-500/30 p-4 rounded-xl backdrop-blur-md shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3 mb-1">
                       <Trophy className="text-yellow-500" size={20} />
                       <span className="font-bold text-white">Hackathon Winner</span>
                    </div>
                    <div className="text-xs text-neutral-400">1x Winner, 3x Participant</div>
                 </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-emerald-400">Me</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-6">
              I am <strong className="text-white">Yogesh M</strong>, a passionate B.Tech Artificial Intelligence and Data Science student at SNS College of Engineering. My journey began at Kongu Vellalar Matriculation Hr. Sec. School, where I laid the foundation for my analytical thinking.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Beyond academics, I am a builder and an innovator. Proficient in <span className="text-emerald-400">Java, Python, C, and C++</span>, I founded an AI-based counselling app and was honored with the <strong className="text-white">Tamil Nadu Startup Card</strong>. My competitive spirit has led me to participate in 3 hackathons and 4 workshops, securing victories in one of each.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SpotlightCard className="p-4">
                 <div className="flex items-center gap-3">
                    <Award className="text-emerald-500" />
                    <div>
                       <div className="font-bold text-white">TN Startup Card</div>
                       <div className="text-xs text-neutral-500">Proud Recipient</div>
                    </div>
                 </div>
              </SpotlightCard>
              
              <SpotlightCard className="p-4" spotlightColor="rgba(59, 130, 246, 0.25)">
                 <div className="flex items-center gap-3">
                    <Zap className="text-blue-500" />
                    <div>
                       <div className="font-bold text-white">AI Founder</div>
                       <div className="text-xs text-neutral-500">Counselling App</div>
                    </div>
                 </div>
              </SpotlightCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Selected Work Section --- */}
      <section id="work" className="py-32 px-6 bg-neutral-900/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center gap-4">
               Projects <span className="h-px flex-grow bg-neutral-800 ml-4"></span>
             </h2>
          </Reveal>

          <div className="space-y-32">
            {[
              { 
                title: "FlowPit", 
                category: "Smart Navigation", 
                desc: "Intelligent navigation system that calculates the optimal shortest path to destinations while integrating real-time live traffic data for seamless commuting.", 
                tech: ["React Native", "Google Maps API", "Node.js", "Socket.io"],
                imageGradient: "from-blue-600 to-cyan-600",
                spotlight: "rgba(59, 130, 246, 0.3)",
                link: "https://flowpit.netlify.app/" // Replace with your actual link
              },
              { 
                title: "Veritas", 
                category: "AI Misinformation Detector", 
                desc: "Multi-language fake news detection platform. Verifies the authenticity of text, images, and videos using advanced deep learning models to combat misinformation.", 
                tech: ["Python", "TensorFlow", "NLP", "Computer Vision"],
                imageGradient: "from-violet-600 to-purple-900",
                spotlight: "rgba(139, 92, 246, 0.3)",
                link: "https://veritassns.netlify.app/" // Replace with your actual link
              },
              { 
                title: "Recruit AI", 
                category: "Automated Hiring Platform", 
                desc: "End-to-end AI recruitment tool. Shortlists resumes, generates skill-specific assessment questions, and manages candidate testing via secure email tokens.", 
                tech: ["React", "OpenAI API", "Node.js", "MongoDB"],
                imageGradient: "from-emerald-600 to-teal-900",
                spotlight: "rgba(16, 185, 129, 0.3)",
                link: "https://recurit-ai.netlify.app/" // Replace with your actual link
              }
            ].map((project, i) => (
              <div key={i} className="group">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Image Side */}
                  <Reveal delay={0} direction={i % 2 === 0 ? "right" : "left"} className={`order-2 ${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className={`aspect-video rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden relative transition-all duration-700 transform group-hover:scale-[1.02] group-hover:shadow-2xl`}>
                       {/* Browser Window Header */}
                       <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800 flex items-center px-4 gap-2 z-20">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                          <div className="ml-2 text-[10px] text-neutral-500 font-mono truncate opacity-50 max-w-[200px]">
                            {project.link.replace(/^https?:\/\//, '')}
                          </div>
                       </div>
                       
                       {/* Website Preview */}
                       <div className="absolute inset-0 top-8 bg-white">
                          <iframe 
                            src={project.link} 
                            title={project.title}
                            className="w-full h-full border-0 pointer-events-none select-none"
                            loading="lazy"
                            scrolling="no"
                          />
                       </div>
                       
                       {/* Clickable Overlay */}
                       <a 
                         href={project.link} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="absolute inset-0 z-30"
                         aria-label={`Visit ${project.title}`}
                       />
                    </div>
                    {/* Decorative glow behind image */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.imageGradient} opacity-0 group-hover:opacity-30 blur-3xl -z-10 rounded-full transition-opacity duration-700`}></div>
                  </Reveal>

                  {/* Text Side */}
                  <Reveal delay={200} direction="up" className={`order-1 ${i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <SpotlightCard className="p-8 border-none bg-transparent text-center lg:text-left" spotlightColor={project.spotlight}>
                        <h4 className="text-emerald-400 font-medium mb-2 uppercase tracking-wider text-sm">{project.category}</h4>
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">{project.title}</h3>
                        <p className="text-neutral-400 text-lg mb-6 leading-relaxed">{project.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                          {project.tech.map((t, idx) => (
                            <span key={t} style={{ transitionDelay: `${idx * 50}ms` }} className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-sm border border-neutral-700 hover:border-emerald-500/50 hover:text-white transition-all">
                              {t}
                            </span>
                          ))}
                        </div>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-white font-medium border-b border-emerald-500 pb-1 hover:text-emerald-400 hover:border-emerald-400 transition-all group-hover:translate-x-2 mx-auto lg:mx-0"
                        >
                          View Website <ExternalLink size={16} />
                        </a>
                    </SpotlightCard>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Education Section --- */}
      <section id="education" className="py-32 px-6 bg-neutral-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
               <h2 className="text-3xl md:text-4xl font-bold text-white">Education</h2>
               <div className="h-px flex-grow bg-neutral-800 md:ml-6"></div>
             </div>
          </Reveal>

          <div className="grid gap-8">
            {/* SNS College Card */}
            <Reveal delay={0} direction="left">
              <SpotlightCard className="p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-transparent opacity-20"></div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center relative z-10 text-center md:text-left">
                  <div className="w-20 h-20 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 overflow-hidden p-2">
                    <img src="/sns-logo.png" alt="SNS College Logo" className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-col md:flex-row md:justify-between items-center gap-2">
                      <h3 className="text-2xl font-bold text-white">SNS College of Engineering</h3>
                      <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-sm font-medium border border-emerald-400/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Current
                      </div>
                    </div>
                    <p className="text-lg text-neutral-300 font-medium">B.Tech Artificial Intelligence & Data Science</p>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-400 pt-2">
                      <div className="flex items-center gap-1.5">
                        <Award size={16} className="text-yellow-500" />
                        <span>CGPA: <span className="text-white font-semibold">8.5</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* School Card */}
            <Reveal delay={200} direction="right">
              <SpotlightCard className="p-8" spotlightColor="rgba(59, 130, 246, 0.25)">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent opacity-20"></div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center relative z-10 text-center md:text-left">
                  <div className="w-20 h-20 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 overflow-hidden p-1">
                    <img src="/kongu-logo.png" alt="Kongu Vellalar School Logo" className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-col md:flex-row md:justify-between items-center gap-2">
                      <h3 className="text-2xl font-bold text-white">Kongu Vellalar Matriculation Hr. Sec. School</h3>
                      <div className="flex items-center gap-2 text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full text-sm font-medium border border-neutral-800">
                        <Calendar size={14} />
                        March 2024
                      </div>
                    </div>
                    <p className="text-lg text-neutral-300 font-medium">Higher Secondary (12th) - Computer Science Group</p>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-400 pt-2">
                      <div className="flex items-center gap-1.5">
                        <Award size={16} className="text-yellow-500" />
                        <span>Percentage: <span className="text-white font-semibold">84.5%</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Skills Section --- */}
      <section id="skills" className="py-32 px-6 bg-neutral-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
               <h2 className="text-3xl md:text-4xl font-bold text-white">Skills & Expertise</h2>
               <div className="h-px flex-grow bg-neutral-800 md:ml-6"></div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Core Tech (Wide) */}
            <Reveal delay={0} className="lg:col-span-2">
              <SpotlightCard className="h-full p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform duration-300"><Terminal size={28} /></div>
                  <h3 className="text-2xl font-bold text-white">Core Technologies</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 rounded-full bg-emerald-500"></span> Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Java', 'C', 'C++'].map(s => (
                        <span key={s} className="px-4 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-200 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-white transition-all duration-300 cursor-default">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 rounded-full bg-emerald-500"></span> Web Development
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['HTML', 'CSS', 'JavaScript', 'UI/UX Design'].map(s => (
                        <span key={s} className="px-4 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-200 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-white transition-all duration-300 cursor-default">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Card 2: Domains (Tall) */}
            <Reveal delay={100} className="lg:row-span-2">
              <SpotlightCard className="h-full p-8" spotlightColor="rgba(139, 92, 246, 0.25)">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 
                 <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 group-hover:scale-110 transition-transform duration-300"><Brain size={28} /></div>
                  <h3 className="text-2xl font-bold text-white">Domains</h3>
                </div>
                
                <div className="space-y-3 relative z-10">
                   {['Artificial Intelligence', 'Data Science', 'Machine Learning', 'Automation', 'Robotics'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-transparent hover:border-violet-500/30 hover:bg-white/10 transition-all duration-300">
                        <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px] ${['bg-violet-400 shadow-violet-400', 'bg-fuchsia-400 shadow-fuchsia-400', 'bg-indigo-400 shadow-indigo-400'][i % 3]}`}></div>
                        <span className="text-neutral-200 font-medium">{item}</span>
                      </div>
                   ))}
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Card 3: Tools & OS */}
            <Reveal delay={200}>
               <SpotlightCard className="h-full p-8" spotlightColor="rgba(59, 130, 246, 0.25)">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform duration-300"><Settings size={28} /></div>
                    <h3 className="text-xl font-bold text-white">Tools & OS</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                      {['GitHub', 'VS Code', 'Figma', 'Canva', 'MS Office'].map(s => (
                        <span key={s} className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 text-sm hover:border-blue-500/50 transition-colors">{s}</span>
                      ))}
                  </div>
                  <div className="pt-6 border-t border-neutral-800 flex gap-6">
                       <div className="flex items-center gap-2 text-neutral-400 group-hover:text-white transition-colors">
                          <Monitor size={18}/> <span className="text-sm font-medium">Windows</span>
                       </div>
                       <div className="flex items-center gap-2 text-neutral-400 group-hover:text-white transition-colors">
                          <Terminal size={18}/> <span className="text-sm font-medium">Linux</span>
                       </div>
                  </div>
               </SpotlightCard>
            </Reveal>

            {/* Card 4: Soft Skills */}
            <Reveal delay={300}>
               <SpotlightCard className="h-full p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform duration-300"><User size={28} /></div>
                    <h3 className="text-xl font-bold text-white">Soft Skills</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                     {['Problem Solving', 'Team Collaboration', 'Adaptability', 'Time Management', 'Event Coordination'].map((s) => (
                        <div key={s} className="flex items-center gap-3 text-neutral-300 font-medium">
                           <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                           {s}
                        </div>
                     ))}
                  </div>
               </SpotlightCard>
            </Reveal>

          </div>
        </div>
      </section>

      {/* --- About / Contact Section --- */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <Reveal direction="up">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-16 text-center overflow-hidden relative group hover:border-emerald-500/30 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 transition-all duration-1000 group-hover:h-2"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's build something <br /> <span className="text-emerald-400">extraordinary.</span></h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              Whether you need a complete platform overhaul or a new product launch, I'm ready to help you achieve your digital goals.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12 flex-wrap">
              <a href="mailto:yogeshmarichamy2203@gmail.com" className="px-8 py-4 bg-white text-neutral-950 font-bold rounded-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-white/10">
                <Mail size={20} /> Email 1
              </a>
              <a href="mailto:yogeshmarichamy2006@gmail.com" className="px-8 py-4 bg-white text-neutral-950 font-bold rounded-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-white/10">
                <Mail size={20} /> Email 2
              </a>
              <a href="https://www.linkedin.com/in/yogesh-mg" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-neutral-800 text-white font-bold rounded-lg hover:bg-neutral-700 transition-all hover:scale-105 active:scale-95 border border-neutral-700 flex items-center justify-center gap-2">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-neutral-950 py-12 px-6 border-t border-neutral-800 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Yogesh Portfolio. All rights reserved.
          </div>
          <div className="flex gap-6">
             <a href="https://github.com/Yogeshm2k6" className="text-neutral-500 hover:text-emerald-400 transition-colors hover:-translate-y-1 transform"><Github size={20} /></a>
             <a href="https://www.linkedin.com/in/yogesh-mg" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-emerald-400 transition-colors hover:-translate-y-1 transform"><Linkedin size={20} /></a>
             <a href="mailto:yogeshmarichamy2203@gmail.com" className="text-neutral-500 hover:text-emerald-400 transition-colors hover:-translate-y-1 transform"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-emerald-500 text-neutral-950 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all duration-500 z-50 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowUp size={24} />
      </button>

      </>
      )}

    </div>
  );
};

export default App;
