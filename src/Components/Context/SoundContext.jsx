import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { SoundContext } from "./sound-state";

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(() => localStorage.getItem("clickSound") !== "off");
  const audioRef = useRef(null);

  const playClick = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioRef.current) audioRef.current = new AudioContextClass();
      const context = audioRef.current;
      if (context.state === "suspended") void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(620, now);
      oscillator.frequency.exponentialRampToValueAtTime(340, now + 0.075);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.025, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.085);
    } catch {
      // Audio is optional when a browser or device does not support it.
    }
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
