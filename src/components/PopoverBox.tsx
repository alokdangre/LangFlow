import { useState, ReactNode } from 'react';

interface PopoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function PopoverModal({ isOpen, onClose, children }: PopoverModalProps) {
  if (!isOpen) return null;

  return (
    // Backdrop with blur effect
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Popover box with glass effect */}
      <div
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full relative border border-white/20"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Content area with animation */}
        <div className="mt-2 animate-fadeIn">
          {children}
        </div>
      </div>
    </div>
  );
}
