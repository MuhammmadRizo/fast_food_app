import {View, Text, Button, Alert} from 'react-native'
import {Link, router} from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {useState} from "react";
import {signIn} from "@/lib/appwrite";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({email: '', password: ''});

    const submit = async () => {
        const {email, password} = form;
        if(!email || !password) return Alert.alert("Xatolik", "Email yoki Parol to`g`ri ekaniligiga ishonch hosil qiling.")

        setIsSubmitting(true);

        try {
            await signIn({ email, password });

            router.replace("/")

        } catch (error: any) {
            Alert.alert("Xatolik", error.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className={"gap-10 bg-white rounded-lg p-5 mt-5"}>
            <CustomInput
                placeholder={"Email kiriting"}
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
                label={"Email"}
                keyboardType={"email-address"}
            />
            <CustomInput
                placeholder={"Parol kiriting"}
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                label={"Parol"}
                secureTextEntry={true}
            />

            <CustomButton
                title={"Kirish"}
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className={"flex justify-center mt-5 flex-row gap-2"}>
                <Text className={"base-regular text-gray-100"}>
                    Siz ro`yhatdan o`tmaganmisiz?
                </Text>
                <Link href={"/sign-up"} className={"base-bold text-primary"}>
                    Ro`yhatdan o`tish
                </Link>
            </View>
        </View>
    )
}
export default SignIn
