import React, { useState } from 'react';
import { Ship, Planet, PlanetPosition } from '@/types';
import { X, Send, AlertTriangle, Radar } from 'lucide-react';

interface ExpeditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: PlanetPosition;
  ships: Ship[];
  onDispatch: (fleet: Partial<Fleet>) => void;
  currentPlanet: Planet;
}

export function ExpeditionModal({
  isOpen,
  onClose,
  position,
  ships,
  onDispatch,
  currentPlanet,
}: ExpeditionModalProps) {
  const [selectedShips, setSelectedShips] = useState<{ [key: string]: number }>({});
  const [duration, setDuration] = useState(1); // Duration in hours

  const canDispatch = Object.values(selectedShips).some((quantity) => quantity > 0);

  const handleShipSelection = (shipId: string, quantity: number) => {
    setSelectedShips((prev) => ({
      ...prev,
      [shipId]: Math.max(0, Math.min(quantity, ships.find((s) => s.id === shipId)?.quantity || 0)),
    }));
  };

  const handleDispatch = () => {
    const travelTime = duration * 3600000; // Convert hours to milliseconds
    const fleet: Partial<Fleet> = {
      ships: selectedShips,
      origin: currentPlanet.position,
      destination: position,
      mission: 'explore',
      resources: { metal: 0, crystal: 0, deuterium: 0, energy: 0 },
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
      <div className="bg-gray-900/90 rounded-xl border border-purple-500/20 p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Radar className="w-6 h-6 text-purple-400" />
            Expedition
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-400">Target Position</h3>
            <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-center gap-4">
              <div className="text-center">
                <span className="text-sm text-gray-400">Galaxy</span>
                <p className="text-xl font-bold text-blue-400">{position.galaxy}</p>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-400">System</span>
                <p className="text-xl font-bold text-purple-400">{position.system}</p>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-400">Position</span>
                <p className="text-xl font-bold text-green-400">{position.position}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-400">Select Ships</h3>
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
            <h3 className="text-lg font-semibold mb-3 text-purple-400">Duration</h3>
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full bg-gray-800/50 rounded-lg px-4 py-2"
            >
              <option value={1}>1 Hour</option>
              <option value={2}>2 Hours</option>
              <option value={4}>4 Hours</option>
              <option value={8}>8 Hours</option>
              <option value={16}>16 Hours</option>
            </select>
          </div>

          {!canDispatch && (
            <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 rounded-lg p-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">Select at least one ship for the expedition.</span>
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
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Launch Expedition</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}