import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { SoundContext } from "./sound-state";

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(() => localStorage.getItem("clickSound") !== "off");
  const audioRef = useRef(null);

  const playClick = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/click.wav");
        audioRef.current.preload = "auto";
        audioRef.current.volume = 0.8;
      }
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => {});
    } catch {
      // Audio is optional when a browser or device does not support it.
    }
  }, []);

  useEffect(() => {
    const audio = new Audio("/sounds/click.wav");
    audio.preload = "auto";
    audio.volume = 0.8;
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (!enabled || !event.target.closest("a, button, summary, [role='button']")) return;
      if (event.target.closest("[data-sound-toggle]")) return;
      if (event.target.closest(":disabled, [aria-disabled='true']")) return;
      playClick();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [enabled, playClick]);

  const toggleSound = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("clickSound", next ? "on" : "off");
    if (next) playClick();
  };

  return <SoundContext.Provider value={{ enabled, toggleSound }}>{children}</SoundContext.Provider>;
}

SoundProvider.propTypes = { children: PropTypes.node.isRequired };
