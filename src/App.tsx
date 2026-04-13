/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MonitorPlay, 
  AlertTriangle, 
  Cpu, 
  Settings, 
  Search, 
  Bell, 
  User, 
  Video, 
  FolderKanban,
  Activity,
  Database,
  Play,
  Download,
  Plus,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Key,
  Shield,
  ChevronDown,
  Camera,
  FolderOpen,
  LayoutDashboard,
  ChevronRight,
  HardDrive,
  Image as ImageIcon,
  Flag,
  Package,
  Server,
  Zap,
  X,
  LayoutGrid,
  List,
  Info,
  PieChart,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Mock Data ---

const MOCK_CAMERAS = [
  { id: 1, name: '厂房仓库-夜间', location: '上海', status: 'online', img: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: '马路-十字路口', location: '上海', status: 'online', img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: '公司-上海大堂', location: '上海', status: 'online', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: '机场线-盾构区', location: '北京', status: 'offline', img: null },
  { id: 5, name: '医院-候诊区', location: '广州', status: 'offline', img: null },
  { id: 6, name: '工地-二楼南侧', location: '深圳', status: 'offline', img: null },
];

const MOCK_ALERTS = Array(8).fill(null).map((_, i) => ({
  id: `alert-${i}`,
  title: '统计过线的人数',
  taskId: `GQYIN_统计过线的人数_20241210_${1000+i}`,
  location: '1号楼2层走廊南侧',
  time: `2024/12/10 22:10:${10+i}`,
  level: 'high',
  img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
}));

const MOCK_ALGORITHMS = [
  { id: 1, name: '人员未佩戴安全帽', version: 'v6', status: '训练成功', source: '习惯', dataPos: 34, dataNeg: 35, trainable: '是', time: '2026-04-10 09:27:01' },
  { id: 2, name: '无人机识别建筑物', version: 'v7', status: '训练成功', source: '习惯', dataPos: 77, dataNeg: 32, trainable: '是', time: '2026-04-09 21:29:45' },
  { id: 3, name: '无人机识别推土机', version: 'v9', status: '训练成功', source: '习惯', dataPos: 36, dataNeg: 42, trainable: '是', time: '2026-04-09 21:16:28' },
  { id: 4, name: '无人机检测坑塘水面', version: 'v7', status: '训练成功', source: '习惯', dataPos: 32, dataNeg: 52, trainable: '是', time: '2026-04-09 21:10:43' },
  { id: 5, name: '无人机机械车辆检测', version: 'v13', status: '训练成功', source: '习惯', dataPos: 76, dataNeg: 20, trainable: '是', time: '2026-04-09 21:06:24' },
  { id: 6, name: '危化品车', version: 'v1', status: '训练成功', source: '习惯', dataPos: 2, dataNeg: 3, trainable: '是', time: '2026-04-09 18:20:29' },
  { id: 7, name: '无人机识别农田闲置', version: 'v3', status: '训练成功', source: '习惯', dataPos: 18, dataNeg: 18, trainable: '是', time: '2026-04-09 18:12:14' },
  { id: 8, name: '叉车叉子', version: 'v16', status: '训练成功', source: '习惯', dataPos: 126, dataNeg: 457, trainable: '是', time: '2026-04-09 17:31:48' },
  { id: 9, name: '未穿反光衣-2', version: 'v26', status: '训练成功', source: '习惯', dataPos: 266, dataNeg: 212, trainable: '是', time: '2026-04-09 17:02:56' },
  { id: 10, name: '人员未穿反光衣', version: 'v10', status: '训练成功', source: '习惯', dataPos: 52, dataNeg: 29, trainable: '是', time: '2026-04-09 15:58:36' },
  { id: 11, name: '未戴安全帽的人', version: 'v7', status: '训练成功', source: '习惯', dataPos: 58, dataNeg: 79, trainable: '是', time: '2026-04-09 10:45:09' },
  { id: 12, name: '横幅11', version: 'v4', status: '训练成功', source: '习惯', dataPos: 13, dataNeg: 6, trainable: '是', time: '2026-04-09 10:36:22' },
];

const MOCK_USERS = [
  { id: 1, username: 'admin', name: '超级管理员', role: '系统管理员', department: '研发部', status: 'active', lastLogin: '2024-12-10 10:23:45' },
  { id: 2, username: 'zhangsan', name: '张三', role: '操作员', department: '安保部', status: 'active', lastLogin: '2024-12-09 15:12:00' },
  { id: 3, username: 'lisi', name: '李四', role: '审核员', department: '业务部', status: 'inactive', lastLogin: '2024-11-28 09:00:12' },
  { id: 4, username: 'wangwu', name: '王五', role: '操作员', department: '安保部', status: 'active', lastLogin: '2024-12-10 08:30:00' },
  { id: 5, username: 'zhaoliu', name: '赵六', role: '算法工程师', department: '算法部', status: 'active', lastLogin: '2024-12-10 11:45:22' },
];

const MOCK_DEVICE_LIST = [
  { id: 1, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '校园-人员跌倒...', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 2, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '城市-垃圾满溢', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 3, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '城市-授权使用...', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 4, mainDeviceId: '000000260327...', platformDeviceId: '32010010011...', name: '安全-轨旁火苗', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 5, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '校园-攀爬检测', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 6, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '校园-周界接触...', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 7, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '校园-烟火识别...', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 8, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '校园-持刀的人...', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 9, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '校园-持棍的人...', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
  { id: 10, mainDeviceId: '000000260227...', platformDeviceId: '32010010011...', name: '校园-打架斗殴...', protocol: 'T28181', type: 'IPC', ip: '', status: 'online' },
];

const MOCK_CHART_DATA = [
  { date: '8/18', value: 50 },
  { date: '8/19', value: 30 },
  { date: '8/20', value: 0 },
  { date: '8/21', value: 10 },
  { date: '8/22', value: 150 },
  { date: '8/23', value: 250 },
  { date: '8/24', value: 20 },
];

const MOCK_TOP_DEVICES = [
  { name: '人员检测', count: 8, devices: 'device0816,持刀设备,拌线001,人员拌线001,马路上的车,bxt0821,菜市场设备,电梯门口' },
  { name: '人员拌线', count: 5, devices: 'device0816,人员拌线001,摄像头002,摄像头001,bxt0821' },
  { name: '非机动车拌线', count: 5, devices: '摄像头004,摄像头005,摄像头003,马路上的车,bxt0821' },
  { name: '区域入侵+微模型分类组合测试001', count: 4, devices: '拌线001,摄像头016,测试设备001,马路上的车' },
  { name: '人员区域入侵', count: 3, devices: '人员拌线001,马路上的车,bxt0821' },
  { name: '非机动车检测', count: 3, devices: '马路口,马路上的车,bxt0821' },
  { name: '车辆拌线', count: 3, devices: 'device0816,马路上的车,bxt0821' },
  { name: '人员拌线组合算法包', count: 3, devices: 'device0816,人员拌线001,马路上的车' },
  { name: '零样本检测-机动车检测', count: 2, devices: 'device0816,马路上的车' },
];

const MOCK_TASKS = [
  { id: 1, name: '持刀检测事件001', type: '持刀检测事件...', risk: '高风险', duration: '全天候任务', status: '启动准备', runStatus: '启动', creator: '系统', createTime: '2025-08-24 18:27:59' },
  { id: 2, name: '组合-车辆-出租车...', type: '组合-车辆-出...', risk: '中风险', duration: '全天候任务', status: '全部停止', runStatus: '停止', creator: '系统', createTime: '2025-08-24 18:13:54' },
  { id: 3, name: '组合-人员检测-横...', type: '组合-人员检...', risk: '高风险', duration: '持续任务', status: '全部停止', runStatus: '启动', creator: '系统', createTime: '2025-08-24 16:58:38' },
  { id: 4, name: '机动车-出租车分类...', type: '机动车-出租...', risk: '低风险', duration: '全天候任务', status: '全部停止', runStatus: '停止', creator: '系统', createTime: '2025-08-24 16:37:02' },
  { id: 5, name: '组合-人员检测-拉...', type: '组合-人员检...', risk: '高风险', duration: '持续任务', status: '全部停止', runStatus: '停止', creator: '系统', createTime: '2025-08-24 16:36:01' },
  { id: 6, name: '非机动车检测-0824', type: '非机动车检测...', risk: '中风险', duration: '全天候任务', status: '全部启动', runStatus: '启动', creator: '系统', createTime: '2025-08-24 15:39:52' },
  { id: 7, name: '组合持刀检测-临时', type: '组合持刀检测...', risk: '高风险', duration: '全天候任务', status: '全部停止', runStatus: '停止', creator: '系统', createTime: '2025-08-24 11:10:18' },
  { id: 8, name: '组合-人员-持刀-裤...', type: '组合-人员-持...', risk: '高风险', duration: '持续任务', status: '全部停止', runStatus: '启动', creator: '系统', createTime: '2025-08-24 10:21:33' },
  { id: 9, name: '组合-人员检测-零...', type: '组合-人员检...', risk: '高风险', duration: '持续任务', status: '全部停止', runStatus: '启动', creator: '系统', createTime: '2025-08-24 09:48:38' },
  { id: 10, name: '人绊线测试0823jie', type: '人员绊线事件...', risk: '高风险', duration: '全天候任务', status: '全部启动', runStatus: '启动', creator: '系统', createTime: '2025-08-23 21:42:17' },
];

// --- Components ---

const GlassPanel = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#051024]/80 backdrop-blur-md border border-[#1e3a8a]/60 shadow-[inset_0_0_20px_rgba(30,58,138,0.2)] relative overflow-hidden ${className}`}>
    {/* Tech Corners */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/80 pointer-events-none z-20"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none z-0"></div>
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </div>
);

const PanelTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-6">
    <div className="flex -space-x-1.5 text-amber-500">
      <ChevronRight className="w-5 h-5" />
      <ChevronRight className="w-5 h-5" />
      <ChevronRight className="w-5 h-5" />
    </div>
    <h3 className="text-lg font-bold text-white tracking-wider">{title}</h3>
  </div>
);

const StatCard = ({ icon: Icon, label, value, unit = '', valueColor = 'text-white' }: any) => (
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
      <div className="absolute inset-0 bg-cyan-500/20 rotate-45 rounded-lg border border-cyan-500/30"></div>
      <div className="absolute inset-2 bg-[#051024] rotate-45 rounded border border-cyan-500/50"></div>
      <Icon className="w-6 h-6 text-cyan-400 relative z-10" />
    </div>
    <div>
      <div className="text-xs text-cyan-400/70 mb-1">{label} {unit && `(${unit})`}</div>
      <div className={`text-2xl font-bold font-mono ${valueColor}`}>{value}</div>
    </div>
  </div>
);

const HomeDashboardView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex gap-6 overflow-y-auto pb-6 custom-scrollbar">
    {/* Left Column */}
    <div className="flex-1 flex flex-col gap-6 min-w-[500px]">
      {/* 系统资源 */}
      <GlassPanel className="p-6 shrink-0">
        <PanelTitle title="系统资源" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={Cpu} label="GPU" unit="%" value="21.4" />
          <StatCard icon={Cpu} label="CPU" unit="%" value="8.6" />
          <StatCard icon={Zap} label="内存" unit="%" value="57.4" />
        </div>
      </GlassPanel>

      {/* 数据资源 */}
      <GlassPanel className="p-6 shrink-0">
        <PanelTitle title="数据资源" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={Database} label="数据集总数" value="72" />
          <StatCard icon={ImageIcon} label="图片数" value="27714" />
          <StatCard icon={Flag} label="已标注占比" unit="%" value="22" />
        </div>
      </GlassPanel>

      {/* 告警事件趋势 */}
      <GlassPanel className="p-6 flex-1 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between mb-6">
          <PanelTitle title="告警事件趋势" />
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded text-xs">7天</button>
            <button className="px-3 py-1 bg-[#0a1c3a] text-cyan-400/70 border border-[#1e3a8a]/60 rounded text-xs hover:text-white">15天</button>
            <button className="px-3 py-1 bg-[#0a1c3a] text-cyan-400/70 border border-[#1e3a8a]/60 rounded text-xs hover:text-white">30天</button>
          </div>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_CHART_DATA} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4, fill: '#0f172a', stroke: '#22d3ee', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#22d3ee' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>
    </div>

    {/* Right Column */}
    <div className="flex-1 flex flex-col gap-6 min-w-[500px]">
      {/* 算法包及其服务 */}
      <GlassPanel className="p-6 shrink-0">
        <PanelTitle title="算法包及其服务" />
        
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-medium text-cyan-400">算法包汇总</h4>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">初始化算法包</span><span className="text-xl font-mono text-cyan-400">9</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">微模型算法包</span><span className="text-xl font-mono text-cyan-400">11</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">分类算法包</span><span className="text-xl font-mono text-amber-400">22</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">检测算法包</span><span className="text-xl font-mono text-rose-400">17</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">组合算法包</span><span className="text-xl font-mono text-emerald-400">42</span></div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-medium text-cyan-400">推理服务汇总</h4>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">事件类型数量</span><span className="text-xl font-mono text-emerald-400">49</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">推理任务总数</span><span className="text-xl font-mono text-emerald-400">79</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">总视频路数</span><span className="text-xl font-mono text-emerald-400">97</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">预警事件总数</span><span className="text-xl font-mono text-emerald-400">550</span></div>
            <div className="w-px h-4 bg-[#1e3a8a]"></div>
            <div className="flex items-baseline gap-2"><span className="text-cyan-400/70">日均推理次数</span><span className="text-2xl font-mono text-amber-400 font-bold">200435</span></div>
          </div>
        </div>
      </GlassPanel>

      {/* 视频广场 */}
      <GlassPanel className="p-6 flex-1 flex flex-col min-h-[300px]">
        <PanelTitle title="视频广场" />
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#051024]/80 border border-[#1e3a8a]/60 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="flex items-center gap-2 text-cyan-400/70 text-sm mb-2">
              <div className="w-2 h-2 bg-cyan-500 rotate-45"></div>
              接入设备数
            </div>
            <div className="text-3xl font-mono text-cyan-400 font-bold">63</div>
          </div>
          <div className="bg-[#051024]/80 border border-[#1e3a8a]/60 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="flex items-center gap-2 text-cyan-400/70 text-sm mb-2">
              <div className="w-2 h-2 bg-cyan-500 rotate-45"></div>
              在线设备数
            </div>
            <div className="text-3xl font-mono text-cyan-400 font-bold">40</div>
          </div>
          <div className="bg-[#051024]/80 border border-[#1e3a8a]/60 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="flex items-center gap-2 text-cyan-400/70 text-sm mb-2">
              <div className="w-2 h-2 bg-cyan-500 rotate-45"></div>
              离线设备数
            </div>
            <div className="text-3xl font-mono text-cyan-400 font-bold">6</div>
          </div>
        </div>

        <h4 className="text-sm font-medium text-white mb-4">算法已配置设备Top10</h4>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a1c3a]/90 text-xs text-cyan-400 sticky top-0 backdrop-blur-md z-10 border-b border-[#1e3a8a]/60">
                <th className="p-3 font-medium w-1/4">算法包名称</th>
                <th className="p-3 font-medium w-24 text-center">设备数量</th>
                <th className="p-3 font-medium">设备名称列表</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a8a]/40 text-xs text-cyan-100">
              {MOCK_TOP_DEVICES.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#0f2546]/60 transition-colors">
                  <td className="p-3 text-cyan-100">{item.name}</td>
                  <td className="p-3 text-center font-mono">{item.count}</td>
                  <td className="p-3 text-cyan-400/70 truncate max-w-[200px]" title={item.devices}>{item.devices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  </motion.div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'danger' | 'success' | 'warning' }) => {
  const colors = {
    default: 'bg-[#0a1c3a] text-cyan-100 border-[#1e3a8a]/60',
    danger: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${colors[variant]}`}>
      {children}
    </span>
  );
};

// --- Views ---

const VideoMonitoringView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
    className="flex h-full gap-6"
  >
    {/* Sidebar */}
    <GlassPanel className="w-72 flex flex-col overflow-hidden shrink-0">
      <div className="p-4 border-b border-[#1e3a8a]/60/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70" />
          <input 
            type="text" 
            placeholder="搜索设备..." 
            className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="text-xs font-semibold text-cyan-500/50 uppercase tracking-wider mb-2">摄像头列表</div>
        {MOCK_CAMERAS.map(cam => (
          <div key={cam.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#0a1c3a]/50 cursor-pointer group transition-colors">
            <div className="flex items-center gap-3">
              <Video className={`w-4 h-4 ${cam.status === 'online' ? 'text-cyan-400' : 'text-[#1e3a8a]'}`} />
              <span className="text-sm text-cyan-100 group-hover:text-white truncate max-w-[120px]">{cam.name}</span>
            </div>
            <Play className="w-4 h-4 text-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400" />
          </div>
        ))}
      </div>
    </GlassPanel>

    {/* Video Grid */}
    <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 h-full">
      {MOCK_CAMERAS.map((cam) => (
        <GlassPanel key={cam.id} className="relative overflow-hidden group h-full">
          {cam.img ? (
            <>
              <img src={cam.img} alt={cam.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/80 via-transparent to-transparent" />
              
              {/* Simulated AI Bounding Box */}
              {cam.id === 1 && (
                <div className="absolute top-1/4 left-1/3 w-24 h-48 border-2 border-rose-500 bg-rose-500/10 rounded-sm shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                  <div className="absolute -top-6 left-[-2px] bg-rose-500 text-white text-[10px] px-1 py-0.5 whitespace-nowrap">
                    Person 98%
                  </div>
                </div>
              )}

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-xs font-medium text-white drop-shadow-md">LIVE</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div>
                  <h3 className="text-sm font-medium text-white drop-shadow-md">{cam.name}</h3>
                  <p className="text-xs text-cyan-100 drop-shadow-md">{cam.location}</p>
                </div>
                <button className="p-1.5 bg-[#051024]/80 hover:bg-cyan-500/20 text-white rounded-md backdrop-blur-md transition-colors border border-white/10">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#1e3a8a] bg-[#030914]/30">
              <Video className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs">无视频信号</span>
            </div>
          )}
        </GlassPanel>
      ))}
    </div>
  </motion.div>
);

const EventCenterView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-6">
    {/* Filters */}
    <GlassPanel className="p-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70" />
          <input type="text" placeholder="输入任务名称搜索..." className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
        </div>
        <div className="h-6 w-px bg-[#1e3a8a]"></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 text-sm text-white rounded-lg transition-colors border border-[#1e3a8a]/60">
          <Filter className="w-4 h-4" />
          <span>更多筛选</span>
        </button>
      </div>
      <div className="text-sm text-cyan-400/70">
        共发现 <span className="text-cyan-400 font-bold">1,886</span> 个预警
      </div>
    </GlassPanel>

    {/* Alert Grid */}
    <div className="flex-1 overflow-y-auto pr-2 pb-4">
      <div className="grid grid-cols-4 gap-4">
        {MOCK_ALERTS.map((alert) => (
          <GlassPanel key={alert.id} className="overflow-hidden group hover:border-cyan-500/50 transition-colors cursor-pointer">
            <div className="relative h-40">
              <img src={alert.img} alt="Alert" className="w-full h-full object-cover" />
              {/* Simulated Bounding Box */}
              <div className="absolute top-1/4 left-1/2 w-16 h-24 border-2 border-rose-500"></div>
              
              <div className="absolute top-2 right-2">
                <Badge variant="danger">红色预警</Badge>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-white mb-1 truncate" title={alert.taskId}>{alert.taskId}</h4>
              <p className="text-xs text-cyan-400 mb-3">{alert.title}</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-cyan-400/70">
                  <MonitorPlay className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{alert.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-400/70">
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  </motion.div>
);

const AlgorithmManagementView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-6">
    {/* Top Filter Bar */}
    <GlassPanel className="p-4 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-100 whitespace-nowrap">模型名称</span>
          <input type="text" placeholder="请输入模型名称" className="w-48 bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-100 whitespace-nowrap">模型来源</span>
          <div className="relative w-32">
            <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
              <option value="">全部</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-100 whitespace-nowrap">是否可训练</span>
          <div className="relative w-32">
            <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
              <option value="">全部</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-100 whitespace-nowrap">训练状态</span>
          <div className="relative w-32">
            <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
              <option value="">全部</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-100 whitespace-nowrap">是否锁定</span>
          <div className="relative w-32">
            <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
              <option value="">全部</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="px-6 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
            搜索
          </button>
          <button className="px-6 py-1.5 bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 text-white text-sm font-medium rounded transition-colors border border-[#1e3a8a]/60">
            重置
          </button>
        </div>
      </div>
    </GlassPanel>

    {/* Action Bar */}
    <div className="flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
          添加模型
        </button>
        <span className="text-sm text-cyan-400/70">提示：自定义模型授权2000个，已使用757个，剩余1243个</span>
      </div>
      <div className="flex items-center gap-2 text-cyan-400/70">
        <button className="p-1.5 hover:text-cyan-400 transition-colors rounded hover:bg-[#1e3a8a]/40"><LayoutGrid className="w-5 h-5" /></button>
        <button className="p-1.5 hover:text-cyan-400 transition-colors rounded hover:bg-[#1e3a8a]/40"><List className="w-5 h-5" /></button>
      </div>
    </div>

    {/* Grid of Cards */}
    <div className="flex-1 overflow-auto pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_ALGORITHMS.map((algo) => (
          <GlassPanel key={algo.id} className="p-4 flex flex-col gap-4 hover:border-cyan-500/50 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white truncate max-w-[120px]" title={algo.name}>{algo.name}</span>
                    <span className="text-xs text-cyan-400/70">({algo.version})</span>
                  </div>
                </div>
              </div>
              <Badge variant="default" className="!bg-cyan-500/20 !text-cyan-400 !border-cyan-500/30 shrink-0">{algo.status}</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-cyan-400/70 flex items-center gap-1"><Info className="w-3 h-3"/> 模型来源</span>
                <span className="text-cyan-400 font-medium">{algo.source}</span>
              </div>
              <div className="flex flex-col gap-1 items-center border-l border-r border-[#1e3a8a]/40">
                <span className="text-cyan-400/70 flex items-center gap-1"><PieChart className="w-3 h-3"/> 训练数据</span>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-amber-400">正: {algo.dataPos}</span>
                  <span className="text-rose-400">负: {algo.dataNeg}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-cyan-400/70 flex items-center gap-1"><Settings className="w-3 h-3"/> 是否可训练</span>
                <span className="text-cyan-400 font-medium">{algo.trainable}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e3a8a]/40 mt-auto">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400/70">
                <Clock className="w-3.5 h-3.5" />
                {algo.time}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-cyan-400/70 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs"><Play className="w-3 h-3"/> 训练</button>
                <button className="text-cyan-400/70 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs"><Database className="w-3 h-3"/> 标注库</button>
                <button className="text-cyan-400/70 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4"/></button>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  </motion.div>
);

const SystemManagementView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-6">
    {/* Header/Actions */}
    <GlassPanel className="p-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
          <UserPlus className="w-4 h-4" />
          新增用户
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 text-sm text-white rounded-lg transition-colors border border-[#1e3a8a]/60">
          批量导入
        </button>
      </div>
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70" />
        <input type="text" placeholder="搜索用户名/姓名..." className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
      </div>
    </GlassPanel>

    {/* Table */}
    <GlassPanel className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0a1c3a]/90 text-xs text-cyan-400 uppercase tracking-wider sticky top-0 backdrop-blur-md z-10 border-b border-[#1e3a8a]/60">
              <th className="p-4 font-medium">用户名</th>
              <th className="p-4 font-medium">姓名</th>
              <th className="p-4 font-medium">角色</th>
              <th className="p-4 font-medium">部门</th>
              <th className="p-4 font-medium">状态</th>
              <th className="p-4 font-medium">最后登录</th>
              <th className="p-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e3a8a]/40 text-sm text-cyan-100">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-[#0f2546]/60 transition-colors group">
                <td className="p-4 font-medium text-white">{user.username}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {user.role === '系统管理员' && <Shield className="w-3.5 h-3.5 text-rose-400" />}
                    <span className={user.role === '系统管理员' ? 'text-rose-400' : 'text-cyan-100'}>{user.role}</span>
                  </div>
                </td>
                <td className="p-4 text-cyan-400/70">{user.department}</td>
                <td className="p-4">
                  {user.status === 'active' ? <Badge variant="success">启用</Badge> : <Badge variant="danger">停用</Badge>}
                </td>
                <td className="p-4 text-cyan-400/70">{user.lastLogin}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-cyan-400/70 hover:text-cyan-400 transition-colors" title="编辑"><Edit className="w-4 h-4" /></button>
                    <button className="text-cyan-400/70 hover:text-amber-400 transition-colors" title="重置密码"><Key className="w-4 h-4" /></button>
                    <button className="text-cyan-400/70 hover:text-rose-400 transition-colors" title="删除"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  </motion.div>
);

const DeviceManagementView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex gap-6">
    {/* Left Sidebar - Area Tree */}
    <GlassPanel className="w-64 flex flex-col shrink-0">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-white cursor-pointer font-medium">
          <ChevronDown className="w-4 h-4" />
          <FolderOpen className="w-4 h-4 text-cyan-400" />
          <span>全部</span>
        </div>
        <div className="pl-6 space-y-2 text-sm text-cyan-400/70">
          {['101', '30训推', '香港', '厦门市政', '上级训推30', '中海石油', '五建测试', '吉林高速测试', '售前专用', '天津东疆管控智慧城市', '市政模式视频点位', '平台', '建邺城管', '总部（方案）', '机器狗单兵', '江西省吉安县', '飞行测试器', '湖南通服', '陕西', '飞行器', '默认'].map((area, idx) => (
            <div key={idx} className="flex items-center gap-2 cursor-pointer hover:text-cyan-400 transition-colors">
              <Play className="w-3 h-3" />
              <span className="truncate">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>

    {/* Right Content Area */}
    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
      {/* Top Filters & Actions */}
      <GlassPanel className="p-4 shrink-0 flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap">主要设备名称</span>
            <input type="text" placeholder="请输入主设备名" className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap">主设备ID</span>
            <input type="text" placeholder="请输入主设备ID" className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap">状态</span>
            <div className="relative w-full">
              <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                <option value="">全部</option>
                <option value="online">在线</option>
                <option value="offline">离线</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap">前端IP地址</span>
            <input type="text" placeholder="请输入前端IP地" className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap">平台设备ID</span>
            <input type="text" placeholder="请输入平台设备" className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="col-span-3 flex justify-end gap-2">
            <button className="px-6 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_10px_rgba(8,145,178,0.4)]">
              搜索
            </button>
            <button className="px-6 py-1.5 bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 text-white text-sm font-medium rounded transition-colors border border-[#1e3a8a]/60">
              重置
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-[#1e3a8a]/60/50">
          <button className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_10px_rgba(8,145,178,0.4)]">
            添加主设备
          </button>
          <button className="px-4 py-1.5 bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 text-white text-sm font-medium rounded transition-colors border border-[#1e3a8a]/60">
            批量删除
          </button>
          <span className="text-xs text-cyan-400/70 ml-2">提示：设备接入授权路数为1000路，已使用367路，剩余633路</span>
        </div>
      </GlassPanel>

      {/* Table */}
      <GlassPanel className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a1c3a]/90 text-xs text-cyan-400 font-medium sticky top-0 backdrop-blur-md z-10 border-b border-[#1e3a8a]/60">
                <th className="p-3 w-12 text-center"><input type="checkbox" className="rounded border-[#1e3a8a]/60 bg-[#051024]/80" /></th>
                <th className="p-3">序号</th>
                <th className="p-3">主设备ID</th>
                <th className="p-3">平台设备ID</th>
                <th className="p-3">主要设备名称</th>
                <th className="p-3">设备协议类型</th>
                <th className="p-3">主要设备类型</th>
                <th className="p-3">前端IP地址</th>
                <th className="p-3">状态</th>
                <th className="p-3 text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a8a]/40 text-sm text-cyan-100">
              {MOCK_DEVICE_LIST.map((device, idx) => (
                <tr key={device.id} className="hover:bg-[#0f2546]/60 transition-colors">
                  <td className="p-3 text-center"><input type="checkbox" className="rounded border-[#1e3a8a]/60 bg-[#051024]/80" /></td>
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3 font-mono text-xs">{device.mainDeviceId}</td>
                  <td className="p-3 font-mono text-xs">{device.platformDeviceId}</td>
                  <td className="p-3 text-white">{device.name}</td>
                  <td className="p-3">{device.protocol}</td>
                  <td className="p-3">{device.type}</td>
                  <td className="p-3">{device.ip}</td>
                  <td className="p-3">
                    {device.status === 'online' && <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded">在线</span>}
                  </td>
                  <td className="p-3 text-right pr-6">
                    <div className="flex items-center justify-end gap-3 text-xs">
                      <button className="text-emerald-400 hover:text-emerald-300 transition-colors">详情</button>
                      <button className="text-rose-400 hover:text-rose-300 transition-colors">删除</button>
                      <button className="text-cyan-400 hover:text-cyan-300 transition-colors">参数配置</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Footer */}
        <div className="p-3 border-t border-[#1e3a8a]/60/50 flex items-center justify-between bg-[#030914]/40">
          <span className="text-xs text-cyan-400/70">共 358 项数据</span>
          <div className="flex items-center gap-2 text-xs text-cyan-400/70">
            <div className="relative">
              <select className="appearance-none bg-[#0a1c3a] border border-[#1e3a8a]/60 rounded pl-2 pr-6 py-1 text-cyan-100 focus:outline-none cursor-pointer">
                <option>10项/页</option>
                <option>20项/页</option>
              </select>
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-cyan-400/70 pointer-events-none" />
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">&lt;</button>
              <button className="w-6 h-6 rounded bg-cyan-600 text-white flex items-center justify-center">1</button>
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">2</button>
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">3</button>
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">4</button>
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">5</button>
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">6</button>
              <span>...</span>
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">36</button>
              <button className="w-6 h-6 rounded bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 flex items-center justify-center transition-colors">&gt;</button>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <span>跳至</span>
              <input type="text" defaultValue="1" className="w-8 h-6 bg-[#0a1c3a] border border-[#1e3a8a]/60 rounded text-center text-cyan-100 focus:outline-none" />
              <span>页</span>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  </motion.div>
);

const TaskManagementView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-4 relative">
      <GlassPanel className="p-4 shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex -space-x-1.5 text-amber-500">
            <ChevronRight className="w-5 h-5" />
            <ChevronRight className="w-5 h-5" />
            <ChevronRight className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-wider">任务管理</h3>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap w-16 text-right">任务名称:</span>
            <input type="text" placeholder="请输入任务名称" className="w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap w-16 text-right">风险等级:</span>
            <div className="relative w-full">
              <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                <option value="">请选择风险等级</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap w-16 text-right">起止时间:</span>
            <div className="flex items-center w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded overflow-hidden">
              <input type="text" placeholder="开始时间" className="w-full bg-transparent pl-3 py-1.5 text-sm text-white focus:outline-none" />
              <span className="text-cyan-500/50 px-2">至</span>
              <input type="text" placeholder="结束时间" className="w-full bg-transparent pr-3 py-1.5 text-sm text-white focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap w-16 text-right">任务时效:</span>
            <div className="relative w-full">
              <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                <option value="">请选择任务时效</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap w-16 text-right">启停状态:</span>
            <div className="relative w-full">
              <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                <option value="">请选择启停状态</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400/70 whitespace-nowrap w-16 text-right">事件类型:</span>
            <div className="relative w-full">
              <select className="appearance-none w-full bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                <option value="">请选择事件类型</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-6 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)] ml-2">
              搜索
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[#1e3a8a]/60/50">
          <button 
            onClick={() => { setIsModalOpen(true); setCurrentStep(1); }}
            className="flex items-center gap-2 px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]"
          >
            <Plus className="w-4 h-4" />
            新建任务
          </button>
        </div>
      </GlassPanel>

      <GlassPanel className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a1c3a]/90 text-xs text-cyan-400 font-medium sticky top-0 backdrop-blur-md z-10 border-b border-[#1e3a8a]/60">
                <th className="p-3 pl-6">任务名称</th>
                <th className="p-3">事件类型</th>
                <th className="p-3">风险等级</th>
                <th className="p-3">任务时效</th>
                <th className="p-3">状态</th>
                <th className="p-3">启停状态</th>
                <th className="p-3">创建人</th>
                <th className="p-3">创建时间</th>
                <th className="p-3 text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a8a]/40 text-sm text-cyan-100">
              {MOCK_TASKS.map((task) => (
                <tr key={task.id} className="hover:bg-[#0f2546]/60 transition-colors">
                  <td className="p-3 pl-6 text-white">
                    <span>{task.name}</span>
                  </td>
                  <td className="p-3">{task.type}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs border ${
                      task.risk === '高风险' ? 'border-rose-500/50 text-rose-400' :
                      task.risk === '中风险' ? 'border-amber-500/50 text-amber-400' :
                      'border-emerald-500/50 text-emerald-400'
                    }`}>
                      {task.risk}
                    </span>
                  </td>
                  <td className="p-3">{task.duration}</td>
                  <td className="p-3">
                    <span className={`text-xs ${task.status === '启动准备' || task.status === '全部启动' ? 'text-amber-400' : 'text-rose-400'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs ${task.runStatus === '启动' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {task.runStatus}
                    </span>
                  </td>
                  <td className="p-3">{task.creator}</td>
                  <td className="p-3 font-mono text-xs">{task.createTime}</td>
                  <td className="p-3 text-right pr-6">
                    <div className="flex items-center justify-end gap-2 text-xs">
                      <button className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/40 transition-colors">详情</button>
                      <button className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/40 transition-colors">编辑</button>
                      <button className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/40 transition-colors">告警结果</button>
                      <button className="px-2 py-1 bg-[#1e3a8a] text-cyan-100 rounded hover:bg-[#1e3a8a]/80 transition-colors">{task.runStatus === '启动' ? '停止' : '启动'}</button>
                      <button className="px-2 py-1 bg-[#1e3a8a] text-cyan-100 rounded hover:bg-[#1e3a8a]/80 transition-colors">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-[#1e3a8a]/60/50 flex items-center justify-center gap-4 bg-[#030914]/40">
          <span className="text-xs text-cyan-400/70">Total 81</span>
          <div className="relative">
            <select className="appearance-none bg-[#030914]/60 border border-[#1e3a8a]/60 rounded pl-3 pr-8 py-1 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500/50 cursor-pointer">
              <option>10/page</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-cyan-400/70 pointer-events-none" />
          </div>
          <div className="flex items-center gap-1 text-sm text-cyan-400/70">
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">&lt;</button>
            <button className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center">1</button>
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">2</button>
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">3</button>
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">4</button>
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">5</button>
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">6</button>
            <span>...</span>
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">9</button>
            <button className="w-6 h-6 rounded border border-[#1e3a8a]/60 flex items-center justify-center hover:bg-[#0a1c3a] transition-colors">&gt;</button>
          </div>
          <div className="flex items-center gap-2 text-sm text-cyan-400/70">
            <span>Go to</span>
            <input type="text" defaultValue="1" className="w-10 h-6 bg-[#030914]/60 border border-[#1e3a8a]/60 rounded text-center text-cyan-100 focus:outline-none" />
          </div>
        </div>
      </GlassPanel>

      {/* Create Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl bg-[#051024] border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col relative overflow-hidden"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#1e3a8a]/60/50 bg-[#051024]/80">
                <h3 className="text-lg font-medium text-white mx-auto">新建任务</h3>
                <button onClick={() => setIsModalOpen(false)} className="absolute right-4 text-cyan-400/70 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-center gap-4 p-6">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep >= 1 ? 'bg-cyan-500 text-white' : 'bg-[#1e3a8a] text-cyan-400/70'}`}>1</div>
                  <span className={`text-sm ${currentStep >= 1 ? 'text-cyan-400' : 'text-cyan-400/70'}`}>基本信息</span>
                </div>
                <div className="w-16 h-px bg-[#1e3a8a]"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep >= 2 ? 'bg-cyan-500 text-white' : 'bg-[#1e3a8a] text-cyan-400/70'}`}>2</div>
                  <span className={`text-sm ${currentStep >= 2 ? 'text-cyan-400' : 'text-cyan-400/70'}`}>选择设备</span>
                </div>
                <div className="w-16 h-px bg-[#1e3a8a]"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep >= 3 ? 'bg-cyan-500 text-white' : 'bg-[#1e3a8a] text-cyan-400/70'}`}>3</div>
                  <span className={`text-sm ${currentStep >= 3 ? 'text-cyan-400' : 'text-cyan-400/70'}`}>区域设定</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col items-center">
                {currentStep === 1 && (
                  <div className="w-full max-w-xl space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-right text-sm text-cyan-100"><span className="text-rose-500 mr-1">*</span>任务名称</span>
                      <input type="text" defaultValue="持刀检测事件001" className="flex-1 bg-[#051024]/80 border border-[#1e3a8a]/60 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-right text-sm text-cyan-100"><span className="text-rose-500 mr-1">*</span>事件类型</span>
                      <div className="relative flex-1">
                        <select className="appearance-none w-full bg-[#051024]/80 border border-[#1e3a8a]/60 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                          <option>持刀检测事件001</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-right text-sm text-cyan-100"><span className="text-rose-500 mr-1">*</span>风险等级</span>
                      <div className="relative flex-1">
                        <select className="appearance-none w-full bg-[#051024]/80 border border-[#1e3a8a]/60 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer">
                          <option>高风险</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-right text-sm text-cyan-100"><span className="text-rose-500 mr-1">*</span>任务时效</span>
                      <div className="flex items-center gap-6 flex-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="duration" className="w-4 h-4 text-cyan-500 bg-[#051024] border-[#1e3a8a]/60 focus:ring-cyan-500 focus:ring-offset-[#051024]" />
                          <span className="text-sm text-cyan-100">持续任务</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="duration" className="w-4 h-4 text-cyan-500 bg-[#051024] border-[#1e3a8a]/60 focus:ring-cyan-500 focus:ring-offset-[#051024]" />
                          <span className="text-sm text-cyan-100">周期任务</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="duration" defaultChecked className="w-4 h-4 text-cyan-500 bg-[#051024] border-[#1e3a8a]/60 focus:ring-cyan-500 focus:ring-offset-[#051024]" />
                          <span className="text-sm text-cyan-100">全天候任务</span>
                        </label>
                      </div>
                    </div>
                    <div className="ml-28 p-3 bg-cyan-900/20 border border-cyan-800/50 rounded flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">i</div>
                      <span className="text-sm text-cyan-400">全天候任务无需设置时间范围，将24小时持续运行</span>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="w-full max-w-xl space-y-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-cyan-100"><span className="text-rose-500 mr-1">*</span>选择摄像头设备</span>
                      <div className="relative w-full">
                        <div className="w-full min-h-[40px] bg-[#051024]/80 border border-[#1e3a8a]/60 rounded px-3 py-1.5 flex flex-wrap gap-2 items-center">
                          <div className="flex items-center gap-1 px-2 py-1 bg-[#0a1c3a] rounded border border-[#1e3a8a]/60 text-xs text-cyan-100">
                            持刀设备
                            <X className="w-3 h-3 cursor-pointer hover:text-white" />
                          </div>
                        </div>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/70 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#1e3a8a]/60/50 flex justify-end gap-3 bg-[#051024]/80">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 text-cyan-100 text-sm rounded transition-colors border border-[#1e3a8a]/60">
                  取消
                </button>
                {currentStep > 1 && (
                  <button onClick={() => setCurrentStep(prev => prev - 1)} className="px-6 py-2 bg-[#0a1c3a] hover:bg-[#1e3a8a]/80 text-cyan-100 text-sm rounded transition-colors border border-[#1e3a8a]/60">
                    上一步
                  </button>
                )}
                {currentStep < 3 ? (
                  <button onClick={() => setCurrentStep(prev => prev + 1)} className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm rounded transition-colors">
                    下一步
                  </button>
                ) : (
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm rounded transition-colors">
                    完成
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: '首页大屏', icon: LayoutDashboard },
    { id: 'monitor', label: '视频监控', icon: MonitorPlay },
    { id: 'events', label: '事件中心', icon: AlertTriangle },
    { id: 'tasks', label: '任务管理', icon: FolderKanban },
    { id: 'algorithms', label: '算法管理', icon: Cpu },
    { id: 'devices', label: '设备管理', icon: Camera },
    { id: 'system', label: '系统管理', icon: Settings },
  ];

  return (
    <div className="h-screen w-full bg-[#030914] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzMCwgNTgsIDEzOCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] pointer-events-none opacity-50 z-0"></div>
      
      {/* Top Navigation */}
      <header className="h-16 bg-[#051024]/80 backdrop-blur-xl border-b border-[#1e3a8a]/60 flex items-center justify-between px-6 z-50 shrink-0 relative">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(8,145,178,0.5)]">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400/70 tracking-wide">
            千二训推一体机
          </h1>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${isActive ? 'text-cyan-400' : 'text-cyan-400/70 hover:text-white hover:bg-[#0a1c3a]/50'}`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`} />
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-cyan-400/70 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#051024]"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0a1c3a] border border-[#1e3a8a]/60 flex items-center justify-center cursor-pointer hover:border-cyan-500/50 transition-colors">
            <User className="w-4 h-4 text-cyan-100" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeDashboardView key="home" />}
          {activeTab === 'monitor' && <VideoMonitoringView key="monitor" />}
          {activeTab === 'events' && <EventCenterView key="events" />}
          {activeTab === 'algorithms' && <AlgorithmManagementView key="algorithms" />}
          {activeTab === 'devices' && <DeviceManagementView key="devices" />}
          {activeTab === 'system' && <SystemManagementView key="system" />}
          {activeTab === 'tasks' && <TaskManagementView key="tasks" />}
          
          {/* Placeholder for other tabs */}
          {[''].includes(activeTab) && (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-cyan-500/50"
            >
              <Settings className="w-16 h-16 mb-4 opacity-20 animate-[spin_3s_linear_infinite]" />
              <p className="text-lg">模块开发中...</p>
              <p className="text-sm mt-2">请点击 视频监控、事件中心 或 算法管理 查看演示</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

