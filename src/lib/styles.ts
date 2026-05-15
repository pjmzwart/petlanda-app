export const PET_STYLES = [
  {
    id: 'luxury-restaurant',
    name: 'Luxury Restaurant',
    desc: 'Fine dining, candlelight and a raised glass',
    icon: '🍷',
    prompt: 'Place the pet from the photo in a luxurious fine dining restaurant. The pet is sitting at a beautiful table with warm candlelight and elegant chandeliers, raising a glass of red wine in a funny but realistic way. Keep the pet clearly recognizable.'
  },
  {
    id: 'astronaut',
    name: 'Astronaut',
    desc: 'A space adventure on the moon',
    icon: '🚀',
    prompt: 'Place the pet from the photo in a real astronaut suit on the moon, with Earth visible in the background. Cinematic space lighting, realistic but magical. Keep the pet clearly recognizable.'
  },
  {
    id: 'king-throne',
    name: 'King on Throne',
    desc: 'Royal palace portrait',
    icon: '👑',
    prompt: 'Place the pet from the photo on a royal throne in a grand palace. Add a small crown and elegant royal details. Warm dramatic lighting. Keep the pet clearly recognizable.'
  },
  {
    id: 'beach-vacation',
    name: 'Beach Vacation',
    desc: 'Sunny tropical holiday scene',
    icon: '🏖️',
    prompt: 'Place the pet from the photo on a sunny tropical beach vacation with soft sand, blue sea, palm trees and warm sunlight. Happy vacation feeling. Keep the pet clearly recognizable.'
  },
  {
    id: 'cozy-christmas',
    name: 'Cozy Christmas',
    desc: 'Warm festive holiday scene',
    icon: '🎄',
    prompt: 'Place the pet from the photo in a cozy Christmas living room with warm fairy lights, a Christmas tree, soft blankets and festive decorations. Keep the pet clearly recognizable.'
  },
  {
    id: 'superhero',
    name: 'Superhero',
    desc: 'Hero pose on a city rooftop',
    icon: '🦸',
    prompt: 'Place the pet from the photo as a superhero on a cinematic city rooftop at night, wearing a tasteful cape, heroic lighting, movie poster feeling. Keep the pet clearly recognizable.'
  },
  {
    id: 'paris-cafe',
    name: 'Paris Café',
    desc: 'Charming French terrace',
    icon: '☕',
    prompt: 'Place the pet from the photo at a charming Paris café terrace with croissants, warm morning light, flowers and a soft view of the Eiffel Tower in the distance. Keep the pet clearly recognizable.'
  },
  {
    id: 'chef-kitchen',
    name: 'Chef in Kitchen',
    desc: 'Funny gourmet chef scene',
    icon: '👨‍🍳',
    prompt: 'Place the pet from the photo in a professional kitchen as a cute chef wearing a chef hat, surrounded by tasteful cooking details. Funny, premium and realistic. Keep the pet clearly recognizable.'
  },
  {
    id: 'yacht-adventure',
    name: 'Yacht Adventure',
    desc: 'Luxury yacht at sea',
    icon: '🛥️',
    prompt: 'Place the pet from the photo on a luxury yacht at sea with blue water, sunshine and elegant holiday atmosphere. Keep the pet clearly recognizable.'
  },
  {
    id: 'medieval-knight',
    name: 'Medieval Knight',
    desc: 'Castle, armor and fantasy light',
    icon: '⚔️',
    prompt: 'Place the pet from the photo as a noble medieval knight in front of a castle, wearing tasteful light armor, cinematic fantasy lighting. Keep the pet clearly recognizable.'
  },
  {
    id: 'business-meeting',
    name: 'Business Meeting',
    desc: 'Serious pet at the boardroom table',
    icon: '💼',
    prompt: 'Place the pet from the photo in a funny professional business meeting, sitting at a boardroom table with documents, laptop and serious executive atmosphere. Keep the pet clearly recognizable.'
  },
  {
    id: 'wizard-school',
    name: 'Wizard School',
    desc: 'Magical school portrait',
    icon: '🪄',
    prompt: 'Place the pet from the photo in a magical wizard school, with warm candlelight, old books, floating sparkles and a cozy fantasy atmosphere. Keep the pet clearly recognizable.'
  }
];

export function getStylePrompt(styleId: string) {
  return PET_STYLES.find((style) => style.id === styleId)?.prompt ?? PET_STYLES[0].prompt;
}
