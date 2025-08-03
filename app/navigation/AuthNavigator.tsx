import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './routes';
import { WelcomeScreen } from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
);

export default AuthNavigator;
