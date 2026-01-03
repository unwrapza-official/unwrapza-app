const rateLimitMap = new Map();

/**
 * @param {string} key - IP
 * @param {number} limit - max requests
 * @param {number} windowMs - tijdsvenster
 */

export function rateLimit(key, limit = 60 , windowMs = 60000) {
    const now = Date.now();
    const entry = rateLimitMap.get(key) || { count: 0, startTime: now };
    
    if( now - entry.startTime > windowMs) {
        entry.count = 0;
        entry.startTime = now;
    }

    entry.count += 1;
    rateLimitMap.set(key, entry);

    return entry.count <= limit;
}

const contactLimitMap = new Map();

/**
 * Dagelijkse limiter per key (IP of email)
 */
export function contactDailyLimit(key, limit = 3) {
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000;

  let history = contactLimitMap.get(key) || [];

  // Oude requests verwijderen
  history = history.filter(ts => now - ts < windowMs);

  if (history.length >= limit) return false;

  history.push(now);
  contactLimitMap.set(key, history);

  return true;
}