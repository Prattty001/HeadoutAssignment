import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import ScoreTracker from '../components/ScoreTracker';

const Game = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [referrerScore, setReferrerScore] = useState(null);
  const [searchParams] = useSearchParams();

  const refUser = searchParams.get("ref");
  const username = localStorage.getItem('username');

  const handleUpdateScore = (isCorrect) => {
    if (isCorrect) setCorrectAnswers(prev => prev + 1);
    setTotalAnswers(prev => prev + 1);
  };

  // Fetch referrer's score
  useEffect(() => {
    if (refUser) {
      axios.get(`http://localhost:5000/api/user/${refUser}`)
        .then((res) => {
          setReferrerScore(res.data.score);
        })
        .catch((err) => {
          console.error("Error fetching inviter score:", err);
          setReferrerScore(null);
        });
    }
  }, [refUser]);

  // Save current user's score to backend
  useEffect(() => {
    if (username) {
      console.log("🔥 Sending score for", username);
      axios.post(`http://localhost:5000/api/user/${username}`, {
        score: correctAnswers,
      }).catch((err) => {
        console.error("Error saving score:", err);
      });
    }
  }, [username, correctAnswers]);
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted font-outfit">
      <Header />
      <main className="flex-1 container max-w-5xl px-4 py-8">
        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-center mb-6 text-shadow-lg">
                <span className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
                  Test Your World Knowledge!
                </span>
              </h1>
              <p className="text-center text-lg mb-4">
                Get cryptic clues about famous places and guess the destination.
              </p>

              {refUser && referrerScore !== null && (
                <div className="text-center bg-orange-100 text-orange-800 rounded p-2 shadow mb-4 font-medium">
                  🎯 <b>{refUser}</b>'s Score: <b>{referrerScore}</b>
                </div>
              )}
            </div>

            <GameCard onUpdateScore={handleUpdateScore} />
          </div>

          <div className="space-y-6">
            <ScoreTracker correctAnswers={correctAnswers} totalAnswers={totalAnswers} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Game;
