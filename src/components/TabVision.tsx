import React from 'react';
import { CheckCircle2, Shield, Network, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export function TabVision() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 p-8 grid grid-cols-12 gap-4"
    >
      <div className="col-span-8 bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-10 flex flex-col justify-center overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20"/><path d="M2 12h20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m4.93 19.07 14.14-14.14"/></svg>
        </div>
        <h1 className="text-5xl font-bold text-stone-50 leading-tight mb-6">
          Plug & Play <span className="text-emerald-400 italic">Wildlife Monitoring</span><br/>for K-12 Camps
        </h1>
        <p className="text-lg text-stone-400 max-w-xl leading-relaxed mb-8">
          Bridging the gap between wilderness and advanced AI. We provide edge-networked intelligent backpacks designed to empower citizen science, transform field education, and protect data privacy at the edge.
        </p>
        <div className="flex space-x-4">
          <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 flex-1">
            <div className="text-emerald-400 font-bold mb-1 flex items-center gap-2"><Sprout className="w-4 h-4" /> New Users</div>
            <p className="text-xs text-stone-500">Immediate hardware simulation. Try out the platform right in your browser.</p>
          </div>
          <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 flex-1">
            <div className="text-emerald-400 font-bold mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Directors</div>
            <p className="text-xs text-stone-500">Curriculum-ready tech. Seamlessly integrate advanced AI into student activities.</p>
          </div>
          <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 flex-1">
            <div className="text-emerald-400 font-bold mb-1 flex items-center gap-2"><Network className="w-4 h-4" /> Investors</div>
            <p className="text-xs text-stone-500">Scalable data hubs. Aggregating high-value points to centralized TACC infrastructure.</p>
          </div>
        </div>
      </div>
      <div className="col-span-4 grid grid-rows-3 gap-4">
        <div className="bg-stone-900/80 border border-emerald-500/20 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wider">Networking</h3>
          <p className="text-xs text-stone-400">Our "Bullseye Ambush" strategy uses ultra-low-power local audio sentinels that continuously listen and wake up high-power camera traps via local MQTT channels upon detection.</p>
        </div>
        <div className="bg-stone-900/80 border border-emerald-500/20 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wider">Absolute Privacy</h3>
          <p className="text-xs text-stone-400">On-device processing using Raspberry Pi 4 that runs local real-time face-redaction algorithms. No unredacted human faces ever leave the edge network or leak to cloud storage.</p>
        </div>
        <div className="bg-stone-900/80 border border-emerald-500/20 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wider">Citizen Science</h3>
          <p className="text-xs text-stone-400">Students actively engage with the workflow by validating AI classifications (MegaDetector/BirdNET) via an intuitive swiping UI, contributing to weekly model retraining.</p>
        </div>
      </div>
    </motion.section>
  );
}
