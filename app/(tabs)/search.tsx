import {Text, Button} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import seed from "@/lib/seed";

const Search = () => {
    return (
        <SafeAreaView>
            <Text>Search</Text>

            <Button title={"Seed"} onPress={() => seed().catch((error) =>  console.log("databasada xatolik", error))}></Button>
        </SafeAreaView>
    )
}
export default Search
