/* =====================
  Small UI interactions (no real audio / data)
===================== */

// ---------- Filter chips: toggle active state + filter Home sections ----------
document.querySelectorAll(".filters__list").forEach((list) => {
  list.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;

    list.querySelectorAll(".chip").forEach((item) => {
      item.classList.remove("chip--active");
      item.setAttribute("aria-pressed", "false");
    });
    chip.classList.add("chip--active");
    chip.setAttribute("aria-pressed", "true");

    const filter = chip.dataset.filter;
    if (!filter) return;

    document.querySelectorAll("[data-category]").forEach((section) => {
      section.hidden = filter !== "all" && section.dataset.category !== filter;
    });
  });
});

// ---------- Section arrows: scroll the card row ----------
document.querySelectorAll(".section").forEach((section) => {
  const row = section.querySelector("[data-scroll-row]");
  if (!row) return;

  const [prev, next] = section.querySelectorAll(".section__controls .icon-btn");
  const step = () => row.clientWidth * 0.8;

  if (prev) prev.addEventListener("click", () => row.scrollBy({ left: -step() }));
  if (next) next.addEventListener("click", () => row.scrollBy({ left: step() }));
});

// ---------- Like buttons ----------
document.querySelectorAll("[data-like]").forEach((button) => {
  const img = button.querySelector("img");
  const emptyIcon = img.src.replace("green-heart.svg", "hearth.svg");
  const fullIcon = emptyIcon.replace("hearth.svg", "green-heart.svg");

  button.addEventListener("click", () => {
    const liked = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!liked));
    img.src = liked ? emptyIcon : fullIcon;
  });
});

// ---------- Follow buttons ----------
document.querySelectorAll("[data-follow]").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = button.textContent === "Follow" ? "Following" : "Follow";
  });
});

// ---------- Player: play / pause toggle ----------
const playToggle = document.querySelector("[data-play-toggle]");

if (playToggle) {
  const icon = playToggle.querySelector("img");
  const pauseSrc = icon.src;
  const playSrc = pauseSrc.replace("pause-black.svg", "play-black.svg");

  playToggle.addEventListener("click", () => {
    const isPlaying = playToggle.classList.toggle("play-btn--pause");
    icon.src = isPlaying ? pauseSrc : playSrc;
    playToggle.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  });
}

// ---------- Range sliders: paint the filled part ----------
document.querySelectorAll("[data-range]").forEach((range) => {
  const paint = () => range.style.setProperty("--range-value", `${range.value}%`);
  paint();
  range.addEventListener("input", paint);
});
