import React from 'react';
import { Battery, Gem, Droplet, Cylinder } from 'lucide-react';
import { Resource } from '../types';

interface ResourceBarProps {
  resources: Resource;
}

export function ResourceBar({ resources }: ResourceBarProps) {
  return (
    <div className="bg-gray-900/90 backdrop-blur-md text-white p-4 flex justify-between items-center fixed top-0 w-full z-50 border-b border-blue-500/20">
      <div className="flex gap-8 mx-auto">
        <div className="flex items-center gap-3 px-6 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <Cylinder className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm font-medium resource-value">{Math.floor(resources.metal).toLocaleString()}</p>
            <p className="text-xs text-gray-400">Metal</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <Gem className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm font-medium resource-value">{Math.floor(resources.crystal).toLocaleString()}</p>
            <p className="text-xs text-gray-400">Crystal</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <Droplet className="w-5 h-5 text-teal-400" />
          <div>
            <p className="text-sm font-medium resource-value">{Math.floor(resources.deuterium).toLocaleString()}</p>
            <p className="text-xs text-gray-400">Deuterium</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <Battery className="w-5 h-5 text-yellow-400" />
          <div>
            <p className="text-sm font-medium resource-value">{Math.floor(resources.energy).toLocaleString()}</p>
            <p className="text-xs text-gray-400">Energy</p>
          </div>
        </div>
      </div>
    </div>
  );
}