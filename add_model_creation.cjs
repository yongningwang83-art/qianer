const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  "XCircle\n} from 'lucide-react';", 
  "XCircle,\n  UploadCloud,\n  ChevronLeft\n} from 'lucide-react';"
);

// 2. Add AlgorithmCreationView component
const algoManagementIndex = content.indexOf('const AlgorithmManagementView = () =>');
const algorithmCreationView = `
const AlgorithmCreationView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'classification' | 'detection'>('classification');
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-4">
      {/* Top Tabs & Back */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-cyan-400/70 hover:text-cyan-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('classification')}
              className={\`px-6 py-1.5 rounded-md text-sm font-medium transition-colors \${activeTab === 'classification' ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.4)]' : 'text-cyan-400/70 hover:text-white'}\`}
            >
              分类算法
            </button>
            <button 
              onClick={() => setActiveTab('detection')}
              className={\`px-6 py-1.5 rounded-md text-sm font-medium transition-colors \${activeTab === 'detection' ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.4)]' : 'text-cyan-400/70 hover:text-white'}\`}
            >
              检测算法
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Panel */}
        <GlassPanel className="w-[400px] flex flex-col shrink-0">
          <div className="p-4 border-b border-white/10 flex items-center gap-2 shrink-0">
            <div className="text-amber-500 flex -space-x-1">
              <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">上传信息</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* 正例标签 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">
                <ChevronRight className="w-4 h-4" /> 正例标签
              </div>
              <div className="flex flex-wrap gap-2 pl-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-[#0a1c3a] border border-cyan-500/50 rounded text-xs text-cyan-100">
                  持刀持械 <X className="w-3 h-3 cursor-pointer hover:text-rose-400 ml-1" />
                </div>
                <button className="flex items-center gap-1 px-3 py-1 bg-transparent border border-white/20 border-dashed rounded text-xs text-cyan-400/70 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                  <Plus className="w-3 h-3" /> 添加标签
                </button>
              </div>
            </div>

            {/* 负例标签 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">
                <ChevronRight className="w-4 h-4" /> 负例标签
              </div>
              <div className="flex flex-wrap gap-2 pl-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-[#0a1c3a] border border-cyan-500/50 rounded text-xs text-cyan-100">
                  非持刀持械 <X className="w-3 h-3 cursor-pointer hover:text-rose-400 ml-1" />
                </div>
                <button className="flex items-center gap-1 px-3 py-1 bg-transparent border border-white/20 border-dashed rounded text-xs text-cyan-400/70 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                  <Plus className="w-3 h-3" /> 添加标签
                </button>
              </div>
            </div>

            {/* 阈值设置 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">
                <ChevronRight className="w-4 h-4" /> 阈值设置
              </div>
              <div className="flex items-center gap-4 pl-2">
                <div className="flex items-center bg-black/20 border border-white/10 rounded">
                  <button className="px-2 py-1 text-cyan-400/70 hover:text-cyan-400 border-r border-white/10 hover:bg-white/5">-</button>
                  <input type="text" value="0.15" readOnly className="w-16 bg-transparent text-center text-sm text-white focus:outline-none" />
                  <button className="px-2 py-1 text-cyan-400/70 hover:text-cyan-400 border-l border-white/10 hover:bg-white/5">+</button>
                </div>
                <span className="text-xs text-cyan-400/50">范围: 0.00-1.00</span>
              </div>
            </div>

            {/* 选择图片 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">
                <ChevronRight className="w-4 h-4" /> 选择图片
              </div>
              <div className="pl-2 space-y-4">
                <div className="border border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-cyan-500/50 transition-colors cursor-pointer bg-white/5">
                  <UploadCloud className="w-8 h-8 text-cyan-400/70" />
                  <div className="text-sm text-white">将文件拖到此处，或 <span className="text-cyan-400">点击上传</span></div>
                  <div className="text-xs text-cyan-400/50 text-center">支持格式：JPG、JPEG、PNG、BMP<br/>单张图片大小不超过10MB，最多上传20张图片</div>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <div className="relative w-24 h-16 rounded border border-white/10 shrink-0 group">
                    <img src="https://picsum.photos/seed/knife1/100/100" className="w-full h-full object-cover rounded" />
                    <button className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"><X className="w-3 h-3"/></button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] text-white px-1 truncate rounded-b">7.png</div>
                  </div>
                  <div className="relative w-24 h-16 rounded border-2 border-cyan-500 shrink-0 group">
                    <div className="absolute top-0 left-0 bg-cyan-500 text-white text-[10px] px-1 z-10">已选择</div>
                    <img src="https://picsum.photos/seed/knife2/100/100" className="w-full h-full object-cover rounded" />
                    <button className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"><X className="w-3 h-3"/></button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] text-white px-1 truncate rounded-b">132.png</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bounding Box Area */}
            <div className="mt-4 border border-white/10 rounded-lg overflow-hidden flex flex-col">
              <div className="bg-[#0a1c3a]/50 p-2 flex items-center justify-between border-b border-white/10">
                <span className="text-xs text-cyan-100">为选中图片绘制边界框：132.png</span>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded text-xs transition-colors">清除所有</button>
                  <button className="px-2 py-1 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 rounded text-xs transition-colors">撤销</button>
                </div>
              </div>
              <div className="h-48 bg-black/40 relative flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/knife2/400/300" className="max-w-full max-h-full object-contain" />
                {/* Mock bounding box */}
                <div className="absolute top-1/4 left-1/3 w-1/4 h-1/2 border-2 border-cyan-400 bg-cyan-400/10"></div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Right Panel */}
        <GlassPanel className="flex-1 flex flex-col min-w-0">
          <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="text-amber-500 flex -space-x-1">
                <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4" />
              </div>
              <span className="font-bold text-white">检验结果</span>
            </div>
            <button className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
              生成算法包
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <table className="w-full text-left border-collapse border border-white/10">
              <thead>
                <tr className="bg-white/5 backdrop-blur-md text-xs text-cyan-400 sticky top-0 z-10 border-b border-white/10">
                  <th className="p-3 font-medium border-r border-white/10">图片</th>
                  <th className="p-3 font-medium text-center border-r border-white/10">标签</th>
                  <th className="p-3 font-medium text-center border-r border-white/10">类型</th>
                  <th className="p-3 font-medium text-center border-r border-white/10">得分</th>
                  <th className="p-3 font-medium">告警信息</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-cyan-100">
                {[
                  { id: 'A', img: '7.png', src: 'https://picsum.photos/seed/knife1/100/100', scorePos: 0.32, scoreNeg: 0.32, alert: true },
                  { id: 'B', img: '7.png', src: 'https://picsum.photos/seed/knife1/100/100', scorePos: 0.30, scoreNeg: 0.30, alert: false },
                  { id: 'A2', img: '132.png', src: 'https://picsum.photos/seed/knife2/100/100', scorePos: 0.29, scoreNeg: 0.29, alert: false },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 border-r border-white/10">
                      <div className="flex items-center gap-3">
                        <img src={row.src} className="w-12 h-12 object-cover rounded border border-white/10" />
                        <div>
                          <div className="text-white text-xs">{row.img}</div>
                          <div className="text-cyan-400/50 text-[10px]">ID: {row.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-0 border-r border-white/10">
                      <div className="flex flex-col h-full">
                        <div className="flex-1 flex items-center justify-center p-2 border-b border-white/5">
                          <div className="px-2 py-0.5 border border-cyan-500/50 rounded text-xs text-cyan-400 bg-cyan-900/20">持刀持械</div>
                        </div>
                        <div className="flex-1 flex items-center justify-center p-2">
                          <div className="px-2 py-0.5 border border-white/20 rounded text-xs text-cyan-100/70 bg-white/5">非持刀持械</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-0 border-r border-white/10">
                      <div className="flex flex-col h-full text-xs text-center">
                        <div className="flex-1 flex items-center justify-center p-2 border-b border-white/5">正例</div>
                        <div className="flex-1 flex items-center justify-center p-2">负例</div>
                      </div>
                    </td>
                    <td className="p-0 border-r border-white/10">
                      <div className="flex flex-col h-full text-xs text-center">
                        <div className="flex-1 flex flex-col items-center justify-center p-2 border-b border-white/5">
                          <span className="text-emerald-400 font-medium">{row.scorePos.toFixed(2)}</span>
                          <span className="text-[10px] text-cyan-400/50 bg-white/5 px-1 rounded mt-0.5">阈值: 0.15</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-2">
                          <span className="text-emerald-400 font-medium">{row.scoreNeg.toFixed(2)}</span>
                          <span className="text-[10px] text-cyan-400/50 bg-white/5 px-1 rounded mt-0.5">阈值: 0.15</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-xs">
                      {row.alert && (
                        <div className="text-rose-400 flex flex-col gap-1">
                          <span className="font-bold">告警</span>
                          <span className="text-cyan-100/70">正例标签最高分数0.316超过阈值0.15，且大于负例标签最高分数0.315</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </div>
    </motion.div>
  );
};

`;
content = content.slice(0, algoManagementIndex) + algorithmCreationView + content.slice(algoManagementIndex);

// 3. Update AlgorithmManagementView to use state
content = content.replace(
  "const AlgorithmManagementView = () => (",
  "const AlgorithmManagementView = () => {\n  const [isAdding, setIsAdding] = useState(false);\n\n  if (isAdding) {\n    return <AlgorithmCreationView onBack={() => setIsAdding(false)} />;\n  }\n\n  return ("
);

// 4. Update the "添加模型" button
content = content.replace(
  /<button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-\[0_0_15px_rgba\(8,145,178,0\.4\)\]">\s*添加模型\s*<\/button>/,
  `<button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
          添加模型
        </button>`
);

// 5. Close the return statement for AlgorithmManagementView
content = content.replace(
  "  </motion.div>\n);\n\nconst DeviceManagementView",
  "  </motion.div>\n  );\n};\n\nconst DeviceManagementView"
);

fs.writeFileSync('src/App.tsx', content);
