import React, { useState } from 'react';
import { TIME_CAPSULES, TimeCapsuleEpisode } from '../data/chronicleNotes';
import {
  Play,
  Pause,
  Headphones,
  CheckCircle2,
  Clock,
  Compass,
  Car,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

interface TimeCapsulesRailProps {
  onSelectStopId?: (stopId: string, dayNumber: number) => void;
}

export function TimeCapsulesRail({ onSelectStopId }: TimeCapsulesRailProps) {
  const [playingEpisodeId, setPlayingEpisodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'capsules' | 'audit'>('capsules');

  const handleTogglePlay = (episode: TimeCapsuleEpisode) => {
    if (playingEpisodeId === episode.id) {
      setPlayingEpisodeId(null);
      toast('Paused Time Capsule playback');
    } else {
      setPlayingEpisodeId(episode.id);
      toast.success(`Playing: ${episode.title}`, {
        description: `Narrated audio guide • ${episode.duration}`,
      });
    }
  };

  return (
    <aside className="w-full flex flex-col h-full border-l border-[#e0e5dd] dark:border-[#223027] bg-[#fbfdf9] dark:bg-[#0c100d] overflow-hidden transition-colors">
      {/* Rail Tab Header */}
      <div className="px-4 py-3 border-b border-[#e0e5dd] dark:border-[#223027] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('capsules')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'capsules'
                ? 'font-bold text-[#18201a] dark:text-[#f5f6ed] border-b-2 border-[#f6833b] pb-0.5'
                : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
            }`}
          >
            Time Capsules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'font-bold text-[#18201a] dark:text-[#f5f6ed] border-b-2 border-[#f6833b] pb-0.5'
                : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
            }`}
          >
            Route Audit
          </button>
        </div>

        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#e4eae0] dark:bg-[#16201a] text-[#607065] dark:text-[#88968d]">
          {activeTab === 'capsules' ? 'Audio 3/3' : 'Zero-Backtrack'}
        </span>
      </div>

      {/* Rail Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'capsules' ? (
          <div className="space-y-4">
            <p className="text-xs text-[#607065] dark:text-[#88968d] leading-relaxed">
              Curated audio field capsules and local walking guides with timestamped checkpoints.
            </p>

            {TIME_CAPSULES.map((episode) => {
              const isPlaying = playingEpisodeId === episode.id;
              return (
                <div
                  key={episode.id}
                  className="rounded-sm border border-[#e0e5dd] dark:border-[#223027] bg-white dark:bg-[#121815] p-3.5 space-y-2.5 transition-colors shadow-2xs"
                >
                  {/* Episode Badge & Duration */}
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#607065] dark:text-[#88968d]">
                    <span className="text-[#f6833b] font-semibold">
                      Episode {episode.episodeNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {episode.duration}
                    </span>
                  </div>

                  {/* Title & Play Button */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium text-[#18201a] dark:text-[#f5f6ed] leading-snug">
                        {episode.title}
                      </h4>
                      <p className="text-[11px] text-[#607065] dark:text-[#88968d] mt-0.5 font-mono">
                        {episode.narrator} • {episode.date}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTogglePlay(episode)}
                      className={`p-2 rounded-full cursor-pointer transition-colors shrink-0 ${
                        isPlaying
                          ? 'bg-[#f6833b] text-black shadow-sm animate-pulse'
                          : 'bg-[#ebf0e7] dark:bg-[#1b2520] text-[#18201a] dark:text-[#dfdfc1] hover:bg-[#dbe4d7] dark:hover:bg-[#28362d]'
                      }`}
                      title={isPlaying ? 'Pause' : 'Play audio walkthrough'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>
                  </div>

                  {/* Audio waveform mockup if playing */}
                  {isPlaying && (
                    <div className="p-2 rounded bg-[#f2f5ef] dark:bg-[#0b0d0b] border border-[#e0e5dd] dark:border-[#223027] flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 h-4 flex-1">
                        {[40, 70, 30, 90, 60, 100, 45, 80, 20, 65, 85, 40, 75, 95, 30, 60].map(
                          (h, idx) => (
                            <div
                              key={idx}
                              className="w-1 bg-[#f6833b] rounded-full transition-all duration-300"
                              style={{ height: `${h}%` }}
                            />
                          )
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#f6833b] font-bold">LIVE</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-[#526357] dark:text-[#88968d] leading-relaxed">
                    {episode.description}
                  </p>

                  {/* Chapters */}
                  <div className="pt-2 border-t border-[#ecf0e9] dark:border-[#1b251f] space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#637267] block mb-1">
                      Chapters
                    </span>
                    {episode.chapters.map((chap, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => {
                          if (chap.stopId && onSelectStopId) {
                            onSelectStopId(chap.stopId, episode.dayNumber);
                          }
                          toast(`Focused on: ${chap.title}`, {
                            description: `Timestamp: ${chap.timestamp}`,
                          });
                        }}
                        className="w-full text-left flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-[#ebf0e7] dark:hover:bg-[#19231c] transition-colors cursor-pointer group"
                      >
                        <span className="text-[#38463c] dark:text-[#b8c5bc] group-hover:text-[#f6833b] truncate">
                          {chap.title}
                        </span>
                        <span className="font-mono text-[10px] text-[#637267] shrink-0 ml-2">
                          {chap.timestamp}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Route Optimization Audit */
          <div className="space-y-4">
            <div className="p-3.5 rounded-sm bg-white dark:bg-[#121815] border border-[#e0e5dd] dark:border-[#223027] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#f6833b] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Geographic Efficiency</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#f0f4ed] dark:border-[#1b251f]">
                  <span className="text-[#607065] dark:text-[#88968d]">Road Transit Saved:</span>
                  <span className="font-mono font-bold text-[#2d7745] dark:text-[#78d197]">~50+ km</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f0f4ed] dark:border-[#1b251f]">
                  <span className="text-[#607065] dark:text-[#88968d]">Daily Travel Time:</span>
                  <span className="font-mono font-bold text-[#2d7745] dark:text-[#78d197]">-1.5 to 2 hrs</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f0f4ed] dark:border-[#1b251f]">
                  <span className="text-[#607065] dark:text-[#88968d]">Backtracking Loops:</span>
                  <span className="font-mono font-bold text-[#18201a] dark:text-[#f5f6ed]">
                    0 (Completely Clustered)
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#607065] dark:text-[#88968d]">Closing Time Risks:</span>
                  <span className="font-mono font-bold text-[#2d7745] dark:text-[#78d197]">Neutralized</span>
                </div>
              </div>
            </div>

            {/* Core Optimizations breakdown */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#607065] dark:text-[#88968d]">
                Core Structural Adjustments
              </h4>

              <div className="p-3 rounded-sm bg-white dark:bg-[#121815] border border-[#e0e5dd] dark:border-[#223027] space-y-1 text-xs shadow-2xs">
                <div className="font-semibold text-[#18201a] dark:text-[#dfdfc1] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2d7745] dark:text-[#78d197]" />
                  <span>Petaling Jaya Clustering</span>
                </div>
                <p className="text-[#607065] dark:text-[#88968d] text-[11px] leading-relaxed">
                  Hideaway Cafe was originally assigned to Day 1 (a 30 km detour). It is now grouped into the Petaling Jaya corridor on Day 2.
                </p>
              </div>

              <div className="p-3 rounded-sm bg-white dark:bg-[#121815] border border-[#e0e5dd] dark:border-[#223027] space-y-1 text-xs shadow-2xs">
                <div className="font-semibold text-[#18201a] dark:text-[#dfdfc1] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2d7745] dark:text-[#78d197]" />
                  <span>Sasana Kijang & Lake Gardens</span>
                </div>
                <p className="text-[#607065] dark:text-[#88968d] text-[11px] leading-relaxed">
                  Bank Negara Museum directly precedes Perdana Botanical Gardens, located just 5 minutes down the hill.
                </p>
              </div>

              <div className="p-3 rounded-sm bg-white dark:bg-[#121815] border border-[#e0e5dd] dark:border-[#223027] space-y-1 text-xs shadow-2xs">
                <div className="font-semibold text-[#18201a] dark:text-[#dfdfc1] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2d7745] dark:text-[#78d197]" />
                  <span>Ho Kow Kopitiam Lunch Lock</span>
                </div>
                <p className="text-[#607065] dark:text-[#88968d] text-[11px] leading-relaxed">
                  Scheduled Ho Kow Kopitiam for 12:45 PM on Day 3 to prevent arriving after their strict 2:30 PM afternoon closing.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
