# GSAP Accordion Animation with React and TypeScript

This README explains the implementation of a scrolling accordion animation using GSAP (GreenSock Animation Platform) with React and TypeScript.

## Overview

The component creates a vertical accordion effect where text sections collapse as the user scrolls down the page. The animation uses GSAP's ScrollTrigger plugin to pin the container and animate multiple accordion elements in a staggered sequence.

## Key Features

- ScrollTrigger-based animation that responds to page scroll
- Staggered animation of multiple accordion elements
- TypeScript for type safety
- Proper React integration using `useGSAP`
- Efficient collection of multiple DOM elements using ref arrays

## Code Breakdown

### Imports and Setup

```typescript
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, RefObject, MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);
```

- `"use client"` - Next.js directive for client-side component
- Imports for GSAP, ScrollTrigger plugin, and React hooks
- `gsap.registerPlugin(ScrollTrigger)` - Registers the plugin with GSAP

### Refs Setup

```typescript
const accordionsRef = useRef<HTMLDivElement>(null);
const accordionRefs = useRef<HTMLDivElement[]>([]);
const textRefs = useRef<HTMLDivElement[]>([]);

// Reset refs arrays
accordionRefs.current = [];
textRefs.current = [];
```

- `accordionsRef` - Single ref for the container element
- `accordionRefs` and `textRefs` - Arrays to collect multiple elements
- Arrays are reset on each render to prevent stale references

### Ref Collection Callbacks

```typescript
const addToAccordionRefs = (el: HTMLDivElement | null) => {
  if (el && !accordionRefs.current.includes(el)) {
    accordionRefs.current.push(el);
  }
};

const addToTextRefs = (el: HTMLDivElement | null) => {
  if (el && !textRefs.current.includes(el)) {
    textRefs.current.push(el);
  }
};
```

- Callback functions to collect multiple DOM elements
- Type-safe with `HTMLDivElement | null` parameter type
- Checks for element existence and prevents duplicates
- Used with the `ref` attribute in JSX

### GSAP Animation Setup

```typescript
useGSAP(() => {
  if (!accordionsRef.current) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: accordionsRef.current,
      pin: true,
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
  
  // Animations...
  
}, { scope: accordionsRef });
```

- `useGSAP` - React hook that handles proper GSAP integration
- Null check for the container ref
- `gsap.timeline()` - Creates an animation sequence
- ScrollTrigger configuration:
  - `trigger` - Element that triggers the animation
  - `pin: true` - Pins the container while animating
  - `start/end` - Defines the scroll positions
  - `scrub: 1` - Links animation to scroll with 1-second smoothing
- `scope` option for proper cleanup on unmount

### Animation Definition

```typescript
// Animate texts
gsap.set(textRefs.current, { height: "auto" });
tl.to(textRefs.current, {
  height: 0,
  paddingBottom: 0,
  opacity: 0,
  stagger: 0.5,
});

// Animate accordions
tl.to(
  accordionRefs.current,
  {
    marginBottom: -15,
    stagger: 0.5,
  },
  "<"
);
```

- `gsap.set()` - Sets initial properties before animation
- First animation collapses and fades out text elements:
  - Height animation from "auto" to 0
  - Padding and opacity reduction
  - 0.5 second stagger between elements
- Second animation reduces margin on accordion elements:
  - Runs in parallel with first animation (using `"<"`)
  - Same 0.5 second stagger

### JSX Structure

```tsx
<div ref={accordionsRef} className="accordions flex flex-col items-center pb-[20vh]">
  <div ref={addToAccordionRefs} className="accordion">
    <div className="title">All-screen design.</div>
    <div ref={addToTextRefs} className="text">
      Lets you immerse yourself in whatever you're reading, watching,
      or creating...
    </div>
  </div>
  {/* Additional accordion sections... */}
</div>
```

- Container div with `accordionsRef`
- Each accordion section:
  - Outer div uses `addToAccordionRefs` callback
  - Contains a title div
  - Contains a text div with `addToTextRefs` callback
- Pattern repeats for all accordion sections

## Key Technical Concepts

1. **Ref Collection Pattern**: Using callback refs to collect multiple elements into arrays
2. **GSAP Integration**: Using `useGSAP` for proper React lifecycle integration
3. **ScrollTrigger Configuration**: Pinning and scrubbing for scroll-based animation
4. **Staggered Animation**: Animating multiple elements with timed offsets
5. **Type Safety**: TypeScript annotations for refs and callbacks
6. **Cleanup**: Proper cleanup via useGSAP's scope option

## Common Pitfalls and Solutions

- **Multiple refs issue**: Solved by using ref arrays with callback pattern
- **GSAP initialization timing**: Solved by using useGSAP
- **Animation targeting**: Properly targeting multiple elements with ref arrays
- **Type safety**: Using TypeScript generics for refs
- **Cleanup**: Ensuring proper cleanup with useGSAP scope

## Usage Notes

- The component requires GSAP and @gsap/react to be installed
- Make sure to register ScrollTrigger plugin before use
- The accordion structure must match the expected ref collection pattern
- CSS classes should be adjusted to match your styling needs