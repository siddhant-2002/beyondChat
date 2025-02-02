import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Mail, Share2, ExternalLink, CheckCircle, Loader2 } from 'lucide-react';
import JSConfetti from 'js-confetti';

const ChatbotIntegrationTest = ({ onComplete }) => {
  const [integrationStatus, setIntegrationStatus] = useState('pending'); // 'pending', 'success', 'testing'
  const navigate = useNavigate();
  
  const dummyIntegrationCode = `
<!-- BeyondChat Widget -->
<script>
  window.beyondChatConfig = {
    botId: 'demo-bot-id',
    position: 'bottom-right'
  };
</script>
<script src="https://cdn.beyondchat.ai/widget.js" async></script>
  `.trim();

  const handleTestChatbot = () => {
    navigate('/demo-chatbot');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(dummyIntegrationCode);
  };

  const handleEmailInstructions = () => {
    navigate('mailto:?subject=BeyondChat Integration Instructions&body=' + 
      encodeURIComponent('Here are your integration instructions for BeyondChat...'));
  };

  const handleTestIntegration = () => {
    setIntegrationStatus('testing');
    setTimeout(() => {
      setIntegrationStatus('success');
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }, 2000);
  };

  const handleShare = (platform) => {
    const shareText = "I just integrated BeyondChat into my website! Check it out!";
    const shareUrl = window.location.origin;
    
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(shareText)}`
    };

    window.open(shareLinks[platform], '_blank');
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleTestChatbot}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-5 h-5" />
          <span>Test Chatbot</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Integrate on your website</span>
        </button>

        <button
          onClick={handleTestIntegration}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Test Integration</span>
        </button>
      </div>

      <div className="space-y-6">
        {integrationStatus === 'pending' && (
          <div className="space-y-6">
            {/* Integration Code Section */}
            <div className="bg-white/10 shadow-xl backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Integrate on your website
              </h3>
              
              <div className="relative">
                <pre className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                  {dummyIntegrationCode}
                </pre>
                <button
                  onClick={handleCopyCode}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white rounded-lg"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleEmailInstructions}
                className="mt-4 w-full sm:w-auto px-4 py-2 text-gray-300 hover:text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Mail instructions to developer</span>
              </button>
            </div>
          </div>
        )}

        {integrationStatus === 'testing' && (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">
              Testing your integration...
            </h3>
          </div>
        )}

        {integrationStatus === 'success' && (
          <div className="bg-gray-800 rounded-xl p-4 sm:p-8 text-center">
            <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
              Integration Successful! 🎉
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/admin-panel')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Explore Admin Panel</span>
              </button>
              <button
                onClick={handleTestChatbot}
                className="w-full sm:w-auto px-6 py-3 border border-blue-600 hover:bg-blue-600/10 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Start talking to your chatbot</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => handleShare('facebook')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Share on Facebook</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Tweet about it</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Post on LinkedIn</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotIntegrationTest;
