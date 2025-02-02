import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export function SetupProgress({ currentStep, steps }) {
  return (
    <div className="px-6 py-8 flex items-center justify-center rounded-xl shadow-lg  ">
      <div className="space-y-6 bg-white/10 p-8 shadow-xl backdrop-blur-lg rounded-lg w-full max-w-md border border-white/20">
        {steps.map((step, index) => (
          <div 
            key={step.title} 
            className={`flex items-start p-3 rounded-lg transition-all duration-300 ${index === currentStep ? 'bg-blue-500/20' : 'hover:bg-white/10'}`}
          >
            <div className="flex-shrink-0">
              {index <= currentStep ? (
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              ) : (
                <Circle className={`h-6 w-6 ${index === currentStep ? 'text-blue-400' : 'text-gray-600'}`} />
              )}
            </div>
            <div className="ml-4">
              <p className={`text-base font-medium ${index <= currentStep ? 'text-white' : 'text-gray-300'}`}>
                {step.title}
              </p>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}