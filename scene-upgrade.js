
export const sceneVariations = {
  royal: {
    backgrounds: [
      "grand royal throne room",
      "medieval castle hall",
      "luxury palace interior",
      "royal garden at sunset",
      "castle balcony with mountains",
      "golden king banquet hall",
      "renaissance palace room",
      "royal knight hall with candles"
    ],
    poses: [
      "sitting proudly",
      "standing confidently",
      "lying on royal carpet",
      "walking toward camera",
      "close-up royal portrait"
    ],
    accessories: [
      "wearing a royal crown",
      "wearing a red velvet cape",
      "wearing a gold collar",
      "no accessories",
      "wearing elegant royal jewelry"
    ]
  },

  luxury_restaurant: {
    backgrounds: [
      "luxury rooftop restaurant in Monaco",
      "Michelin star restaurant",
      "VIP lounge with golden lighting",
      "candlelight dinner table",
      "luxury sushi bar",
      "five star hotel restaurant"
    ],
    poses: [
      "sitting at the table",
      "looking at the camera",
      "standing beside the chair",
      "relaxed on luxury seat",
      "close-up portrait"
    ],
    accessories: [
      "wearing a bow tie",
      "wearing luxury collar",
      "no accessories"
    ]
  }
};

export function buildDynamicPrompt(scene, petType) {
  const config = sceneVariations[scene];

  const background =
    config.backgrounds[Math.floor(Math.random() * config.backgrounds.length)];

  const pose =
    config.poses[Math.floor(Math.random() * config.poses.length)];

  const accessory =
    config.accessories[Math.floor(Math.random() * config.accessories.length)];

  return `
  Ultra realistic ${petType},
  ${pose},
  ${background},
  ${accessory},
  bright cinematic lighting,
  soft luxury light,
  high exposure,
  highly detailed fur,
  sharp eyes,
  premium photography,
  depth of field,
  vibrant colors,
  professional composition
  `;
}
