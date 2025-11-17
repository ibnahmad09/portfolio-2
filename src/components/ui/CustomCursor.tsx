"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFinePointer) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number | undefined;

    const setPosition = (element: HTMLDivElement, x: number, y: number) => {
      element.style.setProperty("--cursor-x", `${x}px`);
      element.style.setProperty("--cursor-y", `${y}px`);
    };

    const updateRingPosition = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      setPosition(ring, ringX, ringY);
      rafId = requestAnimationFrame(updateRingPosition);
    };

    const moveHandler = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setPosition(dot, mouseX, mouseY);

      if (prefersReducedMotion) {
        setPosition(ring, mouseX, mouseY);
      } else if (!rafId) {
        rafId = requestAnimationFrame(updateRingPosition);
      }
    };

    const enterHandler = () => {
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
    };

    const leaveHandler = () => {
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
    };

    const downHandler = () => {
      dot.classList.add("is-active");
      ring.classList.add("is-active");
    };

    const upHandler = () => {
      dot.classList.remove("is-active");
      ring.classList.remove("is-active");
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseenter", enterHandler);
    document.addEventListener("mouseleave", leaveHandler);
    document.addEventListener("mousedown", downHandler);
    document.addEventListener("mouseup", upHandler);

    setPosition(dot, mouseX, mouseY);
    setPosition(ring, ringX, ringY);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseenter", enterHandler);
      document.removeEventListener("mouseleave", leaveHandler);
      document.removeEventListener("mousedown", downHandler);
      document.removeEventListener("mouseup", upHandler);

      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor custom-cursor--ring"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="custom-cursor custom-cursor--dot"
        aria-hidden="true"
      />
    </>
  );
}

