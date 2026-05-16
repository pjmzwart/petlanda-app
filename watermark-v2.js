
export function improvedWatermark() {

  const overlay = document.createElement("div");

  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.pointerEvents = "none";
  overlay.style.overflow = "hidden";

  for (let i = 0; i < 60; i++) {

    const mark = document.createElement("div");

    mark.innerText = "✦ PETLANDA ✦";

    mark.style.position = "absolute";
    mark.style.color = "rgba(255,255,255,0.38)";
    mark.style.fontWeight = "900";
    mark.style.fontSize = "26px";
    mark.style.transform = "rotate(-24deg)";
    mark.style.textShadow = "0 0 10px rgba(0,0,0,0.9)";

    mark.style.left = `${(i % 6) * 18}%`;
    mark.style.top = `${Math.floor(i / 6) * 10}%`;

    overlay.appendChild(mark);
  }

  return overlay;
}
