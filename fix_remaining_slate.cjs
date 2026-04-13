const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/text-slate-600/g, 'text-[#1e3a8a]');
content = content.replace(/bg-slate-950\/80/g, 'bg-[#030914]/80');
content = content.replace(/bg-slate-950\/30/g, 'bg-[#030914]/30');
content = content.replace(/focus:ring-offset-slate-900/g, 'focus:ring-offset-[#051024]');
content = content.replace(/to-slate-400/g, 'to-cyan-400/70');
content = content.replace(/border-slate-900/g, 'border-[#051024]');
fs.writeFileSync('src/App.tsx', content);
