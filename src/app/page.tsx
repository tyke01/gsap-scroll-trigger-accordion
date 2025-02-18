"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, RefObject, MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const accordionsRef = useRef<HTMLDivElement>(null);
  const accordionRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  // Reset refs arrays
  accordionRefs.current = [];
  textRefs.current = [];

  // Add to accordion refs
  const addToAccordionRefs = (el: HTMLDivElement | null) => {
    if (el && !accordionRefs.current.includes(el)) {
      accordionRefs.current.push(el);
    }
  };

  // Add to text refs
  const addToTextRefs = (el: HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useGSAP(
    () => {
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
    },
    { scope: accordionsRef }
  );

  return (
    <div className="bg-gradient-to-tr from-[#5c2fa6] to-[#5a36c0]">
      <div id="wrapper">
        <div id="content">
          <div className="spacer" />

          <div
            ref={accordionsRef}
            className="accordions flex flex-col items-center pb-[20vh]"
          >
            {/*  */}
            <div ref={addToAccordionRefs} className="accordion">
              <div className="title">All-screen design.</div>
              <div ref={addToTextRefs} className="text">
                Lets you immerse yourself in whatever you're reading, watching,
                or creating. The 10.9-inch Liquid Retina display features
                advanced technologies like True Tone, P3 wide color, and an
                antireflective coating.1
              </div>
            </div>
            {/*  */}
            <div ref={addToAccordionRefs} className="accordion">
              <div className="title"> Beauty all around.</div>
              <div ref={addToTextRefs} className="text">
                The breakthrough M1 chip is now in Air. An 8-core CPU delivers
                up to 60 percent faster performance than the previous
                generation, making Air a creative and mobile gaming powerhouse.
                Multitask smoothly between powerful apps and play
                graphics-intensive games. And with M1, you can go even further
                with your creativity with apps like SketchUp.
              </div>
            </div>
            {/*  */}
            <div ref={addToAccordionRefs} className="accordion">
              <div className="title">Take Center Stage.</div>
              <div ref={addToTextRefs} className="text">
                The 12MP Ultra Wide front camera enables Center Stage, making
                video calls more natural and content creation more fun. As you
                move around, the camera automatically pans to keep you centered
                in the shot. When others join or leave the frame, the view
                expands or zooms in.
              </div>
            </div>
            {/*  */}
            <div ref={addToAccordionRefs} className="accordion">
              <div className="title">Pretty everywhere.</div>
              <div ref={addToTextRefs} className="text">
                Join superfast 5G wireless networks when you're on the go.
                Download files, play multiplayer games, stream movies, check in
                with friends, and more.
              </div>
            </div>
            {/*  */}
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </div>
  );
}
