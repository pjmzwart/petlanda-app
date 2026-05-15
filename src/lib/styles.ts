
export type PetScene = {
  id: string;
  name: string;
  desc: string;
  icon: string;
  image: string;
  category: 'restaurant' | 'adventure' | 'fantasy' | 'holiday' | 'professional';
  prompt: string;
  variations: string[];
};

const identityLine = `Use the uploaded pet photo as the direct visual reference. Keep the same specific animal identity: same face, eyes, nose/beak, ears, fur or feather color, markings, body shape, collar if visible, expression and personality. This is an image edit of the original pet, not a new animal. Change only the scene, background, props, lighting, mood, outfit/accessories and composition.`;

export const PET_STYLES: PetScene[] = [
  {
    id: 'luxury-restaurant',
    name: 'Luxury Restaurant',
    desc: 'Fine dining, candlelight and a raised glass',
    icon: '🍷',
    image: '/examples/luxury-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in a luxurious fine dining restaurant. The pet may raise a wine glass in a funny believable way, with an animal-like paw/claw gesture, not a human hand. Premium photorealistic dinner scene.`,
    variations: [
      'dark cozy fine dining restaurant with fireplace, candles, warm wood walls and intimate atmosphere',
      'classic luxury restaurant with chandeliers, white tablecloth, elegant dinner plate and soft guests in the background',
      'luxury restaurant with a grand piano and pianist softly blurred in the background',
      'romantic bistro terrace with flowers, string lights and warm evening glow',
      'upscale close-up restaurant portrait with a wine glass near the pet and elegant table setting',
      'bright cheerful restaurant with plants, daylight and colorful food',
      'retro restaurant booth with a playful dinner atmosphere'
    ]
  },
  {
    id: 'bright-restaurant',
    name: 'Bright Restaurant',
    desc: 'Fresh, light and cheerful dining',
    icon: '🥗',
    image: '/examples/bright-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in a light cheerful restaurant with big windows, plants, fresh colorful food, warm daylight and friendly atmosphere. Photorealistic.`,
    variations: [
      'sunny greenhouse restaurant full of plants and daylight',
      'light Mediterranean restaurant with colorful plates and soft natural light',
      'modern brunch café with fresh salad and flowers on the table',
      'cheerful terrace restaurant with warm afternoon sun',
      'bright bistro interior with elegant table setting'
    ]
  },
  {
    id: 'burger-restaurant',
    name: 'Burger Diner',
    desc: 'Burgers, fries and playful diner vibes',
    icon: '🍔',
    image: '/examples/burger-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in a fun burger diner with burgers, fries, milkshake, warm neon lights and playful atmosphere. The pet sits at the table like a funny guest. Photorealistic.`,
    variations: [
      'retro burger diner with neon sign, burger and fries on the table',
      'modern burger bar with brick wall and warm lights',
      'classic American diner booth with milkshake and fries',
      'playful burger restaurant with colorful signs and cozy booth',
      'close-up at a burger table with funny restaurant mood'
    ]
  },
  {
    id: 'pianist-restaurant',
    name: 'Piano Dinner',
    desc: 'Elegant restaurant with live music',
    icon: '🎹',
    image: '/examples/pianist-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in an elegant luxury restaurant with a grand piano and a pianist softly blurred in the background. Candlelight, chandeliers, premium dinner atmosphere. Photorealistic.`,
    variations: [
      'grand piano visible behind the pet, dark luxury restaurant, candlelit dinner',
      'elegant dining room with pianist and soft golden chandelier light',
      'jazz restaurant atmosphere with piano, wine glass and intimate table',
      'classic hotel restaurant with live piano music and refined table setting',
      'cinematic restaurant portrait with piano lights in the background'
    ]
  },
  {
    id: 'bistro-terrace',
    name: 'Bistro Terrace',
    desc: 'Outdoor lights and cozy dinner',
    icon: '🌿',
    image: '/examples/bistro-terrace.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet at a cozy bistro terrace with string lights, plants, flowers, evening atmosphere and an elegant plate of food. Photorealistic.`,
    variations: [
      'green bistro terrace with string lights and flowers',
      'cozy outdoor restaurant patio at golden hour',
      'romantic garden bistro with warm table lights',
      'urban terrace restaurant with soft evening bokeh',
      'outdoor café table with plants and candlelight'
    ]
  },
  {
    id: 'retro-diner',
    name: 'Retro Diner',
    desc: 'Vintage booth, milkshake and fries',
    icon: '🥤',
    image: '/examples/retro-diner.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in a colorful retro diner booth with milkshake, burger, fries, checkerboard floor and fun vintage lighting. Photorealistic but playful.`,
    variations: [
      'red booth retro diner with milkshake and fries',
      '1950s diner with checkerboard floor and neon lights',
      'playful diner counter scene with burger meal',
      'cozy vintage booth with colorful wall art',
      'retro family restaurant with warm nostalgic atmosphere'
    ]
  },
  {
    id: 'astronaut',
    name: 'Space Explorer',
    desc: 'Space suit, moon and stars',
    icon: '🚀',
    image: '/examples/astronaut.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet in a realistic astronaut suit in space, with moon surface, stars and Earth visible. Cinematic but believable.`,
    variations: ['moon surface with Earth rising behind', 'inside a spacecraft window looking at Earth', 'Mars-like red planet scene', 'floating in zero gravity with stars', 'astronaut portrait with helmet reflections', 'space station interior with Earth view']
  },
  {
    id: 'king-throne',
    name: 'Royal Throne',
    desc: 'Palace portrait with crown',
    icon: '👑',
    image: '/examples/king-throne.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet on a royal throne in a grand palace with a small crown and tasteful royal robe details. Dramatic warm palace lighting.`,
    variations: ['golden throne room with crown', 'dark royal palace portrait', 'red velvet throne and candlelight', 'castle hall with royal banners', 'close-up royal portrait with jewels', 'bright palace balcony portrait']
  },
  {
    id: 'beach-vacation',
    name: 'Beach Vacation',
    desc: 'Tropical sun, sea and holiday vibes',
    icon: '🏖️',
    image: '/examples/beach-vacation.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet on a sunny tropical beach vacation with palm trees, blue sea, coconuts and cheerful holiday mood.`,
    variations: ['tropical beach with palm trees and coconut drinks', 'sunny beach chair vacation portrait', 'golden sunset beach scene', 'luxury resort poolside setting', 'playful sand and ocean background', 'bright beach café terrace', 'yacht harbor on a sunny day', 'Mediterranean beach town']
  },
  {
    id: 'cozy-christmas',
    name: 'Cozy Christmas',
    desc: 'Warm festive holiday scene',
    icon: '🎄',
    image: '/examples/cozy-christmas.jpg',
    category: 'holiday',
    prompt: `${identityLine} Place the pet in a cozy Christmas room with festive decorations, Christmas tree, warm lights, candles and holiday dinner atmosphere.`,
    variations: ['Christmas dinner table with tree lights', 'cozy fireplace and festive sweater', 'snowy window background with warm room lights', 'holiday gift scene under the Christmas tree', 'candlelit Christmas portrait', 'bright cheerful Christmas kitchen']
  },
  {
    id: 'superhero',
    name: 'Superhero Adventure',
    desc: 'Heroic movie poster moment',
    icon: '🦸',
    image: '/examples/superhero.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet as a superhero in a cinematic scene, tasteful cape or hero suit details, heroic lighting and movie poster feel.`,
    variations: ['rooftop at sunset with cape', 'night skyline heroic pose', 'comic movie poster lighting', 'dramatic rain-soaked city rooftop', 'close-up superhero portrait with glowing skyline', 'bright heroic city scene']
  },
  {
    id: 'paris-cafe',
    name: 'Paris Café',
    desc: 'French terrace charm',
    icon: '☕',
    image: '/examples/paris-cafe.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet at a charming Paris café terrace with croissant, coffee, flowers and Eiffel Tower softly visible in the background.`,
    variations: ['Paris café breakfast with croissant', 'Eiffel Tower terrace at sunrise', 'rainy Paris window café', 'evening bistro with street lights', 'classic French outdoor café portrait', 'bright floral Paris terrace']
  },
  {
    id: 'chef-kitchen',
    name: 'Master Chef',
    desc: 'Funny gourmet kitchen scene',
    icon: '👨‍🍳',
    image: '/examples/chef-kitchen.jpg',
    category: 'professional',
    prompt: `${identityLine} Place the pet in a professional kitchen as a cute chef with chef hat, vegetables, pans and warm kitchen lighting. Funny but premium.`,
    variations: ['chef hat in professional kitchen', 'Italian kitchen with pasta ingredients', 'baking scene with flour and warm lights', 'fine dining kitchen with copper pans', 'funny chef portrait with vegetables', 'bright colorful home kitchen']
  },
  {
    id: 'yacht-adventure',
    name: 'Luxury Yacht',
    desc: 'Holiday at sea',
    icon: '🛥️',
    image: '/examples/yacht-adventure.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet on a luxury yacht at sea with blue water, sunshine, elegant sailor vibe and holiday atmosphere.`,
    variations: ['at the yacht steering wheel', 'sunny deck with blue sea', 'luxury marina background', 'sunset sailing scene', 'Mediterranean yacht holiday portrait', 'bright ocean deck with coastal town']
  },
  {
    id: 'medieval-knight',
    name: 'Medieval Knight',
    desc: 'Castle fantasy scene',
    icon: '⚔️',
    image: '/examples/medieval-knight.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet as a noble medieval knight near a castle, tasteful armor, fantasy landscape, cinematic light.`,
    variations: ['castle courtyard in armor', 'misty mountain castle background', 'royal knight portrait with sword', 'medieval battlefield hero pose', 'fantasy castle sunset portrait', 'bright castle garden with armor details']
  },
  {
    id: 'business-meeting',
    name: 'Business Meeting',
    desc: 'Boardroom boss moment',
    icon: '💼',
    image: '/examples/business-meeting.jpg',
    category: 'professional',
    prompt: `${identityLine} Place the pet in a funny professional business meeting, seated at a boardroom table with tasteful suit details, laptop, papers and city office view.`,
    variations: ['boardroom table with documents', 'CEO office with skyline view', 'serious meeting with laptop', 'conference room presentation scene', 'business portrait with tie and city background', 'bright modern coworking office']
  },
  {
    id: 'wizard-school',
    name: 'Wizard Academy',
    desc: 'Magic school atmosphere',
    icon: '🪄',
    image: '/examples/wizard-school.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet in a magical wizard school with robe, old books, candles, floating sparkles and cozy fantasy atmosphere.`,
    variations: ['wizard classroom with floating candles', 'old library with magic books', 'castle hall with warm candlelight', 'spell lesson scene with glowing wand', 'cozy magical dormitory portrait', 'bright magical greenhouse classroom']
  },
  {
    id: 'ski-adventure',
    name: 'Ski Adventure',
    desc: 'Snowy mountain action',
    icon: '⛷️',
    image: '/examples/ski-adventure.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet in a snowy ski adventure scene in the mountains, wearing tasteful winter gear, ski lodge or snowy slope background.`,
    variations: ['snowy mountain slope with ski goggles', 'cozy ski lodge terrace', 'alpine village background', 'winter action portrait in snow', 'sunny mountain panorama with ski gear', 'bright ski resort café terrace']
  }
];

export function getStylePrompt(styleId: string) {
  return PET_STYLES.find((style) => style.id === styleId)?.prompt ?? PET_STYLES[0].prompt;
}

export function getSceneVariation(styleId: string, index: number) {
  const scene = PET_STYLES.find((style) => style.id === styleId) ?? PET_STYLES[0];
  return scene.variations[index % scene.variations.length];
}

export function getRandomSceneVariation(styleId: string) {
  const scene = PET_STYLES.find((style) => style.id === styleId) ?? PET_STYLES[0];
  return scene.variations[Math.floor(Math.random() * scene.variations.length)];
}
