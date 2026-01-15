'use client';

import { useState } from 'react';

interface RatingBoxProps {
  onRate: (score: number) => void;
  onSkip: () => void;
  disabled?: boolean;
}

export function RatingBox({ onRate, onSkip, disabled }: RatingBoxProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedRating) {
      onRate(selectedRating);
      setSelectedRating(null);
    }
  };

  return (
    <div className="rating-box text-center">
      <div className="text-sm font-bold mb-3" style={{ color: '#660000' }}>
        Please select a rating to see the next lead.
      </div>

      {/* Rating scale */}
      <div className="flex justify-center items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <label key={num} className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={num}
              checked={selectedRating === num}
              onChange={() => setSelectedRating(num)}
              disabled={disabled}
              className="rating-radio w-4 h-4"
            />
            <span className="text-[10px] font-bold mt-1" style={{ color: '#333' }}>
              {num}
            </span>
          </label>
        ))}
      </div>

      {/* NOT to HOT scale indicator */}
      <div className="flex justify-between items-center mx-4 mb-3">
        <div className="flex items-center">
          <span className="text-xs font-bold text-blue-800">NOT</span>
          <div className="w-24 h-2 mx-2 bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600 border border-gray-600"></div>
        </div>
        <div className="flex items-center">
          <div className="w-24 h-2 mx-2 bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600 border border-gray-600"></div>
          <span className="text-xs font-bold text-red-700">HOT</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedRating || disabled}
          className="retro-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Rate This Lead!
        </button>
        <button onClick={onSkip} disabled={disabled} className="retro-btn">
          Skip →
        </button>
      </div>
    </div>
  );
}
