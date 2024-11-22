import React, { useState } from 'react';
import { Planet, Ship, Defense } from '@/types';
import { X, Swords, Shield, Rocket } from 'lucide-react';

interface CombatSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  attacker: Planet;
  defender: Planet;
}

export function CombatSimulator({ isOpen, onClose, attacker, defender }: CombatSimulatorProps) {
  const [attackerForces, setAttackerForces] = useState({
    ships: attacker.ships || {},
  });

  const [defenderForces, setDefenderForces] = useState({
    ships: defender.ships || {},
  });

  const simulateCombat = () => {
    // This is a simplified combat simulation
    // In a real game, this would be much more complex with actual combat mechanics
    const attackerPower = Object.entries(attackerForces.ships).reduce((total, [shipId, quantity]) => {
      const shipType = shipData.find(s => s.id === shipId);
      return total + (shipType ? shipType.attack * quantity : 0);
    }, 0);

    const defenderPower = Object.entries(defenderForces.ships).reduce((total, [shipId, quantity]) => {
      const shipType = shipData.find(s => s.id === shipId);
      return total + (shipType ? (shipType.attack + shipType.defense) * quantity : 0);
    }, 0);

    return {
      attackerPower,
      defenderPower,
      winner: attackerPower > defenderPower ? 'attacker' : 'defender',
      losses: Math.min(attackerPower, defenderPower),
    };
  };

  if (!isOpen) return null;

  const combatResult = simulateCombat();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 rounded-xl border border-blue-500/20 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Swords className="w-6 h-6 text-red-400" />
            Combat Simulator
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attacker Forces */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Attacker Forces
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
              <div className="space-y-3">
                {Object.entries(attackerForces.ships).map(([shipId, quantity]) => (
                  <div key={shipId} className="flex justify-between items-center">
                    <span>{shipId}</span>
                    <span className="text-blue-400">{quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Defender Forces */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Defender Forces
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-red-500/20">
              <div className="space-y-3">
                {Object.entries(defenderForces.ships).map(([shipId, quantity]) => (
                  <div key={shipId} className="flex justify-between items-center">
                    <span>{shipId}</span>
                    <span className="text-red-400">{quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Combat Results */}
        <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Combat Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Attacker Power:</span>
                <span className="text-blue-400">{combatResult.attackerPower}</span>
              </p>
              <p className="flex justify-between">
                <span>Defender Power:</span>
                <span className="text-red-400">{combatResult.defenderPower}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Winner:</span>
                <span className={combatResult.winner === 'attacker' ? 'text-blue-400' : 'text-red-400'}>
                  {combatResult.winner === 'attacker' ? 'Attacker' : 'Defender'}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Estimated Losses:</span>
                <span className="text-yellow-400">{combatResult.losses}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}