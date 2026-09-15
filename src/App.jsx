import { useState } from 'react'
import { Home, User, Briefcase, FileText, X, ArrowUpRight } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import Bento3Section from '@/components/ui/bento-monochrome-1'
import { FlippingCard } from '@/components/ui/flipping-card'
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery'
import { Badge } from '@/components/ui/badge'
import { ExperienceFeatures } from '@/components/ui/features-8'
import { EducationTimeline } from '@/components/ui/education-timeline'
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
      imageSrc: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600",
      imageAlt: "Chess Board Strategy",
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

  const navItems = [
    { name: 'Home', url: '#hero', icon: Home },
    { name: 'About', url: '#about', icon: User },
    { name: 'Skills', url: '#skills', icon: FileText },
    { name: 'Projects', url: '#projects', icon: Briefcase }
  ]

  return (
    <>
      {/* Editorial Hero Section */}
      <section id="hero" className="relative h-[100dvh] w-full overflow-hidden bg-[#0b0c0c] text-[#efeee9] font-hn">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 bg-[#080909] anim-fade-in pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#202222] via-[#111212] to-[#080909] opacity-80"></div>
          {/* Subtle architectural shadows/light rays */}
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[150%] bg-gradient-to-br from-transparent via-[#151717] to-transparent transform rotate-[-35deg] opacity-50 mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[150%] bg-gradient-to-tl from-transparent via-[#202222] to-transparent transform rotate-[-35deg] opacity-30 mix-blend-screen"></div>
        </div>

        {/* Marquee Typography */}
        <div className="absolute inset-x-0 top-[40%] sm:top-[45%] -translate-y-1/2 z-10 overflow-hidden pointer-events-none anim-fade-up" style={{ animationDelay: '500ms' }}>
          <div className="marquee-content flex w-max whitespace-nowrap font-hn font-bold text-[24vh] sm:text-[32vh] leading-none text-[#efeee9] tracking-tighter">
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
          <a href="#" className="font-hn font-bold text-[1.5rem] tracking-wide anim-fade-up text-[#efeee9]" style={{ animationDelay: '800ms' }}>Anwesh</a>
          
          {/* Year */}
          <div className="hidden sm:block absolute left-[60%] top-[3.5vh] text-[15px] anim-fade-up text-[#efeee9]" style={{ animationDelay: '900ms' }}>2026</div>

          {/* NavBar (Tubelight) */}
          <NavBar items={navItems} />

          {/* Social */}
          <div className="hidden sm:flex flex-col gap-[2px] text-[16px] leading-tight absolute left-[88%] top-[3.5vh]">
            {['GitHub', 'LinkedIn', 'Contact'].map((item, i) => (
              <a key={item} href="#" className="anim-fade-up hover:text-[#efeee9]/65 transition-colors duration-300 text-[#efeee9]" style={{ animationDelay: `${1150 + i * 80}ms` }}>
                {item}
              </a>
            ))}
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
              <span className="block h-[2px] w-full bg-[#efeee9] transition-transform duration-500" style={{ transform: drawerOpen ? 'rotate(45deg) translate(2px, 5px)' : 'none' }}></span>
              <span className="block h-[2px] w-full bg-[#efeee9] transition-opacity duration-300" style={{ opacity: drawerOpen ? 0 : 1 }}></span>
              <span className="block h-[2px] w-full bg-[#efeee9] transition-transform duration-500" style={{ transform: drawerOpen ? 'rotate(-45deg) translate(2px, -5px)' : 'none' }}></span>
            </div>
          </button>
        </header>

        {/* Horizontal Line */}
        <div className="absolute left-[4vw] right-[4vw] bottom-[18vh] z-30 h-[1px] bg-[#efeee9] opacity-40 anim-line" style={{ animationDelay: '1200ms' }}></div>

        {/* Bottom Left Content */}
        <div className="absolute left-[4vw] bottom-[7vh] z-30 flex flex-col text-[14px] sm:text-[16px] leading-[1.4] font-hn text-[#efeee9] anim-fade-up" style={{ animationDelay: '1400ms' }}>
          <span>B.Tech Computer Science Student</span>
          <span>AI & ML</span>
          <span>Building with Code & Intelligence</span>
        </div>

        {/* Bottom Right Content */}
        <div className="absolute right-[4vw] bottom-[7vh] z-30 flex flex-col text-right text-[14px] sm:text-[16px] leading-[1.4] font-hn text-[#efeee9] anim-fade-up" style={{ animationDelay: '1550ms' }}>
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
            className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#111212] px-8 py-10 transition-transform flex flex-col"
            style={{ 
              transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
              transitionDuration: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)'
            }}
          >
            <button 
              className="absolute right-[4vw] top-[3.5vh] z-50 text-[#efeee9] transition-all duration-300"
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
                className="uppercase tracking-[0.2em] text-[#efeee9]/50 text-xs transition-all duration-500"
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
                    className="text-4xl font-hn transition-all duration-500 text-[#efeee9]"
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
                className="uppercase tracking-[0.2em] text-[#efeee9]/50 text-xs transition-all duration-500"
                style={{ 
                  transform: drawerOpen ? 'translateY(0)' : 'translateY(16px)', 
                  opacity: drawerOpen ? 1 : 0,
                  transitionDelay: drawerOpen ? '500ms' : '0ms'
                }}
              >
                Find Me
              </span>
              <div className="flex flex-col gap-2">
                {['GitHub', 'LinkedIn', 'Contact'].map((item, i) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="text-sm font-hn transition-all duration-500 text-[#efeee9]"
                    style={{ 
                      transform: drawerOpen ? 'translateY(0)' : 'translateY(16px)', 
                      opacity: drawerOpen ? 1 : 0,
                      transitionDelay: drawerOpen ? `${550 + i * 60}ms` : '0ms'
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        <Bento3Section />
        
        <section id="skills" className="py-24 max-w-6xl mx-auto px-[4vw]">
          <h2 className="text-3xl font-semibold mb-12 text-[#efeee9] text-center">Core Skills</h2>
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
        
        <section id="projects" className="bg-[#111212] min-h-[600px] text-[#efeee9] overflow-hidden w-full border-t border-b border-[#333535]">
          <div className="h-[300px] flex flex-col items-center justify-center space-y-4 pt-16">
            <div className="space-y-1 text-center">
              <span className="text-[11px] font-bold tracking-[0.4em] text-[#efeee9]/50 uppercase">
                Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Selected Work
              </h2>
            </div>
            <div className="animate-bounce text-[#efeee9]/50 text-xs mt-8">↓ Scroll to explore</div>
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
                    className="block group relative w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] overflow-hidden rounded-xl bg-[#1e2020] border border-[#333535] shadow-lg"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                          isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0c]/95 via-[#0b0c0c]/40 to-transparent opacity-80" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="text-[10px] px-2.5 py-0.5 bg-[#0b0c0c]/80 text-[#efeee9] border border-[#efeee9]/20 backdrop-blur">
                          {project.cat}
                        </Badge>
                        <div className={`w-7 h-7 rounded-full bg-[#efeee9] text-[#0b0c0c] flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                          <ArrowUpRight size={14} />
                        </div>
                      </div>

                      <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-3'}`}>
                        <h3 className="text-xl font-bold leading-tight text-[#efeee9]">{project.title}</h3>
                        <div className={`h-[2px] bg-[#efeee9] mt-3 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
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


        
        <section id="contact">
          <h2>Contact</h2>
          <ul className="contact-list">
            <li><a href="mailto:mailanweshbiswal@gmail.com">mailanweshbiswal@gmail.com</a></li>
            <li><a href="https://www.linkedin.com/in/anwesh-biswal-75ba3537a" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/anwesh-biswal-75ba3537a (LinkedIn)</a></li>
          </ul>
        </section>
        
        <footer id="footer">
          {/* Footer content is missing from Profile.pdf */}
        </footer>
      </main>
    </>
  )
}

export default App

function GenericCardFront({ data }) {
  return (
    <div className="flex flex-col h-full w-full p-4 bg-[#111212] rounded-[inherit]">
      <img
        src={data.imageSrc}
        alt={data.imageAlt}
        className="w-full h-[140px] object-cover rounded-md"
      />
      <div className="p-2 mt-2">
        <h3 className="text-[17px] font-semibold text-[#efeee9]">{data.title}</h3>
        <p className="text-[14px] mt-2 text-[#efeee9]/70 leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}

function GenericCardBack({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 bg-[#111212] rounded-[inherit]">
      <p className="text-[14px] text-[#efeee9]/80 text-center leading-relaxed">
        {data.description}
      </p>
    </div>
  );
}
