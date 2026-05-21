import React from "react";

export default function Hero() {
  return (
    <section
      id="about"
      className="bg-[#030712] text-slate-100 py-24 px-4 sm:py-32 relative overflow-hidden flex items-center justify-center min-h-[85vh]"
    >
      {/* 🔮 Background Decorative Glow (ពន្លឺអូរ៉ូរ៉ា និងក្រឡាចត្រង្គស៊ីប៊ែរ) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 px-2">
        {/* 🚀 BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] sm:text-xs text-cyan-400 font-mono uppercase tracking-widest mx-auto">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Available for projects
        </div>

        {/* 👑 MAIN TITLE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight uppercase font-khmer">
          សួស្តី! ខ្ញុំបាទ{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 block sm:inline mt-2 sm:mt-0">
            អ្នកអភិវឌ្ឍន៍ Web
          </span>
        </h1>

        {/* 📝 DESCRIPTION */}
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed font-khmer">
          ខ្ញុំជា{" "}
          <span className="text-slate-200 font-medium">
            Full-Stack Web Developer
          </span>{" "}
          ម្នាក់ដែលស្រឡាញ់ការបង្កើតគេហទំព័រដែលមានភាពទំនើប មានល្បឿនលឿន
          និងបទពិសោធន៍ប្រើប្រាស់{" "}
          <span className="text-cyan-400/90 font-mono">UI/UX</span>{" "}
          ងាយស្រួលបំផុត។ នេះជាកន្លែងបង្ហាញពីសមត្ថភាព និងស្នាដៃរបស់ខ្ញុំ។
        </p>

        {/* ⚡ CALL TO ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          {/* Button 1 */}
          <a
            href="#projects"
            className="w-full sm:w-auto relative inline-flex items-center justify-center px-7 py-3 text.5 text-sm font-mono tracking-wider text-slate-950 bg-cyan-400 rounded-xl font-bold overflow-hidden group transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] text-center"
          >
            មើល Projects
          </a>

          {/* Button 2 */}
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-sm font-mono tracking-wider text-slate-300 border border-slate-800 rounded-xl font-medium bg-slate-900/40 backdrop-blur-sm hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 text-center"
          >
            ទាក់ទងខ្ញុំ
          </a>
        </div>
      </div>
    </section>
  );
}
