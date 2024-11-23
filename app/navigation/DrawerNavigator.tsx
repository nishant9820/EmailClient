import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import CustomDrawer from "@/components/appCoustoms/CustomDrawer";
import EmailEditorScreen from "../email/EmailEditorScreen";
import SentEmails from "../main/SentMail";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../main";
import ViewEmailDetails from "../email/ViewEmailDetails";
import { useSelector } from "react-redux";
import LoginScreen from "../auth/LoginScreen";
import { RootState } from "../store";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ViewEmailDetails" component={ViewEmailDetails} />
    <Stack.Screen name="Compose" component={EmailEditorScreen} />
    <Stack.Screen component={SentEmails} name="Sent" />
  </Stack.Navigator>
);

export default function DrawerNavigator({ navigation }: { navigation: any }) {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <LoginScreen navigation={navigation} />; // Pass navigation prop
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Drafts"
    >
      <Drawer.Screen
        name="Drafts"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen component={SentEmails} name="Sent" />
      <Drawer.Screen name="Compose" component={EmailEditorScreen} />
      <Drawer.Screen
        name="ViewEmailDetails"
        component={ViewEmailDetails}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
}
