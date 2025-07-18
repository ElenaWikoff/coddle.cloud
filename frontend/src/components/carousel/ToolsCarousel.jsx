"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Database,
  Container,
  Cloud,
  Monitor,
  GitBranch,
  Palette,
  Server,
  Zap,
  Figma,
  Map,
} from "lucide-react";
import "./carousel.css";

const tools = [
  { name: "React", icon: Code, color: "#61DAFB", url: "https://react.dev/" },
  { name: "Bootstrap", icon: Palette, color: "#7952B3", url: "https://getbootstrap.com/" },
  { name: "Python", icon: Code, color: "#3776AB", url: "https://www.python.org/" },
  { name: "Flask", icon: Server, color: "#000000", url: "https://flask.palletsprojects.com/" },
  { name: "PostgreSQL", icon: Database, color: "#336791", url: "https://www.postgresql.org/" },
  { name: "Docker", icon: Container, color: "#2496ED", url: "https://www.docker.com/" },
  { name: "GCP", icon: Cloud, color: "#4285F4", url: "https://cloud.google.com/" },
  { name: "Visual Studio Code", icon: Monitor, color: "#007ACC", url: "https://code.visualstudio.com/" },
  { name: "GitLab", icon: GitBranch, color: "#FC6D26", url: "https://gitlab.com/" },
  { name: "NameCheap", icon: Server, color: "#FF6C2C", url: "https://www.namecheap.com/" },
  { name: "Postman", icon: Zap, color: "#FF6C37", url: "https://www.postman.com/" },
  { name: "Figma", icon: Figma, color: "#F24E1E", url: "https://www.figma.com/" },
  { name: "Leaflet", icon: Map, color: "#199900", url: "https://leafletjs.com/" },
];

export function ToolsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 3;
      return nextIndex >= tools.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 3;
      return nextIndex < 0
        ? Math.max(0, tools.length - itemsPerView)
        : nextIndex;
    });
  };

  const visibleTools = tools.slice(currentIndex, currentIndex + itemsPerView);
  if (visibleTools.length < itemsPerView && currentIndex > 0) {
    const remaining = tools.slice(0, itemsPerView - visibleTools.length);
    visibleTools.push(...remaining);
  }

  return (
    <div className="carousel-container">
      <h2 className="section-heading">Tools</h2>
      <div className="carousel-wrapper d-flex align-items-center justify-content-center">
        <button
          onClick={prevSlide}
          className="carousel-button btn btn-light me-3"
          aria-label="Previous tools"
        >
          <ChevronLeft className="icon-chevron" />
        </button>

        <div className="carousel-grid d-flex flex-wrap justify-content-center">
          {visibleTools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <a
                key={`${tool.name}-${index}`}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="carousel-card text-decoration-none text-dark"
              >
                <div
                  className="carousel-icon"
                  style={{ backgroundColor: `${tool.color}20` }}
                >
                  <IconComponent className="icon-tool" style={{ color: tool.color }} />
                </div>
                <h3 className="carousel-title">{tool.name}</h3>
              </a>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          className="carousel-button btn btn-light ms-3"
          aria-label="Next tools"
        >
          <ChevronRight className="icon-chevron" />
        </button>
      </div>

      <div className="carousel-dots mt-3 d-flex justify-content-center">
        {Array.from({ length: Math.ceil(tools.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={`dot mx-1 ${Math.floor(currentIndex / 3) === index ? "dot-active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
