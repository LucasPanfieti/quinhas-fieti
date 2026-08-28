"use client";

import { useState } from "react";
import { featuredTrack, type Track } from "@/data/tracks";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Discography } from "@/components/Discography";
import { SmartLinkModal } from "@/components/SmartLinkModal";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export function Home() {
  const [selected, setSelected] = useState<Track | null>(null);

  return (
    <>
      <Header />
      <Hero featured={featuredTrack} onListen={() => setSelected(featuredTrack)} />
      <Discography onSelect={setSelected} />
      <About />
      <Footer />
      <SmartLinkModal track={selected} onClose={() => setSelected(null)} />
    </>
  );
}
