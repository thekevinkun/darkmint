"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  // Store the currently active section id ("" means Home/top)
  const [active, setActive] = useState("");

  useEffect(() => {
    // Function that runs every time user scrolls
    const handleScroll = () => {
      const scrollY = window.scrollY; // current vertical scroll position

      // If user is near the top → reset to "Home"
      if (scrollY < 80) {
        setActive("");
        return; // stop here
      }

      let current = ""; // temporary variable to track active section

      // Loop through all section ids
      for (const id of sectionIds) {
        const el = document.getElementById(id); // get section element by id
        if (!el) continue; // skip if not found

        const offsetTop = el.offsetTop - 120;
        // get section top position (minus navbar height for better timing)

        // If we've scrolled past this section → mark it as current
        if (scrollY >= offsetTop) {
          current = id;
        }
      }

      setActive(current); // update active section state
    };

    handleScroll(); // run once on mount (initial check)

    window.addEventListener("scroll", handleScroll);
    // listen to scroll events

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // cleanup listener when component unmounts
    };
  }, [sectionIds]); // re-run if section list changes

  return active; // return active section id
}
