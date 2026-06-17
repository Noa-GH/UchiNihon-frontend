import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/customHooks/useAuth';
import { useSavedHomes, useSaveProperty, useUnsaveProperty } from '@/hooks/useSavedHomes';
import { useListings } from '@/hooks/useListings';
import { prefectureOptions } from '@/utils/mockData';
import PropertyGrid from '@/components/PropertyGrid/PropertyGrid';
import RegionStats from '@/components/RegionStats/RegionStats';
import { AkiyaListing } from '@/types';
import './Home.css';

function Home() {
  const { isLoggedIn } = useAuth();
  const [filterPrefecture, setFilterPrefecture] = useState<string>('All');
  const [filterMaxPrice, setFilterMaxPrice] = useState<string>('');

  // ── Saved-homes state (auth-gated) ─────────────────────────────────────────
  const { data: savedProperties = [] } = useSavedHomes();
  const saveProperty = useSaveProperty();
  const unsaveProperty = useUnsaveProperty();
  const savedIds = savedProperties.map((p) => p.listingId);

  // ── Live listings from the public API ─────────────────────────────────────
  // Filtering is done server-side so the query key changes with the filters,
  // causing React Query to re-fetch automatically. placeholderData in the hook
  // keeps the previous results visible while the new request is in-flight.
  const {
    data: listingsData,
    isLoading,
    isError,
    isFetching,
  } = useListings(filterPrefecture, filterMaxPrice);

  const listings: AkiyaListing[] = listingsData?.properties ?? [];
  const listingCount: number = listingsData?.count ?? 0;

  // ── Save / unsave handlers ─────────────────────────────────────────────────
  const handleSaveToggle = (property: AkiyaListing, nowSaved: boolean) => {
    if (!isLoggedIn) return;
    if (nowSaved) {
      saveProperty.mutate(property);
    } else {
      const saved = savedProperties.find((p) => p.listingId === property.listingId);
      if (saved) unsaveProperty.mutate(saved._id);
    }
  };

  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <p className="home__hero-eyebrow">Japan Vacant Property Guide</p>
          <h1 className="home__hero-title">Find Your Akiya</h1>
          <p className="home__hero-sub">
            Over 8.5 million vacant homes across Japan are waiting for new owners. Discover
            affordable countryside properties — some offered for free.
          </p>
          {!isLoggedIn && (
            <Link to="/register" className="home__hero-cta">
              Create a free account →
            </Link>
          )}
        </div>
      </section>

      <div className="home__content">
        <div className="home__filters">
          <select
            className="home__filter-select"
            value={filterPrefecture}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterPrefecture(e.target.value)
            }
            aria-label="Filter by prefecture"
          >
            {prefectureOptions.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'All Prefectures' : p}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="home__filter-input"
            placeholder="Max price (¥)"
            value={filterMaxPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterMaxPrice(e.target.value)}
            min="0"
            aria-label="Maximum price in yen"
          />

          <span className="home__filter-count">
            {isLoading ? (
              '…'
            ) : (
              <>
                {listingCount} listing{listingCount !== 1 ? 's' : ''}
                {isFetching && !isLoading && (
                  <span className="home__filter-count-refreshing"> (refreshing…)</span>
                )}
              </>
            )}
          </span>

          {(filterPrefecture !== 'All' || filterMaxPrice !== '') && (
            <button
              className="home__filter-clear"
              onClick={() => {
                setFilterPrefecture('All');
                setFilterMaxPrice('');
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        <PropertyGrid
          properties={listings}
          savedIds={savedIds}
          onSaveToggle={handleSaveToggle}
          isLoading={isLoading}
          isError={isError}
        />

        <RegionStats />
      </div>
    </main>
  );
}

export default Home;
