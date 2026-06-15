import { ScrollTrigger } from "gsap/ScrollTrigger";

class ScrollManager {
  constructor() {
    this.triggers = new Set();
  }

  register(trigger) {
    this.triggers.add(trigger);
    return trigger;
  }

  unregister(trigger) {
    if (!trigger) return;
    trigger.kill(true);
    this.triggers.delete(trigger);
  }

  clearAll() {
    this.triggers.forEach((t) => t.kill(true));
    this.triggers.clear();

    ScrollTrigger.clearScrollMemory();
  }

  refresh() {
    ScrollTrigger.refresh();
  }
}

export const scrollManager = new ScrollManager();
