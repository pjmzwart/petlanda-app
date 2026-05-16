
export const sceneCards = [
  {
    id: "luxury_restaurant",
    title: "Luxury Restaurant",
    subtitle: "fine dining, funny waiters and VIP dinners",
    exampleAnimal: "fancy poodle",
    previewIdea: "a poodle in a tuxedo sitting at a candlelit VIP table while a waiter brings a tiny steak"
  },
  {
    id: "beach_vacation",
    title: "Beach Vacation",
    subtitle: "surfboards, cocktails and tropical chaos",
    exampleAnimal: "cool cat",
    previewIdea: "a cat wearing sunglasses on a surfboard with waves splashing behind it"
  },
  {
    id: "space_explorer",
    title: "Space Explorer",
    subtitle: "zero gravity, planets and alien adventures",
    exampleAnimal: "curious rabbit",
    previewIdea: "a rabbit floating in zero gravity inside a spaceship with carrots drifting around"
  },
  {
    id: "royal_throne",
    title: "Royal Throne",
    subtitle: "castles, crowns and ridiculous royal portraits",
    exampleAnimal: "majestic hamster",
    previewIdea: "a hamster wearing a tiny crown on a giant golden throne in a royal hall"
  },
  {
    id: "cozy_christmas",
    title: "Cozy Christmas",
    subtitle: "trees, gifts and festive disasters",
    exampleAnimal: "playful puppy",
    previewIdea: "a puppy tangled in Christmas lights next to a huge decorated tree"
  },
  {
    id: "superhero_adventure",
    title: "Superhero Adventure",
    subtitle: "flying, saving cities and dramatic capes",
    exampleAnimal: "heroic black cat",
    previewIdea: "a black cat flying through the air with one paw forward and a red cape waving"
  },
  {
    id: "paris_cafe",
    title: "Paris Café",
    subtitle: "croissants, terraces and Eiffel Tower views",
    exampleAnimal: "stylish dachshund",
    previewIdea: "a dachshund wearing a beret eating a croissant at a tiny Paris café table"
  },
  {
    id: "master_chef",
    title: "Master Chef",
    subtitle: "kitchens, flour explosions and tiny chef hats",
    exampleAnimal: "serious bulldog",
    previewIdea: "a bulldog in a chef hat standing in a messy kitchen with flour everywhere"
  },
  {
    id: "luxury_yacht",
    title: "Luxury Yacht",
    subtitle: "sea, sunglasses and billionaire pet energy",
    exampleAnimal: "golden retriever",
    previewIdea: "a golden retriever wearing sunglasses on a yacht with wind blowing through its fur"
  },
  {
    id: "wizard_academy",
    title: "Wizard Academy",
    subtitle: "magic libraries, spells and enchanted castles",
    exampleAnimal: "wise owl",
    previewIdea: "an owl casting a glowing spell inside a magical library full of floating books"
  },
  {
    id: "business_meeting",
    title: "Business Meeting",
    subtitle: "CEO portraits, boardrooms and serious pets",
    exampleAnimal: "important guinea pig",
    previewIdea: "a guinea pig as CEO at a boardroom table with charts and tiny glasses"
  },
  {
    id: "medieval_knight",
    title: "Medieval Knight",
    subtitle: "armor, castles and epic fantasy battles",
    exampleAnimal: "brave ferret",
    previewIdea: "a ferret wearing tiny armor riding a toy horse toward a castle gate"
  }
];

export function buildSceneCardPrompt(card) {
  return `
  Create a fun colorful example image for a pet photo app scene card.

  Scene: ${card.title}
  Animal example: ${card.exampleAnimal}
  Funny concept: ${card.previewIdea}

  Requirements:
  - use a different animal per card
  - make it funny and instantly understandable
  - bright, colorful, cheerful lighting
  - clear subject
  - premium app icon/card style
  - no dark images
  - no boring centered passport portrait
  - playful commercial look
  `;
}
