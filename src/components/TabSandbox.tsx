import React from 'react';
import { Activity, Map, Info, AlertTriangle, Terminal, Cpu, Network } from 'lucide-react';
import { motion } from 'motion/react';

export function TabSandbox() {
  const heatmapCells = Array.from({ length: 80 }).map((_, i) => {
    const op = Math.random();
    return (
      <div 
        key={i} 
        className="bg-emerald-500 rounded-sm" 
        style={{ opacity: op > 0.8 ? op : 0.05 }}
      ></div>
    );
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 p-8 grid grid-cols-12 grid-rows-2 gap-4"
    >
      <div className="col-span-7 row-span-2 bg-stone-900 border border-emerald-900/30 rounded-3xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-stone-100">Predictive Activity Heatmap</h3>
          <div className="flex space-x-2 text-[10px] uppercase font-bold text-stone-500">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span> High</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-stone-700 mr-1"></span> Low</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-10 grid-rows-8 gap-1">
          {heatmapCells}
        </div>
        <div className="mt-4 p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl">
           <div className="flex items-center text-emerald-400 mb-1">
             <AlertTriangle className="w-4 h-4 mr-2" />
             <span className="text-xs font-bold">Proactive Smart Alert</span>
           </div>
           <p className="text-[11px] text-stone-400">Insight: Feeder activity dropping. Recommendation: Refill Honeypot bait at Zone B.</p>
        </div>
      </div>
      
      <div className="col-span-5 bg-stone-900 border border-stone-800 rounded-3xl p-6">
        <h3 className="text-sm font-bold text-emerald-400 mb-4 uppercase tracking-widest">Recent Species Visit Insights</h3>
        <div className="space-y-3">
          <InsightRow 
            species="Northern Cardinal"
            desc="Duration: 3h 42m"
            stat="High Activity"
            highlight={true}
          />
          <InsightRow 
            species="Black-capped Chickadee"
            desc="Duration: 1h 42m"
            stat="Moderate"
          />
          <InsightRow 
            species="White-tailed Deer"
            desc="15 Distinct Triggers"
            stat="Critical Insight"
            highlight={true}
          />
        </div>
      </div>
      
      <div className="col-span-5 bg-stone-950 border border-emerald-900/40 rounded-3xl p-6">
         <h3 className="text-xs font-bold text-stone-500 uppercase mb-4">Integrated Ops Center</h3>
         <div className="grid grid-cols-2 gap-4">
           <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800">
             <div className="text-emerald-400 font-mono text-lg font-bold mb-1">SIM_OK</div>
             <div className="text-[10px] text-stone-400 uppercase">Virtual Sensor Simulation</div>
           </div>
           <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800">
             <div className="text-stone-100 font-mono text-lg font-bold mb-1">1.2 TB</div>
             <div className="text-[10px] text-stone-400 uppercase">Edge Telemetry Logs</div>
           </div>
         </div>
      </div>
    </motion.section>
  );
}

function InsightRow({ species, desc, stat, highlight = false }: { species: string; desc: string; stat: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-stone-950/50 rounded-xl border border-stone-800">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-stone-200">{species}</span>
        <span className="text-[10px] text-stone-500">{desc}</span>
      </div>
      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
        highlight 
          ? 'bg-emerald-500/10 text-emerald-400' 
          : 'bg-stone-800 text-stone-500'
      }`}>
        {stat}
      </span>
    </div>
  );
}
