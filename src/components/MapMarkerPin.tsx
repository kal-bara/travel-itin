/**
 * Numbered Map Pin Component
 * Renders a clean, elegant map pin displaying only the stop sequence number
 */

interface MapMarkerPinProps {
  number: number;
  color: string;
  isSelected?: boolean;
}

export function MapMarkerPin({
  number,
  color,
  isSelected = false,
}: MapMarkerPinProps) {
  return (
    <div
      className={`relative flex flex-col items-center cursor-pointer select-none transition-transform duration-150 ${
        isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-20'
      }`}
      style={{
        transformOrigin: 'bottom center',
      }}
    >
      {/* Circular Pin Head with Stop Number */}
      <div
        className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-white font-extrabold text-xs sm:text-[13px] shadow-md border-2 border-white transition-all ${
          isSelected
            ? 'ring-2 ring-stone-900 bg-stone-900 shadow-xl'
            : ''
        }`}
        style={{
          backgroundColor: isSelected ? '#1c1917' : color,
        }}
      >
        <span>{number}</span>
      </div>

      {/* Downward Pointer Tip */}
      <div
        className="w-0 h-0 -mt-0.5 border-x-4 border-x-transparent border-t-[6px]"
        style={{
          borderTopColor: isSelected ? '#1c1917' : color,
          filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.25))',
        }}
      />

      {/* Subtle Anchor Dot */}
      <div className="w-1.5 h-1.5 -mt-0.5 rounded-full bg-stone-700/60 shadow-xs" />

      {/* Active Pulse Ring when Selected */}
      {isSelected && (
        <span className="absolute -bottom-1 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping opacity-75" />
      )}
    </div>
  );
}

export default MapMarkerPin;
