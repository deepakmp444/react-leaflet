import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import iconLogo from './marker-icon-2x.png';

function RoutingMap() {
    const map = useMap();

    useEffect(() => {
        if (map) {
            // Define a custom icon for the routing control
            const customIcon = L.icon({
                iconUrl: iconLogo,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            });

            // Create the routing control with the custom icon
            const control = L.Routing.control({
                waypoints: [
                    L.latLng(50.254229882306205, 9.635009765625002), // Start coordinate (latitude, longitude)
                    L.latLng(51.66574141105715, 9.953613281250002)   // End coordinate (latitude, longitude)
                ],
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://routing.openstreetmap.de/routed-bike/route/v1', // URL for the routing service
                    profile: 'driving', // Profile for the routing service
                    overview: 'false', // Whether to include a route overview in the response
                    alternatives: true, // Whether to include alternative routes in the response
                    steps: true // Whether to include route steps in the response
                }),
                createMarker: function (i, wp, nWps) {
                    // Create a marker with the custom icon for the waypoints
                    return L.marker(wp.latLng, {
                        icon: customIcon
                    });
                },
                routeWhileDragging: true,
                fitSelectedRoutes: 'smart'
            }).addTo(map);

            // Listen for the 'routeselected' event to get the total distance
            control.on('routeselected', function (e) {
                const route = e.route;
                const totalDistanceMeters = route.summary.totalDistance; // Total distance in meters
                const totalDistanceKilometers = totalDistanceMeters / 1000; // Convert meters to kilometers
                console.log('Total Distance:', totalDistanceKilometers, 'km');
            });
        }

        return () => {
            if (map) {
                map.removeControl(map.routingControl);
            }
        };
    }, [map]);

    return null;
}

function App() {
    return (
        <div className="App">
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }}>
                <RoutingMap />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
}

export default App;
