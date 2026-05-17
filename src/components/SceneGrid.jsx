
export const scenes = [
  { id: "beach", title: "Beach Vacation", image: "/scene-previews/beach.jpg" },
  { id: "superhero", title: "Superhero Adventure", image: "/scene-previews/superhero.jpg" },
  { id: "royal", title: "Royal Throne", image: "/scene-previews/royal.jpg" },
  { id: "space", title: "Space Explorer", image: "/scene-previews/space.jpg" },
];

export default function SceneGrid({ selectedScene, setSelectedScene }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {scenes.map((scene) => (
        <button
          key={scene.id}
          onClick={() => setSelectedScene(scene.id)}
          className="overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700"
        >
          <img
            src={scene.image}
            alt={scene.title}
            className="h-40 w-full object-cover"
          />

          <div className="p-3 text-white font-bold text-center">
            {scene.title}
          </div>
        </button>
      ))}
    </div>
  );
}
