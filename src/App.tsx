import React, { useState } from 'react';
import { ResourceBar } from '@/components/layout/ResourceBar';
import { Navigation } from '@/components/layout/Navigation';
import { BuildingCard } from '@/features/buildings/BuildingCard';
import { ResearchCard } from '@/features/research/ResearchCard';
import { ShipCard } from '@/features/ships/ShipCard';
import { DefenseCard } from '@/features/defense/DefenseCard';
import { GalaxyMap } from '@/features/galaxy/GalaxyMap';
import { researchData, shipData, defenseData } from '@/data/gameData';
import { useResources } from '@/features/game/hooks/useResources';
import { useBuildings } from '@/features/buildings/hooks/useBuildings';
import { useResearch } from '@/features/research/hooks/useResearch';
import { useShips } from '@/features/ships/hooks/useShips';
import { useDefense } from '@/features/defense/hooks/useDefense';
import { useFleet } from '@/features/fleet/hooks/useFleet';
import { useGalaxy } from '@/features/galaxy/hooks/useGalaxy';
import { Planet, Ship } from '@/types';

const initialBuildings = [
  {
    id: 'metal-mine',
    name: 'Metal Mine',
    level: 1,
    cost: { metal: 200, crystal: 100, deuterium: 0, energy: -10 },
    production: { metal: 30, crystal: 0, deuterium: 0, energy: 0 },
    requirements: {},
  },
  {
    id: 'crystal-mine',
    name: 'Crystal Mine',
    level: 1,
    cost: { metal: 300, crystal: 150, deuterium: 0, energy: -10 },
    production: { metal: 0, crystal: 20, deuterium: 0, energy: 0 },
    requirements: {},
  },
  {
    id: 'solar-plant',
    name: 'Solar Plant',
    level: 1,
    cost: { metal: 150, crystal: 100, deuterium: 0, energy: 0 },
    production: { metal: 0, crystal: 0, deuterium: 0, energy: 20 },
    requirements: {},
  },
  {
    id: 'test-plant',
    name: 'test Plant',
    level: 1,
    cost: { metal: 150, crystal: 100, deuterium: 0, energy: 0 },
    production: { metal: 0, crystal: 0, deuterium: 0, energy: 20 },
    requirements: {},
  },
];

const initialPlanets = [
  {
    id: 'planet-1',
    name: 'Colony Alpha',
    position: { galaxy: 1, system: 1, position: 3 },
    resources: { metal: 1000, crystal: 500, deuterium: 200, energy: 0 },
    buildings: [],
    ships: {
      'light-fighter': 50,
    },
    isColonized: true,
    ownerId: 'player',
  },
  {
    id: 'planet-2',
    name: 'Distant World',
    position: { galaxy: 1, system: 1, position: 5 },
    resources: { metal: 0, crystal: 0, deuterium: 0, energy: 0 },
    buildings: [],
    ships: {},
    isColonized: true,
    ownerId: 'player',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState('overview');
  const { resources, setResources } = useResources(initialBuildings);
  const { buildings, handleUpgradeBuilding, canAffordBuilding } = useBuildings(initialBuildings, setResources);
  const { research, handleResearch, canAffordResearch, getCurrentLevels } = useResearch(researchData, setResources);
  const [ships, setShips] = useState<Ship[]>(shipData);
  const { handleBuildShip, canAffordShip } = useShips(ships, setShips, setResources);
  const { defenses, handleBuildDefense, canAffordDefense } = useDefense(defenseData, setResources);
  const { currentGalaxy, currentSystem, planets, handleExplore, colonizePlanet } = useGalaxy(initialPlanets);
  const { fleets, dispatchFleet } = useFleet(ships, setShips, setResources);

  const currentPlanet = planets[0];

  const handleColonize = (planet: Planet) => {
    if (!planet.isColonized) {
      colonizePlanet(planet.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <ResourceBar resources={resources} />
      <Navigation currentView={currentView} onChangeView={setCurrentView} />

      <main className="ml-20 pt-20 p-6">
        {currentView === 'buildings' && (
          <div className="max-w-7xl mx-auto pt-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Buildings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildings.map((building) => (
                <BuildingCard
                  key={building.id}
                  building={building}
                  onUpgrade={handleUpgradeBuilding}
                  canAfford={canAffordBuilding(building, resources)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'research' && (
          <div className="max-w-7xl mx-auto pt-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Research Laboratory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {research.map((item) => (
                <ResearchCard
                  key={item.id}
                  research={item}
                  onResearch={handleResearch}
                  canAfford={canAffordResearch(item, resources)}
                  currentLevels={getCurrentLevels()}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'shipyard' && (
          <div className="max-w-7xl mx-auto pt-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
              Shipyard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ships.map((ship) => (
                <ShipCard
                  key={ship.id}
                  ship={ship}
                  onBuild={handleBuildShip}
                  canAfford={canAffordShip(ship, resources)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'defense' && (
          <div className="max-w-7xl mx-auto pt-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Defense Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defenses.map((defense) => (
                <DefenseCard
                  key={defense.id}
                  defense={defense}
                  onBuild={handleBuildDefense}
                  canAfford={canAffordDefense(defense, resources)}
                  currentLevels={getCurrentLevels()}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'galaxy' && (
          <div className="max-w-7xl mx-auto pt-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              Galaxy Map
            </h2>
            <GalaxyMap
              currentGalaxy={currentGalaxy}
              currentSystem={currentSystem}
              planets={planets}
              onExplore={handleExplore}
              onColonize={handleColonize}
              ships={ships}
              resources={resources}
              onDispatchFleet={dispatchFleet}
              currentPlanet={currentPlanet}
            />
          </div>
        )}

        {currentView === 'overview' && (
          <div className="max-w-4xl mx-auto pt-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Planet Overview
            </h2>
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-blue-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Resources</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                      <span>Metal Production</span>
                      <span className="text-blue-400">
                        {buildings.reduce((acc, b) => acc + (b.production?.metal || 0), 0)}/hour
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                      <span>Crystal Production</span>
                      <span className="text-purple-400">
                        {buildings.reduce((acc, b) => acc + (b.production?.crystal || 0), 0)}/hour
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                      <span>Deuterium Production</span>
                      <span className="text-teal-400">
                        {buildings.reduce((acc, b) => acc + (b.production?.deuterium || 0), 0)}/hour
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                      <span>Energy Balance</span>
                      <span className="text-yellow-400">
                        {buildings.reduce((acc, b) => acc + (b.production?.energy || 0), 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Buildings</h3>
                  <div className="space-y-3">
                    {buildings.map((building) => (
                      <div
                        key={building.id}
                        className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg"
                      >
                        <span>{building.name}</span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
                          Level {building.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}