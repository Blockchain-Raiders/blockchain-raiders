// components/ReadyRaidButton.jsx
import { useEffect, useState, useCallback, useRef } from 'react';

const KEY_LOCAL = 'raid:clicked:v2';
const SOUND_URLS = ['/audio/jackpot.mp3'];
const TELEGRAM_URL = 'https://t.me/+2XQ3CRHbRGc4YmY0';

async function apiGet(path) {
  const r = await fetch(path, { headers: { 'Cache-Control': 'no-store' } });
  const b = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(b?.message || b?.code || r.statusText);
  return b;
}
async function apiPost(path) {
  const r = await fetch(path, { method: 'POST', headers: { 'Cache-Control': 'no-store' } });
  const b = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(b?.message || b?.code || r.statusText);
  return b;
}

export default function ReadyRaidButton() {
  const [total, setTotal] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [credits, setCredits] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);

  const rainHostRef = useRef(null);
  const audioRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('resetRaid') === '1') localStorage.removeItem(KEY_LOCAL);
    const already = !!localStorage.getItem(KEY_LOCAL);
    setClicked(already);
    setCredits(already ? 0 : 1);
  }, []);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const data = await apiGet('/api/raid-click');
        if (!stop) setTotal(typeof data.total === 'number' ? data.total : 0);
      } catch {
        if (!stop) setTotal(0);
      }
    })();
    return () => { stop = true; };
  }, []);

  useEffect(() => {
    const a = new Audio();
    a.volume = 0.8;
    for (const u of SOUND_URLS) { try { a.src = u; break; } catch {} }
    audioRef.current = a;
  }, []);

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const coinBurst = useCallback(() => {
    if (prefersReduced) return;
    const host = rainHostRef.current || document.body;
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('img');
      el.src = '/img/token_coin.png';
      el.alt = '';
      el.className = 'raid8-coin raid8-coin-burst';
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      const ang = Math.random() * Math.PI + Math.PI * 0.2;
      const dist = 200 + Math.random() * 300;
      el.style.setProperty('--bx', `${Math.cos(ang) * dist}px`);
      el.style.setProperty('--by', `${Math.sin(ang) * dist + 200}px`);
      el.style.setProperty('--s', 0.9 + Math.random() * 0.6);
      el.style.setProperty('--rot', `${Math.random() * 360}deg`);
      el.style.animationDuration = `${900 + Math.random() * 800}ms`;
      el.addEventListener('animationend', () => el.remove());
      frag.appendChild(el);
    }
    host.appendChild(frag);
  }, [prefersReduced]);

  const rainTimer = useRef(null);
  const startTopRain = useCallback((durationMs = 2500) => {
    if (prefersReduced) return;
    const host = rainHostRef.current || document.body;
    const batchEvery = 120;
    const perBatch = 10;
    const endAt = Date.now() + durationMs;

    const makeBatch = () => {
      if (Date.now() > endAt) return;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < perBatch; i++) {
        const el = document.createElement('img');
        el.src = '/img/token_coin.png';
        el.alt = '';
        el.className = 'raid8-coin raid8-coin-fall';
        el.style.left = `${Math.random() * 100}vw`;
        el.style.setProperty('--s', 0.9 + Math.random() * 0.6);
        el.style.setProperty('--drift', `${Math.random() * 10 - 5}vw`);
        el.style.setProperty('--rot', `${Math.random() * 120 - 60}deg`);
        el.style.animationDuration = `${4200 + Math.random() * 1800}ms`;
        el.addEventListener('animationend', () => el.remove());
        frag.appendChild(el);
      }
      host.appendChild(frag);
      rainTimer.current = setTimeout(makeBatch, batchEvery);
    };

    clearTimeout(rainTimer.current);
    makeBatch();
    setTimeout(() => clearTimeout(rainTimer.current), durationMs + 400);
  }, [prefersReduced]);

  const sparkles = useCallback(() => {
    if (prefersReduced) return;
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 16; i++) {
      const sp = document.createElement('span');
      sp.className = 'raid8-spark';
      const a = (i / 16) * Math.PI * 2 + Math.random() * 0.2;
      const d = rect.width * 0.5 + Math.random() * rect.width * 0.3;
      sp.style.left = `${cx}px`;
      sp.style.top = `${cy}px`;
      sp.style.setProperty('--dx', `${Math.cos(a) * d}px`);
      sp.style.setProperty('--dy', `${Math.sin(a) * d}px`);
      sp.style.animationDuration = `${300 + Math.random() * 250}ms`;
      sp.addEventListener('animationend', () => sp.remove());
      frag.appendChild(sp);
    }
    document.body.appendChild(frag);
  }, [prefersReduced]);

  const playSound = useCallback(() => { try { audioRef.current?.play().catch(() => {}); } catch {} }, []);
  const flashAndShake = useCallback(() => { if (!prefersReduced) { setFlash(true); setShake(true); setTimeout(() => setFlash(false),180); setTimeout(() => setShake(false),520);} }, [prefersReduced]);

  const onClick = useCallback(async () => {
    if (busy || clicked || credits <= 0) return;
    setBusy(true);
    try {
      if (navigator.vibrate) navigator.vibrate(50);
      const d = await apiPost('/api/raid-click');
      setTotal(typeof d.total === 'number' ? d.total : (total ?? 0) + 1);
      setClicked(true);
      setCredits(0);
      localStorage.setItem(KEY_LOCAL, '1');
      coinBurst();
      startTopRain(2500);
      sparkles();
      flashAndShake();
      playSound();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }, [busy, clicked, credits, total, coinBurst, startTopRain, sparkles, flashAndShake, playSound]);

  const sub = total == null ? 'Loading…' : `Raiders ready: ${total}`;

  return (
    <div className={`relative flex flex-col items-center gap-4 ${shake ? 'raid8-shake' : ''}`}>
      {flash && <div className="fixed inset-0 z-[95] pointer-events-none raid8-flash" />}
      <div ref={rainHostRef} className="fixed inset-0 pointer-events-none z-[90]" />

      <div className="font-pixel text-[10px] md:text-xs text-raidGold/90 tracking-widest -mb-1" style={{ imageRendering:'pixelated' }}>
        CREDITS: {credits}
      </div>

      {/* Only render button if NOT clicked */}
      {!clicked && (
        <button
          ref={btnRef}
          onClick={onClick}
          disabled={busy || credits <= 0}
          className="font-pixel px-10 py-6 text-2xl md:text-3xl relative raid8-bg raid8-border raid8-glow text-raidLime transition-transform duration-75 hover:translate-y-[2px] active:translate-y-0"
          style={{ imageRendering:'pixelated' }}
        >
          {busy ? 'ARMING RAID…' : '> PRESS TO RAID <'}
          <span className="raid8-scan absolute inset-0" />
        </button>
      )}

      {!clicked ? (
        <div className="font-pixel text-raidGold text-xs md:text-sm mt-1 raid8-insert-coin">INSERT COIN</div>
      ) : (
        <>
          <div
            className="font-pixel text-raidLime text-xl md:text-3xl mt-3 text-center drop-shadow-[0_0_8px_rgba(4,245,165,0.7)]"
            style={{ imageRendering:'pixelated' }}
          >
            JOIN THE TELEGRAM FOR UPDATES
          </div>

          {/* TELEPORT FLASH + LOGO */}
          <div className="relative mt-2">
            <span className="raid8-teleport" aria-hidden="true" />
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="block raid8-telegram-pulse"
              title="Join our Telegram"
              style={{ position: 'relative', zIndex: 2 }}
            >
              <img
                src="https://cdn.simpleicons.org/telegram/39AAD6"
                alt="Telegram"
                width="56"
                height="56"
                draggable="false"
                style={{
                  imageRendering:'pixelated',
                  filter:'drop-shadow(0 0 16px rgba(57,170,214,0.8)) drop-shadow(0 0 28px rgba(57,170,214,0.5))'
                }}
              />
            </a>
          </div>
        </>
      )}

      <div className="text-xs md:text-sm font-ui text-raidText/80">{sub}</div>
      {error && <div className="text-[11px] text-raidMagenta/90 mt-1">{error}</div>}

      <style jsx global>{`
        .raid8-bg{background:repeating-linear-gradient(45deg,rgba(0,0,0,0)0 6px,rgba(255,255,255,0.04)6px 12px),linear-gradient(180deg,rgba(25,45,25,1)0%,rgba(12,24,12,1)100%);}
        .raid8-border{box-shadow:0 0 0 2px #0b1b0b,0 0 0 4px #1d3a1d,inset 0 0 0 2px #56ff9a,inset 0 0 0 4px #2bbf6c;}
        .raid8-glow{filter:drop-shadow(0 0 8px rgba(86,255,154,0.5)) drop-shadow(0 0 14px rgba(255,215,0,0.35));}
        .raid8-scan{background:repeating-linear-gradient(to bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.1)2px,rgba(0,0,0,0)3px,rgba(0,0,0,0)4px);mix-blend-mode:multiply;opacity:.55;}

        .raid8-flash{background:radial-gradient(circle at 50% 50%,rgba(255,255,255,0.9)0%,rgba(255,215,0,0.5)35%,rgba(255,255,255,0)70%);animation:raid8-flash .18s steps(2,end)1;mix-blend-mode:screen;}
        @keyframes raid8-flash{0%{opacity:0;}25%{opacity:1;}100%{opacity:0;}}
        @keyframes raid8-shake{0%{transform:translate(0,0)}20%{transform:translate(-3px,2px)}40%{transform:translate(3px,-2px)}60%{transform:translate(-2px,-3px)}80%{transform:translate(2px,3px)}100%{transform:translate(0,0)}}
        .raid8-shake{animation:raid8-shake .5s steps(4,end)1;}

        @keyframes raid8-fall-clean{0%{transform:translate3d(0,-12vh,0)rotate(0deg)scale(var(--s,1));opacity:0;}10%{opacity:1;}100%{transform:translate3d(var(--drift,0),108vh,0)rotate(var(--rot,0deg))scale(var(--s,1));opacity:0;}}
        @keyframes raid8-burst{0%{transform:translate3d(0,0,0)rotate(0deg)scale(var(--s,1));opacity:1;}100%{transform:translate3d(var(--bx,0),var(--by,480px),0)rotate(var(--rot,0deg))scale(var(--s,1));opacity:0;}}
        .raid8-coin{position:fixed;width:40px;height:40px;object-fit:contain;image-rendering:pixelated;pointer-events:none;z-index:85;filter:drop-shadow(0 0 8px rgba(255,215,0,0.45)) drop-shadow(0 4px 8px rgba(0,0,0,0.6));animation-timing-function:steps(20,end);animation-iteration-count:1;animation-fill-mode:forwards;}
        .raid8-coin-fall{top:-12vh;animation-name:raid8-fall-clean;}
        .raid8-coin-burst{animation-name:raid8-burst;}

        @keyframes raid8-spark{0%{transform:translate(-50%,-50%)translate(0,0)scale(1);opacity:1;}100%{transform:translate(-50%,-50%)translate(var(--dx),var(--dy))scale(1);opacity:0;}}
        .raid8-spark{position:fixed;width:8px;height:8px;background:radial-gradient(circle,#fff 0 40%,rgba(255,215,0,0.9)60%,rgba(255,255,255,0)61%);image-rendering:pixelated;pointer-events:none;z-index:96;animation:raid8-spark .5s steps(6,end)1 forwards;}

        @keyframes raid8-blink{0%,60%{opacity:1;}61%,100%{opacity:0;}}
        .raid8-insert-coin{animation:raid8-blink 1s steps(2,end)infinite;letter-spacing:.08em;text-shadow:0 0 8px rgba(255,215,0,.35);}

        /* Telegram pulse (no spin) */
        @keyframes raid8-telegram-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.15);}}
        .raid8-telegram-pulse{animation:raid8-telegram-pulse 1.2s ease-in-out infinite;}

        /* TELEPORT FLASH (pixelated, one-shot) */
        .raid8-teleport{
          position:absolute; inset:-40px; z-index:1; pointer-events:none; image-rendering:pixelated;
          animation: raid8-teleport-pop .75s steps(6,end) 1 forwards;
          background:
            radial-gradient(circle at 50% 50%, rgba(57,170,214,0.8) 0 14%, rgba(57,170,214,0.4) 15% 24%, rgba(57,170,214,0.0) 25%),
            repeating-conic-gradient(from 0deg, rgba(255,255,255,0.15) 0 12deg, rgba(57,170,214,0.0) 12deg 24deg);
          mix-blend-mode: screen;
          box-shadow:
            0 0 0 2px rgba(57,170,214,0.5),
            0 0 12px 4px rgba(57,170,214,0.35),
            0 0 28px 10px rgba(57,170,214,0.25);
        }
        @keyframes raid8-teleport-pop{
          0%   { opacity:0; transform:scale(0.6); }
          20%  { opacity:1; transform:scale(0.9); }
          60%  { opacity:1; transform:scale(1.2); }
          100% { opacity:0; transform:scale(1.6); }
        }

        @media (prefers-reduced-motion:reduce){
          .raid8-spark,.raid8-coin,.raid8-shake,.raid8-insert-coin,.raid8-telegram-pulse,.raid8-teleport{
            animation:none!important;
          }
        }
      `}</style>
    </div>
  );
}
