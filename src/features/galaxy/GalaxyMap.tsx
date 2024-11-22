import React, { useState } from 'react';
import { Planet, Ship, Resource } from '@/types';
import { Globe2, Star, Shield, Rocket, Crosshair, Users, Flag, AlertTriangle, Search, Trash2, Radar } from 'lucide-react';
import { FleetDispatchModal } from '../fleet/FleetDispatchModal';
import { CombatSimulator } from './CombatSimulator';
import { ExpeditionModal } from './ExpeditionModal';
import { DebrisField } from './DebrisField';

interface GalaxyMapProps {
  currentGalaxy: number;
  currentSystem: number;
  planets: Planet[];
  onExplore: (galaxy: number, system: number) => void;
  onColonize: (planet: Planet) => void;
  ships: Ship[];
  resources: Resource;
  onDispatchFleet: (fleet: Partial<Fleet>) => void;
  currentPlanet: Planet;
}

export function GalaxyMap({
  currentGalaxy,
  currentSystem,
  planets,
  onExplore,
  onColonize,
  ships,
  resources,
  onDispatchFleet,
  currentPlanet,
}: GalaxyMapProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [showCombatSimulator, setShowCombatSimulator] = useState(false);
  const [showExpeditionModal, setShowExpeditionModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const handlePlanetClick = (planet: Planet) => {
    if (planet.id !== currentPlanet.id) {
      setSelectedPlanet(planet);
    }
  };

  const handleExpedition = (position: number) => {
    setSelectedPosition(position);
    setShowExpeditionModal(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Galaxy Navigation */}
        <div className="flex gap-4 justify-center mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onExplore(currentGalaxy - 1, currentSystem)}
              className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/40 transition-colors border border-blue-500/20"
            >
              ←
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Globe2 className="w-5 h-5 text-blue-400" />
              <span className="text-blue-100">Galaxy {currentGalaxy}</span>
            </div>
            <button
              onClick={() => onExplore(currentGalaxy + 1, currentSystem)}
              className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/40 transition-colors border border-blue-500/20"
            >
              →
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onExplore(currentGalaxy, currentSystem - 1)}
              className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/40 transition-colors border border-blue-500/20"
            >
              ←
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-blue-100">System {currentSystem}</span>
            </div>
            <button
              onClick={() => onExplore(currentGalaxy, currentSystem + 1)}
              className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/40 transition-colors border border-blue-500/20"
            >
              →
            </button>
          </div>

          {/* Quick Jump */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Galaxy"
              min="1"
              max="9"
              className="w-20 bg-blue-900/30 border border-blue-500/20 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="System"
              min="1"
              max="499"
              className="w-20 bg-blue-900/30 border border-blue-500/20 rounded-lg px-3 py-2 text-sm"
            />
            <button
              className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-colors border border-blue-500/20"
            >
              <Search className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Galaxy Grid */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="px-4 py-3 text-left">Position</th>
                <th className="px-4 py-3 text-left">Planet</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Player</th>
                <th className="px-4 py-3 text-left">Alliance</th>
                <th className="px-4 py-3 text-center">Debris</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 15 }, (_, i) => {
                const planet = planets.find(
                  (p) =>
                    p.position.galaxy === currentGalaxy &&
                    p.position.system === currentSystem &&
                    p.position.position === i + 1
                );

                const hasDebris = Math.random() > 0.8; // Simulate debris fields

                return (
                  <tr
                    key={i}
                    className={`border-b border-blue-500/10 transition-colors ${
                      planet
                        ? 'hover:bg-blue-900/20 cursor-pointer'
                        : 'hover:bg-gray-900/20'
                    }`}
                    onClick={() => planet && handlePlanetClick(planet)}
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">
                      {planet ? (
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <Globe2 className="w-5 h-5 text-blue-400" />
                            </div>
                            {planet.isColonized && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-800/40 flex items-center justify-center">
                          <span className="text-xs text-gray-500">-</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {planet ? (
                        <span className="text-blue-300">{planet.name}</span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {planet?.ownerId ? (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span>Player {planet.ownerId}</span>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {planet?.ownerId ? (
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-purple-400" />
                          <span>Alliance Name</span>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {hasDebris && (
                        <DebrisField
                          metal={Math.floor(Math.random() * 10000)}
                          crystal={Math.floor(Math.random() * 5000)}
                        />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {planet && planet.id !== currentPlanet.id && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPlanet(planet);
                                setShowFleetModal(true);
                              }}
                              className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
                              title="Send Fleet"
                            >
                              <Rocket className="w-4 h-4 text-blue-400" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPlanet(planet);
                                setShowCombatSimulator(true);
                              }}
                              className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 transition-colors"
                              title="Combat Simulator"
                            >
                              <Crosshair className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                        {!planet && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExpedition(i + 1);
                            }}
                            className="p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-colors"
                            title="Send Expedition"
                          >
                            <Radar className="w-4 h-4 text-purple-400" />
                          </button>
                        )}
                        {hasDebris && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle recycler dispatch
                            }}
                            className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 transition-colors"
                            title="Send Recycler"
                          >
                            <Trash2 className="w-4 h-4 text-green-400" />
                          </button>
                        )}
                        {!planet?.isColonized && planet && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onColonize(planet);
                            }}
                            className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 transition-colors"
                            title="Colonize"
                          >
                            <Flag className="w-4 h-4 text-green-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-400" />
              <span>Colonized Planet</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Strong Player</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span>Inactive Player</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-purple-400" />
              <span>Alliance Member</span>
            </div>
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-green-400" />
              <span>Debris Field</span>
            </div>
            <div className="flex items-center gap-2">
              <Radar className="w-5 h-5 text-purple-400" />
              <span>Expedition</span>
            </div>
          </div>
        </div>
      </div>

      {selectedPlanet && (
        <>
          <FleetDispatchModal
            isOpen={showFleetModal}
            onClose={() => setShowFleetModal(false)}
            ships={ships}
            origin={currentPlanet}
            destination={selectedPlanet}
            onDispatch={onDispatchFleet}
            resources={resources}
          />
          <CombatSimulator
            isOpen={showCombatSimulator}
            onClose={() => setShowCombatSimulator(false)}
            attacker={currentPlanet}
            defender={selectedPlanet}
          />
        </>
      )}

      <ExpeditionModal
        isOpen={showExpeditionModal}
        onClose={() => setShowExpeditionModal(false)}
        position={{
          galaxy: currentGalaxy,
          system: currentSystem,
          position: selectedPosition || 16
        }}
        ships={ships}
        onDispatch={onDispatchFleet}
        currentPlanet={currentPlanet}
      />
    </>
  );
}