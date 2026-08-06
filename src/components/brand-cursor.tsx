"use client";

import { useLayoutEffect, useRef } from "react";

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

  useLayoutEffect(() => {
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

    const syncHoverState = () => {
      const target = document.elementFromPoint(x, y);
      cursor.dataset.hover = String(target?.closest(INTERACTIVE_SELECTOR) !== null);
    };

    const handleScroll = () => {
      if (x === -100 || y === -100 || frameId) {
        return;
      }

      syncHoverState();
      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      const isInteractive =
        target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;

      cursor.dataset.hover = String(isInteractive);
    };

    const handleWindowBlur = () => {
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
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerenter", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      document.documentElement.removeAttribute("data-brand-cursor");
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerenter", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return <span ref={cursorRef} className="brand-cursor" aria-hidden="true" />;
}
