import React, { useState, useEffect } from 'react';
import { Brain, Loader2, CheckCircle, ArrowRight, Database, Cpu, MessageSquare } from 'lucide-react';

const TrainChatBot = ({onComplete}) => {
  const [trainingStage, setTrainingStage] = useState('preprocessing');
  const [progress, setProgress] = useState(0);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const stages = {
    preprocessing: {
      title: 'Preprocessing Data',
      description: 'Preparing scraped content for training',
      icon: Database,
      color: 'text-blue-400'
    },
    training: {
      title: 'Training Model',
      description: 'Teaching the chatbot with your content',
      icon: Brain,
      color: 'text-purple-400'
    },
    finetuning: {
      title: 'Fine-tuning',
      description: 'Optimizing responses for accuracy',
      icon: Cpu,
      color: 'text-green-400'
    },
    testing: {
      title: 'Testing',
      description: 'Validating chatbot responses',
      icon: MessageSquare,
      color: 'text-yellow-400'
    }
  };

  const mockChunks = [
    "Company overview and mission statement",
    "Product features and specifications",
    "Customer service policies",
    "Frequently asked questions",
    "Contact information and support hours",
    "Return and refund policies"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chunkInterval = setInterval(() => {
      setCurrentChunk(prev => {
        if (prev >= mockChunks.length - 1) {
          clearInterval(chunkInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(chunkInterval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setTrainingStage('preprocessing');
    } else if (progress < 50) {
      setTrainingStage('training');
    } else if (progress < 75) {
      setTrainingStage('finetuning');
    } else if (progress < 100) {
      setTrainingStage('testing');
    } else if (progress === 100) {
      setTrainingStage('testing');
      setIsComplete(true);
    }
  }, [progress]);

  const handleFinishTraining = () => {
    if (isComplete) {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-white/10 p-4 sm:p-8 shadow-xl backdrop-blur-lg border border-white/20">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">🤖 Training Your ChatBot</h1>
        <p className="text-gray-400">Teaching your chatbot with your website content</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Progress Circle */}
        <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg font-bold text-white">{Math.round(progress)}%</div>
            </div>
            <svg className="transform -rotate-90 w-20 h-20">
              <circle
                cx="40"
                cy="40"
                r="36"
                className="stroke-gray-700 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                className="stroke-blue-500 fill-none"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
            </svg>
          </div>
        </div>

        {/* Training Stages */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(stages).map(([key, stage]) => {
            const isActive = key === trainingStage;
            const isCompleted = Object.keys(stages).indexOf(key) < Object.keys(stages).indexOf(trainingStage) ;
            const StageIcon = stage.icon;

            return (
              <div
                key={key}
                className={`relative rounded-lg p-2 ${
                  isActive ? 'bg-gray-800/60 ring-2 ring-blue-500' : 'bg-gray-800/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className={`flex-shrink-0 p-1 rounded-lg ${isActive ? 'bg-blue-500/20' : 'bg-gray-700/50'}`}>
                      <StageIcon className={`w-5 h-5 ${stage.color}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">{stage.title}</h3>
                      <p className="text-xs text-gray-400 truncate">{stage.description}</p>
                    </div>
                  </div>
                  {isCompleted && (
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Processing */}
      <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
        <h3 className="text-base font-semibold text-white mb-2">Processing Data Chunks</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {mockChunks.map((chunk, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                index === currentChunk
                  ? 'bg-blue-500/20 text-white'
                  : index < currentChunk
                  ? 'bg-gray-800/30 text-gray-400'
                  : 'bg-gray-800/30 text-gray-600'
              }`}
            >
              {index === currentChunk ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-400 flex-shrink-0" />
              ) : index < currentChunk ? (
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-600 flex-shrink-0" />
              )}
              <span className="text-sm">{chunk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 text-sm"
          disabled={progress < 100}
          onClick={handleFinishTraining}
        >
          <span>Finish Training</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TrainChatBot;