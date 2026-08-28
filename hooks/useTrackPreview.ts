"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/data/tracks";

function canHoverPreview() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function useTrackPreview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingIdRef = useRef<string | null>(null);
  const hoverRef = useRef(false);
  const wantPlayIdRef = useRef<string | null>(null);
  const hoverArmedRef = useRef(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    hoverRef.current = canHoverPreview();
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const onEnded = () => {
      wantPlayIdRef.current = null;
      playingIdRef.current = null;
      setPlayingId(null);
      audio.currentTime = 0;
    };
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    wantPlayIdRef.current = null;
    audio.pause();
    audio.currentTime = 0;
    playingIdRef.current = null;
    setPlayingId(null);
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    wantPlayIdRef.current = null;
    audio.pause();
    playingIdRef.current = null;
    setPlayingId(null);
  }, []);

  const play = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio || !track.preview) return;

    if (playingIdRef.current === track.id && !audio.paused) return;

    audio.muted = false;
    wantPlayIdRef.current = track.id;
    playingIdRef.current = track.id;
    setPlayingId(track.id);

    const nextSrc = new URL(track.preview, window.location.href).href;
    const sameTrack = audio.src === nextSrc;

    if (!sameTrack) {
      audio.src = track.preview;
      audio.currentTime = 0;
    }

    void audio.play().catch(() => {
      if (wantPlayIdRef.current !== track.id) return;
      wantPlayIdRef.current = null;
      playingIdRef.current = null;
      setPlayingId(null);
    });
  }, []);

  const toggle = useCallback(
    (track: Track) => {
      if (
        playingIdRef.current === track.id ||
        wantPlayIdRef.current === track.id
      ) {
        pause();
        return;
      }
      play(track);
    },
    [play, pause],
  );

  const suppressHoverUntilMove = useCallback(() => {
    hoverArmedRef.current = false;
    window.addEventListener(
      "pointermove",
      () => {
        hoverArmedRef.current = true;
      },
      { once: true },
    );
  }, []);

  const onCoverEnter = useCallback(
    (track: Track) => {
      if (!hoverRef.current || !hoverArmedRef.current) return;
      play(track);
    },
    [play],
  );

  const onCoverLeave = useCallback(
    (track: Track) => {
      if (!hoverRef.current) return;
      if (
        playingIdRef.current === track.id ||
        wantPlayIdRef.current === track.id
      ) {
        stop();
      }
    },
    [stop],
  );

  return {
    playingId,
    play,
    stop,
    pause,
    toggle,
    onCoverEnter,
    onCoverLeave,
    suppressHoverUntilMove,
  };
}
