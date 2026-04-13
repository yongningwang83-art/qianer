const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/from-slate-950\/80/g, 'from-[#030914]/80');
fs.writeFileSync('src/App.tsx', content);
