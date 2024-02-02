import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

function Map(): React.ReactNode {
  const alerts = useSelector((state: RootState) => state.location.alerts)
console.log(alerts)
  return (
    <>
      <div className="map-container">

        <MapContainer center={[45.769899922590554, 7.830330223574947]} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[45.769899922590554, 7.830330223574947]}>
              <Popup>
                Hi
              </Popup>
            </Marker>
          {alerts.length > 1 && alerts.map(alert => {
            console.log(alert)
            return (
            <Marker position={[alert.coords[0], alert.coords[1]]}>
              <Popup>
                {alert.username}
              </Popup>
            </Marker>
          )
          })}
        </MapContainer>
      </div>
    </>
  )
}

export default Map