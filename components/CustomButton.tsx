import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import {CustomButtonProps} from "@/type";
import cn from "clsx"

const CustomButton = ({
    onPress,
    title = 'Menga Bos',
    style,
    textStyle,
    leftIcon,
    isLoading = false
}: CustomButtonProps) => {

    return (
        <TouchableOpacity
            className={cn("custom-btn", style)}
            onPress={onPress}
        >
            {leftIcon}

            <View className={"flex-row flex-center"}>
                {isLoading ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                ): (
                    <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
