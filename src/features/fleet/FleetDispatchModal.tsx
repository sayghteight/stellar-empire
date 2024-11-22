import React, { useState } from 'react';
import { Ship, Planet, Resource, Fleet, FleetMission } from '@/types';
import { X, Send, AlertTriangle } from 'lucide-react';

interface FleetDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  ships: Ship[];
  origin: Planet;
  destination: Planet;
  onDispatch: (fleet: Partial<Fleet>) => void;
  resources: Resource;
}

export function FleetDispatchModal({
  isOpen,
  onClose,
  ships,
  origin,
  destination,
  onDispatch,
  resources,
}: FleetDispatchModalProps) {
  const [selectedShips, setSelectedShips] = useState<{ [key: string]: number }>({});
  const [mission, setMission] = useState<FleetMission>('attack');
  const [cargoResources, setCargoResources] = useState<Resource>({
    metal: 0,
    crystal: 0,
    deuterium: 0,
    energy: 0,
  });

  const totalCapacity = Object.entries(selectedShips).reduce((acc, [shipId, quantity]) => {
    const ship = ships.find((s) => s.id === shipId);
    return acc + (ship?.capacity || 0) * quantity;
  }, 0);

  const totalResourcesSelected =
    cargoResources.metal + cargoResources.crystal + cargoResources.deuterium;

  const canDispatch =
    Object.values(selectedShips).some((quantity) => quantity > 0) &&
    (mission !== 'transport' || totalResourcesSelected <= totalCapacity);

  const handleShipSelection = (shipId: string, quantity: number) => {
    setSelectedShips((prev) => ({
      ...prev,
      [shipId]: Math.max(0, Math.min(quantity, ships.find((s) => s.id === shipId)?.quantity || 0)),
    }));
  };

  const handleResourceSelection = (resource: keyof Resource, amount: number) => {
    setCargoResources((prev) => ({
      ...prev,
      [resource]: Math.max(0, Math.min(amount, resources[resource])),
    }));
  };

  const calculateTravelTime = () => {
    // Simple distance calculation
    const dx = destination.position.galaxy - origin.position.galaxy;
    const dy = destination.position.system - origin.position.system;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Base travel time of 30 seconds plus distance factor
    const baseTime = 30000; // 30 seconds in milliseconds
    const travelTime = baseTime + (distance * 10000); // Add 10 seconds per distance unit
    
    return travelTime;
  };

  const handleDispatch = () => {
    const travelTime = calculateTravelTime();
    const fleet: Partial<Fleet> = {
      ships: selectedShips,
      origin: origin.position,
      destination: destination.position,
      mission,
      resources: cargoResources,
      arrivalTime: Date.now() + travelTime,
      returnTime: Date.now() + (travelTime * 2), // Double for round trip
      isReturning: false,
    };
    onDispatch(fleet);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 rounded-xl border border-blue-500/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Fleet Dispatch</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-400">Select Ships</h3>
            <div className="grid grid-cols-2 gap-4">
              {ships.map((ship) => (
                <div key={ship.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{ship.name}</span>
                    <span className="text-sm text-gray-400">Available: {ship.quantity}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={ship.quantity}
                    value={selectedShips[ship.id] || 0}
                    onChange={(e) => handleShipSelection(ship.id, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700/50 rounded px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-400">Mission</h3>
            <select
              value={mission}
              onChange={(e) => setMission(e.target.value as FleetMission)}
              className="w-full bg-gray-800/50 rounded-lg px-4 py-2"
            >
              <option value="attack">Attack</option>
              <option value="transport">Transport</option>
              <option value="colonize">Colonize</option>
              <option value="explore">Explore</option>
            </select>
          </div>

          {mission === 'transport' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Cargo</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Metal</label>
                  <input
                    type="number"
                    min="0"
                    max={resources.metal}
                    value={cargoResources.metal}
                    onChange={(e) => handleResourceSelection('metal', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-800/50 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Crystal</label>
                  <input
                    type="number"
                    min="0"
                    max={resources.crystal}
                    value={cargoResources.crystal}
                    onChange={(e) => handleResourceSelection('crystal', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-800/50 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Deuterium</label>
                  <input
                    type="number"
                    min="0"
                    max={resources.deuterium}
                    value={cargoResources.deuterium}
                    onChange={(e) => handleResourceSelection('deuterium', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-800/50 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>Cargo Capacity:</span>
                <span className={totalResourcesSelected > totalCapacity ? 'text-red-400' : 'text-green-400'}>
                  {totalResourcesSelected} / {totalCapacity}
                </span>
              </div>
            </div>
          )}

          {!canDispatch && (
            <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 rounded-lg p-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">
                {Object.values(selectedShips).every((q) => q === 0)
                  ? 'Select at least one ship to dispatch.'
                  : 'Ensure cargo doesn\'t exceed capacity.'}
              </span>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDispatch}
              disabled={!canDispatch}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                canDispatch
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Launch Fleet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}