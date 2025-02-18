import React, { useEffect, useState ,useCallback} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import MarkerItem from './MarkerItem'

const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius:10
  }
  
  
function GoogleMapSection({coordinates,listing}) {
const [center,setCenter ] = useState({
    lat: 30.3753, // Latitude of Pakistan
  lng: 69.3451,
  })

  

    
    
      const [map, setMap] = React.useState(null)
      // const { isLoaded } = useJsApiLoader({
      //   id: 'google-map-script',
      //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
      //   // libraries: ['places'],
      // })

      useEffect(()=>{
        coordinates&&setCenter(coordinates)
      },[coordinates])
    
      const onLoad = React.useCallback(function callback (map) {
        
            const bounds = new window.google.maps.LatLngBounds(center);
            
            map.fitBounds(bounds);
            setMap(map);
        
    }, [])
    
    

      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
  return (
    <div>
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onload}
      onUnmount={onUnmount}
      gestureHandling='greedy'
    >
      {/* Child components, such as markers, info windows, etc. */}
      {listing.map((item,index)=>(
        <MarkerItem
        key={index}
        item={item}
        />
      ))}
    </GoogleMap>
    </div>
  )
}

export default GoogleMapSection
