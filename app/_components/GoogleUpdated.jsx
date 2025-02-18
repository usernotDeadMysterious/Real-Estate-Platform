import { MapPin } from 'lucide-react';
import React from 'react';
import dynamic from 'next/dynamic';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const GooglePlacesAutocomplete = dynamic(
  () => import('react-google-places-autocomplete'),
  { ssr: false }
);

function GoogleUpdated({ selectedAddress, setCoordinates }) {
  return (
    <div className='flex gap-2 items-center w-full'>
      <MapPin className='h-10 w-10 p-2 rounded-l-lg text-primary bg-slate-200' />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: 'Search Property Address',
          isClearable: true,
          className: 'w-full',
          onChange: (place) => {
            if (!place) {
              console.warn('No place selected');
              selectedAddress(null);
              setCoordinates(null);
              return;
            }

            console.log('Selected Place:', place);
            selectedAddress(place);

            geocodeByAddress(place.label)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => {
                console.log('Coordinates:', lat, lng);
                setCoordinates({ lat, lng });
              })
              .catch((error) => console.error('Error fetching coordinates:', error));
          },
        }}
      />
    </div>
  );
}

export default GoogleUpdated;
