import { useState, useEffect } from 'react'
import { Home, User, Briefcase, FileText, X, ArrowUpRight } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import Bento3Section from '@/components/ui/bento-monochrome-1'
import { FlippingCard } from '@/components/ui/flipping-card'
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery'
import { Badge } from '@/components/ui/badge'
import GlassmorphismCta from '@/components/ui/glassmorphism-cta'
import { ExperienceFeatures } from '@/components/ui/features-8'
import { EducationTimeline } from '@/components/ui/education-timeline'
import { SamuraiBackground, SamuraiChrome, useInkRipple } from "@/components/samurai"
import { ContactCard } from "@/components/ui/contact-card";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { MusicPlayer } from "@/components/ui/music-player";
import { MailIcon, PhoneIcon, MapPinIcon, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import './index.css'

const skillsData = [
  {
    id: "python",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600",
      imageAlt: "Python Code",
      title: "Python (Programming Language)",
      description: "Extensive experience in Python for AI, ML, and backend development.",
    },
    back: {
      description: "I utilize Python extensively for machine learning models, scripting, and backend web development. It serves as the foundation for my AI projects and RAG systems.",
    },
  },
  {
    id: "c-lang",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
      imageAlt: "C Programming",
      title: "C (Programming Language)",
      description: "Strong foundation in low-level programming and memory management.",
    },
    back: {
      description: "My experience in C provides a deep understanding of memory management, pointer arithmetic, and algorithmic efficiency, forming the bedrock of my computer science education.",
    },
  },
  {
    id: "problem-solving",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
      imageAlt: "Professional Tech Setup",
      title: "Problem Solving & Logic",
      description: "Strategic thinking, algorithm design, and structured problem decomposition.",
    },
    back: {
      description: "Whether tackling complex AI algorithms or debugging system architecture, I apply a structured, logical approach to decompose complex problems into actionable solutions.",
    },
  },
];

const portfolioProjects = [
  {
    id: "taskpilot",
    title: "TaskPilot AI",
    cat: "Next.js",
    img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600",
    url: "https://github.com/AnweshBiswal/TaskPilot-AI-Hackathon"
  },
  {
    id: "aiclassroom",
    title: "AI-Classroom",
    cat: "WebSockets",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    url: "#"
  },
  {
    id: "docintel",
    title: "Document Intelligence",
    cat: "FastAPI / RAG",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    url: "https://github.com/AnweshBiswal/Document-Intelligence-System"
  }
];



function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;
    
    setFormStatus('submitting');
    try {
      const response = await fetch('https://hook.us2.make.com/1rbvnmdk8awmcy76qce2ja0pg7bcn1vg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  useInkRipple();

  return (
    <>
      <CustomCursor />
      <MusicPlayer />
      <SamuraiBackground
        glow
        grid
        orbs
        embers
        emberCount={60}
        parallax
        kanji="影"
      />
      <SamuraiChrome />

      {/* Global Fixed NavBar */}
      <NavBar items={[
        { name: 'Home', url: '#hero', icon: Home },
        { name: 'About', url: '#about', icon: User },
        { name: 'Skills', url: '#skills', icon: FileText },
        { name: 'Projects', url: '#projects', icon: Briefcase }
      ]} />

      {/* Editorial Hero Section */}
      <section id="hero" className="relative h-[100dvh] w-full overflow-hidden bg-transparent text-foreground font-hn z-10">

        {/* Marquee Typography */}
        <div className="absolute inset-x-0 top-[40%] sm:top-[45%] -translate-y-1/2 z-10 overflow-hidden pointer-events-none anim-fade-up" style={{ animationDelay: '500ms' }}>
          <div className="marquee-content flex w-max whitespace-nowrap font-hn font-bold text-[24vh] sm:text-[32vh] leading-none text-foreground tracking-tighter">
            <span className="pr-[8vw]">Anwesh Biswal</span>
            <span className="pr-[8vw]">Anwesh Biswal</span>
            <span className="pr-[8vw]">Anwesh Biswal</span>
          </div>
        </div>

        {/* Front portrait */}
        <img 
          src="/images/Anwesh.png" 
          alt="Anwesh Biswal" 
          className="absolute inset-x-0 bottom-0 z-20 mx-auto h-[62vh] sm:h-[78vh] w-auto max-w-none object-contain object-bottom pointer-events-none anim-rise-in"
          style={{ animationDelay: '300ms' }}
        />

        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-start px-[4vw] pt-[3.5vh]">
          {/* Logo */}
          <a href="#" className="font-hn font-bold text-[1.5rem] tracking-wide anim-fade-up text-foreground" style={{ animationDelay: '800ms' }}>Anwesh</a>
          
          {/* Year */}
          <div className="hidden sm:block absolute left-[60%] top-[3.5vh] text-[15px] anim-fade-up text-foreground" style={{ animationDelay: '900ms' }}>2026</div>

          {/* Social */}
          <div className="hidden sm:flex flex-col gap-[2px] text-[16px] leading-tight absolute left-[88%] top-[3.5vh]">
            <a href="https://github.com/AnweshBiswal" target="_blank" rel="noopener noreferrer" className="anim-fade-up hover:text-foreground/65 transition-colors duration-300 text-foreground" style={{ animationDelay: '1150ms' }}>GitHub</a>
            <a href="https://www.linkedin.com/in/anwesh-biswal-75ba3537a" target="_blank" rel="noopener noreferrer" className="anim-fade-up hover:text-foreground/65 transition-colors duration-300 text-foreground" style={{ animationDelay: '1230ms' }}>LinkedIn</a>
            <a href="#contact" className="anim-fade-up hover:text-foreground/65 transition-colors duration-300 text-foreground" style={{ animationDelay: '1310ms' }}>Contact</a>
          </div>
          
          {/* Hamburger */}
          <button 
            className="flex flex-col justify-center items-end h-8 w-[30px] z-50 absolute right-[4vw] top-[3.5vh] anim-fade-up"
            style={{ animationDelay: '900ms' }}
            onClick={() => {
              setDrawerOpen(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <div className="flex flex-col justify-between h-[12px] w-full">
              <span className="block h-[2px] w-full bg-[var(--text-primary)] transition-transform duration-500" style={{ transform: drawerOpen ? 'rotate(45deg) translate(2px, 5px)' : 'none' }}></span>
              <span className="block h-[2px] w-full bg-[var(--text-primary)] transition-opacity duration-300" style={{ opacity: drawerOpen ? 0 : 1 }}></span>
              <span className="block h-[2px] w-full bg-[var(--text-primary)] transition-transform duration-500" style={{ transform: drawerOpen ? 'rotate(-45deg) translate(2px, -5px)' : 'none' }}></span>
            </div>
          </button>
        </header>

        {/* Horizontal Line */}
        <div className="absolute left-[4vw] right-[4vw] bottom-[18vh] z-30 h-[1px] bg-[var(--text-primary)] opacity-40 anim-line" style={{ animationDelay: '1200ms' }}></div>

        {/* Bottom Left Content */}
        <div className="absolute left-[4vw] bottom-[7vh] z-30 flex flex-col text-[14px] sm:text-[16px] leading-[1.4] font-hn text-foreground anim-fade-up" style={{ animationDelay: '1400ms' }}>
          <span>B.Tech Computer Science Student</span>
          <span>AI & ML</span>
          <span>Building with Code & Intelligence</span>
        </div>

        {/* Bottom Right Content */}
        <div className="absolute right-[4vw] bottom-[7vh] z-30 flex flex-col text-right text-[14px] sm:text-[16px] leading-[1.4] font-hn text-foreground anim-fade-up" style={{ animationDelay: '1550ms' }}>
          <span>Anwesh Biswal</span>
          <span>Odisha, India</span>
        </div>

        {/* Mobile Drawer */}
        <div 
          className={`fixed inset-0 z-40 transition-opacity duration-500 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setDrawerOpen(false);
              document.body.style.overflow = '';
            }}
          ></div>
          
          <div 
            className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-muted px-8 py-10 transition-transform flex flex-col"
            style={{ 
              transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
              transitionDuration: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)'
            }}
          >
            <button 
              className="absolute right-[4vw] top-[3.5vh] z-50 text-foreground transition-all duration-300"
              style={{
                transform: drawerOpen ? 'rotate(0)' : 'rotate(90deg)',
                opacity: drawerOpen ? 1 : 0,
                transitionDelay: drawerOpen ? '300ms' : '0ms'
              }}
              onClick={() => {
                setDrawerOpen(false);
                document.body.style.overflow = '';
              }}
            >
              <X size={26} strokeWidth={1.5} />
            </button>

            <div className="mt-12 flex flex-col gap-6">
              <span 
                className="uppercase tracking-[0.2em] text-foreground/50 text-xs transition-all duration-500"
                style={{ 
                  transform: drawerOpen ? 'translateY(0)' : 'translateY(24px)', 
                  opacity: drawerOpen ? 1 : 0,
                  transitionDelay: drawerOpen ? '250ms' : '0ms'
                }}
              >
                Site Index
              </span>
              <nav className="flex flex-col gap-4">
                {['About', 'Skills', 'Projects'].map((item, i) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => {
                      setDrawerOpen(false);
                      document.body.style.overflow = '';
                    }}
                    className="text-4xl font-hn transition-all duration-500 text-foreground"
                    style={{ 
                      transform: drawerOpen ? 'translateY(0)' : 'translateY(24px)', 
                      opacity: drawerOpen ? 1 : 0,
                      transitionDelay: drawerOpen ? `${300 + i * 80}ms` : '0ms'
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-16 flex flex-col gap-4">
              <span 
                className="uppercase tracking-[0.2em] text-foreground/50 text-xs transition-all duration-500"
                style={{ 
                  transform: drawerOpen ? 'translateY(0)' : 'translateY(16px)', 
                  opacity: drawerOpen ? 1 : 0,
                  transitionDelay: drawerOpen ? '500ms' : '0ms'
                }}
              >
                Find Me
              </span>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/AnweshBiswal" target="_blank" rel="noopener noreferrer" className="text-sm font-hn transition-all duration-500 text-foreground" style={{ transform: drawerOpen ? 'translateY(0)' : 'translateY(16px)', opacity: drawerOpen ? 1 : 0, transitionDelay: drawerOpen ? '550ms' : '0ms' }}>GitHub</a>
                <a href="https://www.linkedin.com/in/anwesh-biswal-75ba3537a" target="_blank" rel="noopener noreferrer" className="text-sm font-hn transition-all duration-500 text-foreground" style={{ transform: drawerOpen ? 'translateY(0)' : 'translateY(16px)', opacity: drawerOpen ? 1 : 0, transitionDelay: drawerOpen ? '610ms' : '0ms' }}>LinkedIn</a>
                <a href="#contact" className="text-sm font-hn transition-all duration-500 text-foreground" style={{ transform: drawerOpen ? 'translateY(0)' : 'translateY(16px)', opacity: drawerOpen ? 1 : 0, transitionDelay: drawerOpen ? '670ms' : '0ms' }}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container relative z-10">
        <section id="about" className="min-h-[100dvh] flex flex-col justify-center py-24">
          <Bento3Section />
        </section>
        
        <section id="skills" className="py-12 md:py-20 max-w-6xl mx-auto px-[4vw]">
          <h2 className="text-3xl font-semibold mb-12 text-foreground text-center">Core Skills</h2>
          <div className="flex gap-8 flex-wrap justify-center">
            {skillsData.map((card) => (
              <FlippingCard
                key={card.id}
                width={320}
                frontContent={<GenericCardFront data={card.front} />}
                backContent={<GenericCardBack data={card.back} />}
              />
            ))}
          </div>
        </section>
        <section id="projects" className="bg-muted/30 min-h-[100dvh] text-foreground overflow-hidden w-full border-t border-b border-border">
          <div className="h-[300px] flex flex-col items-center justify-center space-y-4 pt-16">
            <div className="space-y-1 text-center">
              <span className="text-[11px] font-bold tracking-[0.4em] text-foreground/50 uppercase">
                Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Selected Work
              </h2>
            </div>
            <div className="animate-bounce text-foreground/50 text-xs mt-8">↓ Scroll to explore</div>
          </div>

          <RadialScrollGallery
            className="!min-h-[600px] pb-[200px]"
            baseRadius={400}
            mobileRadius={250}
            visiblePercentage={50}
            scrollDuration={2000}
          >
            {(hoveredIndex) =>
              portfolioProjects.map((project, index) => {
                 const isActive = hoveredIndex === index;
                 return (
                  <a 
                    key={project.id} 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative w-[180px] h-[240px] sm:w-[220px] sm:h-[300px] md:w-[260px] md:h-[340px] overflow-hidden rounded-xl bg-foreground/5 border border-border shadow-lg"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                          isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)]/95 via-[var(--bg-deep)]/40 to-transparent opacity-80" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="text-[10px] px-2.5 py-0.5 bg-background/80 text-foreground border border-[var(--text-primary)]/20 backdrop-blur">
                          {project.cat}
                        </Badge>
                        <div className={`w-7 h-7 rounded-full bg-[var(--text-primary)] text-[var(--bg-deep)] flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                          <ArrowUpRight size={14} />
                        </div>
                      </div>

                      <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-3'}`}>
                        <h3 className="text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                        <div className={`h-[2px] bg-[var(--text-primary)] mt-3 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                      </div>
                    </div>
                  </a>
                 );
              })
            }
          </RadialScrollGallery>
        </section>
        
        <ExperienceFeatures />

        <EducationTimeline />

        <section id="resume" className="py-24 px-[4vw] bg-muted/30 border-t border-border flex items-center justify-center relative z-50 overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="mx-auto max-w-5xl w-full relative z-50">
            <div className="flex flex-col md:flex-row bg-[#1a1c1c]/40 backdrop-blur-md border border-border rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Left Side - Text & CTA */}
              <div className="flex-1 p-10 md:p-16 flex flex-col justify-center items-start text-left space-y-8">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/10 border border-foreground/10 text-[11px] font-bold tracking-[0.2em] text-foreground uppercase">
                    <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] animate-pulse"></span>
                    Available for Work
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                    Curriculum Vitae
                  </h2>
                  <p className="text-foreground/70 text-lg max-w-md">
                    Get a comprehensive overview of my experience, technical skills, and educational background.
                  </p>
                </div>
                
                <div className="pt-4">
                  <GlassmorphismCta 
                    label="View Resume" 
                    href="/images/Anwesh_Biswal_Resume_Complete.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                  />
                </div>
              </div>

              {/* Right Side - Visual Elements */}
              <div className="flex-1 bg-gradient-to-br from-[var(--bg-card)]/80 to-[var(--bg-deep)]/80 p-10 flex items-center justify-center border-t md:border-t-0 md:border-l border-border">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[
                    { label: "B.Tech CSE", icon: <User size={20} /> },
                    { label: "AI & ML", icon: <FileText size={20} /> },
                    { label: "Python, C", icon: <Briefcase size={20} /> },
                    { label: "Problem Solving", icon: <ArrowUpRight size={20} /> }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-6 bg-foreground/5 border border-foreground/10 rounded-2xl hover:bg-foreground/10 transition-colors group">
                      <div className="text-foreground/50 group-hover:text-foreground mb-3 transition-colors">
                        {stat.icon}
                      </div>
                      <span className="text-xs font-semibold text-foreground text-center tracking-wide">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
        <section id="contact" className="py-32 px-[4vw] min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-background/30 border-t border-border">
          {/* Subtle background glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#1a1c1c]/40 to-transparent rounded-full blur-[100px]"></div>
          </div>
          
          <div className="mx-auto max-w-6xl w-full relative z-10 flex flex-col gap-12">
            <div className="text-center space-y-4">
              <span className="text-[11px] font-bold tracking-[0.4em] text-foreground/50 uppercase">
                Connect
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                Let's Build Something
              </h2>
            </div>

            <ContactCard
              title="Get in touch"
              description="Have an idea for a project or looking for a collaborator? Drop a message below and I'll get back to you soon."
              className="bg-muted/80 backdrop-blur-xl border-border overflow-hidden rounded-2xl"
              formSectionClassName="bg-background/90 md:border-l-[var(--border-color)]"
              contactInfo={[
                {
                  icon: MailIcon,
                  label: 'Email',
                  value: 'mailanweshbiswal@gmail.com',
                },
                {
                  icon: MapPinIcon,
                  label: 'Location',
                  value: 'Odisha, India',
                }
              ]}
            >
              <form onSubmit={handleContactSubmit} className="w-full space-y-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-name" className="text-foreground/80 text-xs uppercase tracking-widest font-semibold">Name</Label>
                  <Input id="contact-name" name="name" value={formData.name} onChange={handleFormChange} required type="text" className="bg-[#1a1c1c] border-border text-foreground focus-visible:ring-[var(--text-primary)]/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-email" className="text-foreground/80 text-xs uppercase tracking-widest font-semibold">Email</Label>
                  <Input id="contact-email" name="email" value={formData.email} onChange={handleFormChange} required type="email" className="bg-[#1a1c1c] border-border text-foreground focus-visible:ring-[var(--text-primary)]/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message" className="text-foreground/80 text-xs uppercase tracking-widest font-semibold">Message</Label>
                  <Textarea id="contact-message" name="message" value={formData.message} onChange={handleFormChange} required className="bg-[#1a1c1c] border-border text-foreground min-h-[120px] focus-visible:ring-[var(--text-primary)]/20" />
                </div>
                
                {formStatus === 'success' && <p className="text-green-500 text-sm font-medium">Message sent successfully!</p>}
                {formStatus === 'error' && <p className="text-red-500 text-sm font-medium">Failed to send message. Please try again.</p>}
                
                <Button disabled={formStatus === 'submitting'} className="w-full h-12 mt-4 bg-[var(--text-primary)] text-[var(--bg-deep)] hover:bg-[var(--text-primary)]/90 font-bold tracking-wide" type="submit">
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </ContactCard>
          </div>
        </section>
        
        <footer id="footer" className="py-12 border-t border-border bg-background/30 text-center flex flex-col items-center justify-center space-y-4 relative z-10">
          <div className="flex gap-6">
            <a href="https://github.com/AnweshBiswal" target="_blank" rel="noopener noreferrer" className="text-sm font-hn text-foreground/70 hover:text-foreground transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/anwesh-biswal-75ba3537a" target="_blank" rel="noopener noreferrer" className="text-sm font-hn text-foreground/70 hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#contact" className="text-sm font-hn text-foreground/70 hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-foreground/40 text-xs font-mono">
            &copy; {new Date().getFullYear()} Anwesh Biswal. Built with precision.
          </p>
        </footer>
      </main>
    </>
  )
}

export default App

function GenericCardFront({ data }) {
  return (
    <div className="flex flex-col h-full w-full p-4 bg-muted rounded-[inherit]">
      <img
        src={data.imageSrc}
        alt={data.imageAlt}
        className="w-full h-[140px] object-cover rounded-md"
      />
      <div className="p-2 mt-2">
        <h3 className="text-[17px] font-semibold text-foreground">{data.title}</h3>
        <p className="text-[14px] mt-2 text-foreground/70 leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}

function GenericCardBack({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 bg-muted rounded-[inherit]">
      <p className="text-[14px] text-foreground/80 text-center leading-relaxed">
        {data.description}
      </p>
    </div>
  );
}
