import { useState } from 'react';
import { Planet } from '@/types';

export function useGalaxy(initialPlanets: Planet[]) {
  const [currentGalaxy, setCurrentGalaxy] = useState(1);
  const [currentSystem, setCurrentSystem] = useState(1);
  const [planets, setPlanets] = useState<Planet[]>(initialPlanets);

  const handleExplore = (galaxy: number, system: number) => {
    setCurrentGalaxy(Math.max(1, galaxy));
    setCurrentSystem(Math.max(1, system));
  };

  const colonizePlanet = (planetId: string) => {
    setPlanets((prev) =>
      prev.map((planet) =>
        planet.id === planetId
          ? {
              ...planet,
              isColonized: true,
              ownerId: 'player', // In a real game, this would be the actual player ID
            }
          : planet
      )
    );
  };

  return { currentGalaxy, currentSystem, planets, handleExplore, colonizePlanet };
}