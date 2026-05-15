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

const identityLine = 'Use the uploaded pet photo as the direct identity reference. Keep the same specific pet, same face, eyes, nose, ears, fur color, markings, body shape, collar if visible, and personality. Change the environment, props, mood and composition only.';

export const PET_STYLES: PetScene[] = [
  {
    id: 'luxury-restaurant',
    name: 'Luxury Restaurant',
    desc: 'Fine dining, candlelight, raised glass',
    icon: '🍷',
    image: '/examples/luxury-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in a luxurious fine dining restaurant. Warm candlelight, chandeliers, white tablecloth, elegant dinner plate. The pet raises a wine glass in a funny but believable way, using a paw-like gesture rather than a human hand. Photorealistic premium scene.`,
    variations: [
      'dark cozy fine dining restaurant with fireplace, candles, warm wood walls, intimate atmosphere',
      'bright cheerful garden restaurant with plants, daylight, fresh colorful food on the table',
      'classic luxury restaurant with a pianist in the background, chandeliers, elegant guests softly blurred',
      'romantic bistro terrace with string lights, flowers and warm evening glow',
      'upscale restaurant close-up portrait with wine glass near the pet, elegant table setting'
    ]
  },
  {
    id: 'bright-restaurant',
    name: 'Bright Restaurant',
    desc: 'Fresh, light and cheerful dining',
    icon: '🥗',
    image: '/examples/bright-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in a light cheerful restaurant with big windows, plants, fresh colorful food, warm daylight and friendly atmosphere. A wine glass or water glass may be near the pet. Photorealistic.`,
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
    name: 'Burger Restaurant',
    desc: 'Burgers, fries and fun diner vibes',
    icon: '🍔',
    image: '/examples/burger-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in a fun burger restaurant with burgers, fries, milkshake, warm neon lights and playful diner atmosphere. The pet sits at the table like a funny guest. Photorealistic.`,
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
    name: 'Luxury with Pianist',
    desc: 'Elegant restaurant with live music',
    icon: '🎹',
    image: '/examples/pianist-restaurant.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet in an elegant luxury restaurant with a grand piano and a pianist softly blurred in the background. Candlelight, chandeliers, wine glass, premium dinner atmosphere. Photorealistic.`,
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
    desc: 'Playful booth, milkshake and fries',
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
    name: 'Astronaut',
    desc: 'Space suit on the moon',
    icon: '🚀',
    image: '/examples/astronaut.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet in a realistic astronaut suit on the moon, Earth visible through the helmet or in the background. Cinematic space lighting, magical but realistic.`,
    variations: ['moon surface with Earth rising behind', 'inside a spacecraft window looking at Earth', 'Mars-like red planet scene', 'floating in zero gravity with stars', 'astronaut portrait with helmet reflections']
  },
  {
    id: 'king-throne',
    name: 'King on Throne',
    desc: 'Royal palace portrait',
    icon: '👑',
    image: '/examples/king-throne.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet on a royal throne in a grand palace with a small crown and tasteful royal robe details. Dramatic warm palace lighting.`,
    variations: ['golden throne room with crown', 'dark royal palace portrait', 'red velvet throne and candlelight', 'castle hall with royal banners', 'close-up royal portrait with jewels']
  },
  {
    id: 'beach-vacation',
    name: 'Beach Vacation',
    desc: 'Tropical sunshine and cocktails',
    icon: '🏖️',
    image: '/examples/beach-vacation.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet on a sunny tropical beach vacation with palm trees, sunglasses, blue sea, coconuts and cheerful holiday mood.`,
    variations: ['tropical beach with palm trees and coconut drinks', 'sunny beach chair vacation portrait', 'golden sunset beach scene', 'luxury resort poolside setting', 'playful sand and ocean background']
  },
  {
    id: 'cozy-christmas',
    name: 'Cozy Christmas',
    desc: 'Warm holiday dinner scene',
    icon: '🎄',
    image: '/examples/cozy-christmas.jpg',
    category: 'holiday',
    prompt: `${identityLine} Place the pet in a cozy Christmas room with festive sweater, Christmas tree, warm lights, candles, holiday dinner atmosphere.`,
    variations: ['Christmas dinner table with tree lights', 'cozy fireplace and festive sweater', 'snowy window background with warm room lights', 'holiday gift scene under the Christmas tree', 'candlelit Christmas portrait']
  },
  {
    id: 'superhero',
    name: 'Superhero',
    desc: 'Hero on a city rooftop',
    icon: '🦸',
    image: '/examples/superhero.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet as a superhero on a cinematic city rooftop at night, tasteful cape, heroic lighting, movie poster feel.`,
    variations: ['rooftop at sunset with cape', 'night skyline heroic pose', 'comic movie poster lighting', 'dramatic rain-soaked city rooftop', 'close-up superhero portrait with glowing skyline']
  },
  {
    id: 'paris-cafe',
    name: 'Paris Café',
    desc: 'French terrace charm',
    icon: '☕',
    image: '/examples/paris-cafe.jpg',
    category: 'restaurant',
    prompt: `${identityLine} Place the pet at a charming Paris café terrace with croissant, coffee, flowers and Eiffel Tower softly visible in the background.`,
    variations: ['Paris café breakfast with croissant', 'Eiffel Tower terrace at sunrise', 'rainy Paris window café', 'evening bistro with street lights', 'classic French outdoor café portrait']
  },
  {
    id: 'chef-kitchen',
    name: 'Chef in Kitchen',
    desc: 'Funny gourmet chef scene',
    icon: '👨‍🍳',
    image: '/examples/chef-kitchen.jpg',
    category: 'professional',
    prompt: `${identityLine} Place the pet in a professional kitchen as a cute chef with chef hat, vegetables, pans and warm kitchen lighting. Funny but premium.`,
    variations: ['chef hat in professional kitchen', 'Italian kitchen with pasta ingredients', 'baking scene with flour and warm lights', 'fine dining kitchen with copper pans', 'funny chef portrait with vegetables']
  },
  {
    id: 'yacht-adventure',
    name: 'Yacht Adventure',
    desc: 'Luxury at sea',
    icon: '🛥️',
    image: '/examples/yacht-adventure.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet on a luxury yacht at sea with blue water, sunshine, elegant sailor vibe and holiday atmosphere.`,
    variations: ['at the yacht steering wheel', 'sunny deck with blue sea', 'luxury marina background', 'sunset sailing scene', 'Mediterranean yacht holiday portrait']
  },
  {
    id: 'medieval-knight',
    name: 'Medieval Knight',
    desc: 'Castle fantasy scene',
    icon: '⚔️',
    image: '/examples/medieval-knight.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet as a noble medieval knight near a castle, tasteful armor, fantasy landscape, cinematic light.`,
    variations: ['castle courtyard in armor', 'misty mountain castle background', 'royal knight portrait with sword', 'medieval battlefield hero pose', 'fantasy castle sunset portrait']
  },
  {
    id: 'business-meeting',
    name: 'Business Meeting',
    desc: 'Boardroom boss pet',
    icon: '💼',
    image: '/examples/business-meeting.jpg',
    category: 'professional',
    prompt: `${identityLine} Place the pet in a funny professional business meeting, seated at a boardroom table with suit details, laptop, papers and city office view.`,
    variations: ['boardroom table with documents', 'CEO office with skyline view', 'serious meeting with laptop', 'conference room presentation scene', 'business portrait with tie and city background']
  },
  {
    id: 'wizard-school',
    name: 'Wizard School',
    desc: 'Magical school scene',
    icon: '🪄',
    image: '/examples/wizard-school.jpg',
    category: 'fantasy',
    prompt: `${identityLine} Place the pet in a magical wizard school with robe, old books, candles, floating sparkles and cozy fantasy atmosphere.`,
    variations: ['wizard classroom with floating candles', 'old library with magic books', 'castle hall with warm candlelight', 'spell lesson scene with glowing wand', 'cozy magical dormitory portrait']
  },
  {
    id: 'ski-adventure',
    name: 'Ski Adventure',
    desc: 'Snowy mountain action',
    icon: '⛷️',
    image: '/examples/ski-adventure.jpg',
    category: 'adventure',
    prompt: `${identityLine} Place the pet in a snowy ski adventure scene in the mountains, wearing tasteful winter gear, ski lodge or snowy slope background.`,
    variations: ['snowy mountain slope with ski goggles', 'cozy ski lodge terrace', 'alpine village background', 'winter action portrait in snow', 'sunny mountain panorama with ski gear']
  }
];

export function getStylePrompt(styleId: string) {
  return PET_STYLES.find((style) => style.id === styleId)?.prompt ?? PET_STYLES[0].prompt;
}

export function getSceneVariation(styleId: string, index: number) {
  const scene = PET_STYLES.find((style) => style.id === styleId) ?? PET_STYLES[0];
  return scene.variations[index % scene.variations.length];
}
