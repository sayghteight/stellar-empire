import { useState, useEffect } from 'react';
import { Resource, Building } from '@/types';

export function useResources(buildings: Building[]) {
  const [resources, setResources] = useState<Resource>({
    metal: 500,
    crystal: 300,
    deuterium: 100,
    energy: 0,
  });

  useEffect(() => {
    const productionInterval = setInterval(() => {
      setResources((prev) => {
        const production = buildings.reduce(
          (acc, building) => {
            if (building.production) {
              return {
                metal: acc.metal + (building.production.metal || 0) / 60,
                crystal: acc.crystal + (building.production.crystal || 0) / 60,
                deuterium: acc.deuterium + (building.production.deuterium || 0) / 60,
                energy: acc.energy + (building.production.energy || 0) / 60,
              };
            }
            return acc;
          },
          { ...prev }
        );
        return production;
      });
    }, 1000);

    return () => clearInterval(productionInterval);
  }, [buildings]);

  return { resources, setResources };
}