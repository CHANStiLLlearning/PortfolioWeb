import React from "react";
import img from "../assets/keokimchan.png";

export default function Hero() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#030712] text-slate-100">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="mx-auto max-w-[28rem] overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40">
              <img src={img} alt="Profile of Keo Kimchan" className="h-96 w-full object-cover" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex font-khmer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-xl font-medium uppercase tracking-[0.3em] text-cyan-300 shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
                ត្រៀមខ្លួនរួចសម្រាប់គំរោងថ្មី
              </span>

              <div>
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Keo Kimchan
                </h1>
                <div className="mt-3 space-y-2">
                  <p className="ml2 text-3xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text">
                    {Array.from('Full-Stack Web Developer').map((letter, index) => (
                      <span
                        key={index}
                        className="letter"
                        style={{ animationDelay: `${70 * index}ms` }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <p className="w-full text-base leading-10 text-slate-400 xl:text-[25px] sm:text-lg lg:max-w-none font-khmer">
                ខ្ញុំបង្កើត Web applications និងគេហទំព័រដែលមានភាពទាក់ទាញ ល្បឿនលឿន និង UX/UI។ ជាមួយនឹងការរួមគ្នា យើងអាចបម្លែងគំនិតរបស់អ្នកទៅជាបទពិសោធន៍ឌីជីថលពិត។
              </p>

              <div className="flex flex-wrap gap-3 lg:justify-start justify-center">
                <span className="rounded-full bg-slate-900/70 px-4 py-2 text-sm text-slate-200">React</span>
                <span className="rounded-full bg-slate-900/70 px-4 py-2 text-sm text-slate-200">Node.js</span>
                <span className="rounded-full bg-slate-900/70 px-4 py-2 text-sm text-slate-200">Tailwind</span>
                <span className="rounded-full bg-slate-900/70 px-4 py-2 text-sm text-slate-200">Next.js</span>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start mt-6">
                <a
                  href="#projects"
                  className="inline-flex font-khmer items-center justify-center rounded-2xl bg-cyan-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:bg-cyan-300"
                >
                  មើល Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex font-khmer items-center justify-center rounded-2xl border border-slate-800 bg-white/5 px-8 py-3 text-sm font-medium text-slate-200 transition duration-300 hover:border-cyan-400 hover:text-cyan-300"
                >
                  ទាក់ទងខ្ញុំ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
