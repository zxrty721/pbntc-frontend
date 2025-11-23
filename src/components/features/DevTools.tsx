import React from 'react';

interface DevToolsProps {
  isDevMode: boolean;
  onToggle: () => void;
  cursorPos: { x: number; y: number };
  copiedText: string | null;
}

const DevTools: React.FC<DevToolsProps> = ({ isDevMode, onToggle, cursorPos, copiedText }) => {
  return (
    <>
      <div className="fixed top-20 right-4 z-99 flex items-center gap-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg border border-slate-200">
        <span className="text-[10px] font-bold text-slate-500 pl-2 uppercase">Dev Mode</span>
        <button onClick={onToggle} className={`w-10 h-6 rounded-full p-1 transition-colors ${isDevMode ? 'bg-green-500' : 'bg-slate-300'}`}>
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isDevMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </button>
      </div>

      {isDevMode && (
        <div className="fixed bottom-4 right-4 z-99 bg-black/80 backdrop-blur text-white p-3 rounded-lg font-mono text-xs pointer-events-none">
          <div>X: <span className="text-green-400 font-bold">{cursorPos.x.toFixed(0)}%</span></div>
          <div>Y: <span className="text-blue-400 font-bold">{cursorPos.y.toFixed(0)}%</span></div>
        </div>
      )}

      {copiedText && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl animate-bounce font-mono text-sm">
          📋 {copiedText}
        </div>
      )}
    </>
  );
};

export default DevTools;