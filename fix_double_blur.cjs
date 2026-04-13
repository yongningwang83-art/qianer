const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/backdrop-blur-md text-xs text-cyan-400 sticky top-0 backdrop-blur-md/g, 'backdrop-blur-md text-xs text-cyan-400 sticky top-0');
content = content.replace(/backdrop-blur-md text-xs text-cyan-400 uppercase tracking-wider sticky top-0 backdrop-blur-md/g, 'backdrop-blur-md text-xs text-cyan-400 uppercase tracking-wider sticky top-0');
content = content.replace(/backdrop-blur-md text-xs text-cyan-400 font-medium sticky top-0 backdrop-blur-md/g, 'backdrop-blur-md text-xs text-cyan-400 font-medium sticky top-0');
fs.writeFileSync('src/App.tsx', content);
