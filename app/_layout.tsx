import { Slot } from "expo-router";
import { AuthProvider } from "../src/contexts/AuthContext";

export default function Root (){
    return(
        <AuthProvider>
            <Slot/>
        </AuthProvider>
    )
}