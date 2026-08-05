"use client";

import { useEffect, useRef } from "react";

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

    const handlePointerLeave = () => {
      cursor.dataset.active = "false";
    };

    const handlePointerDown = () => {
      cursor.dataset.pressed = "true";
    };

    const handlePointerUp = () => {
      cursor.dataset.pressed = "false";
    };

    document.documentElement.dataset.brandCursor = "active";
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      document.documentElement.removeAttribute("data-brand-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
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
