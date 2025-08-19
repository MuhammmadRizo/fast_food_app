import {View, Text, SafeAreaView} from 'react-native'
import {Slot} from "expo-router";

const _Layout = () => {
    return (
        <SafeAreaView>
            <Text>Auth Layout</Text>
            <Slot />
        </SafeAreaView>
    )
}
export default _Layout
