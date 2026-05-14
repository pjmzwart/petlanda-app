export const PET_STYLES = [
  {
    id: 'cartoon',
    name: 'Cartoon Joy',
    desc: 'Bright, playful and full of character',
    prompt: 'Transform this pet into a bright, playful cartoon portrait with expressive eyes, soft rounded shapes, cheerful colors, and a clean premium illustration look. Keep the pet recognizable from the uploaded photo.'
  },
  {
    id: 'cute',
    name: 'Cute Look',
    desc: 'Soft, sweet and extra adorable',
    prompt: 'Create an extra cute, soft and heartwarming portrait of this pet with gentle lighting, adorable expression, cozy details, pastel colors, and premium digital art quality. Keep the pet recognizable from the uploaded photo.'
  },
  {
    id: 'nature',
    name: 'Nature Pet',
    desc: 'Fresh flowers, leaves and sunshine',
    prompt: 'Create a beautiful nature-inspired portrait of this pet surrounded by soft flowers, leaves, warm sunlight, fresh outdoor colors, and a peaceful premium illustration style. Keep the pet recognizable from the uploaded photo.'
  },
  {
    id: 'cozy',
    name: 'Cozy Home',
    desc: 'Warm blanket, soft light and calm vibes',
    prompt: 'Create a warm cozy portrait of this pet in a soft home setting with gentle blankets, warm window light, calm atmosphere, and premium lifestyle illustration quality. Keep the pet recognizable from the uploaded photo.'
  },
  {
    id: 'royal',
    name: 'Royal Pet',
    desc: 'A noble king or queen portrait',
    prompt: 'Transform this pet into a royal portrait with elegant clothing, luxurious details, warm studio lighting, rich textures, and premium digital art quality. Keep the pet recognizable from the uploaded photo.'
  },
  {
    id: 'fantasy',
    name: 'Fantasy Friend',
    desc: 'Magical, dreamy and fairytale-like',
    prompt: 'Create a magical fantasy portrait of this pet with dreamy light, tiny sparkles, soft clouds, fairytale colors, and charming premium digital art quality. Keep the pet recognizable from the uploaded photo.'
  },
  {
    id: 'astronaut',
    name: 'Space Explorer',
    desc: 'A cute pet astronaut adventure',
    prompt: 'Transform this pet into a cute astronaut wearing a small space suit, with stars, planets, cinematic lighting, and premium poster-style digital art. Keep the pet recognizable from the uploaded photo.'
  },
  {
    id: 'christmas',
    name: 'Christmas Card',
    desc: 'Warm, festive and gift-ready',
    prompt: 'Create a cozy Christmas card portrait of this pet with warm lights, soft snow, festive decorations, a sweet expression, and premium illustration quality. Keep the pet recognizable from the uploaded photo.'
  }
];

export function getStylePrompt(styleId: string) {
  return PET_STYLES.find((style) => style.id === styleId)?.prompt ?? PET_STYLES[0].prompt;
}
