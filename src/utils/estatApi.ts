// Calls to Japan e-Stat (3rd party API)

import { z } from 'zod';
import { VacancyStat } from '@/types';

// ─── Zod schema ──────────────────────────────────────────────────────────────
// Zod validates the e-Stat API response at RUNTIME and gives TypeScript types.
// If the external API ever changes its shape, Zod catches it immediately
// instead of letting malformed data silently propagate into the UI.

const VacancyStatSchema = z.object({
  prefecture: z.string(),
  vacancyRate: z.number(),
  vacantHomes: z.number(),
});

const VacancyStatsSchema = z.array(VacancyStatSchema);

// ─── Mock fallback ───────────────────────────────────────────────────────────
// Used when VITE_ESTAT_APP_ID is not set.
// Directionally accurate — based on the 2023 Japan Housing and Land Survey.
const MOCK_STATS: VacancyStat[] = [
  { prefecture: 'Wakayama', vacancyRate: 20.3, vacantHomes: 44300 },
  { prefecture: 'Yamanashi', vacancyRate: 20.1, vacantHomes: 39200 },
  { prefecture: 'Tokushima', vacancyRate: 19.4, vacantHomes: 34100 },
  { prefecture: 'Kochi', vacancyRate: 19.3, vacantHomes: 34200 },
  { prefecture: 'Kagoshima', vacancyRate: 17.7, vacantHomes: 83900 },
  { prefecture: 'Ehime', vacancyRate: 17.1, vacantHomes: 54800 },
  { prefecture: 'Tottori', vacancyRate: 16.8, vacantHomes: 19800 },
  { prefecture: 'Nagano', vacancyRate: 16.6, vacantHomes: 81900 },
  { prefecture: 'Ishikawa', vacancyRate: 16.6, vacantHomes: 41100 },
  { prefecture: 'Yamaguchi', vacancyRate: 16.2, vacantHomes: 50900 },
];

// ─── Fetch ───────────────────────────────────────────────────────────────────
// import.meta.env is Vite's browser-safe way to read .env variables.
// It is NOT process.env — that only exists in Node.js.
const E_STAT_APP_ID = import.meta.env.VITE_ESTAT_APP_ID as string | undefined;
const E_STAT_BASE = 'https://api.e-stat.go.jp/rest/3.0/app/json';
const STATS_DATA_ID = '00200522'; // 2023 Housing and Land Survey

export async function fetchVacancyStats(): Promise<VacancyStat[]> {
  if (!E_STAT_APP_ID) {
    console.info('[estatApi] No API key set — using mock regional vacancy data.');
    return MOCK_STATS;
  }

  try {
    const params = new URLSearchParams({
      appId: E_STAT_APP_ID,
      statsDataId: STATS_DATA_ID,
      metaGetFlg: 'N',
      cntGetFlg: 'N',
    });

    const res = await fetch(`${E_STAT_BASE}/getStatsData?${params}`);
    if (!res.ok) throw new Error(`e-Stat API responded with ${res.status}`);

    const json = await res.json();
    const rawValues = json?.GET_STATS_DATA?.STATISTICAL_DATA?.DATA_INF?.VALUE;
    if (json.json?.GET_STATS_DATA?.RESULT?.STATUS !== 0) {
      throw new Error(`e-Stat Error: ${json.GET_STATS_DATA?.RESULT?.ERROR_MSG}`);
    }
    // if (!Array.isArray(rawValues)) throw new Error('Unexpected e-Stat response shape');

    const mapped = rawValues.slice(0, 10).map((v: Record<string, string>) => ({
      prefecture: v['@area'] ?? 'Unknown',
      vacancyRate: parseFloat(v['$']) || 0,
      vacantHomes: 0,
    }));

    // .parse() throws a ZodError if the shape doesn't match — caught below.
    // This guarantees the data that reaches the component matches VacancyStat exactly.
    return VacancyStatsSchema.parse(mapped);
  } catch (err) {
    console.warn('[estatApi] Live fetch failed — falling back to mock data.', err);
    return MOCK_STATS;
  }
}
