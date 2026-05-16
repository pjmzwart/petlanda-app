
import { sceneRules, actionPoses, environments } from "./action-scenes";

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildActionPrompt(petDescription) {

  const pose = randomItem(actionPoses);
  const env = randomItem(environments);

  return `
  ${sceneRules}

  uploaded pet,
  same recognizable pet identity,
  same fur color,
  same face,
  same eyes,

  ACTION:
  ${pose},

  ENVIRONMENT:
  ${env},

  STYLE:
  dynamic action scene,
  movie poster quality,
  cinematic composition,
  bright image,
  energetic movement,
  premium quality,

  NEGATIVE PROMPTS:
  sitting calmly,
  static portrait,
  centered composition,
  repeated pose,
  dark image
  `;
}
