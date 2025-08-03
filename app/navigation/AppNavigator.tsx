import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../config/colors';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { NewWalkButton } from './NewWalkButton';
import routes from './routes';
import WalkNavigator from './WalkNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator>
      <Tab.Screen
        name={routes.WELCOME}
        component={WelcomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='home' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={routes.WALK}
        component={WalkNavigator}
        options={({ navigation }) => ({
          tabBarButton: props => (
            <NewWalkButton
              color={props.accessibilityState?.selected ? colors.white : colors.background}
              onPress={() => navigation.navigate(routes.WALK)}
            />
          ),
          tabBarIcon: ({ color, size }) => null,
        })}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={WelcomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='account' color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  </GestureHandlerRootView>
);

export default AppNavigator;
