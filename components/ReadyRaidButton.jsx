// components/ReadyRaidButton.jsx
import { useEffect, useState, useCallback } from 'react';

const KEY_LOCAL = 'raid:clicked:v2'; // bump this key if you need to reset all users

async function apiGet(path) {
  const res = await fetch(path, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
    },
  });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function apiPost(path) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
    },
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

export default function ReadyRaidButton() {
  const [total, setTotal] = useState(null);      // null while loading
  const [clicked, setClicked] = useState(false); // local guard
  const [busy, setBusy] = useState(false);       // network in-flight
  const [error, setError] = useState('');

  // Dev helper: add "?resetRaid=1" to URL to clear the guard
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('resetRaid') === '1') {
      localStorage.removeItem(KEY_LOCAL);
    }
    setClicked(!!localStorage.getItem(KEY_LOCAL));
  }, []);

  // Load current total
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError('');
        const data = await apiGet('/api/raid-click');
        if (!cancelled) setTotal(typeof data.total === 'number' ? data.total : 0);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError('Could not load total.');
          setTotal(0); // fallback display
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const onClick = useCallback(async () => {
    if (busy || clicked) return;
    try {
      setBusy(true);
      setError('');
      const data = await apiPost('/api/raid-click');
      const next = typeof data.total === 'number' ? data.total : (total ?? 0) + 1;
      setTotal(next);
      setClicked(true);
      localStorage.setItem(KEY_LOCAL, '1');
    } catch (e) {
      console.error(e);
      setError('Could not record click.');
    } finally {
      setBusy(false);
    }
  }, [busy, clicked, total]);

  // UX text
  const title = 'READY TO $RAID! ✅';
  const sub =
    total === null
      ? 'Loading…'
      : `Raiders ready: ${total}`;

  return (
    <div className="flex flex-col items-center gap-2 pointer-events-auto">
      <button
        onClick={onClick}
        disabled={busy || clicked}
        className={`font-pixel px-4 py-2 rounded-lg border transition
          ${clicked ? 'border-raidLime/40 text-raidLime/60 cursor-not-allowed' : 'border-raidLime text-raidLime hover:bg-raidLime/10'}
        `}
        aria-disabled={busy || clicked}
      >
        {title}
      </button>

      <div className="text-xs font-ui text-raidText/80">
        {sub}
      </div>

      {error && (
        <div className="text-[11px] text-raidMagenta/90 mt-1">
          {error}
        </div>
      )}

      {/* Dev helper reset link (remove in prod if you want) */}
      {!clicked && (
        <div className="sr-only">You can append ?resetRaid=1 to the URL to reset the local guard.</div>
      )}
    </div>
  );
}
