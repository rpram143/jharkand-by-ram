import React, { createContext, useContext, useState } from 'react';
import { touristSpots as initialSpots } from '../data/touristSpots';

const TouristSpotsContext = createContext(undefined);

export const useTouristSpots = () => {
  const context = useContext(TouristSpotsContext);
  if (context === undefined) {
    throw new Error('useTouristSpots must be used within a TouristSpotsProvider');
  }
  return context;
};

export const TouristSpotsProvider = ({ children }) => {
  const [spots, setSpots] = useState(initialSpots);

  const updateSpotStatus = (spotId, isOpen, openTime, closeTime) => {
    setSpots(prevSpots =>
      prevSpots.map(spot =>
        spot.id === spotId
          ? {
              ...spot,
              isOpen,
              ...(openTime && { openTime }),
              ...(closeTime && { closeTime })
            }
          : spot
      )
    );
  };

  return (
    <TouristSpotsContext.Provider value={{ spots, setSpots, updateSpotStatus }}>
      {children}
    </TouristSpotsContext.Provider>
  );
};

