const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  "MoreHorizontal\n} from 'lucide-react';", 
  "MoreHorizontal,\n  ClipboardCheck,\n  CheckCircle,\n  XCircle\n} from 'lucide-react';"
);

// 2. Add Mock Data
const mockAlertsIndex = content.indexOf('const MOCK_ALERTS = [');
const mockPendingAlerts = `
const MOCK_PENDING_ALERTS = [
  { id: 1, taskId: 'TASK-2023-005', title: '疑似人员未佩戴安全帽', location: '南区施工现场-摄像头02', time: '2023-10-27 14:32:11', img: 'https://picsum.photos/seed/helmet2/400/300' },
  { id: 2, taskId: 'TASK-2023-008', title: '疑似车辆违停', location: '主干道-东侧监控', time: '2023-10-27 14:28:45', img: 'https://picsum.photos/seed/car2/400/300' },
  { id: 3, taskId: 'TASK-2023-012', title: '疑似烟火', location: '仓库A区-热成像', time: '2023-10-27 14:15:22', img: 'https://picsum.photos/seed/fire2/400/300' },
  { id: 4, taskId: 'TASK-2023-005', title: '疑似人员未佩戴安全帽', location: '北区作业面-摄像头05', time: '2023-10-27 14:10:05', img: 'https://picsum.photos/seed/helmet3/400/300' },
];
`;
content = content.slice(0, mockAlertsIndex) + mockPendingAlerts + content.slice(mockAlertsIndex);

// 3. Add EventReviewView component
const eventCenterIndex = content.indexOf('const EventCenterView = () => (');
const eventReviewView = `
const EventReviewView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-6">
    {/* Header & Filters */}
    <GlassPanel className="p-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70" />
          <input type="text" placeholder="搜索待审核事件..." className="w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
        </div>
        <select className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
          <option value="">全部算法</option>
          <option value="helmet">安全帽检测</option>
          <option value="fire">烟火检测</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-cyan-400/70">
          待审核 <span className="text-amber-400 font-bold">24</span> 个事件
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
          <Plus className="w-4 h-4" />
          手动创建事件
        </button>
      </div>
    </GlassPanel>

    {/* Review Grid */}
    <div className="flex-1 overflow-y-auto pr-2 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_PENDING_ALERTS.map((alert) => (
          <GlassPanel key={alert.id} className="overflow-hidden group hover:border-cyan-500/50 transition-colors flex flex-col">
            <div className="relative h-40 shrink-0">
              <img src={alert.img} alt="Alert" className="w-full h-full object-cover" />
              <div className="absolute top-1/4 left-1/2 w-16 h-24 border-2 border-amber-500"></div>
              <div className="absolute top-2 right-2">
                <Badge variant="warning">待审核</Badge>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="text-sm font-bold text-white mb-1 truncate" title={alert.taskId}>{alert.taskId}</h4>
              <p className="text-xs text-cyan-400 mb-3">{alert.title}</p>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-cyan-400/70">
                  <MonitorPlay className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{alert.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-400/70">
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  <span>{alert.time}</span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                <button className="flex items-center justify-center gap-1.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded border border-emerald-500/20 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5" />
                  正确 (推送)
                </button>
                <button className="flex items-center justify-center gap-1.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium rounded border border-rose-500/20 transition-colors">
                  <XCircle className="w-3.5 h-3.5" />
                  错误 (忽略)
                </button>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  </motion.div>
);

`;
content = content.slice(0, eventCenterIndex) + eventReviewView + content.slice(eventCenterIndex);

// 4. Update navItems
content = content.replace(
  "{ id: 'events', label: '事件中心', icon: AlertTriangle },",
  "{ id: 'review', label: '事件审核', icon: ClipboardCheck },\n    { id: 'events', label: '事件中心', icon: AlertTriangle },"
);

// 5. Update render
content = content.replace(
  "{activeTab === 'events' && <EventCenterView key=\"events\" />}",
  "{activeTab === 'review' && <EventReviewView key=\"review\" />}\n          {activeTab === 'events' && <EventCenterView key=\"events\" />}"
);

fs.writeFileSync('src/App.tsx', content);
