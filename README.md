# Spotify Web Player – Markup Clone (MPG Exam)

A static HTML + SCSS clone of the Spotify web player, built from the Figma design.

🎨 Design: [Figma file](https://www.figma.com/design/K0iHmiSiMJuKxr5duOKvIC/CareerPath-Mentoring-task?node-id=1-323)

## Pages

| Page | File |
| --- | --- |
| Home (filters, Made For You, top mixes, artists, podcasts, audiobooks, friends activity) | `index.html` |
| Search (recent searches, browse tiles) | `pages/search.html` |
| Discover (vertical snap feed) | `pages/discover.html` |
| My Library (grid) | `pages/library.html` |
| Liked songs (list) | `pages/liked-songs.html` |
| Song | `pages/song.html` |
| Album | `pages/album.html` |
| Playlist | `pages/playlist.html` |
| Artist / About / Albums grid / Albums list | `pages/artist*.html` |
| Podcast / Episode | `pages/podcast.html`, `pages/episode.html` |

## Layout

Every page uses the same frame:

- `aside.sidebar` – library navigation (`nav > ul > li > a`), fixed width, sticky
- `main.main` – contains `header.topbar` (Home / Discover / Search + actions) and the content panel
- `footer.player` – fixed bottom player split into `.player-left` (track info), `.player-center` (controls + progress), `.player-right` (actions + volume)
- `nav.mobile-nav` – bottom navigation shown only on phones

Main layout is CSS Grid, inner components use Flexbox. `position` is only used for the sticky sidebar/header, the fixed player and small overlays (play button, pin badge).

## Responsive breakpoints

| Width | Behaviour |
| --- | --- |
| ≥ 1440px | Friends Activity column visible on Home |
| ≤ 1200px | Player hides optional icons, narrower progress bar |
| ≤ 1024px | Sidebar collapses to icons only, detail pages become one column |
| ≤ 768px | Sidebar replaced by bottom nav, compact mini player, stacked layouts |

Card rows scroll horizontally inside their section, the page itself never scrolls sideways.

## SCSS architecture

```
assets/styles/
├── abstracts/   _variables.scss (design tokens), _mixins.scss
├── base/        _fonts.scss, _reset.scss, _typography.scss
├── layout/      _app.scss, _sidebar.scss, _header.scss, _player.scss, _friends.scss, _mobile-nav.scss
├── components/  _buttons, _chips, _section, _cards, _tiles, _track-table, _media-head, _tags, _tabs, _toolbar, _hero
├── pages/       _themes, _search, _song, _artist, _podcast, _discover
├── main.scss    entry file (@use of all partials)
└── main.css     compiled output linked by every page
```

- 60+ variables (colors, spacing, radius, font sizes, layout sizes, breakpoints)
- Mixins: `flex-center`, `flex-row`, `flex-column`, `truncate`, `line-clamp`, `square`, `cover-image`, `transition`, `hide-scrollbar`, `focus-ring` and breakpoint mixins (`tablet`, `mobile`, ...)
- BEM class naming (`card__title`, `sidebar__link--active`), nesting max 3 levels

### Compile

```bash
npx sass assets/styles/main.scss assets/styles/main.css --no-source-map
```

or use the **Live Sass Compiler** VS Code extension with the output set to `assets/styles`.

## JavaScript (optional extras)

`assets/js/main.js` adds small interactions: filter chips (filter Home sections), section arrows scroll the card rows, like / follow toggles, play-pause toggle and draggable progress / volume sliders.
