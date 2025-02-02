import React, { useState, useEffect } from "react";
import { CheckCircle, Loader2, Globe, AlertCircle, ArrowRight, Info } from "lucide-react";

const ScrapingData = ({onComplete}) => {
  const [webpages, setWebpages] = useState([
    { url: "https://example.com/page1", status: "pending", progress: 0 },
    { url: "https://example.com/page2", status: "pending", progress: 0 },
    { url: "https://example.com/page3", status: "pending", progress: 0 },
    { url: "https://example.com/page4", status: "pending", progress: 0 },
  ]);

  const dataChunks = {
    "https://example.com/page1": ["Chunk 1", "Chunk 2", "Chunk 3"],
    "https://example.com/page3": ["Chunk A", "Chunk B"],
    "https://example.com/page2": ["Chunk A", "Chunk B","chunk C","chunk D","chunk E","chunk F"],
  };

  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [showDataChunks, setShowDataChunks] = useState(false);

  // Simulate scraping progress with completion
  useEffect(() => {
    const interval = setInterval(() => {
      setWebpages((prev) => {
        const updatedPages = prev.map((page) => {
          if (page.status === "pending") {
            if (page.progress < 100) {
              return { ...page, progress: Math.min(page.progress + 10, 100) }; // Increment progress by 10% but not exceeding 100%
            } else {
              return { ...page, status: "scraped" }; // Mark as scraped when progress reaches 100%
            }
          }
          return page;
        });

        // Check if all pages are complete
        const allComplete = updatedPages.every(page => page.status === "scraped");
        if (allComplete) {
          clearInterval(interval);
        }

        return updatedPages;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [circleSize, setCircleSize] = useState(40);
  // const[corcleSize2,setCircleSize2]=useState(30)
  useEffect(() => {
    const updateSize = () => {
      setCircleSize(window.innerWidth < 640 ? 30 : 40);
    };

    updateSize(); // Run on mount
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const calculateTotalProgress = () => {
    const completedPages = webpages.filter(page => page.status === "scraped").length;
    const inProgressSum = webpages
      .filter(page => page.status === "pending")
      .reduce((acc, page) => acc + page.progress, 0);
    
    const totalPages = webpages.length;
    const progressPercentage = ((completedPages * 100) + inProgressSum) / totalPages;
    
    return Math.round(progressPercentage);
  };

  const totalProgress = calculateTotalProgress();

  const handlePageClick = (url) => {
    setSelectedPage(url);
    setLoading(true);
    setShowDataChunks(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl rounded-2xl bg-white/10 p-4 sm:p-6 shadow-xl backdrop-blur-lg border border-white/20">
      <div className={`grid ${showDataChunks ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Progress Circle */}
            <div className="relative w-20 sm:w-20 h-20 sm:h-20 mx-auto sm:mx-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-lg sm:text-lg font-bold text-white">{totalProgress}%</div>
              </div>
              <svg className="transform -rotate-90 w-20 sm:w-20 h-16 sm:h-20">
                <circle
                  cx={circleSize}
                  cy={circleSize}
                  r="30"
                  className="stroke-gray-700 fill-none"
                  strokeWidth="4"
                />
                <circle
                  cx={circleSize}
                  cy={circleSize}
                  r="30"
                  className="stroke-blue-500 fill-none"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - totalProgress / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
            </div>

            {/* Title and Info */}
            <div className="text-center sm:text-left w-full">
              <h1 className="text-xl sm:text-2xl font-bold text-white">🚀 Train ChatBot</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-gray-300">🔍 Scraping Webpages</h2>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowTooltip('info')}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  {showTooltip === 'info' && (
                    <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
                      We're analyzing your website content to train your chatbot for better responses
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Webpage List */}
          <div className="h-[calc(100vh-380px)] min-h-[300px] overflow-y-auto pr-2 space-y-3">
            {webpages.map((page, index) => (
              <div
                key={index}
                onClick={() => handlePageClick(page.url)}
                className="group cursor-pointer rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="p-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-white">
                      {page.status === "scraped" ? (
                        <CheckCircle className="text-green-400 transition-transform group-hover:scale-110 flex-shrink-0" />
                      ) : (
                        <Loader2 className="animate-spin text-yellow-400 flex-shrink-0" />
                      )}
                      <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-[200px]">{page.url}</span>
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      page.status === "scraped" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {page.status}
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500 ease-out"
                      style={{ width: `${page.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Data Chunks */}
        {showDataChunks && (
          <div className="bg-gray-800/30 rounded-xl p-4">
            {selectedPage ? (
              <div className="h-full">
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-xl font-bold text-white">📦 Data Chunks</h2>
                  <div className="text-sm text-gray-400 truncate max-w-full sm:max-w-[200px]">{selectedPage}</div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center h-[calc(100%-2rem)]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                    {dataChunks[selectedPage] ? (
                      dataChunks[selectedPage].map((chunk, index) => (
                        <div 
                          key={index} 
                          className="rounded-lg bg-gray-800/50 p-3 text-white hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            {chunk}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg bg-gray-800/50 p-4 text-white flex items-center gap-2">
                        <AlertCircle className="text-yellow-400" />
                        <span>No data chunks available</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-400">
                Select a webpage to view its data chunks
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onComplete()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={totalProgress < 100}
        >
          <span>Start Training</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ScrapingData;