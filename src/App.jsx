import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthForm } from "./components/AuthForm";
import { OrganizationSetup } from "./components/OrganizationSetup";
// import { ChatbotIntegration } from "./components/ChatbotIntegration";
import { SetupProgress } from "./components/SetupProgress";
import ScrapingData from "./components/ScrapingData";
import TrainChatbot from "./components/TrainChatbot";
import ChatbotIntegrationTest from "./components/ChatbotIntegrationTest";
import DemoChatbot from "./components/DemoChatbot";

const steps = [
  {
    title: "Create account",
    description: "Set up your BeyondChats account",
  },
  {
    title: "Organization details",
    description: "Tell us about your company",
  },
  {
    title: "Scraping data",
    description: "Scraping data from your website",
  },
  {
    title: "Training chatbot",
    description: "Training the chatbot with your content",
  },
  {
    title: "Integration",
    description: "Set up and test your chatbot",
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [org, setOrg] = useState(null);

  const handleComplete = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep > 4 ? 0 : nextStep);
  };

  const MainContent = () => (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-2/3 glassmorphism flex items-center justify-center rounded-xl p-6">
          {currentStep === 0 && <AuthForm onComplete={handleComplete} />}
          {currentStep === 1 && (
            <OrganizationSetup onComplete={handleComplete} />
          )}
          {currentStep === 2 && (
            <ScrapingData onComplete={handleComplete}/>
          )}
          {
            currentStep === 3 && (
              <TrainChatbot onComplete={handleComplete}/>
            )
          }
          {
            currentStep === 4 && (<ChatbotIntegrationTest onComplete={handleComplete} />)
          }
        </div>
        <div className="w-full md:w-1/3 glassmorphism rounded-xl p-6">
          <SetupProgress currentStep={currentStep} steps={steps} />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/demo-chatbot" element={<DemoChatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;