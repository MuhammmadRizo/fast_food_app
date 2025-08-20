import {
    View,
    KeyboardAvoidingView,
    ImageBackground,
    Platform,
    ScrollView,
    Dimensions,
    Image
} from 'react-native'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
import useAuthStore from "@/store/auth.store";

export default function AuthLayout() {
    const { isAuthenticated } = useAuthStore();

    if(isAuthenticated) return <Redirect href="/" />

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView
                className={"bg-white h-full"}
                keyboardShouldPersistTaps={"handled"}
            >
                <View
                    className={"w-full relative"}
                    style={{height: Dimensions.get("screen").height / 2.25}}
                >
                    <ImageBackground
                        source={images.loginGraphic}
                        className={"size-full rounded-b-lg"}
                        resizeMode={"stretch"}/>
                    <Image source={images.logo} className={"absolute size-48 self-center z-10 -bottom-16"} />
                </View>
                <Slot />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
// bu yoqda const _Layout bilan export default _Layout qisak va export default _Layout ni o'chirib tashlasak HomeScreen ishlayapti.
//