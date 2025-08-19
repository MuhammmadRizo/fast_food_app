import {View, Text, Alert} from 'react-native'
import {Link, router} from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {useState} from "react";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const submit = async () => {
        const {name, email, password} = form;
        if(!name || !email || !password) return Alert.alert("Xatolik", "Email yoki Parol to`g`ri ekaniligiga ishonch hosil qiling.")

        setIsSubmitting(true);

        try {
            await createUser({ email,  password,  name, })

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
                placeholder={"Ismingizni kiriting"}
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
                label={"Ismingiz"}
            />
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
                title={"Ro`yhatdan o`tish"}
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className={"flex justify-center flex-row gap-2"}>
                <Text className={"base-regular text-gray-100"}>
                    Siz ro`yhatdan o`tganmisiz?
                </Text>
                <Link href={"/sign-in"} className={"base-bold text-primary"}>
                    Kirish
                </Link>
            </View>
        </View>
    )
}
export default SignUp
