const cache = new Map();
const DEBUG = false;
const STATS = false;

let totalCalls = 0;
let cacheHits = 0;
let apiCalls = 0;

export async function fetchAPI(endpoint, locale) {
  totalCalls++;

  const url = `${import.meta.env.PUBLIC_API_URL}/${endpoint}`;
  const cacheKey = `${url}_${locale}`;
  const now = Date.now();
  const cached = cache.get(cacheKey);

  if (cached && now - cached.timestamp < 5 * 60 * 1000) {
    cacheHits++;
    if (DEBUG) {
      console.log(`[CACHE HIT] ${cacheKey}`, cached.data);
      logStats();
    }
    return cached.data;
  }

  apiCalls++;
  if (DEBUG) {
    console.log(`[CACHE MISS] ${cacheKey} - Fetching from API`);
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
    },
  });

  const result = await response.json();
  const data = result.data;

  cache.set(cacheKey, { data, timestamp: now });

  if (DEBUG) {
    console.log(`[CACHE SET] ${cacheKey}`);
  }

  if (STATS) {
    logStats();
  }

  return data;
}

function logStats() {
  console.log(`--- API CALL STATS ---`);
  console.log(`Total Calls: ${totalCalls}`);
  console.log(`Cache Hits: ${cacheHits}`);
  console.log(`API Calls: ${apiCalls}`);
  console.log(`----------------------`);
}
