
export type SceneId='restaurant'|'beach'|'space'|'royal'|'christmas'|'superhero'|'paris'|'chef'|'yacht'|'wizard'|'business'|'knight';
export type Scene={id:SceneId;title:string;subtitle:string;emoji:string;sampleAnimal:string;sampleBg:string;variations:string[]};

export const scenes:Scene[]=[
{id:'restaurant',title:'Luxury Restaurant',subtitle:'fine dining, cafés and playful diners',emoji:'🍷',sampleAnimal:'🐕‍🦺',sampleBg:'linear-gradient(135deg,#27120f,#7c2d12 45%,#f59e0b)',variations:[
'dark cozy candlelight fine dining restaurant with warm chandeliers','bright cheerful brunch restaurant with fresh flowers and sunlight','playful American burger diner with fries and colorful neon signs','elegant piano dinner restaurant with a grand piano in the background','romantic Parisian bistro terrace with warm outdoor lights','retro diner booth with milkshake and fries','luxury rooftop restaurant at night with city lights','Mediterranean beach restaurant with sea view','modern sushi restaurant with stylish ambient lighting','Michelin-style fine dining table with white tablecloth and candles']},
{id:'beach',title:'Beach Vacation',subtitle:'tropical, coastal and sunny holiday scenes',emoji:'🏖️',sampleAnimal:'🐶',sampleBg:'linear-gradient(135deg,#0891b2,#38bdf8 45%,#fde68a)',variations:[
'tropical palm beach with turquoise water and white sand','luxury beach club with sunbeds and pastel umbrellas','Mediterranean rocky coastline with blue sea','sunset beach walk with golden light and waves','cheerful beach café terrace near the sea','surf beach with colorful surfboards','yacht harbor near the beach with sunny reflections','Maldives-style crystal clear beach and resort vibe','beach picnic with summer fruits','resort pool area next to the beach with palm trees']},
{id:'space',title:'Space Explorer',subtitle:'moon, spaceship and cosmic adventures',emoji:'🚀',sampleAnimal:'🐈',sampleBg:'linear-gradient(135deg,#020617,#1d4ed8 50%,#93c5fd)',variations:[
'spaceship cockpit with Earth visible through the window','moon surface with Earth glowing in the sky','futuristic space station with soft blue lights','Mars colony with red planet landscape','cyberpunk space city with neon reflections','astronaut scene near a rocket launch platform','hologram control room with stars outside','asteroid mining station with cinematic lighting']},
{id:'royal',title:'Royal Throne',subtitle:'palaces, crowns and majestic portraits',emoji:'👑',sampleAnimal:'🐕',sampleBg:'linear-gradient(135deg,#3b2300,#92400e 55%,#facc15)',variations:[
'golden palace throne room with royal crown','medieval castle throne hall with torchlight','renaissance royal portrait room with curtains','fantasy king hall with chandeliers','dark gothic throne room with regal atmosphere','snowy royal castle interior with blue-gold tones','Roman emperor palace with marble columns','fairytale queen throne room with magical sparkles']},
{id:'christmas',title:'Cozy Christmas',subtitle:'warm winter, trees and festive dinners',emoji:'🎄',sampleAnimal:'🐹',sampleBg:'linear-gradient(135deg,#14532d,#991b1b 50%,#fbbf24)',variations:[
'cozy Christmas living room with fireplace and tree','snowy village Christmas street with warm lights','festive Christmas dinner table with candles','Santa workshop with toys and magical light','winter cabin with blankets and fireplace','Christmas market with fairy lights and snow']},
{id:'superhero',title:'Superhero Adventure',subtitle:'comic posters and city action',emoji:'🦸',sampleAnimal:'🐺',sampleBg:'linear-gradient(135deg,#172554,#dc2626 58%,#facc15)',variations:[
'superhero rooftop above glowing city skyline','cinematic superhero poster with cape','comic book action scene with colorful energy','futuristic city battle scene','lightning storm superhero pose','superhero landing pose in city street']},
{id:'paris',title:'Paris Café',subtitle:'terraces, croissants and Eiffel Tower views',emoji:'☕',sampleAnimal:'🐩',sampleBg:'linear-gradient(135deg,#4c1d95,#be185d 55%,#f9a8d4)',variations:[
'sunny Paris café terrace with croissant and coffee','romantic evening café near the Eiffel Tower','French bistro street with flowers','cozy indoor Parisian café with vintage posters','Montmartre street café with artistic atmosphere','luxury café table with macarons']},
{id:'chef',title:'Master Chef',subtitle:'kitchens, cooking and culinary fun',emoji:'👨‍🍳',sampleAnimal:'🐦',sampleBg:'linear-gradient(135deg,#111827,#475569 52%,#fb923c)',variations:[
'professional kitchen with chef hat and vegetables','cozy home kitchen with baking ingredients','Italian kitchen with pasta and tomatoes','luxury restaurant kitchen with stainless steel','cute bakery scene with pastries','cooking show studio with bright lights']},
{id:'yacht',title:'Luxury Yacht',subtitle:'sea, harbor and stylish boat adventures',emoji:'⛵',sampleAnimal:'🐈',sampleBg:'linear-gradient(135deg,#075985,#0ea5e9 52%,#f8fafc)',variations:[
'luxury yacht deck in Mediterranean sun','stylish marina with yachts and blue water','sunset boat trip with golden reflections','captain scene at the yacht steering wheel','beach harbor lunch on a boat','tropical island yacht adventure']},
{id:'wizard',title:'Wizard Academy',subtitle:'magic libraries and enchanted castles',emoji:'🪄',sampleAnimal:'🐈‍⬛',sampleBg:'linear-gradient(135deg,#2e1065,#7e22ce 55%,#fbbf24)',variations:[
'magical wizard school library with floating candles','enchanted castle classroom with spell books','cozy magic study with glowing potions','grand hall with fantasy banners','wizard tower at night with stars outside','magical train station with whimsical atmosphere']},
{id:'business',title:'Business Meeting',subtitle:'office, boardroom and CEO portraits',emoji:'💼',sampleAnimal:'🐇',sampleBg:'linear-gradient(135deg,#111827,#334155 50%,#38bdf8)',variations:[
'modern boardroom meeting with city skyline','CEO office portrait with elegant desk','business presentation room with charts','stylish coworking space with laptop and coffee','luxury office lounge with warm lighting']},
{id:'knight',title:'Medieval Knight',subtitle:'castles, armor and epic fantasy scenes',emoji:'⚔️',sampleAnimal:'🐕',sampleBg:'linear-gradient(135deg,#1f2937,#64748b 50%,#cbd5e1)',variations:[
'medieval castle courtyard with armor and banners','epic knight portrait in a fantasy kingdom','stone castle hall with torchlight','dragon fantasy landscape with dramatic sky','royal tournament field with flags']}
];

export function getScene(id:string){return scenes.find(s=>s.id===id)||scenes[0]}
export function pickVariation(sceneId:string,index=0){const s=getScene(sceneId);const salt=Date.now()+Math.floor(Math.random()*100000)+index*997;return s.variations[salt%s.variations.length]}
export function buildPrompt(sceneId:string,index=0){
 const s=getScene(sceneId); const variation=pickVariation(sceneId,index);
 const angles=['different camera angle, natural candid composition','close portrait with cinematic background depth','wide environmental shot, pet clearly visible','playful editorial photography composition','premium lifestyle photography angle','slightly low camera angle, heroic but natural'];
 const moods=['warm cinematic lighting','bright cheerful daylight','soft premium editorial light','cozy atmospheric glow','colorful joyful mood','luxury professional photography look'];
 const angle=angles[(Date.now()+index*13+Math.floor(Math.random()*99))%angles.length];
 const mood=moods[(Date.now()+index*17+Math.floor(Math.random()*99))%moods.length];
 return `The exact pet from the uploaded photo is placed in this scene: ${variation}.
Keep the same pet identity, same face, same eyes, same expression, same fur color, same markings and recognizable personality.
Do not turn the pet into a different animal or breed. Create a new composition, not a repeated background.
${angle}. ${mood}. Professional high-quality realistic image. Scene category: ${s.title}.`;
}
