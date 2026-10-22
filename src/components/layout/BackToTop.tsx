import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/80 dark:bg-slate-800/80 hover:bg-sky-600 dark:hover:bg-sky-500 text-white shadow-xl backdrop-blur-md border border-slate-700/80 transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
