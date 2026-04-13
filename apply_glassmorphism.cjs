const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update GlassPanel
const oldGlassPanel = `const GlassPanel = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={\`bg-[#051024]/80 backdrop-blur-md border border-[#1e3a8a]/60 shadow-[inset_0_0_20px_rgba(30,58,138,0.2)] relative overflow-hidden \${className}\`}>
    {/* Tech Corners */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none z-0"></div>
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </div>
);`;

const newGlassPanel = `const GlassPanel = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={\`bg-[#0a1526]/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden rounded-xl \${className}\`}>
    {/* Subtle top highlight for glass effect */}
    <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, white, transparent)', WebkitMaskImage: '-webkit-linear-gradient(top, white, transparent)' }}></div>
    {/* Tech Corners */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/50 rounded-tl-xl pointer-events-none z-20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/50 rounded-tr-xl pointer-events-none z-20"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/50 rounded-bl-xl pointer-events-none z-20"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/50 rounded-br-xl pointer-events-none z-20"></div>
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </div>
);`;

content = content.replace(oldGlassPanel, newGlassPanel);

// 2. Update Main App Layout Background
const oldAppLayout = `<div className="h-screen w-full bg-[#030914] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzMCwgNTgsIDEzOCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] pointer-events-none opacity-50 z-0"></div>`;

const newAppLayout = `<div className="h-screen w-full bg-[#020617] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-600/20 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-purple-600/20 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzMCwgNTgsIDEzOCwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
      </div>`;

content = content.replace(oldAppLayout, newAppLayout);

// 3. Global Color Replacements for Glassmorphism
content = content.replace(/bg-\[#030914\]\/60/g, 'bg-black/20 backdrop-blur-md');
content = content.replace(/bg-\[#0a1c3a\]\/90/g, 'bg-white/5 backdrop-blur-md');
content = content.replace(/hover:bg-\[#0f2546\]\/60/g, 'hover:bg-white/5');
content = content.replace(/border-\[#1e3a8a\]\/60\/50/g, 'border-white/10');
content = content.replace(/border-\[#1e3a8a\]\/60/g, 'border-white/10');
content = content.replace(/border-\[#1e3a8a\]\/40/g, 'border-white/5');
content = content.replace(/divide-\[#1e3a8a\]\/40/g, 'divide-white/5');
content = content.replace(/bg-\[#051024\]\/80/g, 'bg-[#0a1526]/40 backdrop-blur-2xl');
content = content.replace(/bg-\[#051024\]/g, 'bg-[#0a1526]/40 backdrop-blur-2xl');
content = content.replace(/bg-\[#030914\]/g, 'bg-transparent');

// Fix header background
content = content.replace(/<header className="h-16 bg-transparent\/40 backdrop-blur-2xl border-b border-white\/10/g, '<header className="h-16 bg-[#0a1526]/40 backdrop-blur-2xl border-b border-white/10');

fs.writeFileSync('src/App.tsx', content);
