import { useInView } from "react-intersection-observer";

export function useScrollAnimation() {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
  
    return [ref, inView] as const;
  }