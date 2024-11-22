import React from 'react';
import { Ship } from '@/types';
import { Rocket, Shield, Truck, Wind } from 'lucide-react';

interface ShipCardProps {
  ship: Ship;
  onBuild: (shipId: string, quantity: number) => void;
  canAfford: boolean;
}

export function ShipCard({ ship, onBuild, canAfford }: ShipCardProps) {
  const [buildQuantity, setBuildQuantity] = React.useState(1);

  return (
    <div className="building-card rounded-xl p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{ship.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm px-3 py-1 rounded-full bg-red-500/20 text-red-300">
              Quantity: {ship.quantity}
            </span>
          </div>
        </div>
        <Rocket className="w-6 h-6 text-red-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <h4 className="text-xs text-gray-400 mb-2">Cost per Unit</h4>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span>Metal</span>
              <span className="text-blue-400">{ship.cost.metal}</span>
            </p>
            <p className="flex justify-between">
              <span>Crystal</span>
              <span className="text-purple-400">{ship.cost.crystal}</span>
            </p>
            <p className="flex justify-between">
              <span>Deuterium</span>
              <span className="text-teal-400">{ship.cost.deuterium}</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-3">
          <h4 className="text-xs text-gray-400 mb-2">Specifications</h4>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Attack
              </span>
              <span className="text-red-400">{ship.attack}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Defense
              </span>
              <span className="text-blue-400">{ship.defense}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3" /> Cargo
              </span>
              <span className="text-yellow-400">{ship.capacity}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Wind className="w-3 h-3" /> Speed
              </span>
              <span className="text-green-400">{ship.speed}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          min="1"
          value={buildQuantity}
          onChange={(e) => setBuildQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 w-24 text-sm"
        />
        <button
          onClick={() => onBuild(ship.id, buildQuantity)}
          disabled={!canAfford}
          className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            canAfford
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25'
              : 'bg-gray-800 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>Build Ships</span>
        </button>
      </div>
    </div>
  );
}