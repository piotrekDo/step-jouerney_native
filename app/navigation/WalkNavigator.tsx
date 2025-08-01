import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalkScreen } from '../screens/WalkScreen';
import routes from './routes';
import WalkingTracker from '../components/walk_screen/WalkingTracer';

const Stack = createNativeStackNavigator();

const WalkNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.WALK} component={WalkScreen} />
      <Stack.Screen name={routes.TRACKING} component={WalkingTracker} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
);

export default WalkNavigator;
