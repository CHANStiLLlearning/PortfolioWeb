import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/get_projects.php`)
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("មានបញ្ហាក្នុងការទាញទិន្នន័យ៖", error);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="projects"
      className="bg-[#030712] text-slate-100 py-20 px-4 sm:py-28 relative overflow-hidden"
    >
      {/* 🔮 Background Decorative Elements (ពន្លឺអូរ៉ូរ៉ាពីក្រោយកូដ) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono mb-4 uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> My
            Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">
              Projects
            </span>
          </h2>
          <div className="w-12 h-[3px] bg-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* ─── STATE HANDLING (LOADING / EMPTY) ─── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 text-xs font-mono tracking-wider">
              LOADING_DATA...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/20 backdrop-blur-md rounded-2xl border border-slate-800/60 border-dashed max-w-md mx-auto">
            <p className="text-slate-500 font-mono text-sm">
              NO_PROJECTS_FOUND_IN_DATABASE
            </p>
          </div>
        ) : (
          /* ─── NEW RESPONSIVE CARD GRID ─── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className="group relative flex flex-col h-full bg-[#0b1329]/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300"
              >
                {/* IMAGE CONTAINER WITH GRADIENT OVERLAY */}
                <div className="w-full aspect-[16/10] bg-slate-900 overflow-hidden relative">
                  {project.image ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600 font-mono text-xs">
                      [ NULL_IMAGE ]
                    </div>
                  )}
                  {/* ស្រមោលខ្មៅព័ទ្ធពីលើរូបភាពឱ្យលេចអក្សរ និងមើលទៅទាក់ទាញ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* CARD BODY */}
                <div className="p-6 flex flex-col flex-1 justify-between -mt-8 relative z-10">
                  <div className="space-y-4">
                    {/* TECH TAGS */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech ? (
                        project.tech.split(",").map((techName, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-950 text-slate-400 group-hover:text-cyan-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-slate-800 group-hover:border-cyan-500/20 transition-colors duration-300"
                          >
                            {techName.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-700 text-[10px] font-mono">
                          GENERAL
                        </span>
                      )}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* FOOTER ACTION */}
                  <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs font-mono tracking-widest text-slate-500 uppercase group-hover:text-slate-300 transition-colors duration-300">
                      View Details
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-slate-950 transition-all duration-300">
                      <svg
                        className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ⚡ Top Border Glowing Effect (ខ្សែរត់តុបតែងពេល Hover) */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
