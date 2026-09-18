import React, { useState } from 'react';
import { ChronicleNote, CHRONICLE_NOTES } from '../data/chronicleNotes';
import { Filter, Sparkles, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface NotesRailProps {
  selectedNoteId: string | null;
  onSelectNote: (note: ChronicleNote) => void;
  onSelectStopId?: (stopId: string, dayNumber: number) => void;
}

export function NotesRail({
  selectedNoteId,
  onSelectNote,
  onSelectStopId,
}: NotesRailProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredNotes = CHRONICLE_NOTES.filter((note) => {
    if (filter === 'all') return true;
    return note.category === filter;
  });

  return (
    <aside className="w-full flex flex-col h-full border-r border-[#e0e5dd] dark:border-[#223027] bg-[#fbfdf9] dark:bg-[#0c100d] overflow-hidden transition-colors">
      {/* Section Header */}
      <div className="px-4 py-3.5 border-b border-[#e0e5dd] dark:border-[#223027] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="font-mono font-bold uppercase text-xs tracking-wider text-[#607065] dark:text-[#88968d] flex items-center gap-2">
            <span>Notes</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#e4eae0] dark:bg-[#16201a] text-[#18201a] dark:text-[#dfdfc1]">
              {filteredNotes.length}
            </span>
          </h2>
        </div>

        {/* Mini category filters */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer ${
              filter === 'all'
                ? 'text-[#f6833b] font-bold bg-[#edf2ea] dark:bg-[#1d1e18]'
                : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter('route')}
            className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer ${
              filter === 'route'
                ? 'text-[#f6833b] font-bold bg-[#edf2ea] dark:bg-[#1d1e18]'
                : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
            }`}
          >
            Route
          </button>
          <button
            type="button"
            onClick={() => setFilter('food')}
            className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer ${
              filter === 'food'
                ? 'text-[#f6833b] font-bold bg-[#edf2ea] dark:bg-[#1d1e18]'
                : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
            }`}
          >
            Food
          </button>
        </div>
      </div>

      {/* Scrollable list of Notes */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#ecf0e9] dark:divide-[#1b251f]">
        {filteredNotes.map((note) => {
          const isSelected = selectedNoteId === note.id;
          return (
            <div
              key={note.id}
              onClick={() => {
                onSelectNote(note);
                if (note.stopId && note.dayNumber && onSelectStopId) {
                  onSelectStopId(note.stopId, note.dayNumber);
                }
              }}
              className={`group flex flex-col gap-1.5 p-4 transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#eaf1e7] dark:bg-[#18241e] border-l-2 border-[#f6833b]'
                  : 'hover:bg-[#f3f7f0] dark:hover:bg-[#131b17]/70'
              }`}
            >
              {/* Date & Metadata */}
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#607065] dark:text-[#88968d]">
                <span>{note.date}</span>
                {note.time && <span className="opacity-75">{note.time}</span>}
              </div>

              {/* Title */}
              <h3 className="text-sm font-medium leading-snug text-[#18201a] dark:text-[#f5f6ed] group-hover:text-[#f6833b] transition-colors flex items-center justify-between gap-1">
                <span>{note.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-[#f6833b]" />
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-[#526357] dark:text-[#88968d] line-clamp-2 leading-relaxed">
                {note.excerpt}
              </p>

              {/* Tag pill */}
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-[#e4ebe1] dark:bg-[#151e19] text-[#425046] dark:text-[#b8c5bc] uppercase">
                  {note.category}
                </span>
                {note.dayNumber && (
                  <span className="text-[10px] font-mono text-[#607065] dark:text-[#76857b]">
                    Day {note.dayNumber}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
