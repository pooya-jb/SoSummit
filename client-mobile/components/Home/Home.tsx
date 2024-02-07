import { Pressable, Text, View, Image, AppState, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import * as TaskManager from "expo-task-manager";

import socket from "../../utils/socket";
import {
  mapRegionUpdated,
  setLocation,
  socketConnected,
  tripStarted,
  userLocationUpdated,
} from "../../redux/userSlice";
import { styles } from "./Home.styles";
import { RootState } from "../../redux/store";
import { checkResponse } from "../../utils/socket";
import {
  updateNotifications,
  addNotification,
  updateAlerts,
  addAlert,
} from "../../redux/locationSlice";
import { mapPosition } from "../../utils/types";

const Home = () => {
  // STATE AND USE EFFECT
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [backgroundStatus, requestBackgroundPermission] =
    Location.useBackgroundPermissions();

  const resort = useSelector((state: RootState) => state.user.location);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const userName = useSelector((state: RootState) => state.user.username);
  const onTrip = useSelector((state: RootState) => state.user.tripStarted);
  const userLocation = useSelector(
    (state: RootState) => state.user.userLocation
  );
  const alerts = useSelector((state: RootState) => state.location.alerts);
  const mapRegion = useSelector((state: RootState) => state.user.mapRegion);
  const subscription = useRef({ foreground: null, background: null });
  const dispatch = useDispatch();

  useEffect(() => {
    foregroundTrackingSubscribe(subscription);
    requestPermission();
    requestBackgroundPermission();

    TaskManager.defineTask(
      "BACKGROUND_LOCATION_SUBSCRIPTION",
      ({ data: { locations }, error }) => {
        if (error) {
          // check `error.message` for more details.
          return;
        }
        const { coords } = locations[0];
        console.log("Received new locations from app", locations);
        socket.timeout(5000).emit(
          `Location-${resort}-Admin-live`,
          { coords: [coords.latitude, coords.longitude], userName: userName },
          checkResponse()
        );
      }
    );
    return () => {
      Location.stopLocationUpdatesAsync("BACKGROUND_LOCATION_SUBSCRIPTION");
    };
  }, []);

  // Foreground live Position Functions

  function permissionAbsent() {
    console.log("Permission to access location was denied");
    isAdmin
      ? Alert.alert("Please always allow location permissions in your settings and log back in.")
      : Alert.alert(
          "Please give this app the location permissions and log back in"
        );
  }

  async function foregroundTrackingSubscribe(subscription) {
    const { granted } = status || (await requestPermission());
    if (!granted) {
      permissionAbsent();
    }
  }

  // START AND STOP BUTTON HANDLERS
  const connectHandler = async () => {
    router.navigate("../Locations");
  };

  const adminConnectHandler = async () => {
    socket.on("connect", () => dispatch(socketConnected(true)));
    socket.on("disconnect", () => dispatch(socketConnected(false)));
    socket
      .connect()
      .timeout(5000)
      .emit(
        `Location-${resort}-Admin`,
        { location: resort, userName: userName },
        checkResponse(adminLobbyJoined, alertOfNoResponse)
      );
  };

  const stopBtnHandler = async () => {
    if (isAdmin) {
      socket
        .timeout(5000)
        .emit(
          `Location-${resort}-Admin-leave`,
          { location: resort, userName: userName },
          checkResponse(adminLobbyLeft, alertOfNoResponse)
        );
    } else {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      dispatch(tripStarted(false));
      dispatch(updateAlerts([]));
      dispatch(updateNotifications([]));
    }
  };

  // SOCKET CONNECTIONS RESPONSE HANDLERS
  function alertOfNoResponse() {
    Alert.alert(
      "Error",
      "Server did not respond. Please try again in one minute.",
      [
        {
          text: "Okay",
          style: "cancel",
        },
      ]
    );
  }

  async function adminLobbyJoined(response) {
    if (response.status) {
      dispatch(updateNotifications(response.info.notifications));
      dispatch(updateAlerts(response.info.alerts));
      dispatch(tripStarted(true));
      socket.on(`${response.info.location}-notifications-received`, (info) => {
        dispatch(addNotification(info));
      });
      socket.on(`${response.info.location}-alerts-received`, (info) =>
        dispatch(addAlert(info))
      );
      await Location.requestBackgroundPermissionsAsync();
      const subBack = await Location.startLocationUpdatesAsync(
        "BACKGROUND_LOCATION_SUBSCRIPTION",
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "SoSummit",
            notificationBody: "Sending location",
            notificationColor: "#008000",
          },
          distanceInterval: 0,
        }
      );
    } else {
      Alert.alert("Error", "Failed to enter admins lobby", [
        {
          text: "Okay",
          style: "default",
        },
      ]);
    }
  }

  function adminLobbyLeft(response) {
    if (response.status) {
      Location.stopLocationUpdatesAsync("BACKGROUND_LOCATION_SUBSCRIPTION");
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      dispatch(tripStarted(false));
      dispatch(updateAlerts([]));
      dispatch(updateNotifications([]));
    } else {
      Alert.alert("Error", "Failed to leave admins lobby", [
        {
          text: "Okay",
          style: "default",
        },
      ]);
    }
  }

  // MAP FUNCTIONS
  const regionChangeHandler = (newRegion: mapPosition) => {
    if (newRegion) {
      dispatch(mapRegionUpdated(newRegion));
    }
  };

  const currentLocationHandler = () => {
    if (userLocation.latitude && userLocation.longitude) {
      dispatch(
        mapRegionUpdated({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: mapRegion.latitudeDelta,
          longitudeDelta: mapRegion.longitudeDelta,
        })
      );
    }
  };

  let alertLocations = alerts.map((alert) => alert.location);

  return (
    <View style={styles.home}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          // region={ }
          showsMyLocationButton={true}
          onRegionChangeComplete={regionChangeHandler}
          provider={PROVIDER_GOOGLE}
          // REACT_NATIVE_MAPS INBUILT LOCATION TRACKING AND MOVE TO BUTTON
          showsUserLocation={true}
        >
          {/* SHOW ALERT LOCATION ON ADMIN MAP */}
          {alertLocations.map((location, index) => {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: location[0], longitude: location[1] }}
                title="HELP HERE"
              >
                <Image
                  source={require("../../assets/alert-marker.png")}
                  style={{ width: 40, height: 40 }}
                />
              </Marker>
            );
          })}
        </MapView>

        <View style={styles.buttonContainer}>
          {!onTrip ? (
            <Pressable
              onPress={isAdmin ? adminConnectHandler : connectHandler}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? "#51688a" : "#607ca4" },
              ]}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={stopBtnHandler}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? "#51688a" : "#607ca4" },
              ]}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
