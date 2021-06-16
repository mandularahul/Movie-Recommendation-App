import React from "react";
import HomeScreen from "./screens/Home";
import RecommendedMoviesScreen from "./screens/Recommendation";
import PopularMoviesScreen from "./screens/Popular";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createMaterialTopNavigator} from "react-navigation-tabs";
import {RFValue} from "react-native-responsive-fontsize";
export default function App() {
  return <AppContainer/>;
}
const AppTopNavigation = createMaterialTopNavigator({
    RecommendedMovies:{
        screen: RecommendedMoviesScreen,
        navigationOptions:{
            tabBarLabel: "Recommended",
            tabBarOptions:{
                tabStyle:{backgroundColor:"blue"},
                labelStyle:{color:"black"},
                indicatorStyle:{backgroundColor:"black"}
            }
        }
    },

    PopularMovies:{
        screen: PopularMoviesScreen,
        navigationOptions:{
            tabBarLabel: "Poular",
            tabBarOptions:{
                tabStyle:{backgroundColor:"blue"},
                labelStyle:{color:"black"},
                indicatorStyle:{backgroundColor:"black"}
            }
        }
    }


})

const AppStackNavigator = createStackNavigator(
    {
        Home:{
            screen:HomeScreen,
            navigationOptions:{
                headerShown: false
            }
        },
        AppTopNav: {
            screen: AppTopNavigation,
            navigationOptions:{
                headerBackTitle:null,
                headerTintColor:"black",
                headerTitle:"Recommended Movies",
                headerStyle:{
                    backgroundColor: "grey"
                },
                headerTitleStyle:{
                    color:"black",
                    fontWeight:"bold",
                    fontSize: RFValue(18)
                }
            }
        }
        
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppStackNavigator);