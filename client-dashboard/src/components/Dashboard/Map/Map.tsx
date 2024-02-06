import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ActiveAdminS, AlertS } from '../../../types';

function Map(): React.ReactNode {
  const alerts = useSelector((state: RootState) => state.location.alerts)
  const activeAdmins = useSelector((state: RootState) => state.location.activeAdmins)
  const displayCoord = useSelector((state: RootState) => state.location.displayCoords)

  return (
    <>
      <div className="map-container">

        <MapContainer center={[displayCoord[1], displayCoord[0] ]} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {alerts && alerts.map((alert: AlertS) => {
            return (
            <>
            <Marker key={alert.username} position={[alert.location[0], alert.location[1]]}>
              <Popup>
                {alert.username}
              </Popup>
            </Marker>
            </>
          )
          })}
            {activeAdmins && activeAdmins.map((activeAdmin: ActiveAdminS) => {
            return (
              <>
                {activeAdmin && activeAdmin.coords &&
                  <Marker key={activeAdmin.username} position={[activeAdmin.coords[0], activeAdmin.coords[1]]}>
                    <Popup>
                      {activeAdmin.username}
                    </Popup>
                  </Marker>}
              </>
            )
          })}
        </MapContainer>
      </div>
    </>
  )
}

export default Map