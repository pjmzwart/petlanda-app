export type SceneId =
  | 'restaurant'
  | 'beach'
  | 'space'
  | 'royal'
  | 'christmas'
  | 'superhero'
  | 'paris'
  | 'chef'
  | 'yacht'
  | 'wizard'
  | 'business'
  | 'knight';

export type Scene = {
  id: SceneId;
  title: string;
  subtitle: string;
  emoji: string;
  sampleAnimal: string;
  sampleBg: string;
  example: string;
  image: string;
  ideas: string[];
};

export const scenes: Scene[] = [
  {
    id: 'restaurant',
    title: 'Luxury Restaurant',
    subtitle: 'VIP dinners, funny waiters and fancy food',
    emoji: '🍷',
    sampleAnimal: '🐩',
    sampleBg: 'linear-gradient(135deg,#27120f,#7c2d12 45%,#f59e0b)',
    example: 'A poodle in a tuxedo at a candlelit VIP table.',
    image: '/scene-previews/restaurant.jpg',
    ideas: [
      'uploaded pet sitting like a VIP guest at a candlelit fine dining table while a waiter presents a tiny gourmet plate',
      'uploaded pet standing proudly on a red restaurant chair in a luxury rooftop restaurant with city lights behind',
      'uploaded pet with a tiny bow tie looking at an absurdly fancy dessert tower in a Michelin-style restaurant',
      'uploaded pet causing a funny spaghetti disaster in an elegant Italian restaurant, bright and playful',
      'uploaded pet as the star guest at a chef table with copper pans, flowers and luxury plates around it'
    ]
  },
  {
    id: 'beach',
    title: 'Beach Vacation',
    subtitle: 'surfboards, cocktails and tropical chaos',
    emoji: '🏖️',
    sampleAnimal: '🐱',
    sampleBg: 'linear-gradient(135deg,#0891b2,#38bdf8 45%,#fde68a)',
    example: 'A cat with sunglasses surfing a tiny wave.',
    image: '/scene-previews/beach.jpg',
    ideas: [
      'uploaded pet riding a surfboard on a bright tropical wave with sunglasses and splashing water',
      'uploaded pet relaxing like a celebrity on a beach chair with a coconut drink and palm trees',
      'uploaded pet running through shallow sea water with beach ball and joyful motion',
      'uploaded pet on a luxury resort pool float with colorful umbrellas and turquoise water',
      'uploaded pet standing on a yacht pier with wind in fur, bright Mediterranean holiday scene'
    ]
  },
  {
    id: 'space',
    title: 'Space Explorer',
    subtitle: 'zero gravity, rockets and alien planets',
    emoji: '🚀',
    sampleAnimal: '🐰',
    sampleBg: 'linear-gradient(135deg,#020617,#1d4ed8 50%,#93c5fd)',
    example: 'A rabbit floating in zero gravity with carrots around it.',
    image: '/scene-previews/space.jpg',
    ideas: [
      'uploaded pet floating in zero gravity inside a spaceship, toys and snacks drifting around, Earth visible through the window',
      'uploaded pet wearing a cute space helmet jumping on the moon with Earth huge and bright in the background',
      'uploaded pet pressing glowing buttons in a spaceship cockpit, funny serious astronaut mood',
      'uploaded pet exploring a colorful alien planet with strange plants and friendly little aliens in the distance',
      'uploaded pet flying past a rocket launch in a bright cinematic space adventure scene'
    ]
  },
  {
    id: 'royal',
    title: 'Royal Throne',
    subtitle: 'castles, crowns and royal nonsense',
    emoji: '👑',
    sampleAnimal: '🐹',
    sampleBg: 'linear-gradient(135deg,#3b2300,#92400e 55%,#facc15)',
    example: 'A hamster with a tiny crown on a giant golden throne.',
    image: '/scene-previews/royal.jpg',
    ideas: [
      'uploaded pet wearing a tiny crown while standing proudly on a palace balcony with a fantasy castle behind',
      'uploaded pet walking through a huge medieval castle hall with royal banners and bright golden light',
      'uploaded pet lying dramatically on a red velvet royal carpet like a spoiled king or queen',
      'uploaded pet painted as a funny renaissance royal portrait with crown, jewels and palace curtains',
      'uploaded pet entering a knight banquet hall with candles, armor and servants blurred in the background'
    ]
  },
  {
    id: 'christmas',
    title: 'Cozy Christmas',
    subtitle: 'trees, gifts and festive disasters',
    emoji: '🎄',
    sampleAnimal: '🐶',
    sampleBg: 'linear-gradient(135deg,#14532d,#991b1b 50%,#fbbf24)',
    example: 'A puppy tangled in Christmas lights.',
    image: '/scene-previews/christmas.jpg',
    ideas: [
      'uploaded pet tangled in colorful Christmas lights next to a huge decorated tree, funny and bright',
      'uploaded pet popping out of a giant gift box in a cozy Christmas room with fireplace',
      'uploaded pet wearing a tiny festive scarf at a Christmas dinner table with candles',
      'uploaded pet running through a snowy Christmas village with warm market lights',
      'uploaded pet sitting in Santa workshop surrounded by toys and magical golden light'
    ]
  },
  {
    id: 'superhero',
    title: 'Superhero Adventure',
    subtitle: 'flying, saving cities and dramatic capes',
    emoji: '🦸',
    sampleAnimal: '🐈‍⬛',
    sampleBg: 'linear-gradient(135deg,#172554,#dc2626 58%,#facc15)',
    example: 'A black cat flying over the city with one paw forward.',
    image: '/scene-previews/superhero.jpg',
    ideas: [
      'uploaded pet flying through the air like a superhero with one paw forward, red cape waving strongly in the wind, bright city below',
      'uploaded pet standing heroically on back legs on top of a skyscraper, cape blowing, proud action movie poster pose',
      'uploaded pet swinging through jungle vines like an action hero with cape trailing behind, funny dynamic adventure',
      'uploaded pet jumping between rooftops in a colorful neon city, mid-air action pose and superhero energy',
      'uploaded pet landing from the sky in a superhero landing pose with dust, light beams and dramatic motion'
    ]
  },
  {
    id: 'paris',
    title: 'Paris Café',
    subtitle: 'croissants, terraces and Eiffel Tower views',
    emoji: '☕',
    sampleAnimal: '🐕',
    sampleBg: 'linear-gradient(135deg,#4c1d95,#be185d 55%,#f9a8d4)',
    example: 'A dachshund with a beret eating a croissant.',
    image: '/scene-previews/paris.jpg',
    ideas: [
      'uploaded pet wearing a tiny beret at a Paris café table with croissant and Eiffel Tower behind',
      'uploaded pet proudly guarding a plate of macarons on a sunny Paris terrace',
      'uploaded pet looking out from a rainy Paris café window with warm lights and flowers',
      'uploaded pet walking past a romantic Paris street café with baguette basket and cobblestones',
      'uploaded pet as a funny little artist at Montmartre with paintbrushes and café lights'
    ]
  },
  {
    id: 'chef',
    title: 'Master Chef',
    subtitle: 'kitchens, flour explosions and tiny chef hats',
    emoji: '👨‍🍳',
    sampleAnimal: '🐦',
    sampleBg: 'linear-gradient(135deg,#111827,#475569 52%,#fb923c)',
    example: 'A bulldog in a chef hat after a flour explosion.',
    image: '/scene-previews/chef.jpg',
    ideas: [
      'uploaded pet wearing a chef hat in a bright kitchen while flour explodes everywhere, funny cooking chaos',
      'uploaded pet proudly presenting a tiny gourmet meal on a silver plate like a master chef',
      'uploaded pet in an Italian kitchen surrounded by flying pasta, tomatoes and basil',
      'uploaded pet tasting soup with a very serious chef expression in a professional kitchen',
      'uploaded pet standing on a safe kitchen stool with vegetables, pans and warm studio lights'
    ]
  },
  {
    id: 'yacht',
    title: 'Luxury Yacht',
    subtitle: 'sea, sunglasses and billionaire pet energy',
    emoji: '🛥️',
    sampleAnimal: '🐕',
    sampleBg: 'linear-gradient(135deg,#075985,#0ea5e9 52%,#f8fafc)',
    example: 'A retriever with sunglasses on a yacht deck.',
    image: '/scene-previews/yacht.jpg',
    ideas: [
      'uploaded pet wearing sunglasses on a luxury yacht deck with wind in fur and blue sea behind',
      'uploaded pet standing at the yacht steering wheel like a tiny captain in bright sunlight',
      'uploaded pet relaxing on a yacht lounge chair with tropical coastline and sparkling water',
      'uploaded pet dramatically looking over the bow of a yacht during golden sunset',
      'uploaded pet arriving at a stylish marina with yachts, palm trees and celebrity holiday mood'
    ]
  },
  {
    id: 'wizard',
    title: 'Wizard Academy',
    subtitle: 'spells, magic libraries and floating books',
    emoji: '🪄',
    sampleAnimal: '🦉',
    sampleBg: 'linear-gradient(135deg,#2e1065,#7e22ce 55%,#fbbf24)',
    example: 'An owl casting a spell in a floating-book library.',
    image: '/scene-previews/wizard.jpg',
    ideas: [
      'uploaded pet casting a glowing spell in a magical library with floating books and candles',
      'uploaded pet wearing a tiny wizard hat in an enchanted castle classroom with potions',
      'uploaded pet accidentally creating magical sparkles and floating objects in a wizard study',
      'uploaded pet walking through a grand fantasy academy hall with banners and warm light',
      'uploaded pet beside a giant spell book with glowing runes and playful magical atmosphere'
    ]
  },
  {
    id: 'business',
    title: 'Business Meeting',
    subtitle: 'CEO portraits, boardrooms and serious pets',
    emoji: '💼',
    sampleAnimal: '🐹',
    sampleBg: 'linear-gradient(135deg,#111827,#334155 50%,#38bdf8)',
    example: 'A guinea pig as CEO with charts and tiny glasses.',
    image: '/scene-previews/business.jpg',
    ideas: [
      'uploaded pet as CEO at a boardroom table with charts, laptop and very serious executive mood',
      'uploaded pet giving a funny business presentation on a giant screen with rising graph',
      'uploaded pet sitting in an oversized office chair like the boss with skyline behind',
      'uploaded pet signing important papers with tiny glasses and dramatic corporate lighting',
      'uploaded pet in a power pose in a modern office lounge with coffee and laptop'
    ]
  },
  {
    id: 'knight',
    title: 'Medieval Knight',
    subtitle: 'armor, castles and epic fantasy scenes',
    emoji: '⚔️',
    sampleAnimal: '🦦',
    sampleBg: 'linear-gradient(135deg,#1f2937,#64748b 50%,#cbd5e1)',
    example: 'A ferret in tiny armor riding toward a castle gate.',
    image: '/scene-previews/knight.jpg',
    ideas: [
      'uploaded pet wearing tiny knight armor standing before a huge castle gate, epic but funny',
      'uploaded pet charging heroically across a medieval tournament field with banners flying',
      'uploaded pet in a stone castle hall with armor, torchlight and fantasy adventure mood',
      'uploaded pet looking brave beside a friendly dragon silhouette in a bright fantasy landscape',
      'uploaded pet as a royal knight portrait with shield, cape and castle window light'
    ]
  }
];

export function getScene(id: string) {
  return scenes.find((s) => s.id === id) || scenes[0];
}

function pick<T>(arr: T[], index = 0, offset = 0): T {
  return arr[(index + offset) % arr.length];
}

export function buildPrompt(sceneId: string, index = 0) {
  const scene = getScene(sceneId);
  const idea = pick(scene.ideas, index, Math.floor(Math.random() * scene.ideas.length));

  const cameraAngles = [
    'cinematic low angle, not centered like a passport photo',
    'wide action shot with the full body visible',
    'dynamic side angle with motion and environment interaction',
    'movie-poster composition with dramatic perspective',
    'playful editorial photography composition'
  ];

  const lighting = [
    'bright cheerful daylight, visible face and clear eyes',
    'high exposure cinematic lighting, no dark shadows on the pet',
    'vibrant colorful commercial lighting',
    'soft premium studio-style light mixed with bright background',
    'warm cinematic light but still bright and readable'
  ];

  return `
Use the uploaded pet photo as the identity reference, but create a NEW funny scene and NEW pose.

SCENE IDEA:
${idea}.

IDENTITY RULES:
Keep the same recognizable uploaded animal identity: same species, same breed/type, same face, same eyes, same nose/beak, same ears, same fur/feather color and markings. Do not replace it with a generic dog or cat. Do not change the pet into a human.

POSE RULES:
The pose MUST be different from the uploaded photo when the scene asks for action. It may stand, jump, fly, float, run, lie down, swing, look sideways or interact with objects. Do NOT preserve the original sitting pose unless the chosen idea specifically requires sitting.

COMPOSITION RULES:
Every preview must feel like a different photo: different body position, different camera angle, different framing, different background and different interaction with the environment.

CAMERA:
${pick(cameraAngles, index, Math.floor(Math.random() * cameraAngles.length))}.

LIGHTING:
${pick(lighting, index, Math.floor(Math.random() * lighting.length))}.

QUALITY:
Premium photorealistic pet art, sharp eyes, detailed fur, bright image, playful commercial look, funny but realistic.

NEGATIVE INSTRUCTIONS:
Avoid static seated portraits. Avoid repeated same pose. Avoid centered passport photo. Avoid dark image. Avoid identical background. Avoid only changing the background. Avoid hiding the pet. Avoid blurry face.
`;
}
