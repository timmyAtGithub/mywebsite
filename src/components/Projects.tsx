import React, { useState, useEffect } from "react";
import TextChangeEffect from "./TextChangeEffect";
import { useLanguage } from "../context/LanguageContext";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  const projects = [
    { 
      image: "/assets/nextME.png", 
      name: t('projects.project1.name'), 
      description: t('projects.project1.description'),
      repoUrl: "https://github.com/timmyAtGithub/nextMe" 
    },
    { 
      image: "/assets/Nutrifit.png", 
      name: t('projects.project2.name'), 
      description: t('projects.project2.description'),
      repoUrl: "https://github.com/timmyAtGithub/dmwt_Website" 
    },
    { 
      image: "/assets/myWebsite.png", 
      name: t('projects.project3.name'), 
      description: t('projects.project3.description'),
      repoUrl: "https://github.com/timmyAtGithub/mywebsite" 
    },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("right");
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getProjectPosition = (index: number) => {
    if (isMobile) {
      return index === currentIndex ? "center" : 
             index === (currentIndex + 1) % projects.length ? "right1" :
             index === (currentIndex - 1 + projects.length) % projects.length ? "left1" : "hidden";
    }
    
    if (index === currentIndex) return "center";
    
    let diff = index - currentIndex;
    
    if (diff > projects.length / 2) diff -= projects.length;
    if (diff < -projects.length / 2) diff += projects.length;
    
    if (diff === -1 || (diff === projects.length - 1 && projects.length > 2)) return "left1";
    if (diff === -2 || (diff === projects.length - 2 && projects.length > 3)) return "left2";
    if (diff === 1 || (diff === -(projects.length - 1) && projects.length > 2)) return "right1";
    if (diff === 2 || (diff === -(projects.length - 2) && projects.length > 3)) return "right2";
    
    return diff < 0 ? "far-left" : "far-right";
  };

  const getPositionStyles = () => {
    const desktopStyles = {
      "center": { 
        zIndex: 10, 
        opacity: 1, 
        translateX: 0, 
        translateZ: 0, 
        rotateY: 0, 
        scale: 1
      },
      "left1": { 
        zIndex: 5, 
        opacity: 0.8, 
        translateX: -250, 
        translateZ: -120, 
        rotateY: 25, 
        scale: 0.9
      },
      "left2": { 
        zIndex: 3, 
        opacity: 0.5, 
        translateX: -350, 
        translateZ: -200, 
        rotateY: 35, 
        scale: 0.8
      },
      "right1": { 
        zIndex: 5, 
        opacity: 0.8, 
        translateX: 250, 
        translateZ: -120, 
        rotateY: -25, 
        scale: 0.9
      },
      "right2": { 
        zIndex: 3, 
        opacity: 0.5, 
        translateX: 350, 
        translateZ: -200, 
        rotateY: -35, 
        scale: 0.8
      },
      "far-left": { 
        zIndex: 1, 
        opacity: 0, 
        translateX: -400, 
        translateZ: -250, 
        rotateY: 45, 
        scale: 0.7
      },
      "far-right": { 
        zIndex: 1, 
        opacity: 0, 
        translateX: 400, 
        translateZ: -250, 
        rotateY: -45, 
        scale: 0.7
      },
      "hidden": {
        zIndex: 0,
        opacity: 0,
        translateX: 0,
        translateZ: -400,
        rotateY: 0,
        scale: 0.5
      }
    };
    
    const mobileStyles = {
      "center": { 
        zIndex: 10, 
        opacity: 1, 
        translateX: 0, 
        translateZ: 0, 
        rotateY: 0, 
        scale: 1
      },
      "left1": { 
        zIndex: 5, 
        opacity: 0.5, 
        translateX: -120, 
        translateZ: -50, 
        rotateY: 15, 
        scale: 0.8
      },
      "right1": { 
        zIndex: 5, 
        opacity: 0.5, 
        translateX: 120, 
        translateZ: -50, 
        rotateY: -15, 
        scale: 0.8
      },
      "hidden": {
        zIndex: 0,
        opacity: 0,
        translateX: 0,
        translateZ: -200,
        rotateY: 0,
        scale: 0
      }
    };
    
    return isMobile ? mobileStyles : desktopStyles;
  };

  const positionStyles = getPositionStyles();

  const handleDetailsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, repoUrl: string | URL | undefined) => {
    e.stopPropagation(); 
    window.open(repoUrl, '_blank'); 
  };

  const getCardWidth = () => {
    if (isMobile) return "w-64";
    return "w-80"; 
  };

  return (
    <div className="pt-24 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-4 px-4">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
                    <TextChangeEffect text={t('projects.title')} /></h2>
      
      <div className="relative w-full h-96 md:h-screen max-h-96 md:max-h-screen md:pb-0 perspective-1000 mb-4">
        <div className="w-full h-full preserve-3d">
          {projects.map((project, index) => {
            const position = getProjectPosition(index);
            const style = positionStyles[position];
            
            if (position === "hidden") {
              return null;
            }
            
            return (
              <div
                key={project.name}
                className={`absolute top-0 left-1/2 ${getCardWidth()} transition-all duration-500 ease-out cursor-pointer`}
                style={{
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  transform: `translateX(-50%) translateX(${style.translateX}px) translateZ(${style.translateZ}px) rotateY(${style.rotateY}deg) scale(${style.scale})`,
                  transformOrigin: "center center"
                }}
                onClick={() => {
                  if (position !== "center") {
                    const diff = index - currentIndex;
                    if (diff > 0 || (diff < -(projects.length / 2))) {
                      nextProject();
                    } else if (diff < 0 || (diff > projects.length / 2)) {
                      prevProject();
                    }
                  }
                }}
              >
                <div className="text overflow-hidden rounded-lg shadow-lg /10 backdrop-blur-md border /20 h-full flex flex-col">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="p-4 md:p-6 flex-grow">
                    <h3 className="text-xl md:text-2xl font-semibold ">{project.name}</h3>
                    <p className="text /80 mt-2 text-sm md:text-base">{project.description}</p>
                  </div>
                  <div className="p-4 md:p-6">
                    <button 
                      className="text w-full py-2 md:py-3 bg-transparent hover:bg-/20 transition-colors rounded text-sm md:text-base font-medium border border/40 flex items-center justify-center gap-2"
                      onClick={(e) => handleDetailsClick(e, project.repoUrl)}
                    >
                      <svg className="text w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.494C9.34 21.591 9.5 21.275 9.5 21.003V19.056C6.672 19.668 6.137 17.731 6.137 17.731C5.725 16.531 5.093 16.216 5.093 16.216C4.201 15.578 5.165 15.591 5.165 15.591C6.153 15.661 6.636 16.648 6.636 16.648C7.5 18.143 8.828 17.779 9.542 17.508C9.635 16.839 9.898 16.375 10.183 16.13C7.9 15.88 5.487 15.037 5.487 11.257C5.487 10.18 5.844 9.303 6.654 8.618C6.551 8.359 6.228 7.339 6.754 6.007C6.754 6.007 7.564 5.732 9.5 7.159C10.294 6.932 11.15 6.817 12 6.814C12.85 6.817 13.707 6.932 14.5 7.159C16.434 5.732 17.244 6.007 17.244 6.007C17.77 7.339 17.448 8.359 17.344 8.618C18.156 9.303 18.511 10.18 18.511 11.257C18.511 15.048 16.093 15.878 13.803 16.121C14.165 16.423 14.5 17.019 14.5 17.931V21.003C14.5 21.278 14.658 21.597 15.167 21.492C19.137 20.165 22 16.418 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                      </svg>
                      GitHub Repo
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>     
    </div>
  );
};

export default Projects;