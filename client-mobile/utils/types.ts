export interface Coordinates {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked?: boolean;
  timestamp: number;
}

export interface ButtonProps {
  countdown: number,
  setCountdown: React.Dispatch<React.SetStateAction<number>>
  isPressed: boolean,
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>,
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>,
  helpType: string
}

export interface INotification {
  _id: string,
  type : string,
  text : string,
  time : string
}

export interface IAlert {
  _id : string;
  username: string;
  time: string;
  type: string;
  location: number[];
}