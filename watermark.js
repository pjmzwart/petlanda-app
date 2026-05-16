
export function renderWatermarkOverlay() {

  const overlay = document.createElement("div");

  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.pointerEvents = "none";
  overlay.style.overflow = "hidden";

  for (let i = 0; i < 40; i++) {

    const mark = document.createElement("div");

    mark.innerText = "✦ PETLANDA ✦";

    mark.style.position = "absolute";
    mark.style.opacity = "0.28";
    mark.style.color = "white";
    mark.style.fontWeight = "900";
    mark.style.fontSize = "22px";
    mark.style.transform = "rotate(-24deg)";
    mark.style.textShadow = "0 0 6px rgba(0,0,0,0.7)";
    mark.style.left = `${(i % 5) * 22}%`;
    mark.style.top = `${Math.floor(i / 5) * 12}%`;

    overlay.appendChild(mark);
  }

  return overlay;
}
