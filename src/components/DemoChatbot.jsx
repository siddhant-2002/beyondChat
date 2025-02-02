import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';

const DemoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Top Bar */}
      <div className="w-full bg-gray-800 text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <span className="text-sm sm:text-base text-center sm:text-left">Chatbot not working as intended? Share feedback</span>
        <button 
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
          onClick={handleNavigateBack}
        >
          Integrate on your website
        </button>
      </div>

      {/* Demo Website Content */}
      <div className="p-4 sm:p-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Your Website</h1>
        <div className="prose max-w-3xl mx-auto">
          <p className="text-sm sm:text-base text-gray-600">
            This is a demo page showing how the chatbot will appear on your website.
            The chatbot widget is located in the bottom-right corner. Click on it to
            start a conversation!
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 sm:mt-8">Sample Content</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      {/* Chatbot Widget */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col items-end space-y-4">
        {isOpen && (
          <div className="bg-white rounded-lg shadow-xl w-[90vw] sm:w-[350px] h-[70vh] sm:h-[500px] overflow-hidden">
            <div className="bg-blue-600 p-3 sm:p-4 text-white flex items-center justify-between">
              <span className="font-semibold text-sm sm:text-base">BeyondChat</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-4 h-[calc(100%-4rem)] flex flex-col">
              <div className="flex-1 overflow-auto">
                <div className="bg-gray-100 rounded-lg p-2 sm:p-3 max-w-[80%] mb-4">
                  <p className="text-sm sm:text-base">👋 Hi! How can I help you today?</p>
                </div>
              </div>
              <div className="border-t pt-3 sm:pt-4">
                <input 
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default DemoChatbot;
