import { useState } from 'react';
import { Defense, Resource } from '@/types';

export function useDefense(initialDefenses: Defense[], setResources: (resources: Resource) => void) {
  const [defenses, setDefenses] = useState<Defense[]>(initialDefenses);

  const handleBuildDefense = (defenseId: string, quantity: number) => {
    const defense = defenses.find((d) => d.id === defenseId);
    if (!defense) return;

    const totalCost = {
      metal: defense.cost.metal * quantity,
      crystal: defense.cost.crystal * quantity,
      deuterium: defense.cost.deuterium * quantity,
      energy: 0,
    };

    setResources((prev) => ({
      ...prev,
      metal: prev.metal - totalCost.metal,
      crystal: prev.crystal - totalCost.crystal,
      deuterium: prev.deuterium - totalCost.deuterium,
    }));

    setDefenses((prev) =>
      prev.map((d) =>
        d.id === defenseId
          ? {
              ...d,
              quantity: d.quantity + quantity,
            }
          : d
      )
    );
  };

  const canAffordDefense = (defense: Defense, resources: Resource) => {
    return (
      resources.metal >= defense.cost.metal &&
      resources.crystal >= defense.cost.crystal &&
      resources.deuterium >= defense.cost.deuterium
    );
  };

  return { defenses, handleBuildDefense, canAffordDefense };
}