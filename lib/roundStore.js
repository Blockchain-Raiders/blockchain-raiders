// lib/roundStore.js
// One global Map that survives hot-reload in dev.
// Replace with Redis/Supabase in production.
const store = global._duelRoundsStore || new Map();
if (!global._duelRoundsStore) global._duelRoundsStore = store;
export default store;
