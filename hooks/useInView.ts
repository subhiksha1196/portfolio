"use client";

import { useEffect, useRef } from "react";

export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -120px 0px" }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // small delay so browser paints the initial hidden state first
        setTimeout(() => {
          el.classList.add("visible");
        }, 80);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
