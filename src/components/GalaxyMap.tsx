import React from 'react';
import { Planet } from '../types';
import { Globe2, Star } from 'lucide-react';

interface GalaxyMapProps {
  currentGalaxy: number;
  currentSystem: number;
  planets: Planet[];
  onExplore: (galaxy: number, system: number) => void;
}

export function GalaxyMap({ currentGalaxy, currentSystem, planets, onExplore }: GalaxyMapProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onExplore(currentGalaxy - 1, currentSystem)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            ←
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800">
            <Globe2 className="w-5 h-5 text-blue-400" />
            <span>Galaxy {currentGalaxy}</span>
          </div>
          <button
            onClick={() => onExplore(currentGalaxy + 1, currentSystem)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            →
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onExplore(currentGalaxy, currentSystem - 1)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            ←
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>System {currentSystem}</span>
          </div>
          <button
            onClick={() => onExplore(currentGalaxy, currentSystem + 1)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-15 gap-4 max-w-6xl mx-auto">
        {Array.from({ length: 15 }, (_, i) => {
          const planet = planets.find(
            p =>
              p.position.galaxy === currentGalaxy &&
              p.position.system === currentSystem &&
              p.position.position === i + 1
          );

          return (
            <div
              key={i}
              className={`aspect-square rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                planet
                  ? 'bg-gray-800/80 hover:bg-gray-700/80 cursor-pointer'
                  : 'bg-gray-900/40'
              }`}
            >
              <div className="relative">
                {planet ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Globe2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40" />
                  </>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-800/40 flex items-center justify-center">
                    <span className="text-xs text-gray-500">{i + 1}</span>
                  </div>
                )}
              </div>
              {planet && (
                <div className="text-center">
                  <div className="text-xs font-medium text-blue-300">{planet.name}</div>
                  <div className="text-xs text-gray-400">Activity: High</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}