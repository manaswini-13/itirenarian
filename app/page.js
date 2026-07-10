"use client";
import { useEffect, useRef, useState } from "react";
import OrnateFrame from "../components/OrnateFrame";
import "./globals.css";

const Sparkles = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
  </svg>
);
const Compass = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const RefreshCw = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);
const ArrowRight = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const ChevronLeft = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const VIBES = [
  "Royal & Regal",
  "Bohemian & Artistic",
  "Mystic & Spiritual",
  "Culinary Escape",
];

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLetter, setLoadingLetter] = useState("I");
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [currentDestination, setCurrentDestination] = useState("Jaipur");
  const progressTimer = useRef(null);

  async function handleGenerate({ destination, days, budget, vibe }) {
    setError(null);
    setCurrentDestination(destination || "Jaipur");
    setLoadingLetter((destination?.[0] || "I").toUpperCase());
    setLoadingProgress(0);
    setScreen("loading");

    if (progressTimer.current) clearInterval(progressTimer.current);
    progressTimer.current = setInterval(() => {
      setLoadingProgress((p) => (p < 92 ? p + 2 : p));
    }, 100);

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, budget, vibe }),
      });

      if (!res.ok) throw new Error("Server communication issue");
      const data = await res.json();

      if (progressTimer.current) clearInterval(progressTimer.current);
      setLoadingProgress(100);
      setItinerary(data);

      setTimeout(() => setScreen("results"), 300);
    } catch (e) {
      console.error(e);
      if (progressTimer.current) clearInterval(progressTimer.current);
      setError("Scriptorium synchronization error.");
      setScreen("landing");
    }
  }

  return (
    <div className="min-h-screen w-full text-[#2a1a0a] antialiased select-none overflow-x-hidden">
      {screen === "landing" && (
        <Landing
          onGenerate={handleGenerate}
          loading={false}
          loadingLetter={loadingLetter}
          loadingProgress={loadingProgress}
        />
      )}
      {screen === "loading" && (
        <Landing
          onGenerate={handleGenerate}
          loading={true}
          loadingLetter={loadingLetter}
          loadingProgress={loadingProgress}
          destination={currentDestination}
        />
      )}
      {screen === "results" && itinerary && (
        <Results itin={itinerary} onBack={() => setScreen("landing")} />
      )}
    </div>
  );
}

function Landing({
  onGenerate,
  loading,
  loadingLetter,
  loadingProgress,
  destination: loadingDest,
}) {
  const [destination, setDestination] = useState("Jaipur");
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState(45000);
  const [vibe, setVibe] = useState(VIBES[0]);

  function submit(e) {
    e.preventDefault();
    if (!destination || !days || !budget || !vibe) return;
    onGenerate({
      destination: destination.trim(),
      days: Number(days),
      budget: Number(budget),
      vibe,
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#f2e6c8] px-6">
        <div className="relative z-10 flex flex-col items-center">
          <p className="font-display text-sm tracking-[0.4em] uppercase text-[#0f4c3a] mb-2">
            Illuminating
          </p>
          <h2 className="font-serif text-2xl md:text-3xl italic text-[#2a1a0a] mb-10 text-center max-w-xl">
            Composing your journey through {loadingDest || destination}…
          </h2>
          <div
            className="font-gothic text-8xl relative z-10 text-transparent bg-clip-text bg-gradient-to-t from-[#7a5a12] to-[#c9a54a]"
            style={{
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {loadingLetter}
          </div>
          <div className="mt-8 h-[3px] w-72 bg-[#7a5a12]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7a5a12] via-[#f5d97a] to-[#c9a54a]"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-4 font-display text-[10px] tracking-[0.5em] uppercase text-[#7a5a12]">
            Golden light fills the letter… {loadingProgress}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-6"
      style={{ backgroundColor: "#f2e6c8" }}
    >
      <div className="relative z-10 flex items-center gap-3 mb-4">
        <div className="h-px w-24 bg-[#7a5a12]" />
        <Sparkles className="h-4 w-4 text-[#7a5a12]" />
        <div className="h-px w-24 bg-[#7a5a12]" />
      </div>
      <h1 className="relative z-10 font-gothic text-6xl md:text-8xl text-[#7a5a12] drop-shadow-sm select-none">
        Itinerian
      </h1>
      <p className="relative z-10 font-serif text-lg md:text-2xl italic text-[#2a1a0a]/80 mt-2 mb-10">
        Illuminated itineraries, hand-crafted by artificial muses.
      </p>
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-2xl bg-[#faf4e8]/80 backdrop-blur-sm border border-[#7a5a12]/40 rounded-sm p-8 shadow-[0_20px_60px_-20px_rgba(60,40,15,0.5)]"
      >
        <div className="grid gap-6">
          <label className="block">
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#0f4c3a]">
              Destination
            </span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Jaipur, Rome, Kyoto…"
              className="mt-2 w-full bg-transparent border-b-2 border-[#7a5a12]/60 focus:border-[#6e1f2a] outline-none py-2 text-2xl font-serif text-[#2a1a0a]"
              required
            />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#0f4c3a]">
                Days
              </span>
              <input
                type="number"
                min={1}
                max={14}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="mt-2 w-full bg-transparent border-b-2 border-[#7a5a12]/60 focus:border-[#6e1f2a] outline-none py-2 text-2xl font-serif text-[#2a1a0a]"
                required
              />
            </label>
            <label className="block">
              <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#0f4c3a]">
                Budget ( ₹ )
              </span>
              <input
                type="number"
                min={1000}
                step={1000}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-2 w-full bg-transparent border-b-2 border-[#7a5a12]/60 focus:border-[#6e1f2a] outline-none py-2 text-2xl font-serif text-[#2a1a0a]"
                required
              />
            </label>
          </div>
          <label className="block">
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#0f4c3a]">
              Travel Vibe
            </span>
            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="mt-2 w-full bg-[#faf4e8] border-b-2 border-[#7a5a12]/60 focus:border-[#6e1f2a] outline-none py-2 text-2xl font-serif text-[#2a1a0a]"
              required
            >
              {VIBES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="group mt-8 w-full flex items-center justify-center gap-3 py-4 bg-[#0f4c3a] hover:bg-[#6e1f2a] transition-colors text-[#faf4e8] font-display tracking-[0.35em] uppercase text-sm rounded-sm shadow-[inset_0_0_0_1px_rgba(245,217,122,0.5)]"
        >
          <Compass className="h-4 w-4 group-hover:rotate-45 transition-transform" />
          Generate Itinerary
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Results({ itin, onBack }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (containerRef.current) {
        e.preventDefault();
        containerRef.current.scrollLeft += e.deltaY;
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (el) el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const targetDays = Array.isArray(itin.days) ? itin.days : [];

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#1c120c] flex flex-col justify-between">
      {itin.hero_image && (
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40 transition-all duration-700 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${itin.hero_image})`,
            filter: "brightness(0.3) contrast(1.15) sepia(0.4)",
          }}
        />
      )}

      <div className="w-full pt-8 px-8 flex justify-between items-start relative z-40 mix-blend-difference">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-display font-bold tracking-[0.25em] uppercase text-[#faf4e8] hover:text-[#c9a54a] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-gothic text-6xl text-[#faf4e8] tracking-wide capitalize">
            {itin.destination}
          </h2>
          <p className="font-serif text-sm italic text-[#faf4e8]/90 max-w-md mx-auto mt-2 block px-4 leading-relaxed text-center">
            {itin.summary}
          </p>
        </div>
        <div className="text-right">
          <span className="block text-[9px] font-display font-bold tracking-[0.3em] uppercase text-[#faf4e8]/60">
            {targetDays.length} Days Total
          </span>
          <span className="font-display text-xl font-bold text-[#faf4e8]">
            ₹{(itin.total_estimated_cost || 0).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-auto overflow-y-hidden w-full h-[calc(100vh-180px)] items-center px-[8vw] md:px-[12vw] space-x-12 no-scrollbar relative z-30"
      >
        {targetDays.map((day, index) => (
          <DayCard key={day.day || index} day={day} style={itin.style} />
        ))}
      </div>

      <div className="w-full py-4 bg-gradient-to-t from-[#1c120c] to-transparent text-center relative z-40">
        <p className="font-serif italic text-xs text-[#faf4e8]/60 tracking-wider">
          Scroll mouse-wheel downward to advance across the travel codex
          timeline.
        </p>
      </div>
    </div>
  );
}

function DayCard({ day, style }) {
  const [pivoted, setPivoted] = useState(false);

  // Fallback structures to ensure component safety
  const morning = day.morning || {
    time: "09:00 AM",
    activity: "Morning Tour",
    landmark: "Core City",
    cost_inr: 0,
  };
  const afternoon = day.afternoon || {
    time: "01:30 PM",
    activity: "Afternoon Tour",
    landmark: "Core City",
    cost_inr: 0,
  };
  const evening = day.evening || {
    time: "06:00 PM",
    activity: "Evening Tour",
    landmark: "Core City",
    cost_inr: 0,
  };

  return (
    <div className="relative flex-shrink-0 w-[390px] md:w-[430px] h-[550px] flex items-center justify-center p-3">
      <div
        className="relative z-10 w-[calc(100%-44px)] h-[calc(100%-64px)] p-6 rounded-sm shadow-[inset_0_0_30px_rgba(45,30,15,0.22),0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-y-auto card-scroll-container"
        style={{
          backgroundColor: "#f6eedb",
          backgroundImage: `
            radial-gradient(circle at 50% 40%, #fbf9f3 0%, #ecdcb6 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: "multiply",
          border: "1px solid #c0a66f",
        }}
      >
        <style jsx global>{`
          .card-scroll-container {
            cursor: none !important;
          }
          .card-scroll-container::-webkit-scrollbar {
            width: 5px !important;
            cursor: none !important;
          }
          .card-scroll-container::-webkit-scrollbar-thumb {
            background: rgba(122, 90, 18, 0.4) !important;
            border-radius: 9px !important;
            cursor: none !important;
          }
          .card-scroll-container * {
            cursor: none !important;
          }
        `}</style>

        <div className="w-full">
          <div className="flex items-center justify-between">
            <span className="font-display text-[10px] font-bold tracking-[0.3em] uppercase text-[#7a5a12]">
              Day {day.day}
            </span>
            <button
              onClick={() => setPivoted(!pivoted)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-display font-bold tracking-[0.2em] uppercase rounded-sm border transition-all ${
                pivoted
                  ? "bg-[#6e1f2a] text-[#faf4e8] border-[#6e1f2a]"
                  : "border-[#7a5a12]/40 text-[#2a1a0a] hover:bg-[#6e1f2a] hover:text-[#faf4e8]"
              }`}
            >
              <RefreshCw className="h-2.5 w-2.5" />{" "}
              {pivoted ? "Restore" : "Pivot Day"}
            </button>
          </div>

          <h3 className="font-gothic text-3xl mt-3 leading-tight text-[#6e1f2a] font-normal">
            {!pivoted
              ? day.title
              : day.backup_activity?.title || "Alternative Retreat"}
          </h3>
          <p className="font-serif text-xs font-semibold italic text-[#2a1a0a]/60 mt-0.5">
            {!pivoted ? day.theme : "Indoor Sanctuary Retranslation"}
          </p>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#c9a54a] to-transparent" />

          {!pivoted ? (
            <div className="mt-4 space-y-3.5 text-[#2a1a0a]">
              <div className="border-l-2 border-[#c9a54a]/40 pl-3 py-0.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[9px] font-bold tracking-[0.2em] uppercase text-[#0f4c3a]">
                    morning · {morning.time}
                  </span>
                  <span className="font-serif text-xs font-bold text-[#7a5a12]">
                    ₹{(morning.cost_inr || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="font-serif text-sm text-[#2a1a0a] leading-snug mt-0.5">
                  {morning.activity}
                </p>
                <p className="font-serif text-[11px] text-[#6e1f2a] italic font-bold mt-0.5">
                  📍 {morning.landmark}
                </p>
              </div>

              <div className="border-l-2 border-[#c9a54a]/40 pl-3 py-0.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[9px] font-bold tracking-[0.2em] uppercase text-[#0f4c3a]">
                    afternoon · {afternoon.time}
                  </span>
                  <span className="font-serif text-xs font-bold text-[#7a5a12]">
                    ₹{(afternoon.cost_inr || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="font-serif text-sm text-[#2a1a0a] leading-snug mt-0.5">
                  {afternoon.activity}
                </p>
                <p className="font-serif text-[11px] text-[#6e1f2a] italic font-bold mt-0.5">
                  📍 {afternoon.landmark}
                </p>
              </div>

              <div className="border-l-2 border-[#c9a54a]/40 pl-3 py-0.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[9px] font-bold tracking-[0.2em] uppercase text-[#0f4c3a]">
                    evening · {evening.time}
                  </span>
                  <span className="font-serif text-xs font-bold text-[#7a5a12]">
                    ₹{(evening.cost_inr || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="font-serif text-sm text-[#2a1a0a] leading-snug mt-0.5">
                  {evening.activity}
                </p>
                <p className="font-serif text-[11px] text-[#6e1f2a] italic font-bold mt-0.5">
                  📍 {evening.landmark}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 border-l-2 border-[#6e1f2a]/50 pl-3 py-1">
              <span className="font-display text-[9px] font-bold tracking-[0.2em] uppercase text-[#6e1f2a]">
                Alternative Plan
              </span>
              <p className="font-serif text-sm text-[#2a1a0a] mt-1 font-medium leading-relaxed italic">
                "
                {day.backup_activity?.description ||
                  "Enjoy a quiet day inside historical palace libraries."}
                "
              </p>
              <p className="font-serif text-xs font-bold text-[#7a5a12] mt-2">
                Estimated Redirection: ₹
                {(day.backup_activity?.cost_inr || 0).toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 mt-4 border-t border-[#7a5a12]/20 flex items-center justify-between">
          {!pivoted && day.meals && (
            <span className="font-serif text-[11px] text-[#2a1a0a]/70 truncate max-w-[170px] font-medium">
              🍴 {day.meals.lunch}
            </span>
          )}
          <div className="text-right ml-auto">
            <span className="text-[9px] font-display font-bold tracking-[0.1em] text-[#7a5a12] uppercase mr-2">
              Total
            </span>
            <span className="font-display text-lg font-bold text-[#6e1f2a]">
              ₹
              {(!pivoted
                ? day.day_total_inr
                : day.backup_activity?.cost_inr || 0
              ).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
