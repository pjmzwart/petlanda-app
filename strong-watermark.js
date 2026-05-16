
export function strongWatermarkOverlay() {

  const overlay = document.createElement("div");

  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.pointerEvents = "none";

  for (let i = 0; i < 80; i++) {

    const mark = document.createElement("div");

    mark.innerText = "✦ PETLANDA ✦";

    mark.style.position = "absolute";
    mark.style.color = "rgba(255,255,255,0.42)";
    mark.style.fontWeight = "900";
    mark.style.fontSize = "28px";
    mark.style.transform = "rotate(-24deg)";
    mark.style.textShadow = "0 0 12px rgba(0,0,0,0.9)";

    mark.style.left = `${(i % 8) * 14}%`;
    mark.style.top = `${Math.floor(i / 8) * 10}%`;

    overlay.appendChild(mark);
  }

  return overlay;
}
