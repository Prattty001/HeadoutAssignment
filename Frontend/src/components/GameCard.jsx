import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { RefreshCw, Share2, MapPin, ImagePlus } from 'lucide-react';

const GameCard = ({ onUpdateScore }) => {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);
  const cardRef = useRef();

  const fetchQuestion = async () => {
    const res = await fetch('http://localhost:5000/api/game/random');
    const data = await res.json();
    setQuestion(data);
    setSelected('');
    setResult(null);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = (option) => {
    setSelected(option);
    const isCorrect = option === question.answer;
    setResult(isCorrect ? 'correct' : 'wrong');
    onUpdateScore(isCorrect);
  };

  const user = new URLSearchParams(window.location.search).get("user");
  const inviteLink = `${window.location.origin}/game?user=Friend&ref=${user}`;
  const whatsappText = ` I just played Globetrotter! Can you beat my score?\nPlay here: ${inviteLink}`;

  const handleShare = () => {
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleGenerateImage = async () => {
    const canvas = await html2canvas(cardRef.current);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'globetrotter-invite.png';
    link.click();
  };

  if (!question) return <div className="text-center">Loading...</div>;

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl overflow-hidden shadow-xl w-full max-w-xl card-shadow-hover animate-fade-in"
    >
      {/* Top Gradient Header */}
      <div className="bg-gradient-to-r from-teal to-purple text-white px-6 py-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-white" />
        <h3 className="text-lg font-semibold">Where am I?</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Clues */}
        <div className="space-y-3">
          {question.clues.map((clue, index) => (
            <div
              key={index}
              className="px-4 py-3 bg-muted rounded-lg border border-muted text-sm text-gray-700"
            >
              “{clue}”
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!result}
              className={`w-full py-3 px-4 rounded-full border font-semibold transition text-left ${
                selected === option
                  ? option === question.answer
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-red-100 border-red-500 text-red-700'
                  : 'bg-white hover:bg-muted border-muted'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Result + Fun Fact */}
        {result && (
          <div className="text-center mt-4">
            <p className="text-lg font-medium">
              {result === 'correct' ? '🎉 Correct!' : '😢 Wrong!'}
            </p>
            <p className="text-sm mt-2 text-gray-600">
              Fun Fact: {question.funFacts[Math.floor(Math.random() * question.funFacts.length)]}
            </p>
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="flex justify-between mt-6 flex-wrap gap-3">
          <button
            onClick={fetchQuestion}
            disabled={!result}
            className="flex items-center gap-2 bg-muted hover:bg-gray-200 text-black px-4 py-2 rounded-full transition disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            Next Question
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition"
          >
            <Share2 className="h-4 w-4" />
            Share on WhatsApp
          </button>

          <button
            onClick={handleGenerateImage}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
          >
            <ImagePlus className="h-4 w-4" />
            Download Share Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
