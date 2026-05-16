
import { sceneData } from "./scene-data";

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildPrompt(sceneKey, petDescription) {

  const scene = sceneData[sceneKey];

  const background = randomItem(scene.backgrounds);
  const pose = randomItem(scene.poses);
  const angle = randomItem(scene.cameraAngles || ["cinematic composition"]);
  const lighting = randomItem(scene.lighting || ["bright cinematic lighting"]);
  const accessory = randomItem(scene.accessories);

  return `
  Ultra realistic ${petDescription},

  SAME DOG CONSISTENCY:
  same dog,
  same fur color,
  same breed,
  same face,
  same eyes,
  same body proportions,

  ACTION & SCENE:
  ${pose},
  ${background},
  ${accessory},

  CAMERA:
  ${angle},

  LIGHTING:
  ${lighting},

  QUALITY:
  highly detailed fur,
  bright image,
  visible face,
  sharp eyes,
  cinematic composition,
  premium photography,
  vibrant colors,
  high detail,
  dynamic motion,
  movie scene quality
  `;
}
