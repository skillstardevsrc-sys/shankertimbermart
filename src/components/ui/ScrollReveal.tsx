"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "scale" | "fade";
  delay?: number; // delay in seconds (e.g. 0.1, 0.2)
  duration?: number; // duration in seconds (default: 0.75)
  className?: string;
  as?: "div" | "section" | "h1" | "h2" | "p" | "span" | "article";
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.4,
  className = "",
  as: Component = "div",
  style = {},
}: ScrollRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Speed scaling: Tighter, faster animations and delays
  const effectiveDuration = duration ? Math.min(duration * 0.55, 0.45) : 0.4;
  const effectiveDelay = delay * 0.5;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if element is already in viewport on mount (e.g. Hero section)
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= windowHeight * 0.95 && rect.bottom >= 0) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, effectiveDelay * 1000);
      return () => clearTimeout(timer);
    }

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10px 0px",
      }
    );

    observer.observe(el);

    // Failsafe: Ensure content is NEVER permanently invisible
    const failsafe = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [effectiveDelay]);

  // Variant transformations: Crisp, tight travel distances for snappy response
  const getTransform = () => {
    if (isRevealed) {
      return "translate3d(0, 0, 0) scale(1)";
    }
    switch (variant) {
      case "up":
        return "translate3d(0, 16px, 0) scale(1)";
      case "left":
        return "translate3d(-18px, 0, 0) scale(1)";
      case "right":
        return "translate3d(18px, 0, 0) scale(1)";
      case "scale":
        return "translate3d(0, 12px, 0) scale(0.98)";
      case "fade":
        return "translate3d(0, 0, 0) scale(1)";
      default:
        return "translate3d(0, 16px, 0) scale(1)";
    }
  };

  return (
    <Component
      ref={elementRef as any}
      className={className}
      style={{
        ...style,
        opacity: isRevealed ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${effectiveDuration}s cubic-bezier(0.16, 1, 0.3, 1) ${effectiveDelay}s, transform ${effectiveDuration}s cubic-bezier(0.16, 1, 0.3, 1) ${effectiveDelay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
