# Quinhas Fieti — site oficial

Site one-page do projeto musical **Quinhas Fieti**: discografia, agenda, playlists, busca e smart-links para as plataformas.

Stack: **Next.js 16** (App Router) · **React 19** · **Tailwind CSS 4** · TypeScript. Deploy típico: Vercel a partir de `main`.

> Este Next.js pode diferir do que você conhece. Antes de APIs novas, confira `node_modules/next/dist/docs/` e o bloco em `AGENTS.md`.

---

## Rodar local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

---

## Mapa da página

Tudo passa por [`components/Home.tsx`](components/Home.tsx): estado do modal, preview de áudio e `onSelect` compartilhado.

```text
Header (+ busca)
Hero (últimos drops)
Discografia   #musicas   — carrosséis por gênero
Agenda        #agenda    — calendário + filtros
Playlists     #playlists — Sounds + row por gênero
Sobre         #sobre
Footer
SmartLinkModal (overlay de plataformas)
```

| Seção | Arquivo | Papel |
|--------|---------|--------|
| Shell | `app/page.tsx` → `Home` | Monta a página e o modal |
| Header / scroll-spy / busca | `Header.tsx`, `SearchDialog.tsx` | Nav, Ctrl+K, portal no `body` |
| Hero | `Hero.tsx` | Destaque + recentes |
| Discografia | `Discography.tsx` | Rows Netflix por `genreOrder` |
| Agenda | `ReleaseSchedule.tsx` | Status + grid + ver mais (mobile) |
| Playlists | `Playlists.tsx` | Featured + tiles de gênero |
| Sobre | `About.tsx` | Bio + e-mail |
| Modal | `SmartLinkModal.tsx` | Versões, preview, links |
| Preview | `hooks/useTrackPreview.ts` | Hover / play / pause do MP3 |

**Dados (fonte da verdade):**

| Arquivo | Conteúdo |
|---------|----------|
| [`data/tracks.ts`](data/tracks.ts) | Catálogo, gêneros, datas, capas, platforms, helpers |
| [`data/artist.ts`](data/artist.ts) | Bio, playlists YouTube, redes |

Assets: `public/covers/`, `public/previews/`.

---

## Fluxo principal (clique → ouvir)

1. Usuário escolhe uma faixa (hero, discografia, agenda ou busca).
2. `Home.openPlatforms(track)` abre o `SmartLinkModal` e toca o preview.
3. Modal lista plataformas de `track.platforms` e outras versões via `getTrackVersions`.
4. Busca (`SearchDialog`) usa `searchTracks`; ao escolher, fecha a busca e chama o mesmo `openPlatforms`.
5. **Esc:** a busca (z-60, portal) fecha sozinha; o modal (z-50) só fecha se a busca não estiver aberta.

Datas / “hoje” usam fuso **America/Sao_Paulo** (`getTodayIso`) para status de lançamento.

---

## Como alterar o catálogo

### Nova faixa

Em [`data/tracks.ts`](data/tracks.ts), no array `tracks`:

```ts
{
  id: "slug-unico",
  title: "Título",
  version: "Versão Pagode", // opcional
  genre: "pagode",          // trap | pop | pagode
  cover: "/covers/arquivo.webp",
  releaseDate: "2026-12-20", // YYYY-MM-DD; omitir = TBA
  youtubeId: "...",         // opcional
  preview: "/previews/arquivo.mp3",
  accentColor: "#e20600",
  platforms: {
    ...platforms("YOUTUBE_ID"), // ou emptyPlatforms()
    spotify: "https://...",
    // null = "Em breve" no modal
  },
}
```

Coloque capa e MP3 em `public/`. A discografia, agenda, busca e hero passam a enxergar a faixa sozinhos.

### Nova versão da mesma música

Mesmo `title`, `id` e `version` diferentes (ex.: `"Versão Pop"`).  
`getTrackVersions` agrupa pelo título; a ordem das abas vem de `versionRank` (oficial → versão de gênero → alternativas).

### Novo gênero

1. Em `genreOrder` (`tracks.ts`): `{ id: "funk", label: "Funk" }`.
2. Em `artist.playlists`: entrada com `genreId`, `href` (ou `null` = Em breve) e `cover`.
3. Faixas novas com `genre: "funk"`.

Bio, meta e blurbs de playlist usam `getGenreListCopy()` — atualizam sozinhas.

### Agenda (comportamento)

- Status: `available` · `next` (próximo drop datado) · `soon` · `tba` — via `getAgendaStatuses`.
- Exibição: próximos primeiro (Próxima no topo), depois lançadas (mais novas primeiro).
- Filtros: Todas / gêneros de `genreOrder`.
- Mobile: 4 linhas + Ver mais / Ver menos.

### Playlists YouTube

Edite `artist.playlists` em [`data/artist.ts`](data/artist.ts).  
Capas de gênero: logos quadrados em fundo preto → UI usa `object-contain` (não corta). Ao trocar arquivo com o **mesmo nome**, prefira `*-v2.webp` para furar cache do Next Image.

---

## UI / layout

- Layout **Netflix LTR**: margens `px-4 sm:px-5 md:px-6`, sem `max-w` centralizado nas seções principais.
- Accent: `--color-accent` / `#e20600` em `app/globals.css`.
- Tipografia: Bebas (`font-display`) + Outfit (`font-sans`).
- Overlays: busca em portal no `body` (o `backdrop-blur` do header não pode prender o `fixed`).

---

## Checklist de lançamento

1. Track + capa WebP + preview MP3 em `data/tracks.ts` / `public/`.
2. Links de plataforma (ou `null`).
3. `releaseDate` correta (fuso SP).
4. Conferir discografia, agenda (Próxima), busca e modal.
5. Commit local por escopo; push / Vercel só quando for subir produção.

---

## Scripts úteis

| Comando | Uso |
|---------|-----|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servir o build |
| `npm run lint` | ESLint |
