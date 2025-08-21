import {Redirect, Tabs} from "expo-router"
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {Image, Text, View} from "react-native";
import {images} from "@/constants";
import cn from "clsx"

const TabBarIcon = ({focused, icon, title}:  TabBarIconProps) => (
    <View className={"tab-icon"} style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 15, width: 80, marginLeft: 10}}>
    {/* viewga style ni o'zim qo'shdim*/}
        <Image source={icon} className="size-7 mb-1" resizeMode="contain" tintColor={focused ? "#fe8c00" : "#5d5f6d"}  style={{width: 20, height: 20, marginBottom: 2}}/>
        <Text className={cn('text-sm font-bold', focused ? 'text-primary':'text-gray-200')} style={{fontSize: 14}}>
            {title}
        </Text>
    </View>
)

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    if(!isAuthenticated) return <Redirect href="/sign-in" />
    return(
        <Tabs screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        marginHorizontal: 20,
                        height: 55,
                        position: 'absolute',
                        bottom: 30,
                        backgroundColor: 'white',
                        shadowColor: '#1a1a1a',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5
                    }
            }}>
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Bosh sahifa",
                    tabBarIcon: ({focused}) => <TabBarIcon title={"Bosh sahifa"} icon={images.home} focused={focused} />
                }}
            />
            <Tabs.Screen
                name={"search"}
                options={{
                    title: "Izlash",
                    tabBarIcon: ({focused}) => <TabBarIcon title={"Izlash"} icon={images.search} focused={focused} />
                }}
            />
            <Tabs.Screen
                name={"cart"}
                options={{
                    title: "Savat",
                    tabBarIcon: ({focused}) => <TabBarIcon title={"Savat"} icon={images.bag} focused={focused} />
                }}
            />
            <Tabs.Screen
                name={"profile"}
                options={{
                    title: "Profil",
                    tabBarIcon: ({focused}) => <TabBarIcon title={"Profil"} icon={images.person} focused={focused} />
                }}
            />
        </Tabs>
    )
}