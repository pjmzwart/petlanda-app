
import { sceneCards } from "./scene-cards";

export function SceneGrid({ selectedScene, setSelectedScene }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sceneCards.map((scene) => (
        <button
          key={scene.id}
          onClick={() => setSelectedScene(scene.id)}
          className={`rounded-2xl overflow-hidden bg-white text-slate-900 shadow-lg border-2 transition ${
            selectedScene === scene.id ? "border-purple-500 scale-[1.03]" : "border-white"
          }`}
        >
          <div className="h-28 bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-5xl">
            {/* Replace with generated example image later */}
            <span>{scene.exampleAnimal.includes("cat") ? "🐱" : scene.exampleAnimal.includes("rabbit") ? "🐰" : scene.exampleAnimal.includes("hamster") ? "🐹" : scene.exampleAnimal.includes("owl") ? "🦉" : "🐶"}</span>
          </div>

          <div className="p-3">
            <div className="font-extrabold text-sm leading-tight">{scene.title}</div>
            <div className="text-xs text-slate-600 mt-1">{scene.subtitle}</div>
            <div className="text-[10px] text-purple-700 mt-2 italic">
              Example: {scene.previewIdea}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
