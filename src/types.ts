export interface Resource {
  metal: number;
  crystal: number;
  deuterium: number;
  energy: number;
}

export interface Building {
  id: string;
  name: string;
  level: number;
  cost: Resource;
  production?: Resource;
  requirements: { [key: string]: number };
}

export interface Research {
  id: string;
  name: string;
  level: number;
  cost: Resource;
  effect: string;
  requirements: { [key: string]: number };
}

export interface Ship {
  id: string;
  name: string;
  quantity: number;
  cost: Resource;
  attack: number;
  defense: number;
  capacity: number;
  speed: number;
}

export interface Defense {
  id: string;
  name: string;
  quantity: number;
  cost: Resource;
  attack: number;
  defense: number;
  range: string;
  requirements: { [key: string]: number };
}

export interface Planet {
  id: string;
  name: string;
  position: { galaxy: number; system: number; position: number };
  resources: Resource;
  buildings: Building[];
  ships: Ship[];
  isColonized: boolean;
  ownerId?: string;
}

export interface Fleet {
  id: string;
  ships: { [key: string]: number };
  origin: PlanetPosition;
  destination: PlanetPosition;
  mission: FleetMission;
  resources: Resource;
  arrivalTime: number;
  returnTime: number;
  isReturning: boolean;
}

export interface PlanetPosition {
  galaxy: number;
  system: number;
  position: number;
}

export type FleetMission = 'attack' | 'transport' | 'colonize' | 'explore';