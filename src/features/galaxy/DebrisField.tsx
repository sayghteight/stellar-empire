import React from 'react';
import { Trash2 } from 'lucide-react';

interface DebrisFieldProps {
  metal: number;
  crystal: number;
}

export function DebrisField({ metal, crystal }: DebrisFieldProps) {
  return (
    <div className="relative group">
      <Trash2 className="w-5 h-5 text-green-400" />
      
      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 hidden group-hover:block">
        <div className="bg-gray-900/90 rounded-lg p-3 text-xs border border-green-500/20 shadow-lg">
          <h4 className="font-semibold text-green-400 mb-2">Debris Field</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Metal:</span>
              <span className="text-blue-400">{metal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Crystal:</span>
              <span className="text-purple-400">{crystal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}