import React, { useState } from 'react';
import { Download, Settings2, Package, ArrowRight, Check, TerminalSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TabOnboarding() {
  const [activeSubTab, setActiveSubTab] = useState<'quickstart' | 'diy' | 'rental'>('quickstart');

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 p-8 grid grid-cols-12 gap-8"
    >
      <div className="col-span-3 flex flex-col space-y-2">
        <h2 className="text-2xl font-bold text-stone-50 mb-6">Onboarding <br/><span className="text-emerald-500 underline decoration-stone-800 underline-offset-8">Hub</span></h2>
        <SubTabButton
          active={activeSubTab === 'quickstart'}
          onClick={() => setActiveSubTab('quickstart')}
          label="Quick Start"
        />
        <SubTabButton
          active={activeSubTab === 'diy'}
          onClick={() => setActiveSubTab('diy')}
          label="DIY Hardware"
        />
        <SubTabButton
          active={activeSubTab === 'rental'}
          onClick={() => setActiveSubTab('rental')}
          label="Request Kit"
        />
      </div>

      <div className="col-span-9 bg-stone-900 rounded-[2rem] p-10 flex flex-col shadow-2xl relative overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeSubTab === 'quickstart' && <QuickStart key="quickstart" />}
          {activeSubTab === 'diy' && <DiyConfigurator key="diy" />}
          {activeSubTab === 'rental' && <RentalService key="rental" />}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function SubTabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl font-medium transition-colors ${
        active 
          ? 'bg-stone-800 text-emerald-400 border border-emerald-500/20' 
          : 'text-stone-400 hover:bg-stone-900 border border-transparent'
      }`}
    >
      {label}
    </button>
  );
}

function QuickStart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <h3 className="text-xl font-bold mb-2">Download Edge Controller</h3>
      <p className="text-stone-400 text-sm mb-8">Deploy a local instance of the Ecology Edge Control Center on your workstation to begin mapping deployments.</p>
      <div className="bg-black rounded-xl p-6 font-mono text-sm overflow-hidden border border-stone-800 relative">
        <div className="flex space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-emerald-500 mb-2">$ docker-compose up -d ecology-edge-center</div>
        <div className="text-stone-600">Pulling layers... [####################] 100%</div>
        <div className="text-stone-600">Status: Downloaded newer image for ecology/edge-center:latest</div>
        <div className="text-stone-600">Creating ecology-edge-center ... <span className="text-emerald-400">done</span></div>
      </div>
      <div className="mt-auto pt-6 flex items-center justify-between p-6 bg-stone-950 rounded-2xl border border-stone-800 mt-6">
        <p className="text-xs text-stone-500">Once running, navigate to <code className="text-emerald-400 font-mono text-[10px]">localhost:3000</code> to unlock advanced map planning tools.</p>
        <button className="px-6 py-3 bg-emerald-500 text-stone-950 font-bold rounded-lg text-sm shrink-0 hover:bg-emerald-400 transition-colors">Open Documentation</button>
      </div>
    </motion.div>
  );
}

function DiyConfigurator() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const config = {
        network: {
          broker_type: "local_mqtt",
          fallback_tacc: "https://tacc-ingest.ecology-edge.net",
          discovery: "auto_mesh"
        },
        hardware: {
          audio_sentinel: "active",
          camera_trap: "sleep_until_wake",
          power_mode: "ultra_low"
        },
        provisioning: {
          auto_register: true,
          keys_generated: true
        }
      };
      
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backpack-config.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <h3 className="text-xl font-bold mb-2">DIY Configuration Generator</h3>
      <p className="text-stone-400 text-sm mb-8">For custom Raspberry Pi assemblies, generate your unique ecosystem provisioning file.</p>
      
      <div className="bg-stone-950/50 border border-stone-800 p-8 rounded-2xl mb-8 flex-1">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-500 mb-1 block">Topology</label>
            <select className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-sm text-stone-300 focus:outline-none focus:border-emerald-500">
              <option>Concentric-Star (Default)</option>
              <option>Mesh Relay</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-500 mb-1 block">Cloud Target</label>
            <input type="text" value="tacc.cloud.edu" className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-sm text-stone-300 focus:outline-none" readOnly />
          </div>
        </div>
        
        <p className="text-xs text-stone-500 mt-8 max-w-lg leading-relaxed">
           This payload maps your local MQTT broker topologies, Docker Compose overrides, and TACC cloud endpoints. Placing this <code className="text-emerald-400 font-mono">config.json</code> file on your device allows the platform to automatically read, register your custom backpack, and provision secure access keys.
        </p>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {downloading ? (
          <span className="flex h-5 w-5 items-center justify-center mr-2">
             <span className="animate-spin h-4 w-4 border-2 border-stone-950 border-t-transparent rounded-full"></span>
          </span>
        ) : (
          <Download className="w-5 h-5 mr-2" />
        )}
        {downloading ? 'COMPILING JSON...' : 'GENERATE CONFIG.JSON'}
      </button>
    </motion.div>
  );
}

function RentalService() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full text-center py-12"
    >
      <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
         <div className="absolute top-2 right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <Package className="w-10 h-10 text-emerald-500" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-stone-50">Request a Prebuilt Kit</h3>
      <p className="text-stone-400 text-sm max-w-md mb-8 leading-relaxed">
        Ready-to-use AI backpacks for K-12 camps. No setup required. We ship it fully configured to your campsite. Arrives charged, connected, and ready to deploy into the wilderness.
      </p>

      <a 
        href="#"
        onClick={(e) => e.preventDefault()}
        className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-full text-lg shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 group inline-flex items-center gap-2"
      >
        Open Intake Form
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
      <p className="mt-6 text-xs text-stone-600">Rental services available for academic sessions starting 2024.</p>
    </motion.div>
  );
}
