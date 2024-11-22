import { Ship, Resource } from '@/types';

export function useShips(
  ships: Ship[],
  setShips: React.Dispatch<React.SetStateAction<Ship[]>>,
  setResources: (resources: Resource) => void
) {
  const handleBuildShip = (shipId: string, quantity: number) => {
    const ship = ships.find((s) => s.id === shipId);
    if (!ship) return;

    const totalCost = {
      metal: ship.cost.metal * quantity,
      crystal: ship.cost.crystal * quantity,
      deuterium: ship.cost.deuterium * quantity,
      energy: 0,
    };

    setResources((prev) => ({
      ...prev,
      metal: prev.metal - totalCost.metal,
      crystal: prev.crystal - totalCost.crystal,
      deuterium: prev.deuterium - totalCost.deuterium,
    }));

    setShips((prev) =>
      prev.map((s) =>
        s.id === shipId
          ? {
              ...s,
              quantity: s.quantity + quantity,
            }
          : s
      )
    );
  };

  const canAffordShip = (ship: Ship, resources: Resource) => {
    return (
      resources.metal >= ship.cost.metal &&
      resources.crystal >= ship.cost.crystal &&
      resources.deuterium >= ship.cost.deuterium
    );
  };

  return { handleBuildShip, canAffordShip };
}