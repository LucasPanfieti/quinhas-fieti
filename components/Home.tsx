"use client";

import { useCallback, useRef, useState } from "react";
import { featuredTrack, type Track } from "@/data/tracks";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Discography } from "@/components/Discography";
import { Playlists } from "@/components/Playlists";
import { SmartLinkModal } from "@/components/SmartLinkModal";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { useTrackPreview } from "@/hooks/useTrackPreview";

export function Home() {
  const [selected, setSelected] = useState<Track | null>(null);
  const modalTrackId = useRef<string | null>(null);
  const preview = useTrackPreview();
  const {
    play,
    stop,
    suppressHoverUntilMove,
    onCoverEnter,
    onCoverLeave,
    playingId,
    toggle,
  } = preview;

  const openPlatforms = useCallback(
    (track: Track) => {
      modalTrackId.current = track.id;
      setSelected(track);
      play(track);
    },
    [play],
  );

  const closeModal = useCallback(() => {
    modalTrackId.current = null;
    suppressHoverUntilMove();
    stop();
    setSelected(null);
  }, [stop, suppressHoverUntilMove]);

  return (
    <>
      <Header />
      <Hero featured={featuredTrack} onListen={() => openPlatforms(featuredTrack)} />
      <Discography
        onSelect={openPlatforms}
        onCoverEnter={(track) => {
          if (modalTrackId.current) return;
          onCoverEnter(track);
        }}
        onCoverLeave={(track) => {
          if (modalTrackId.current) return;
          onCoverLeave(track);
        }}
      />
      <Playlists />
      <About />
      <Footer />
      <SmartLinkModal
        track={selected}
        isPlaying={Boolean(selected && playingId === selected.id)}
        onTogglePreview={() => {
          if (selected) toggle(selected);
        }}
        onClose={closeModal}
      />
    </>
  );
}
