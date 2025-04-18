import React from 'react';
import { Trophy } from 'lucide-react';

const ScoreTracker = ({ correctAnswers, totalAnswers }) => {
  const percentage = totalAnswers > 0 
    ? Math.round((correctAnswers / totalAnswers) * 100) 
    : 0;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-muted">
      <div className="bg-gold/20 p-2 rounded-full">
        <Trophy className="w-5 h-5 text-gold" />
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-medium">Your Score</div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{correctAnswers}/{totalAnswers}</span>
          <span className="text-sm text-muted-foreground">({percentage}%)</span>
        </div>
      </div>
      
      <div className="ml-auto bg-gray-100 w-24 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-teal to-purple" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreTracker;
