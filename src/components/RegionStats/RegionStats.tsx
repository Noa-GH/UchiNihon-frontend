import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVacancyStats } from '@/utils/estatApi';
import './RegionStats.css';

// Displays a bar chart of vacancy rates by prefecture
// Data is fetched from the e-Stat API and cached for 1 hour

function RegionStats() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vacancy-stats'],
    queryFn: fetchVacancyStats,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return <div className="region-stats__loading">Loading regional vacancy data...</div>;
  }
  if (error) {
    return (
      <div className="region-stats__error">
        Could not load regional data: {(error as Error).message}
      </div>
    );
  }

  const maxRate = Math.max(...(stats ?? []).map((s) => s.vacancyRate));

  return (
    <section className="region-stats">
      <div className="region-stats__header">
        <h2 className="region-stats__title">Vacancy Rates by Prefecture</h2>
        <p className="region-stats__source">
          Source: Japan Ministry of Internal Affairs — 2023 Housing and Land Survey
        </p>
      </div>
      <div className="region-stats__bars">
        {(stats ?? []).map((stat) => (
          <div key={stat.prefecture} className="region-stats__row">
            <span className="region-stats__name">{stat.prefecture}</span>
            <div className="region-stats__track">
              <div
                className="region-stats__fill"
                style={{ width: `${(stat.vacancyRate / maxRate) * 100}%` }}
              />
            </div>
            <span className="region-stats__rate">{stat.vacancyRate}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RegionStats;
