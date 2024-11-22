import React from 'react';
import { Building2, TestTube2, Rocket, Shield, BarChart2, Globe2 } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

export function Navigation({ currentView, onChangeView }: NavigationProps) {
  const navItems = [
    { id: 'overview', icon: BarChart2, label: 'Overview' },
    { id: 'buildings', icon: Building2, label: 'Buildings' },
    { id: 'research', icon: TestTube2, label: 'Research' },
    { id: 'shipyard', icon: Rocket, label: 'Shipyard' },
    { id: 'defense', icon: Shield, label: 'Defense' },
    { id: 'galaxy', icon: Globe2, label: 'Galaxy' },
  ];

  return (
    <div className="bg-gray-900/90 backdrop-blur-md w-20 fixed left-0 top-0 h-screen flex flex-col items-center pt-20 border-r border-blue-500/20">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`nav-button w-full p-4 flex flex-col items-center gap-1 ${
              currentView === item.id
                ? 'text-blue-400 active'
                : 'text-gray-400 hover:text-blue-300'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}