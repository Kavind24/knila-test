import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Maps(location) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_GOOGLE_MAP_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map loc={location}/>;
}

function Map(loc) {
  const center = { lat: 44, lng: -80 };
  const cityList = loc; // Need to find the latitude and longitude of the city using Geolocation API
  const markPosition = [{ lat: 44, lng: -80 },{ lat: 120, lng: -80 },{ lat: 150, lng: -80 },{ lat:180, lng: -80 },{ lat: 210, lng: -80 }];

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      {markPosition.map((mark) => {
        <Marker position={mark} />
        return mark;
      })}
    </GoogleMap>
  );
}