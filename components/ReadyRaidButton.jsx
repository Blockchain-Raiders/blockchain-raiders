import { useEffect, useState } from 'react';

export default function ReadyRaidButton({
  apiPath = '/api/raid-click',
  clickedKey = 'raid_clicked_once',
}) {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const has = typeof window !== 'undefined' && localStorage.getItem(clickedKey) === '1';
        if (has) setClicked(true);
        const r = await fetch(apiPath);
        const { total } = await r.json();
        if (mounted) setCount(total || 0);
      } catch (_) {}
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [apiPath, clickedKey]);

  const onClick = async () => {
    if (clicked) return;
    setClicked(true);
    localStorage.setItem(clickedKey, '1');
    try {
      const r = await fetch(apiPath, { method: 'POST' });
      const { total } = await r.json();
      setCount(total || 0);
    } catch (_) {
      setCount((c) => c + 1); // optimistic fallback
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-2">
      <button
        onClick={onClick}
        disabled={loading || clicked}
        className={[
          'relative font-pixel text-xl md:text-2xl uppercase tracking-wider transition-transform duration-150',
          'px-10 py-5 border-4 rounded-lg',
          clicked
            ? 'border-raidLime bg-raidLime/10 text-raidLime cursor-default'
            : 'border-raidLime bg-raidLime text-black hover:scale-[1.05] active:scale-[0.98] hover:shadow-[0_0_24px_rgba(0,255,160,0.6)]',
          'shadow-[0_3px_0_rgba(0,0,0,0.4)]',
        ].join(' ')}
        style={{
          fontSmooth: 'never',
          WebkitFontSmoothing: 'none',
          imageRendering: 'pixelated',
          boxShadow: clicked
            ? '0 0 0 2px rgba(0,255,160,0.5) inset'
            : '0 0 12px rgba(0,255,160,0.7), 0 4px 12px rgba(0,0,0,0.5)',
        }}
        aria-pressed={clicked}
      >
        {clicked ? 'READY TO $RAID! ✅' : 'READY TO $RAID!'}
      </button>

      <div className="font-pixel text-sm text-raidText/70 tracking-wide">
        Raiders ready: <span className="text-raidLime font-semibold text-lg">{count}</span>
      </div>
    </div>
  );
}
