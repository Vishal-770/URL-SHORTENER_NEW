"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xSetter = gsap.quickSetter(button, "x", "px");
    const ySetter = gsap.quickSetter(button, "y", "px");

    const moveButton = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xSetter(x * 0.4);
      ySetter(y * 0.4);
    };

    const resetButton = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener("mousemove", moveButton);
    button.addEventListener("mouseleave", resetButton);

    return () => {
      button.removeEventListener("mousemove", moveButton);
      button.removeEventListener("mouseleave", resetButton);
    };
  }, []);

  return (
    <div ref={buttonRef} className={`inline-block transition-transform duration-100 ease-out ${className}`}>
      {children}
    </div>
  );
}
