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
  Map,  // Leaflet icon from lucide-react
} from "lucide-react";
import "./carousel.css";

const tools = [
  { name: "React", icon: Code, color: "#61DAFB" },
  { name: "Bootstrap", icon: Palette, color: "#7952B3" },
  { name: "Python", icon: Code, color: "#3776AB" },
  { name: "Flask", icon: Server, color: "#000000" },
  { name: "PostgreSQL", icon: Database, color: "#336791" },
  { name: "Docker", icon: Container, color: "#2496ED" },
  { name: "GCP", icon: Cloud, color: "#4285F4" },
  { name: "Visual Studio Code", icon: Monitor, color: "#007ACC" },
  { name: "GitLab", icon: GitBranch, color: "#FC6D26" },
  { name: "NameCheap", icon: Server, color: "#FF6C2C" },
  { name: "Postman", icon: Zap, color: "#FF6C37" },
  { name: "Figma", icon: Figma, color: "#F24E1E" },
  { name: "Leaflet", icon: Map, color: "#199900" },  // Added Leaflet here
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
      <div className="carousel-wrapper">
        <button
          onClick={prevSlide}
          className="carousel-button"
          aria-label="Previous tools"
        >
          <ChevronLeft className="icon-chevron" />
        </button>

        <div className="carousel-grid">
          {visibleTools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={`${tool.name}-${index}`}
                className="carousel-card"
              >
                <div
                  className="carousel-icon"
                  style={{ backgroundColor: `${tool.color}20` }}
                >
                  <IconComponent className="icon-tool" style={{ color: tool.color }} />
                </div>
                <h3 className="carousel-title">{tool.name}</h3>
              </div>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          className="carousel-button"
          aria-label="Next tools"
        >
          <ChevronRight className="icon-chevron" />
        </button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: Math.ceil(tools.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={`dot ${
              Math.floor(currentIndex / 3) === index ? "dot-active" : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
