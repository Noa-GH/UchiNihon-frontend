import React from 'react';
import { Link } from 'react-router-dom';
import { useSavedHomes, useUnsaveProperty } from '@/hooks/useSavedHomes';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { AkiyaListing } from '@/types';
import './SavedHomes.css';

function SavedHomes() {
  const { data: savedProperties = [], isLoading, error } = useSavedHomes();
  const unsaveProperty = useUnsaveProperty();

  // When the heart is clicked, nowSaved will be false — remove the property.
  const handleSaveToggle = (property: AkiyaListing, nowSaved: boolean) => {
    if (nowSaved) return;
    const saved = savedProperties.find((p) => p.listingId === property.listingId);
    if (saved) unsaveProperty.mutate(saved._id);
  };

  if (isLoading) return <div className="loading">Loading your saved homes...</div>;

  if (error) {
    return (
      <main className="saved-homes">
        <div className="saved-homes__container">
          <p className="saved-homes__error">Error: {(error as Error).message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="saved-homes">
      <div className="saved-homes__container">
        <div className="saved-homes__header">
          <h1 className="saved-homes__title">Saved Homes</h1>
          <p className="saved-homes__count">
            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'}{' '}
            saved
          </p>
        </div>

        {savedProperties.length === 0 ? (
          <div className="saved-homes__empty">
            <p className="saved-homes__empty-text">You have not saved any akiya yet.</p>
            <Link to="/" className="saved-homes__browse-link">
              Browse listings →
            </Link>
          </div>
        ) : (
          <div className="saved-homes__grid">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isSaved={true}
                onSaveToggle={handleSaveToggle}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedHomes;
