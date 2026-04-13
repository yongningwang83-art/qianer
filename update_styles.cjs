const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/bg-slate-950\/50/g, 'bg-[#030914]/60');
content = content.replace(/border-slate-700/g, 'border-[#1e3a8a]/60');
content = content.replace(/bg-slate-900\/50/g, 'bg-[#051024]/80');
content = content.replace(/bg-slate-800/g, 'bg-[#0a1c3a]');
content = content.replace(/hover:bg-slate-700/g, 'hover:bg-[#1e3a8a]/80');
content = content.replace(/bg-slate-900\/30/g, 'bg-[#030914]/40');
content = content.replace(/bg-\[#0a1128\]/g, 'bg-[#051024]');
content = content.replace(/bg-slate-900/g, 'bg-[#051024]');

fs.writeFileSync('src/App.tsx', content);
