import React from 'react';
import { Building } from '../types';
import { ArrowUp, Clock } from 'lucide-react';

interface BuildingCardProps {
  building: Building;
  onUpgrade: (buildingId: string) => void;
  canAfford: boolean;
}

export function BuildingCard({ building, onUpgrade, canAfford }: BuildingCardProps) {
  return (
    <div className="building-card rounded-xl p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{building.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
              Level {building.level}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/50 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">Cost</h4>
            <div className="space-y-1 text-sm">
              <p className="flex justify-between">
                <span>Metal</span>
                <span className="text-blue-400">{building.cost.metal}</span>
              </p>
              <p className="flex justify-between">
                <span>Crystal</span>
                <span className="text-purple-400">{building.cost.crystal}</span>
              </p>
              <p className="flex justify-between">
                <span>Deuterium</span>
                <span className="text-teal-400">{building.cost.deuterium}</span>
              </p>
              <p className="flex justify-between">
                <span>Energy</span>
                <span className="text-yellow-400">{building.cost.energy}</span>
              </p>
            </div>
          </div>
          
          {building.production && (
            <div className="bg-gray-900/50 rounded-lg p-3">
              <h4 className="text-xs text-gray-400 mb-2">Production /hr</h4>
              <div className="space-y-1 text-sm">
                {building.production.metal > 0 && (
                  <p className="flex justify-between">
                    <span>Metal</span>
                    <span className="text-blue-400">+{building.production.metal}</span>
                  </p>
                )}
                {building.production.crystal > 0 && (
                  <p className="flex justify-between">
                    <span>Crystal</span>
                    <span className="text-purple-400">+{building.production.crystal}</span>
                  </p>
                )}
                {building.production.deuterium > 0 && (
                  <p className="flex justify-between">
                    <span>Deuterium</span>
                    <span className="text-teal-400">+{building.production.deuterium}</span>
                  </p>
                )}
                {building.production.energy > 0 && (
                  <p className="flex justify-between">
                    <span>Energy</span>
                    <span className="text-yellow-400">+{building.production.energy}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onUpgrade(building.id)}
        disabled={!canAfford}
        className={`mt-auto px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
          canAfford
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
            : 'bg-gray-800 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ArrowUp className="w-4 h-4" />
        <span>Upgrade to Level {building.level + 1}</span>
      </button>
    </div>
  );
}