import { Layout } from "@/components/layout";
import { Terminal, Play, FolderTree, Settings, FileCode, CheckCircle, Package, Database } from "lucide-react";

export default function BrowserIDE() {
  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex flex-col bg-[#1e1e1e] text-slate-300 font-mono">
        {/* IDE Header */}
        <div className="h-12 bg-[#252526] border-b border-[#333] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white font-medium">
              <Terminal className="h-5 w-5 text-blue-400" />
              <span>WebOS Builder</span>
            </div>
            <div className="h-4 w-px bg-[#444] mx-2"></div>
            <div className="flex text-sm">
              <button className="px-3 py-1 hover:bg-[#333] rounded">File</button>
              <button className="px-3 py-1 hover:bg-[#333] rounded">Edit</button>
              <button className="px-3 py-1 hover:bg-[#333] rounded">View</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-sm font-sans transition-colors">
              <Play className="h-4 w-4" /> Run Project
            </button>
            <button className="p-1.5 hover:bg-[#333] rounded text-slate-400">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Activity Bar */}
          <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-[#252526]">
            <button className="text-white hover:text-white"><FolderTree className="h-6 w-6" /></button>
            <button className="text-slate-500 hover:text-white"><SearchIcon /></button>
            <button className="text-slate-500 hover:text-white"><Package className="h-6 w-6" /></button>
            <button className="text-slate-500 hover:text-white"><Database className="h-6 w-6" /></button>
          </div>

          {/* Sidebar */}
          <div className="w-64 bg-[#252526] border-r border-[#333] flex flex-col">
            <div className="px-4 py-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">Explorer</div>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-1 py-2">
                <div className="px-4 py-1 text-sm font-bold text-white flex items-center gap-1 cursor-pointer">
                  <span className="text-[10px]">▼</span> super-app-workspace
                </div>
                
                <div className="pl-6 space-y-1 text-sm">
                  <FileNode name="client" type="folder" isOpen={true} />
                  <div className="pl-4 space-y-1">
                    <FileNode name="src" type="folder" isOpen={true} />
                    <div className="pl-4 space-y-1">
                      <FileNode name="pages" type="folder" isOpen={false} />
                      <FileNode name="components" type="folder" isOpen={false} />
                      <FileNode name="App.tsx" type="file" active={true} icon="react" />
                      <FileNode name="main.tsx" type="file" icon="react" />
                      <FileNode name="index.css" type="file" icon="css" />
                    </div>
                  </div>
                  <FileNode name="server" type="folder" isOpen={false} />
                  <FileNode name="package.json" type="file" icon="json" />
                  <FileNode name="vite.config.ts" type="file" icon="ts" />
                </div>
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e]">
            {/* Tabs */}
            <div className="flex bg-[#2d2d2d] overflow-x-auto custom-scrollbar">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-white min-w-[150px]">
                <span className="text-blue-400 text-lg leading-none">⚛</span>
                <span className="text-sm">App.tsx</span>
                <span className="ml-auto text-slate-500 hover:text-white cursor-pointer rounded-full p-0.5 hover:bg-[#333]">×</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:bg-[#252526] cursor-pointer border-t-2 border-transparent min-w-[150px]">
                <span className="text-yellow-400 text-lg leading-none">{`{}`}</span>
                <span className="text-sm">package.json</span>
              </div>
            </div>

            {/* Code */}
            <div className="flex-1 p-4 overflow-auto font-mono text-sm leading-relaxed" style={{ color: '#d4d4d4' }}>
              <div className="flex">
                <div className="text-[#858585] pr-4 select-none text-right w-12 shrink-0">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1">
<pre className="m-0">
<span className="text-[#c586c0]">import</span> {'{'} <span className="text-[#4fc1ff]">Switch</span>, <span className="text-[#4fc1ff]">Route</span> {'}'} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"wouter"</span>;
<span className="text-[#c586c0]">import</span> {'{'} <span className="text-[#4fc1ff]">queryClient</span> {'}'} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"./lib/queryClient"</span>;
<span className="text-[#c586c0]">import</span> {'{'} <span className="text-[#4fc1ff]">QueryClientProvider</span> {'}'} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"@tanstack/react-query"</span>;
<span className="text-[#c586c0]">import</span> <span className="text-[#4fc1ff]">Home</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"@/pages/home"</span>;
<span className="text-[#c586c0]">import</span> <span className="text-[#4fc1ff]">MarketplaceModule</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"@/pages/marketplace"</span>;
<span className="text-[#c586c0]">import</span> <span className="text-[#4fc1ff]">TravelOSModule</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">"@/pages/travel"</span>;
<br/>
<span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">Router</span>() {'{'}
  <span className="text-[#c586c0]">return</span> (
    <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">Switch</span><span className="text-[#808080]">&gt;</span>
      <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">Route</span> <span className="text-[#9cdcfe]">path</span>=<span className="text-[#ce9178]">"/"</span> <span className="text-[#9cdcfe]">component</span>=<span className="text-[#569cd6]">{'{'}Home{'}'}</span> <span className="text-[#808080]">/&gt;</span>
      <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">Route</span> <span className="text-[#9cdcfe]">path</span>=<span className="text-[#ce9178]">"/marketplace"</span> <span className="text-[#9cdcfe]">component</span>=<span className="text-[#569cd6]">{'{'}MarketplaceModule{'}'}</span> <span className="text-[#808080]">/&gt;</span>
      <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">Route</span> <span className="text-[#9cdcfe]">path</span>=<span className="text-[#ce9178]">"/travel"</span> <span className="text-[#9cdcfe]">component</span>=<span className="text-[#569cd6]">{'{'}TravelOSModule{'}'}</span> <span className="text-[#808080]">/&gt;</span>
      <span className="text-[#6a9955]">{'// Add new modules here'}</span>
    <span className="text-[#808080]">&lt;/</span><span className="text-[#569cd6]">Switch</span><span className="text-[#808080]">&gt;</span>
  );
{'}'}
<br/>
<span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">App</span>() {'{'}
  <span className="text-[#c586c0]">return</span> (
    <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">QueryClientProvider</span> <span className="text-[#9cdcfe]">client</span>=<span className="text-[#569cd6]">{'{'}queryClient{'}'}</span><span className="text-[#808080]">&gt;</span>
      <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">Router</span> <span className="text-[#808080]">/&gt;</span>
    <span className="text-[#808080]">&lt;/</span><span className="text-[#569cd6]">QueryClientProvider</span><span className="text-[#808080]">&gt;</span>
  );
{'}'}
<br/>
<span className="text-[#c586c0]">export default</span> <span className="text-[#4fc1ff]">App</span>;
</pre>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="h-48 border-t border-[#333] bg-[#1e1e1e] flex flex-col">
              <div className="flex bg-[#252526] px-4">
                <button className="px-3 py-1 text-sm border-b-2 border-blue-500 text-white">Terminal</button>
                <button className="px-3 py-1 text-sm border-b-2 border-transparent text-slate-400 hover:text-white">Output</button>
                <button className="px-3 py-1 text-sm border-b-2 border-transparent text-slate-400 hover:text-white">Problems <span className="bg-[#4d4d4d] rounded-full px-1.5 py-0.5 text-[10px] ml-1">0</span></button>
              </div>
              <div className="flex-1 p-3 font-mono text-sm overflow-auto text-slate-300">
                <div className="text-emerald-400">➜  super-app git:(main) ✗ npm run dev</div>
                <div className="text-slate-400 mt-1">&gt; super-app@0.1.0 dev</div>
                <div className="text-slate-400">&gt; vite</div>
                <div className="mt-2 text-emerald-400 font-bold">  VITE v5.0.0  ready in 432 ms</div>
                <div className="mt-2">
                  <span className="text-emerald-400">  ➜</span>  <span className="font-bold text-white">Local:</span>   <span className="text-cyan-400">http://localhost:5000/</span>
                </div>
                <div>
                  <span className="text-emerald-400">  ➜</span>  <span className="font-bold text-white">Network:</span> <span className="text-slate-500">use --host to expose</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FileNode({ name, type, isOpen, active, icon }: { name: string, type: 'file'|'folder', isOpen?: boolean, active?: boolean, icon?: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer ${active ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}>
      {type === 'folder' ? (
        <>
          <span className="text-[10px] text-slate-400">{isOpen ? '▼' : '▶'}</span>
          <FolderTree className="h-4 w-4 text-blue-300" />
        </>
      ) : (
        <>
          <span className="w-2.5"></span>
          {icon === 'react' && <span className="text-blue-400 font-bold text-lg leading-none">⚛</span>}
          {icon === 'css' && <span className="text-blue-300 font-bold leading-none">#</span>}
          {icon === 'json' && <span className="text-yellow-400 font-bold leading-none">{`{}`}</span>}
          {icon === 'ts' && <div className="bg-blue-600 text-white text-[8px] px-0.5 rounded leading-none font-bold">TS</div>}
          {!icon && <FileCode className="h-4 w-4 text-slate-400" />}
        </>
      )}
      <span className={active ? 'text-blue-300' : ''}>{name}</span>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  );
}