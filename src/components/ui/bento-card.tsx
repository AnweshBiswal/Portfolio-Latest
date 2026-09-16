"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import {
  Briefcase,
  Cpu,
  Users,
  Trophy,
  ArrowUpRight,
  Search,
  CheckCircle,
  Info,
  User,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TabConfig {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  header: string;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: "internship",
    label: "HAL Internship",
    icon: Briefcase,
    header: "Summer Internship 2026",
    description: "Sunabeda, Odisha.",
  },
  {
    id: "robotics",
    label: "NIT Rourkela",
    icon: Cpu,
    header: "Robo-Sumo Representation",
    description: "Represented GIET University at the 2025 Tech Fest.",
  },
  {
    id: "leadership",
    label: "NCC Sergeant",
    icon: Users,
    header: "Contingent Management",
    description: "Mentoring cadets and strengthening unit cohesion.",
  },
  {
    id: "recognition",
    label: "Governor's Gold",
    icon: Trophy,
    header: "Best Cadet (Junior Division)",
    description: "Awarded for exceptional discipline and leadership.",
  },
];

const BentoCard = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const content = useMemo(() => {
    switch (activeTab.id) {
      case "internship":
        return <InternshipDashboard />;
      case "robotics":
        return <RoboticsDashboard />;
      case "leadership":
        return <LeadershipDashboard />;
      case "recognition":
        return <RecognitionDashboard />;
      default:
        return null;
    }
  }, [activeTab.id]);

  return (
    <div className="flex items-center justify-center w-full antialiased pt-8 pb-16">
      <div className="group relative w-full max-w-5xl overflow-hidden rounded-3xl sm:rounded-4xl border border-[#333535] bg-[#1e2020] shadow-2xl transition-all duration-500 m-0">
        <div className="p-6 sm:p-10 space-y-2 z-10 relative pointer-events-none">
          <h2 className="text-xs sm:text-sm text-[#efeee9]/50 uppercase tracking-[0.4em] font-bold">
            Career & Background
          </h2>
          <p className="text-2xl sm:text-4xl text-[#efeee9] font-medium leading-snug max-w-[600px] mt-2">
            A proven track record of technical aptitude and dedicated leadership.
          </p>
        </div>

        <div className="relative w-full h-[380px] sm:h-[500px] overflow-hidden rounded-2xl sm:rounded-[2rem] z-20">
          <div className="absolute top-16 left-8 sm:left-16 w-full h-full bg-[#111212] rounded-3xl border border-foreground/5 opacity-80" />

          <div className="absolute top-8 left-12 sm:left-24 w-full h-full bg-[#0b0c0c] rounded-tl-3xl shadow-xl flex flex-col overflow-hidden ring-1 ring-[#333535]">
            <div className="px-5 py-4 sm:py-5 rounded-tl-3xl border-b border-foreground/10 flex items-center relative backdrop-blur-sm">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#efeee9]/20" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#efeee9]/20" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#efeee9]/20" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="text-[10px] sm:text-xs text-[#efeee9]/50 uppercase font-mono tracking-widest">
                  Experience Focus
                </span>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-40 sm:w-56 border-r border-foreground/10 p-2 sm:p-4 flex flex-col gap-1 sm:gap-2 pt-6 bg-foreground/[0.02] overflow-y-auto">
                <LayoutGroup>
                  {TABS.map((tab) => {
                    const isActive = activeTab.id === tab.id;
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer text-left",
                          isActive
                            ? "text-[#efeee9]"
                            : "text-[#efeee9]/50 hover:text-[#efeee9]"
                        )}
                      >
                        <Icon
                          size={18}
                          className="z-20 shrink-0 relative"
                        />
                        <span className="truncate z-20 relative font-medium">
                          {tab.label}
                        </span>
                        {tab.badge && (
                          <span
                            className={cn(
                              "ml-auto text-[10px] sm:text-xs leading-none py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-md tabular-nums transition-all z-20 relative",
                              isActive
                                ? "bg-foreground/10 text-[#efeee9] border border-foreground/20"
                                : "bg-foreground/5 text-[#efeee9]/50 border border-transparent"
                            )}
                          >
                            {tab.badge}
                          </span>
                        )}

                        {isActive && (
                          <motion.div
                            layoutId="sidebar-pill"
                            className="absolute left-0 w-[2px] h-4 sm:h-5 rounded-full bg-[#efeee9] z-30 border border-foreground/20"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="backgroundIndicator"
                            className="absolute inset-0 rounded-lg bg-foreground/5 border border-foreground/10"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </LayoutGroup>
              </div>

              <div className="flex-1 bg-transparent p-4 sm:p-8 pt-6 sm:pt-8 flex flex-col gap-4 sm:gap-6 overflow-hidden relative">
                <header className="flex flex-col gap-1 sm:gap-2 z-10">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#efeee9] tracking-tight line-clamp-1 uppercase opacity-80">
                    {activeTab.header}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#efeee9]/50 font-normal leading-tight line-clamp-1">
                    {activeTab.description}
                  </p>
                </header>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1 z-10 h-full flex flex-col"
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#0b0c0c] to-transparent pointer-events-none z-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoCard;

const InternshipDashboard = () => (
  <div className="flex flex-col gap-4 sm:gap-6 h-full">
    <div className="relative p-5 sm:p-6 rounded-xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent overflow-hidden">
      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-[#efeee9]/50">
            Organization
          </span>
          <ArrowUpRight
            size={16}
            className="text-[#efeee9]/70"
          />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <span className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#efeee9]">
            H.A.L.
          </span>
          <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="h-full bg-[#efeee9] rounded-full"
            />
          </div>
        </div>
        <span className="text-xs sm:text-sm text-[#efeee9]/50">
          Hindustan Aeronautics Limited
        </span>
      </div>
      <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12">
        <Briefcase size={80} />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <div className="p-4 sm:p-5 rounded-xl border border-foreground/10 bg-foreground/5 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm sm:text-base font-medium text-[#efeee9]">2026</span>
          <span className="text-xs sm:text-sm text-[#efeee9]/50 uppercase font-medium">
            Timeline
          </span>
        </div>
        <Search size={20} className="opacity-20 text-[#efeee9]" />
      </div>
      <div className="p-4 sm:p-5 rounded-xl border border-foreground/10 bg-foreground/5 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm sm:text-base font-medium text-[#efeee9]">Sunabeda</span>
          <span className="text-xs sm:text-sm text-[#efeee9]/50 uppercase font-medium">
            Location
          </span>
        </div>
        <Info
          size={20}
          className="opacity-20 text-[#efeee9]"
        />
      </div>
    </div>
  </div>
);

const RoboticsDashboard = () => (
  <div className="flex flex-col gap-4 sm:gap-6 h-full">
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {[
        {
          title: "Robo-Sumo",
          desc: "Technical Event.",
          icon: Cpu,
        },
        {
          title: "Tech Fest 25",
          desc: "NIT Rourkela.",
          icon: Trophy,
        },
      ].map((card, i) => (
        <div
          key={i}
          className="p-4 sm:p-6 rounded-xl border border-foreground/10 bg-foreground/5 flex flex-col gap-4 relative overflow-hidden group"
        >
          <div className="flex flex-col gap-1.5 z-10">
            <span className="text-base sm:text-xl font-medium text-[#efeee9] leading-tight">
              {card.title}
            </span>
            <span className="text-xs sm:text-sm text-[#efeee9]/50 leading-tight">
              {card.desc}
            </span>
          </div>
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10 scale-150 rotate-12">
             <card.icon size={64} />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto p-4 sm:p-5 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-1.5 sm:p-2 rounded-md bg-[#111212] border border-foreground/10">
          <Info
            size={16}
            className="text-[#efeee9]/50"
          />
        </div>
        <span className="text-xs sm:text-sm text-[#efeee9]/50 font-medium">
          Represented GIET University
        </span>
      </div>
      <CheckCircle
        size={18}
        className="text-[#efeee9]/50"
      />
    </div>
  </div>
);

const LeadershipDashboard = () => (
  <div className="flex flex-col h-full not-prose">
    <div className="rounded-xl border border-foreground/10 overflow-hidden flex flex-col h-full bg-foreground/5">
      <div className="bg-foreground/5 px-4 py-3 sm:px-5 sm:py-4 border-b border-foreground/10 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-[#efeee9]/50 uppercase tracking-wider">
          Unit Cohesion
        </span>
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#111212] border border-foreground/10">
          <Shield
            size={14}
            className="text-[#efeee9]/50"
          />
          <span className="text-[10px] sm:text-xs text-[#efeee9]/50 font-medium">
            Leadership
          </span>
        </div>
      </div>
      <div className="p-2 sm:p-3 flex flex-col gap-1 sm:gap-2">
        {[
          {
            name: "Contingent Management",
            role: "Mentored cadets",
            color: "bg-[#efeee9]",
          },
          {
            name: "Drill Instruction",
            role: "Led formations",
            color: "bg-[#979ea6]",
          },
          {
            name: "Responsibility",
            role: "Strengthened discipline",
            color: "bg-[#979ea6]",
          },
        ].map((user, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 sm:p-4 rounded-lg hover:bg-foreground/5 transition-colors group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center relative">
              <User
                size={16}
                className="text-[#efeee9]/50"
              />
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-[#0b0c0c]",
                  user.color
                )}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1 gap-0.5">
              <span className="text-sm sm:text-base font-medium text-[#efeee9] truncate">
                {user.name}
              </span>
              <span className="text-xs sm:text-sm text-[#efeee9]/50 truncate">
                {user.role}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <CheckCircle
                size={18}
                className="text-[#efeee9]/50"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RecognitionDashboard = () => (
  <div className="flex flex-col gap-4 sm:gap-6 h-full overflow-hidden">
    <div className="flex-1 rounded-xl border border-foreground/10 flex flex-col bg-foreground/5 overflow-hidden">
      <div className="bg-foreground/5 px-4 py-3 sm:px-5 sm:py-4 border-b border-foreground/10 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-[#efeee9]/50 uppercase tracking-wider">
          Accolades
        </span>
        <Trophy
          size={16}
          className="text-[#efeee9]/30"
        />
      </div>
      <div className="flex-1 p-2 sm:p-3 overflow-y-auto scrollbar-hide flex flex-col gap-1 sm:gap-2">
        {[
          {
            file: "Governor's Gold Medal",
            size: "State Level",
            type: "Award",
            icon: Trophy,
          },
          {
            file: "Best Cadet Award",
            size: "Junior Div.",
            type: "Title",
            icon: Shield,
          },
          {
            file: "Discipline & Leadership",
            size: "Exceptional",
            type: "Trait",
            icon: CheckCircle,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-foreground/5 border border-foreground/10 flex items-center justify-center text-[#efeee9]/60 group-hover:text-[#efeee9] transition-colors">
              <item.icon size={18} />
            </div>
            <div className="flex flex-col min-w-0 flex-1 gap-0.5">
              <span className="text-sm sm:text-base font-medium text-[#efeee9] truncate">
                {item.file}
              </span>
              <span className="text-xs sm:text-sm text-[#efeee9]/50 tabular-nums uppercase">
                {item.size} • {item.type}
              </span>
            </div>
            <ArrowUpRight
              size={16}
              className="text-[#efeee9]/50 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
