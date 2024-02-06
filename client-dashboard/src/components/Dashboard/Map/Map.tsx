import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ActiveAdminS } from "../../../types";

function Map(): React.ReactNode {
  const alerts = useSelector((state: RootState) => state.location.alerts);
  const activeAdmins = useSelector(
    (state: RootState) => state.location.activeAdmins
  );
  const displayCoord = useSelector(
    (state: RootState) => state.location.displayCoords
  );

  return (
    <>
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
<<<<<<< HEAD
          {alerts && alerts.map((alert: {location: number[], username:string}, index:number) => {
            return (
              <>
            <Marker key={index} position={[alert.location[0], alert.location[1]]}>
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
                  <Marker position={[activeAdmin.coords[0], activeAdmin.coords[1]]}>
                    <Popup>
                      {activeAdmin.username}
                    </Popup>
                  </Marker>}
              </>
            )
          })}
=======
          {alerts &&
            alerts.map(
              (alert: { location: number[]; username: string },
                index: number) => {
                return (
                  <>
                    <Marker
                      key={index}
                      position={[alert.location[0], alert.location[1]]}
                    >
                      <Popup>{alert.username}</Popup>
                    </Marker>
                  </>
                );
              }
            )}
          {activeAdmins &&
            activeAdmins.map((activeAdmin: ActiveAdminS) => {
              return (
                <>
                  {activeAdmin && activeAdmin.coords && (
                    <Marker
                      position={[activeAdmin.coords[0], activeAdmin.coords[1]]}
                    >
                      <Popup>{activeAdmin.username}</Popup>
                    </Marker>
                  )}
                </>
              );
            })}
>>>>>>> 7e77a0fdeffaf6b7d9e7e149b38093d6430cadde
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
