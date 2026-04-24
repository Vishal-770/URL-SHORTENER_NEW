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

    // Typed explicitly to satisfy strict TS
    const xSetter = gsap.quickSetter(button, "x", "px") as (value: number) => void;
    const ySetter = gsap.quickSetter(button, "y", "px") as (value: number) => void;

    const moveButton = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      xSetter((clientX - (left + width / 2)) * 0.4);
      ySetter((clientY - (top + height / 2)) * 0.4);
    };

    const resetButton = () => {
      gsap.to(button, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    button.addEventListener("mousemove", moveButton);
    button.addEventListener("mouseleave", resetButton);

    return () => {
      button.removeEventListener("mousemove", moveButton);
      button.removeEventListener("mouseleave", resetButton);
    };
  }, []);

  return (
    <div ref={buttonRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
