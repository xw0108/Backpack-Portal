import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export function TabSandbox() {
  const heatmapCells = Array.from({ length: 13 * 6 }).map((_, i) => {
    // Generate a concentrated hotspot in the middle
    const col = i % 13;
    const row = Math.floor(i / 13);
    const dist = Math.sqrt(Math.pow(col - 6, 2) + Math.pow(row - 2, 2));
    const intensity = Math.max(0.05, 1 - dist / 5);
    const op = intensity * (Math.random() * 0.4 + 0.6);
    
    return (
      <div 
        key={i} 
        className="bg-emerald-500 rounded-sm" 
        style={{ opacity: op }}
      ></div>
    );
  });

  const chartBars = Array.from({ length: 24 }).map((_, i) => {
    // Generate a bimodal distribution curve with some noise
    const peak1 = Math.exp(-Math.pow(i - 8, 2) / 8); // Morning peak
    const peak2 = Math.exp(-Math.pow(i - 17, 2) / 8); // Evening peak
    const height = Math.max(10, (peak1 + peak2 * 0.6) * 100 + Math.random() * 20);
    return (
      <div 
        key={i} 
        className="w-full bg-emerald-500 rounded-t-sm transition-all hover:bg-emerald-400" 
        style={{ height: `${height}%`, opacity: height > 30 ? 1 : 0.4 }}
      ></div>
    );
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 p-8 overflow-y-auto flex flex-col gap-6"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-2 gap-4">
         <div>
            <h2 className="text-4xl font-bold text-stone-50 tracking-tight">Digital Dashboard</h2>
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mt-1">SAMPLE REPORT FOR CAMP COUNSELORS</p>
         </div>
         <div className="text-stone-400 text-sm font-mono bg-stone-900 border border-stone-800 px-4 py-2 rounded-xl">
           May 14, 2025
         </div>
      </div>

      {/* Top Row: Metrics & Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today at a Glance */}
        <div className="lg:col-span-4 bg-stone-900/80 border border-stone-800 rounded-3xl p-6 flex flex-col">
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">Today At A Glance</h3>
           <div className="grid grid-cols-2 gap-6 flex-1">
              <MetricCard value="128" label="Total Visits" />
              <MetricCard value="12" label="Species Detected" />
              <MetricCard value="3h 42m" label="Total Feed Time" />
              <MetricCard value="7AM - 10AM" label="Peak Activity" />
           </div>
        </div>
        
        {/* Visits over time graph */}
        <div className="lg:col-span-8 bg-stone-900/80 border border-stone-800 rounded-3xl p-6 flex flex-col">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Visits Over Time</h3>
             <div className="flex items-center space-x-4 text-[10px] uppercase font-bold text-stone-500">
                <span className="flex items-center"><span className="w-2 h-2 rounded bg-emerald-500 mr-1.5"></span> Visits</span>
             </div>
           </div>
           <div className="h-40 flex items-end justify-between gap-1 flex-1 pb-2 border-b border-stone-800">
              {chartBars}
           </div>
           <div className="flex justify-between text-[10px] text-stone-500 uppercase mt-2 font-mono">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
           </div>
        </div>
      </div>

      {/* Middle Row: Heatmap & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Heatmap Matrix */}
        <div className="lg:col-span-5 bg-stone-900/80 border border-stone-800 rounded-3xl p-6 flex flex-col">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Activity Heatmap</h3>
             <span className="text-[10px] text-stone-500 font-bold bg-stone-950 px-2 py-1 rounded border border-stone-800">
               0 &mdash; 1000
             </span>
           </div>
           <div className="flex flex-1 items-stretch">
              {/* Y Axis */}
              <div className="flex flex-col justify-between text-[10px] font-mono text-stone-500 mr-3 py-1">
                 <span>1 AM</span>
                 <span>5 AM</span>
                 <span>9 AM</span>
                 <span>1 PM</span>
                 <span>5 PM</span>
                 <span>Night</span>
              </div>
              {/* Grid */}
              <div className="flex-1 grid grid-cols-13 grid-rows-6 gap-1" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
                 {heatmapCells}
              </div>
           </div>
           <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-3 ml-[42px]">
              <span>1</span>
              <span>4</span>
              <span>7</span>
              <span>10</span>
              <span>13</span>
           </div>
        </div>

        {/* Species Visit Summary */}
        <div className="lg:col-span-7 bg-stone-900/80 border border-stone-800 rounded-3xl p-6 overflow-hidden flex flex-col">
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Species Visit Summary</h3>
           <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-300">
                 <thead className="text-[10px] text-stone-500 uppercase tracking-wider border-b border-stone-800">
                   <tr>
                     <th className="pb-3 font-semibold">Species</th>
                     <th className="pb-3 font-semibold text-right">Visits</th>
                     <th className="pb-3 font-semibold text-right">Total Time</th>
                     <th className="pb-3 font-semibold text-right">Peak Time</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-stone-800/50">
                   <SpeciesRow species="Northern Cardinal" visits={128} time="3h 42m" peak="7:00 AM" highlight />
                   <SpeciesRow species="Black-capped Chickadee" visits={12} time="1h 42m" peak="7:00 AM" />
                   <SpeciesRow species="Blue Jay" visits={8} time="45m" peak="9:00 AM" />
                   <SpeciesRow species="Tufted Titmouse" visits={5} time="20m" peak="8:00 AM" />
                   <SpeciesRow species="American Goldfinch" visits={3} time="12m" peak="4:00 PM" />
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Bottom Row: What This Means For You */}
      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-lg shadow-emerald-900/5 pb-12">
          <div className="p-4 bg-emerald-900/40 text-emerald-400 rounded-2xl shrink-0">
             <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
             <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">What This Means For You</h3>
             <p className="text-stone-300 text-sm leading-relaxed max-w-4xl">
               <span className="font-semibold text-emerald-300">Actionable Insight:</span> Species detectors showed high Cardinal presence around northern perches. <br className="hidden sm:block" />
               <span className="font-semibold text-emerald-300">Recommendation:</span> Refill the nectar port sections near Station 4 to maintain engagement and ensure continued high-confidence visual confirmations.
             </p>
          </div>
      </div>
    </motion.section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-center items-center text-center p-4 bg-stone-950/50 rounded-2xl border border-stone-800 hover:border-emerald-500/30 transition-colors">
       <div className="text-3xl font-black text-stone-100 tracking-tighter mb-1">{value}</div>
       <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SpeciesRow({ species, visits, time, peak, highlight = false }: { species: string; visits: number; time: string; peak: string; highlight?: boolean }) {
  return (
    <tr className={`transition-colors ${highlight ? 'bg-emerald-950/10' : 'hover:bg-stone-800/30'}`}>
      <td className={`py-3 ${highlight ? 'text-emerald-400 font-semibold' : 'text-stone-200'}`}>
        {species}
      </td>
      <td className="py-3 text-right font-mono text-xs">{visits}</td>
      <td className="py-3 text-right font-mono text-xs text-stone-400">{time}</td>
      <td className="py-3 text-right font-mono text-xs text-stone-400">{peak}</td>
    </tr>
  );
}
