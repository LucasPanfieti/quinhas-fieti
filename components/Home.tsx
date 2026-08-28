"use client";

import { useCallback, useRef, useState } from "react";
import { featuredTrack, type Track } from "@/data/tracks";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Discography } from "@/components/Discography";
import { SmartLinkModal } from "@/components/SmartLinkModal";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { useTrackPreview } from "@/hooks/useTrackPreview";

export function Home() {
  const [selected, setSelected] = useState<Track | null>(null);
  const modalTrackId = useRef<string | null>(null);
  const preview = useTrackPreview();

  const openPlatforms = useCallback(
    (track: Track) => {
      modalTrackId.current = track.id;
      setSelected(track);
      preview.play(track);
    },
    [preview.play],
  );

  const closeModal = useCallback(() => {
    modalTrackId.current = null;
    preview.suppressHoverUntilMove();
    preview.stop();
    setSelected(null);
  }, [preview.stop, preview.suppressHoverUntilMove]);

  return (
    <>
      <Header />
      <Hero featured={featuredTrack} onListen={() => openPlatforms(featuredTrack)} />
      <Discography
        onSelect={openPlatforms}
        onCoverEnter={(track) => {
          if (modalTrackId.current) return;
          preview.onCoverEnter(track);
        }}
        onCoverLeave={(track) => {
          if (modalTrackId.current) return;
          preview.onCoverLeave(track);
        }}
      />
      <About />
      <Footer />
      <SmartLinkModal
        track={selected}
        isPlaying={Boolean(selected && preview.playingId === selected.id)}
        onTogglePreview={() => {
          if (selected) preview.toggle(selected);
        }}
        onClose={closeModal}
      />
    </>
  );
}
