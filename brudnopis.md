//   const [tracking, setTracking] = useState<boolean>(false);
//   const [routeCoords, setRouteCoords] = useState<Location.LocationObjectCoords[]>([]);
//   const [region, setRegion] = useState<Region | null>(null);
//   const locationSubscription = useRef<Location.LocationSubscription | null>(null);

//   // Pobierz lokalizację od razu po załadowaniu komponentu
//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Brak uprawnień do lokalizacji');
//         return;
//       }
//       const location = await Location.getCurrentPositionAsync({});
//       const coords: Location.LocationObjectCoords = location.coords;

//       const initialRegion: Region = {
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       };

//       setRegion(initialRegion);
//       setRouteCoords([coords]); // pokaż pinezkę na aktualnej pozycji
//     })();

//     return () => {
//       if (locationSubscription.current) {
//         locationSubscription.current.remove();
//       }
//     };
//   }, []);

//   const startTracking = async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Brak uprawnień do lokalizacji');
//       return;
//     }

//     setRouteCoords([]); // czyścimy trasę na start

//     locationSubscription.current = await Location.watchPositionAsync(
//       {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 5000,
//         distanceInterval: 5,
//       },
//       location => {
//         const coords = location.coords;

//         // Ustawiaj region, żeby mapa się przesuwała za użytkownikiem
//         setRegion(prevRegion => ({
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//           latitudeDelta: prevRegion?.latitudeDelta ?? 0.01,
//           longitudeDelta: prevRegion?.longitudeDelta ?? 0.01,
//         }));

//         console.log(coords);
//         setRouteCoords(prev => [...prev, coords]);
//       }
//     );

//     setTracking(true);
//   };

//   const stopTracking = () => {
//     if (locationSubscription.current) {
//       locationSubscription.current.remove();
//       locationSubscription.current = null;
//     }
//     setTracking(false);
//   };

<!-- <a href="https://www.flaticon.com/free-icons/sunny" title="sunny icons">Sunny icons created by Freepik - Flaticon</a> -->