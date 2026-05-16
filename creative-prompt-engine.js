
import { sceneCards } from "./scene-cards";

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const sceneActionIdeas = {
  superhero_adventure: [
    "uploaded pet flying through the air with one paw forward and cape waving",
    "uploaded pet standing on back legs on a skyscraper like a heroic movie poster",
    "uploaded pet swinging through jungle vines like an action hero",
    "uploaded pet jumping between rooftops in a neon city",
    "uploaded pet landing from the sky with dust and motion"
  ],
  royal_throne: [
    "uploaded pet walking through a huge medieval castle hall",
    "uploaded pet lying proudly on a royal carpet with servants in the background",
    "uploaded pet standing on a palace balcony wearing a crown",
    "uploaded pet entering a knight banquet hall",
    "uploaded pet painted like a funny royal renaissance portrait"
  ],
  space_explorer: [
    "uploaded pet floating in zero gravity with toys drifting around",
    "uploaded pet looking through a spaceship window at Earth",
    "uploaded pet wearing a space helmet on a colorful alien planet",
    "uploaded pet jumping on the moon with stars behind it",
    "uploaded pet inside a cockpit pressing glowing buttons"
  ],
  master_chef: [
    "uploaded pet wearing a chef hat in a flour explosion",
    "uploaded pet proudly presenting a tiny gourmet meal",
    "uploaded pet in a chaotic restaurant kitchen",
    "uploaded pet tasting soup with a serious chef expression",
    "uploaded pet surrounded by flying pasta and vegetables"
  ],
  business_meeting: [
    "uploaded pet as CEO at a boardroom table",
    "uploaded pet giving a serious presentation with charts",
    "uploaded pet sitting in a huge office chair",
    "uploaded pet signing important papers",
    "uploaded pet in a funny corporate power pose"
  ]
};

export function buildCreativePrompt(sceneId) {
  const ideas = sceneActionIdeas[sceneId] || [
    "uploaded pet in a funny dynamic scene",
    "uploaded pet interacting with the environment",
    "uploaded pet in a cinematic playful action pose"
  ];

  return `
  ${randomItem(ideas)}

  Keep the same recognizable pet identity.
  Keep the same face, fur pattern and eye color.
  Change the pose, body position, camera angle and composition.
  Make it funny, bright, creative and premium.

  Avoid static sitting portraits.
  Avoid repeated pose.
  Avoid dark images.
  Avoid passport photo composition.
  `;
}
