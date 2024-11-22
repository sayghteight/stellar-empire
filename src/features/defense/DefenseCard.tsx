import React from 'react';
import { Defense } from '@/types';
import { Shield, Lock, Check } from 'lucide-react';

interface DefenseCardProps {
  defense: Defense;
  onBuild: (defenseId: string, quantity: number) => void;
  canAfford: boolean;
  currentLevels: { [key: string]: number };
}

export function DefenseCard({ defense, onBuild, canAfford, currentLevels }: DefenseCardProps) {
  const [buildQuantity, setBuildQuantity] = React.useState(1);

  const meetsRequirements = Object.entries(defense.requirements).every(
    ([reqId, reqLevel]) => (currentLevels[reqId] || 0) >= reqLevel
  );

  return (
    <div className="building-card rounded-xl p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{defense.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
              Quantity: {defense.quantity}
            </span>
          </div>
        </div>
        <Shield className="w-6 h-6 text-yellow-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <h4 className="text-xs text-gray-400 mb-2">Cost per Unit</h4>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span>Metal</span>
              <span className="text-blue-400">{defense.cost.metal}</span>
            </p>
            <p className="flex justify-between">
              <span>Crystal</span>
              <span className="text-purple-400">{defense.cost.crystal}</span>
            </p>
            <p className="flex justify-between">
              <span>Deuterium</span>
              <span className="text-teal-400">{defense.cost.deuterium}</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-3">
          <h4 className="text-xs text-gray-400 mb-2">Specifications</h4>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span>Attack</span>
              <span className="text-red-400">{defense.attack}</span>
            </p>
            <p className="flex justify-between">
              <span>Defense</span>
              <span className="text-blue-400">{defense.defense}</span>
            </p>
            <p className="flex justify-between">
              <span>Range</span>
              <span className="text-green-400">{defense.range}</span>
            </p>
          </div>
        </div>
      </div>

      {Object.keys(defense.requirements).length > 0 && (
        <div className="bg-gray-900/50 rounded-lg p-3">
          <h4 className="text-xs text-gray-400 mb-2">Requirements</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(defense.requirements).map(([reqId, reqLevel]) => (
              <div key={reqId} className="flex items-center justify-between">
                <span>{reqId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                <div className="flex items-center gap-2">
                  <span className={currentLevels[reqId] >= reqLevel ? 'text-green-400' : 'text-red-400'}>
                    Level {reqLevel}
                  </span>
                  {currentLevels[reqId] >= reqLevel ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <input
          type="number"
          min="1"
          value={buildQuantity}
          onChange={(e) => setBuildQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 w-24 text-sm"
        />
        <button
          onClick={() => onBuild(defense.id, buildQuantity)}
          disabled={!canAfford || !meetsRequirements}
          className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            canAfford && meetsRequirements
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-yellow-500/25'
              : 'bg-gray-800 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Build Defense</span>
        </button>
      </div>
    </div>
  );
}