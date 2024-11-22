import { useState, useEffect } from 'react';
import { Fleet, Ship, Resource } from '@/types';

export function useFleet(
  ships: Ship[],
  setShips: React.Dispatch<React.SetStateAction<Ship[]>>,
  setResources: (resources: Resource) => void
) {
  const [fleets, setFleets] = useState<Fleet[]>([]);

  const dispatchFleet = (fleetData: Partial<Fleet>) => {
    if (!fleetData.ships || Object.values(fleetData.ships).every((q) => q === 0)) return;

    // Update ship quantities
    setShips((prev) =>
      prev.map((ship) => ({
        ...ship,
        quantity: ship.quantity - (fleetData.ships?.[ship.id] || 0),
      }))
    );

    // Update resources if it's a transport mission
    if (fleetData.mission === 'transport' && fleetData.resources) {
      setResources((prev) => ({
        ...prev,
        metal: prev.metal - (fleetData.resources?.metal || 0),
        crystal: prev.crystal - (fleetData.resources?.crystal || 0),
        deuterium: prev.deuterium - (fleetData.resources?.deuterium || 0),
        energy: prev.energy,
      }));
    }

    // Add new fleet
    const newFleet: Fleet = {
      id: `fleet-${Date.now()}`,
      ships: fleetData.ships,
      origin: fleetData.origin!,
      destination: fleetData.destination!,
      mission: fleetData.mission!,
      resources: fleetData.resources || { metal: 0, crystal: 0, deuterium: 0, energy: 0 },
      arrivalTime: fleetData.arrivalTime!,
      returnTime: fleetData.returnTime!,
      isReturning: false,
    };

    setFleets((prev) => [...prev, newFleet]);
  };

  useEffect(() => {
    const fleetInterval = setInterval(() => {
      setFleets((prev) => {
        const currentTime = Date.now();
        return prev.map((fleet) => {
          // Start return journey
          if (!fleet.isReturning && currentTime >= fleet.arrivalTime) {
            return { ...fleet, isReturning: true };
          }

          // Complete mission and return ships/resources
          if (fleet.isReturning && currentTime >= fleet.returnTime) {
            // Return ships to origin
            setShips((ships) =>
              ships.map((ship) => ({
                ...ship,
                quantity: ship.quantity + (fleet.ships[ship.id] || 0),
              }))
            );

            // Return resources if it was a transport mission
            if (fleet.mission === 'transport') {
              setResources((prev) => ({
                ...prev,
                metal: prev.metal + (fleet.resources.metal || 0),
                crystal: prev.crystal + (fleet.resources.crystal || 0),
                deuterium: prev.deuterium + (fleet.resources.deuterium || 0),
              }));
            }

            // Remove completed fleet
            return fleet;
          }

          return fleet;
        }).filter((fleet) => currentTime < fleet.returnTime);
      });
    }, 1000);

    return () => clearInterval(fleetInterval);
  }, [setShips, setResources]);

  return { fleets, dispatchFleet };
}