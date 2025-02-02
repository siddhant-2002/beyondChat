import React, { useState } from "react";
import { Code, MessageSquare, CheckCircle, Copy, Check } from "lucide-react";

export function ChatbotIntegration({ onComplete }) {
  const [isTestSuccessful, setIsTestSuccessful] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsTestSuccessful(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      '<script src="https://beyondchats.com/widget.js"></script>'
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-lg border border-white/20">
      <h2 className="text-center text-3xl font-bold text-white">
        Almost there!
      </h2>
      <p className="mt-2 text-center text-gray-300">
        Let's get your chatbot up and running
      </p>

      <div className="mt-8 space-y-6">
        <button
          onClick={handleTest}
          disabled={isLoading || isTestSuccessful}
          className={`flex w-full items-center justify-center rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700 hover:scale-105 shadow-lg ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          {isLoading ? "Testing..." : "Test Chatbot"}
        </button>

        <div className="rounded-lg bg-white/10 p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Integration code</span>
            </div>
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              onClick={handleCopy}
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="p-2 rounded bg-black/30 text-sm text-gray-300 overflow-x-auto">
            {'<script src="https://beyondchats.com/widget.js"></script>'}
          </pre>
        </div>

        {isTestSuccessful && (
          <div className="rounded-lg bg-green-500/10 p-4 shadow-md">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-400">
                  Integration successful!
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Your chatbot is ready to use. You can now access your admin
                  panel.
                </p>
                <button
                  type="button"
                  onClick={onComplete}
                  className="mt-4 flex w-full items-center justify-center rounded-lg bg-green-600 p-3 text-white transition hover:bg-green-500 hover:scale-105 shadow-lg"
                >
                  Go to admin panel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
