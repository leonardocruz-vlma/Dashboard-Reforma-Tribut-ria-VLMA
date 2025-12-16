import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import Dashboard from './components/Dashboard';
import ScenarioSelector from './components/ScenarioSelector';
import Footer from './components/Footer';
import { generateTransitionData, scenarios } from './data';
import { TaxScenario } from './types';

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedScenario, setSelectedScenario] = useState<TaxScenario>(scenarios[0]);

  // Regenerate data whenever the scenario changes
  const fullDataSeries = useMemo(() => {
    return generateTransitionData(selectedScenario.rate);
  }, [selectedScenario]);

  // Memoize the data selection to avoid unnecessary lookups
  const currentData = useMemo(() => {
    return fullDataSeries.find(d => d.year === selectedYear) || fullDataSeries[0];
  }, [selectedYear, fullDataSeries]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1E1423] font-sans selection:bg-[#FFF4D6] selection:text-[#1E1423] flex flex-col">
      <Header />
      
      {/* Sticky Double Header Container */}
      <div className="sticky top-0 z-50 bg-white shadow-md border-b border-[#E5E7EB]">
        <ScenarioSelector 
            currentScenario={selectedScenario} 
            onSelect={setSelectedScenario} 
        />
        <Timeline 
          selectedYear={selectedYear} 
          onYearChange={setSelectedYear} 
        />
      </div>
      
      <main className="flex-grow">
        <Dashboard 
            selectedData={currentData} 
            fullSeries={fullDataSeries}
            scenario={selectedScenario}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;