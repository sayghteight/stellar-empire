import { useState } from 'react';
import { Building, Resource } from '@/types';

export function useBuildings(initialBuildings: Building[], setResources: (resources: Resource) => void) {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);

  const handleUpgradeBuilding = (buildingId: string) => {
    const building = buildings.find((b) => b.id === buildingId);
    if (!building) return;

    setResources((prev) => ({
      ...prev,
      metal: prev.metal - building.cost.metal,
      crystal: prev.crystal - building.cost.crystal,
      deuterium: prev.deuterium - building.cost.deuterium,
    }));

    setBuildings((prev) =>
      prev.map((b) =>
        b.id === buildingId
          ? {
              ...b,
              level: b.level + 1,
              cost: {
                metal: Math.floor(b.cost.metal * 1.5),
                crystal: Math.floor(b.cost.crystal * 1.5),
                deuterium: Math.floor(b.cost.deuterium * 1.5),
                energy: Math.floor(b.cost.energy * 1.2),
              },
              production: b.production
                ? {
                    metal: b.production.metal ? Math.floor(b.production.metal * 1.1) : 0,
                    crystal: b.production.crystal ? Math.floor(b.production.crystal * 1.1) : 0,
                    deuterium: b.production.deuterium ? Math.floor(b.production.deuterium * 1.1) : 0,
                    energy: b.production.energy ? Math.floor(b.production.energy * 1.1) : 0,
                  }
                : undefined,
            }
          : b
      )
    );
  };

  const canAffordBuilding = (building: Building, resources: Resource) => {
    return (
      resources.metal >= building.cost.metal &&
      resources.crystal >= building.cost.crystal &&
      resources.deuterium >= building.cost.deuterium
    );
  };

  return { buildings, handleUpgradeBuilding, canAffordBuilding };
}