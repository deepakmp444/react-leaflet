import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'; // Import leaflet library
import iconUrl from './marker-icon-2x.png'; // Import your custom icon
import { useEffect, useState } from 'react';

function MapComponent({ LonLat }) {
    const [position, setPosition] = useState([25.561808907870695, 85.15502929687501]);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if ((LonLat && LonLat.lat && LonLat.lon)) {
            setPosition([LonLat.lat, LonLat.lon])
        }
    }, [LonLat])

    // Define custom icon
    const customIcon = L.icon({
        iconUrl: iconUrl, // Path to the custom icon
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [15, 30], // Anchor point of the icon (relative to its top left corner)
        popupAnchor: [0, -30] // Anchor point of the popup (relative to the marker)
    });

    const handleClick = (e) => {
        console.log('e:', e)
        const { lat, lng } = e.latlng; // Get latitude and longitude of clicked point
        const newMarker = {
            position: [lat, lng],
            key: Math.random(), // Generate a unique key for the marker
            icon: customIcon
        };
        setMarkers(prevMarkers => [...prevMarkers, newMarker]); // Add new marker to the markers array
    };

    // Custom hook to handle click events on the map
    function AddMarkerOnClick() {
        useMapEvents({
            click: handleClick // Call handleClick function when the map is clicked
        });
        return null; // Return null because we don't need to render anything extra
    }

    console.log("render")
    return (
        <MapContainer style={{ height: "80vh" }} center={position} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <AddMarkerOnClick />

            <Marker position={position} icon={customIcon}> {/* Assign custom icon to Marker */}
                <Popup>
                    First Marker <br /> Easily customizable.
                </Popup>
            </Marker>

            {markers.map(marker => (
                <Marker key={marker.key} position={marker.position} icon={marker.icon}>
                    <Popup>
                        A new marker added on click. <br /> Latitude: {marker.position[0]}, Longitude: {marker.position[1]}.
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MapComponent;