import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🤝 បញ្ជីជំនាញទន់ (Soft Skills) ទុកដដែល ឬអាចធ្វើ Dynamic តាមក្រោយបាន
  const softSkills = [
    "ដោះស្រាយបញ្ហា (Problem Solving)",
    "ការងារជាក្រុម (Teamwork)",
    "ការប្រាស្រ័យទាក់ទង (Communication)",
    "រៀនសូត្ររហ័ស (Fast Learner)",
  ];

  // 🔄 ទាញទិន្នន័យជំនាញពី Database ពេល Component បើកដំបូង
  useEffect(() => {
    axios
      .get("http://localhost/portfolio-api/get_skills.php")
      .then((response) => {
        setSkills(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
        setLoading(false);
      });
  }, []);

  // 🎨 មុខងារជំនួយសម្រាប់ផ្ដល់ពណ៌ Gradient ទៅតាមប្រភេទជំនាញ (កុំឱ្យមើលទៅរាបស្មើពេក)
  const getSkillColor = (name) => {
    const tech = name.toLowerCase();
    if (tech.includes("react") || tech.includes("next"))
      return "from-cyan-400 to-blue-500";
    if (tech.includes("tailwind") || tech.includes("css"))
      return "from-sky-400 to-teal-500";
    if (tech.includes("js") || tech.includes("javascript"))
      return "from-yellow-400 to-amber-500";
    if (tech.includes("php")) return "from-indigo-400 to-purple-500";
    if (
      tech.includes("mysql") ||
      tech.includes("db") ||
      tech.includes("database")
    )
      return "from-blue-500 to-cyan-600";
    if (tech.includes("git") || tech.includes("hub"))
      return "from-emerald-400 to-green-600";

    // ពណ៌លំនាំដើម ប្រសិនបើជាជំនាញផ្សេងៗដែលបន្ថែមថ្មី
    return "from-cyan-500 to-purple-500";
  };

  return (
    <section
      id="skills"
      className="bg-[#030712] text-slate-100 py-20 px-4 sm:py-28 relative overflow-hidden"
    >
      {/* 🔮 Background Glow Effect */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono mb-4 uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>{" "}
            Abilities
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase font-khmer">
            ជំនាញរបស់ខ្ញុំ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-sans">
              Skills
            </span>
          </h2>
          <div className="w-12 h-[3px] bg-cyan-500 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* ─── LEFT/CENTER: TECHNICAL SKILLS (GRID 2 COLUMNS) ─── */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading ? (
              // បង្ហាញអក្សរកំពុងដើរនៅពេល API កំពុងទាញទិន្នន័យ
              <div className="sm:col-span-2 text-center py-10 text-slate-500 font-mono">
                Loading skills from database...
              </div>
            ) : skills.length === 0 ? (
              // បើមិនទាន់មានទិន្នន័យក្នុង DB
              <div className="sm:col-span-2 text-center py-10 text-slate-600 font-mono">
                No skills found. Add some in Admin Panel!
              </div>
            ) : (
              // បង្ហាញទិន្នន័យចេញពី Database
              skills.map((skill, index) => (
                <div
                  key={skill.id || index}
                  className="group relative flex items-center gap-4 bg-[#0b1329]/30 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 hover:bg-[#0b1329]/50 transition-all duration-300"
                >
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl group-hover:border-cyan-500/30 transition-colors duration-300">
                    {skill.icon || "⚡"}
                  </div>

                  {/* Skill Info */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                      {skill.level}
                    </span>
                  </div>

                  {/* ⚡ ខ្សែបន្ទាត់ពន្លឺតូចខាងក្រោមប្រអប់ពេល Hover */}
                  <div
                    className={`absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r ${getSkillColor(skill.name)} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}
                  ></div>
                </div>
              ))
            )}
          </div>

          {/* ─── RIGHT: SOFT SKILLS ─── */}
          <div className="bg-[#0b1329]/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2 font-khmer">
              <span className="text-cyan-400 font-mono">&lt;/&gt;</span>{" "}
              ជំនាញការងារ
            </h3>

            <ul className="space-y-4">
              {softSkills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-sm text-slate-400 font-khmer font-light"
                >
                  {/* 🟢 សញ្ញាគ្រីសខៀវ */}
                  <span className="flex-shrink-0 w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">
                    ✓
                  </span>
                  {skill}
                </li>
              ))}
            </ul>

            {/* បន្ទះកូដលម្អ */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 font-mono text-[11px] text-slate-600">
              <p>// Continuously learning</p>
              <p>and adapting to new tech.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
