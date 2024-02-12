import { useState } from 'react';
import MapComponent from './MapComponent';

const App = () => {
    const [locationList, setLocationList] = useState([]);
    const [searchLocation, setSearchLocation] = useState("");
    const [LonLat, setLonLat] = useState({});
    console.log('LonLat:', LonLat)

    const getSearchedLocation = async (e) => {
        e.preventDefault();
        // https://nominatim.openstreetmap.org/search.php?q=kahalgaon&format=jsonv2
        const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${searchLocation}&format=jsonv2`)
        const data = await response.json();
        setLocationList(data)
    }

    const getLocation = (v) => {
        setLonLat(v)
    }

    return (
        <div>
            <h1>Map with React</h1>
            <form onSubmit={getSearchedLocation}>
                <input placeholder='enter location' value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} /> <button type='submit'>Click</button>
            </form>
            {locationList && locationList.map((v) => {
                return (
                    <div key={v.display_name} onClick={() => getLocation(v)}>
                        {v.display_name}
                    </div>
                )
            })}
            <MapComponent LonLat={LonLat}/>
        </div>
    );
};

export default App;
