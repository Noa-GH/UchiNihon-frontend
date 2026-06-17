import React from 'react';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { AkiyaListing } from '@/types';
import './PropertyGrid.css';

interface PropertyGridProps {
  properties: AkiyaListing[];
  savedIds: string[];
  onSaveToggle: (property: AkiyaListing, nowSaved: boolean) => void;
  isLoading?: boolean;
  isError?: boolean;
}

// Number of skeleton placeholder cards to render while data loads.
const SKELETON_COUNT = 6;

function PropertyGrid({
  properties,
  savedIds,
  onSaveToggle,
  isLoading = false,
  isError = false,
}: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="property-grid">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="property-card property-card--skeleton" aria-hidden="true">
            <div className="property-card__media skeleton-block" />
            <div className="property-card__body">
              <div className="skeleton-line skeleton-line--title" />
              <div className="skeleton-line skeleton-line--short" />
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-line--short" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="property-grid__empty property-grid__error">
        <p>⚠️ Could not load listings — please check that the backend is running and try again.</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="property-grid__empty">
        <p>No listings match your search. Try adjusting your filters, or check back once the database has been synced with live data.</p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.listingId}
          property={property}
          isSaved={savedIds.includes(property.listingId)}
          onSaveToggle={onSaveToggle}
        />
      ))}
    </div>
  );
}

export default PropertyGrid;
