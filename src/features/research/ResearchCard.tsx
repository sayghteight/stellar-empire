import React from 'react';
import { Research } from '@/types';
import { Beaker, Lock, Check } from 'lucide-react';

interface ResearchCardProps {
  research: Research;
  onResearch: (researchId: string) => void;
  canAfford: boolean;
  currentLevels: { [key: string]: number };
}

export function ResearchCard({ research, onResearch, canAfford, currentLevels }: ResearchCardProps) {
  const meetsRequirements = Object.entries(research.requirements).every(
    ([reqId, reqLevel]) => (currentLevels[reqId] || 0) >= reqLevel
  );

  return (
    <div className="building-card rounded-xl p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{research.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
              Level {research.level}
            </span>
          </div>
        </div>
        <Beaker className="w-6 h-6 text-purple-400" />
      </div>

      <p className="text-sm text-gray-300">{research.effect}</p>
      
      <div className="bg-gray-900/50 rounded-lg p-3">
        <h4 className="text-xs text-gray-400 mb-2">Cost</h4>
        <div className="space-y-1 text-sm">
          <p className="flex justify-between">
            <span>Metal</span>
            <span className="text-blue-400">{research.cost.metal}</span>
          </p>
          <p className="flex justify-between">
            <span>Crystal</span>
            <span className="text-purple-400">{research.cost.crystal}</span>
          </p>
          <p className="flex justify-between">
            <span>Deuterium</span>
            <span className="text-teal-400">{research.cost.deuterium}</span>
          </p>
        </div>
      </div>

      {Object.keys(research.requirements).length > 0 && (
        <div className="bg-gray-900/50 rounded-lg p-3">
          <h4 className="text-xs text-gray-400 mb-2">Requirements</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(research.requirements).map(([reqId, reqLevel]) => (
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

      <button
        onClick={() => onResearch(research.id)}
        disabled={!canAfford || !meetsRequirements}
        className={`mt-auto px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
          canAfford && meetsRequirements
            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25'
            : 'bg-gray-800 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Beaker className="w-4 h-4" />
        <span>Research Level {research.level + 1}</span>
      </button>
    </div>
  );
}