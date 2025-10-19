// components/Countdown.js
import { useEffect, useState } from 'react';

export default function Countdown({ target }){
  const [txt, setTxt] = useState('— : — : — : —');

  useEffect(()=>{
    if (!target) return;
    const end = new Date(target).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, end - now);
      const d = Math.floor(diff/86400000);
      const h = Math.floor((diff%86400000)/3600000);
      const m = Math.floor((diff%3600000)/60000);
      const s = Math.floor((diff%60000)/1000);
      setTxt(`${String(d).padStart(2,'0')}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`);
    };

    tick(); // run immediately to avoid 1s blank
    const t = setInterval(tick, 1000);
    return ()=>clearInterval(t);
  },[target]);

  return <div className="font-pixel text-raidGold text-2xl sm:text-3xl md:text-4xl pixel-shadow" aria-live="polite">{txt}</div>;
}