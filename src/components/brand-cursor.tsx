"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  '[role="button"]',
  "select",
  "summary",
  "label[for]",
  'input:not([type="text"]):not([type="search"]):not([type="email"]):not([type="password"])',
].join(",");

export function BrandCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !supportsCursor.matches || reducedMotion.matches) {
      return;
    }

    let frameId = 0;
    let x = -100;
    let y = -100;

    const render = () => {
      cursor.style.setProperty("--brand-cursor-x", `${x}px`);
      cursor.style.setProperty("--brand-cursor-y", `${y}px`);
      cursor.dataset.active = "true";
      frameId = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handleScroll = () => {
      if (x === -100 || y === -100 || frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      const isInteractive =
        target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;

      cursor.dataset.hover = String(isInteractive);
    };

    const handlePointerLeave = () => {
      cursor.dataset.active = "false";
      cursor.dataset.hover = "false";
    };

    const handlePointerDown = () => {
      cursor.dataset.pressed = "true";
    };

    const handlePointerUp = () => {
      cursor.dataset.pressed = "false";
    };

    document.documentElement.dataset.brandCursor = "active";
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      document.documentElement.removeAttribute("data-brand-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return <span ref={cursorRef} className="brand-cursor" aria-hidden="true" />;
}
