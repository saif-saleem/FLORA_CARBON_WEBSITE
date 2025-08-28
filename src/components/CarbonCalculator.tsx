import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trees, Car, Plane } from 'lucide-react';

const CO2_PER_KM_CAR = 0.12; // kg CO2e per km (average car)
const CO2_PER_HOUR_FLIGHT = 90; // kg CO2e per passenger per hour
const CO2_ABSORBED_PER_TREE_LIFETIME = 300; // kg CO2

interface CalculatorResult {
  totalEmissions: number;
  treesNeeded: number;
}

const CarbonCalculator: React.FC = () => {
  const [carDistance, setCarDistance] = useState('');
  const [flightHours, setFlightHours] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateFootprint = useCallback(() => {
    const carKm = parseFloat(carDistance) || 0;
    const flightHrs = parseFloat(flightHours) || 0;
    
    const totalEmissions = (carKm * CO2_PER_KM_CAR) + (flightHrs * CO2_PER_HOUR_FLIGHT);
    const treesNeeded = Math.ceil(totalEmissions / CO2_ABSORBED_PER_TREE_LIFETIME);
    
    setResult({ totalEmissions, treesNeeded });
  }, [carDistance, flightHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateFootprint();
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
      <h3 className="text-3xl font-bold mb-6 text-center text-emerald-100 ">Calculate Your Impact</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center bg-emerald-100 p-4 rounded-lg border border-emerald-300">
          <Car className="w-6 h-6 mr-4 text-emerald-600" />
          <div className="flex-grow">
            <label className="text-emerald-800">Car Distance (km/year)</label>
            <input
              type="number"
              min="0"
              value={carDistance}
              onChange={(e) => setCarDistance(e.target.value)}
              className="w-full text-black bg-transparent text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg p-2"
              placeholder="e.g., 10000"
            />
          </div>
        </div>

        <div className="flex items-center bg-emerald-100 p-4 rounded-lg border border-emerald-300 ">
          <Plane className="w-6 h-6 mr-4 text-emerald-600" />
          <div className="flex-grow">
            <label className="text-emerald-800">Flight Hours (per year)</label>
            <input
              type="number"
              min="0"
              value={flightHours}
              onChange={(e) => setFlightHours(e.target.value)}
              className="w-full text-black bg-transparent text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg p-2"
              placeholder="e.g., 20"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
        >
          Calculate & Plant
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 pt-6 border-t border-emerald-300"
        >
          <div className="text-center">
            <p className="text-emerald-100">Your estimated annual carbon footprint is:</p>
            <p className="text-4xl font-bold text-emerald-100 my-2">{result.totalEmissions.toFixed(1)} kg CO₂e</p>
            <div className="flex items-center justify-center gap-4 text-xl font-semibold text-emerald-800 mt-6 bg-emerald-100 p-4 rounded-lg border border-emerald-300">
              <Trees className="w-10 h-10 text-emerald-600" />
              <span className='text-primary-700'>You can offset this by planting <span className="text-primary-700 text-2xl">{result.treesNeeded}</span> trees!</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CarbonCalculator;
