import { RootState } from "../src/redux/store";

export const mockedStoreLogged : RootState = {
  user: {
    username: 'admin',
    email: 'testEmail',
    location: 'testLocation',
    isAuthenticated: true,
    isConnected: true,
    locationIsConnected: false,
    adminLocationIsConnected:true,
  },
  display: {
    drawerIsOpen : false,
    selectedUser: null,
    loginModalOpen: false,
    registerModalOpen: false,
    alertModalOpen: false
},
  location: {
    name: 'testLocation',
    coordinates: [
      13.378268,
      14,
      52.507313,
      52.8
    ],
    alerts: [{
      username: "Test",
      time: "1707311791879",
      type: "Lost",
      location: [52.5073672, 13.3783686]
    }],
    activeAdmins: [{
      username: "admin",
      coords : [
        52.5073689,
        13.378368
      ]
    }],
    admins: ["me", "admin"],
    displayCoords: [13.689134, 52.6536565],
    noots: [{
      text: "A scheduled Test",
      time: "1707311877337",
      type: "Test"
    }]
  } 
}
