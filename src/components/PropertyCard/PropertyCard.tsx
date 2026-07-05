import React from 'react';
import { useAuth } from '@/hooks/customHooks/useAuth';
import { AkiyaListing } from '@/types';
import './PropertyCard.css';

interface PropertyCardProps {
  property: AkiyaListing;
  isSaved: boolean;
  onSaveToggle?: (property: AkiyaListing, nowSaved: boolean) => void;
}

function PropertyCard({ property, isSaved, onSaveToggle }: PropertyCardProps) {
  const { isLoggedIn } = useAuth();
  const handleSaveToggle = () => {
    if (typeof onSaveToggle !== 'function') {
      console.warn('[PropertyCard] onSaveToggle is not a function.');
      return;
    }
    onSaveToggle(property, !isSaved);
  };

  const formatPrice = (price: number): string => {
    if (price === 0) return 'Free Transfer';
    return `¥${price.toLocaleString('ja-JP')}`;
  };

  return (
    <article className="property-card">
      <div className="property-card__media">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="property-card__image"
          loading="lazy"
        />
        <span className="property-card__price">{formatPrice(property.price)}</span>

        {isLoggedIn && (
          <button
            type="button"
            className={`property-card__heart${isSaved ? ' property-card__heart--active' : ''}`}
            onClick={handleSaveToggle}
            aria-label={isSaved ? 'Remove from saved' : 'Save this property'}
          >
            {isSaved ? '♥' : '♡'}
          </button>
        )}
      </div>

      <div className="property-card__body">
        <h3 className="property-card__title">{property.title}</h3>
        <p className="property-card__location">
          📍 {property.city}, {property.prefecture}
        </p>
        <p className="property-card__meta">
          {property.bedrooms && `${property.bedrooms} bed`}
          {property.sqMeters && ` · ${property.sqMeters}㎡`}
          {property.yearBuilt && ` · Est. ${property.yearBuilt}`}
        </p>
        <p className="property-card__description">{property.description}</p>

        {property.tags && property.tags.length > 0 && (
          <div className="property-card__tags">
            {property.tags.map((tag) => (
              <span key={tag} className="property-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default PropertyCard;
