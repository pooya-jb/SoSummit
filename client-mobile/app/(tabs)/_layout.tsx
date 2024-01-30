import { Tabs } from "expo-router";
import { Pressable, Text, View, Image } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "",
          tabBarIcon: () => {
            return (
              <View style={{
                padding: 5,
                top: 8
                }}>
                <Image
                  source={require("../../assets/home-icon.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            )
          },
          headerRight: () => {
            return (
              <View>
                <Pressable>
                  <Text>Menu</Text>
                </Pressable>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="alert"
        options={{
          headerTitle: "Help",
          title: "",
          tabBarIcon: () => {
            return (
              <View style={{
                padding: 5,
                top: 8
                }}>
                <Image
                  source={require("../../assets/sos-icon02.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            )
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;