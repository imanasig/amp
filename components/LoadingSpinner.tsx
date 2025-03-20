import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
}

export default function LoadingSpinner({ size = 32 }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div 
        className="animate-spin rounded-full border-b-2 border-gray-900"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
    </div>
  );
}
