import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 ទាញទិន្នន័យបទពិសោធន៍ពី Database ពេល Component បើកដំបូង
  useEffect(() => {
    axios
      .get("http://localhost/portfolio-api/get_experiences.php")
      .then((response) => {
        // ប្រសិនបើទិន្នន័យមកជា Array គឺយើងយកមកប្រើ បើមិនមែនទេទម្លាក់មក Array ទទេ
        setExperiences(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="experience"
      className="bg-[#030712] text-slate-100 py-20 px-4 sm:py-28 relative overflow-hidden"
    >
      {/* 🔮 Background Glow Effects */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono mb-4 uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>{" "}
            History
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase font-khmer">
            បទពិសោធន៍{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-sans">
              Experience
            </span>
          </h2>
          <div className="w-12 h-[3px] bg-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* ─── TIMELINE CONTAINER ─── */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-32 space-y-12">
          {loading ? (
            // បង្ហាញនៅពេល API កំពុងទាញទិន្នន័យ
            <div className="text-center py-10 text-slate-500 font-mono">
              Loading experiences from database...
            </div>
          ) : experiences.length === 0 ? (
            // បង្ហាញនៅពេលគ្មានទិន្នន័យក្នុង Database
            <div className="text-center py-10 text-slate-600 font-mono">
              No experiences found. Add some in Admin Panel!
            </div>
          ) : (
            // ─── បង្ហាញទិន្នន័យពិតពី Database ───
            experiences.map((exp, index) => (
              <div key={exp.id || index} className="relative pl-8 group">
                {/* 🔘 ចំណុចរង្វង់នៅលើខ្សែបន្ទាត់ពេលវេលា (Timeline Dot) */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300"></div>

                {/* 📅 កាលបរិច្ឆេទ/រយៈពេល (Duration) - បង្ហាញនៅខាងឆ្វេងលើ Desktop */}
                <div className="sm:absolute sm:left-[-140px] sm:top-1 sm:w-28 text-xs font-mono text-cyan-500/80 uppercase tracking-wider mb-2 sm:mb-0 sm:text-right">
                  {exp.duration}
                </div>

                {/* 📦 ប្រអប់ផ្ទុកព័ត៌មាន (Card Content) */}
                <div className="bg-[#0b1329]/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 hover:bg-[#0b1329]/50 transition-all duration-300">
                  {/* ឈ្មោះមុខតំណែង */}
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 font-khmer">
                    {exp.role}
                  </h3>

                  {/* ឈ្មោះក្រុមហ៊ុន */}
                  <p className="text-slate-400 text-sm font-medium mt-1 font-mono">
                    @ {exp.company}
                  </p>

                  {/* របាយការណ៍លម្អិត */}
                  <p className="text-slate-400 text-sm leading-relaxed mt-4 font-khmer font-light whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
