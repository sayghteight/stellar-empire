import { useState } from 'react';
import { Research, Resource } from '@/types';

export function useResearch(initialResearch: Research[], setResources: (resources: Resource) => void) {
  const [research, setResearch] = useState<Research[]>(initialResearch);

  const handleResearch = (researchId: string) => {
    const researchItem = research.find((r) => r.id === researchId);
    if (!researchItem) return;

    setResources((prev) => ({
      ...prev,
      metal: prev.metal - researchItem.cost.metal,
      crystal: prev.crystal - researchItem.cost.crystal,
      deuterium: prev.deuterium - researchItem.cost.deuterium,
    }));

    setResearch((prev) =>
      prev.map((r) =>
        r.id === researchId
          ? {
              ...r,
              level: r.level + 1,
              cost: {
                metal: Math.floor(r.cost.metal * 2),
                crystal: Math.floor(r.cost.crystal * 2),
                deuterium: Math.floor(r.cost.deuterium * 2),
                energy: 0,
              },
            }
          : r
      )
    );
  };

  const canAffordResearch = (research: Research, resources: Resource) => {
    return (
      resources.metal >= research.cost.metal &&
      resources.crystal >= research.cost.crystal &&
      resources.deuterium >= research.cost.deuterium
    );
  };

  const getCurrentLevels = () => {
    return research.reduce((acc, r) => ({ ...acc, [r.id]: r.level }), {});
  };

  return { research, handleResearch, canAffordResearch, getCurrentLevels };
}