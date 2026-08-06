import { useEffect } from 'react';

export const useEasterEggs = () => {
  useEffect(() => {
    let keySequence = '';
    const secretCode = 'future';

    let konamiSequence: string[] = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Future egg
      keySequence += e.key.toLowerCase();
      if (keySequence.length > secretCode.length) {
        keySequence = keySequence.substring(1);
      }
      if (keySequence === secretCode) {
        document.body.classList.add('future-mode');
        setTimeout(() => document.body.classList.remove('future-mode'), 3000);
      }

      // Konami egg
      konamiSequence.push(e.key);
      if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
      }
      
      const isKonamiMatch = konamiSequence.every((val, index) => val.toLowerCase() === konamiCode[index].toLowerCase());
      if (isKonamiMatch && konamiSequence.length === konamiCode.length) {
        alert("MATRIX MODE: You've discovered an easter egg!");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
