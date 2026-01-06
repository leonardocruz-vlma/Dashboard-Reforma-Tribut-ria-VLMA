import React from 'react';

interface TimelineProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ selectedYear, onYearChange }) => {
    const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

  return (
    <div className="w-full bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        <div className="relative">
          
          {/* Base Line */}
          <div className="absolute top-[6px] left-0 w-full h-[1px] bg-[#E5E7EB] z-0"></div>

          {/* Years Grid */}
          <div className="relative z-10 flex justify-between items-start w-full">
            {years.map((year) => {
              const isActive = year === selectedYear;

              return (
                <button 
                  key={year} 
                  onClick={() => onYearChange(year)}
                  className="group flex flex-col items-center focus:outline-none w-10 cursor-pointer"
                >
                    {/* Marker Container */}
                    <div className="h-3 flex items-center justify-center mb-2">
                        {isActive ? (
                             <div className="w-3 h-3 bg-[#F6B221] rounded-full shadow-sm ring-4 ring-white z-20"></div>
                        ) : (
                            <div className="w-3 h-3 bg-transparent z-10"></div> 
                        )}
                    </div>

                    {/* Year Label */}
                    <span className={`
                        text-xs font-medium transition-all duration-200
                        ${isActive 
                            ? 'text-[#E5A100] font-bold' 
                            : 'text-[#9CA3AF] group-hover:text-[#4B5563]'
                        }
                    `}>
                        {year}
                    </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;