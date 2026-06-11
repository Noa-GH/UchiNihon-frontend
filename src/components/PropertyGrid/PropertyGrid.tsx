import React from 'react';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { AkiyaListing } from '@/types';
import './PropertyGrid.css';

interface PropertyGridProps {
  properties: AkiyaListing[];
  savedIds: string[];
  onSaveToggle: (property: AkiyaListing, nowSaved: boolean) => void;
}

function PropertyGrid({ properties, savedIds, onSaveToggle }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="property-grid__empty">
        <p>No listings match your criteria. Try adjusting your search criteria.</p>
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
