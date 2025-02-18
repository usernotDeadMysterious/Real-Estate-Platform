import { MapPin } from 'lucide-react';
import React from 'react'
// import ReactGoogleAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-autocomplete';
// import Autocomplete from "react-google-autocomplete";
import geocodeByAddress, { getLatLng } from 'react-google-places-autocomplete';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
function GoogleAddressSearch(selectedAddress,setCoordinates) {
  return (
    <div className='flex gap-2 items-center w-full'>
      <MapPin className='h-10 w-10 p-2 rounded-l-lg text-primary bg-slate-200'/>
       <GooglePlacesAutocomplete
            
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        
        selectProps={{
          placeholder:'Search Property Address',
          isClearable:true,
          className:'w-full',
          onchange:(place)=>{
            console.log(place);
            selectedAddress(place);
            geocodeByAddress(place.label)
            .then(result=>getLatLng(result[0])
            .then(({lat,lng})=>{
              console.log(lat,lng)
              setCoordinates({lat:lng})
            })
          )
            
          }
        }}
        
        
        />;
    </div>
  )
}

export default GoogleAddressSearch
