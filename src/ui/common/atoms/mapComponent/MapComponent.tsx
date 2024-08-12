import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet';

// Import marker icon images
import { image } from '@constant/image';
import { officeSetupData } from '@context/OfficeSetupProvider';
import { useOfficeSetup } from '@hooks/useOfficeSetup';
import './MapComponent.css';

// Custom component to handle map click events
const MapClickHandler: React.FC<{
    setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
}> = ({ setPosition }) => {
    const { officeSetup, changeOfficeSetup } = useOfficeSetup();
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            const updateData = officeSetup as officeSetupData;
            updateData.contactInformation.lat = lat.toString();
            updateData.contactInformation.long = lng.toString();
            console.log('🚀 ~ click ~ long:', lng);
            console.log(lat.toString(), lng.toString(), 'Fixed type');
            changeOfficeSetup(updateData as officeSetupData);
        },
    });
    return null;
};

const MapComponent: React.FC = () => {
    const { officeSetup } = useOfficeSetup();

    const initialPosition: [number, number] = [
        Number(
            officeSetup ? officeSetup?.contactInformation?.lat : '27.6923046'
        ),
        Number(
            officeSetup ? officeSetup?.contactInformation?.long : '85.3338262'
        ),
    ];
    const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        setPosition(initialPosition);
    }, [officeSetup]);

    return (
        <div className='map-container'>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '500px', width: '100%' }}
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                    position={position}
                    icon={L.icon({
                        iconUrl: image?.markerIcon,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowUrl: image?.markerIconShadow,
                        shadowSize: [41, 41],
                    })}
                >
                    <Popup>
                        Current position: {position[0].toFixed(4)},{' '}
                        {position[1].toFixed(4)}
                    </Popup>
                </Marker>
                <MapClickHandler setPosition={setPosition} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
