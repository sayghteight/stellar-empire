import { Research, Ship, Defense } from '@/types';

export const researchData: Research[] = [
  {
    id: 'energy-tech',
    name: 'Energy Technology',
    level: 0,
    cost: { metal: 800, crystal: 400, deuterium: 200, energy: 0 },
    effect: 'Increases energy production efficiency by 10% per level',
    requirements: {}
  },
  {
    id: 'laser-tech',
    name: 'Laser Technology',
    level: 0,
    cost: { metal: 1200, crystal: 800, deuterium: 400, energy: 0 },
    effect: 'Unlocks advanced weapons and defense systems',
    requirements: { 'energy-tech': 2 }
  },
  {
    id: 'ion-tech',
    name: 'Ion Technology',
    level: 0,
    cost: { metal: 2000, crystal: 1500, deuterium: 600, energy: 0 },
    effect: 'Enables ion-based weapons and shields',
    requirements: { 'laser-tech': 3 }
  }
];

export const shipData: Ship[] = [
  {
    id: 'light-fighter',
    name: 'Light Fighter',
    quantity: 20,
    cost: { metal: 3000, crystal: 1000, deuterium: 50, energy: 0 },
    attack: 50,
    defense: 10,
    capacity: 50,
    speed: 12500
  },
  {
    id: 'heavy-fighter',
    name: 'Heavy Fighter',
    quantity: 20,
    cost: { metal: 6000, crystal: 4000, deuterium: 500, energy: 0 },
    attack: 150,
    defense: 25,
    capacity: 100,
    speed: 10000
  },
  {
    id: 'cruiser',
    name: 'Cruiser',
    quantity: 20,
    cost: { metal: 20000, crystal: 7000, deuterium: 2000, energy: 0 },
    attack: 400,
    defense: 50,
    capacity: 800,
    speed: 15000
  }
];

export const defenseData: Defense[] = [
  {
    id: 'missile-launcher',
    name: 'Missile Launcher',
    quantity: 0,
    cost: { metal: 2000, crystal: 0, deuterium: 0, energy: 0 },
    attack: 80,
    defense: 20,
    range: 'Short',
    requirements: {}
  },
  {
    id: 'laser-turret',
    name: 'Laser Turret',
    quantity: 0,
    cost: { metal: 1500, crystal: 500, deuterium: 0, energy: 0 },
    attack: 100,
    defense: 25,
    range: 'Medium',
    requirements: { 'laser-tech': 1 }
  },
  {
    id: 'ion-cannon',
    name: 'Ion Cannon',
    quantity: 0,
    cost: { metal: 4000, crystal: 2000, deuterium: 500, energy: 0 },
    attack: 250,
    defense: 100,
    range: 'Long',
    requirements: { 'ion-tech': 2 }
  },
  {
    id: 'plasma-turret',
    name: 'Plasma Turret',
    quantity: 0,
    cost: { metal: 8000, crystal: 4000, deuterium: 1000, energy: 0 },
    attack: 400,
    defense: 200,
    range: 'Medium',
    requirements: { 'laser-tech': 3, 'ion-tech': 2 }
  },
  {
    id: 'plasma-turret 2',
    name: 'Plasma Turret 3',
    quantity: 0,
    cost: { metal: 8000, crystal: 4000, deuterium: 1000, energy: 0 },
    attack: 400,
    defense: 200,
    range: 'Medium',
    requirements: { 'laser-tech': 3, 'ion-tech': 2 }
  },
];