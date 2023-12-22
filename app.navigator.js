import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/main';
import Search from './screens/search';
import Acc from './screens/acc';
import Solve from './screens/solve';
import Create from './screens/create';
import AllCat from './screens/AllCat';
import AllPop from './screens/AllPop';
import CatArt from './screens/cat.art';

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false, animationEnabled: false, }} initialRouteName="Main">
        <Screen name="Main" component={Main} options={{ animation: 'none'}}></Screen>
        <Screen name="Search" component={Search} options={{ animation: 'none'}}></Screen>
        <Screen name="Acc" component={Acc} options={{ animation: 'none'}}></Screen>
        <Screen name="Solve" component={Solve} options={{ animation: 'none'}}></Screen>
        <Screen name="Create" component={Create} options={{ animation: 'none'}}></Screen>
        <Screen name="AllCat" component={AllCat} options={{ animation: 'none'}}></Screen>
        <Screen name="AllPop" component={AllPop} options={{ animation: 'none'}}></Screen>
        <Screen name="CatArt" component={CatArt} options={{ animation: 'none'}}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;