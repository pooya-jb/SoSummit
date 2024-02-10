import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { mapRegionUpdated } from "../redux/userSlice";

export default function AdminAlert () {
  const dispatch = useDispatch()
  const selectAlert = (location: number[]) => {
    dispatch(mapRegionUpdated({
      latitude: location[0],
      longitude: location[1],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }))
    router.navigate('/')
  }
  const alerts = useSelector((state: RootState) => state.location.alerts);
  type alertProps = { type: string, username: string, time: string, location:number[] };

  const Alert = ({ username, type, location, time }: alertProps) => (
    <TouchableOpacity style={styles.alertContainer} onPress={()=> selectAlert(location)} >
      {type && <Text style={styles.alertType}>{type}</Text>}
      <Text style={styles.alertText}>{username}</Text>
      <Text style={styles.alertTime}>{(new Date(Number(time)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.alerts}>
      <View>
        <FlatList
          style={styles.alertsList}
          data={alerts}
          renderItem={( {item} ) => <Alert type={item.type} username={item.username} time={item.time} location={item.location} />}/>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  alerts: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    marginTop: 20,
    gap: 1
  },
  alertContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
    overflow: "hidden"
  },
  alertType: {
    backgroundColor: "#C8D8ED",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "gray",
    color: "gray",
    fontSize: 14,
    marginBottom: 2,
    paddingBottom: 5
  },
  alertsList: {
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    gap: 1,
    width: 350
  },
  alertText: {
    fontSize: 16,
  padding: 5},
  alertTime: {
    padding: 4,
    fontSize: 13,
    color: 'gray',
    marginLeft: "auto"
  },
});
