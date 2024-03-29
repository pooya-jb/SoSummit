import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ActiveAdminS } from '../../../types';
import alertIcon from "../../../assets/alert-marker.png";
import alertActiveIcon from "../../../assets/alert-active.png";
import { Icon } from 'leaflet';
import audioNot from "../../../assets/mixkit-classic-alarm-995.wav"


function Map(): React.ReactNode {
  const alerts = useSelector((state: RootState) => state.location.alerts);
  const selectedUser = useSelector((state: RootState) => state.display.selectedUser)
  const activeAdmins = useSelector(
    (state: RootState) => state.location.activeAdmins
  );
  const displayCoord = useSelector(
    (state: RootState) => state.location.displayCoords
  );

const selectedUserAlertIcon = new Icon({
  iconUrl: alertActiveIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const normalAlertIcon = new Icon({
  iconUrl: alertIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});
  
  React.useEffect(() => {
    function playNotificationSound() {
  // Create an Audio object
  const audio = new Audio(audioNot); // Provide the URL of the sound file
  audio.play(); // Play the audio
    }
    alerts.length > 0 && playNotificationSound()
   },
    [alerts])

  return (
      <div className="map-container">
        <MapContainer
          center={[displayCoord[1], displayCoord[0]]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {alerts &&
            alerts.map(
              (alert: { location: number[]; username: string },
                index: number) => {
                return (

                    <Marker
                      key={index}
                      position={[alert.location[0], alert.location[1]]}
                      icon={selectedUser === alert.username ? selectedUserAlertIcon : normalAlertIcon}
                    >
                      <Popup>User: {alert.username}</Popup>
                    </Marker>

                );
              }
            )}
          {activeAdmins &&
            activeAdmins.map((activeAdmin: ActiveAdminS, index: number) => {
              return activeAdmin && activeAdmin.coords && (
                <Marker
                  key={index}
                      position={[activeAdmin.coords[0], activeAdmin.coords[1]]}
                    >
                      <Popup>{activeAdmin.username}</Popup>
                    </Marker>
                  );
            })}
        </MapContainer>
      </div>
  );
}

export default Map;
