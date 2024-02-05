import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Root, getPockemons } from "./src/server/api";

export default function App() {
    const [data, setData] = useState<Root[] | []>([]);
    const [error, setError] = useState<boolean>(false);
    const [input, setInput] = useState("");
    const handleApi = async () => {
        setError(false);
        if (input) {
            try {
                const response: any = await getPockemons(input.trim().toLowerCase());
                if (response.data.status === 404) {
                    setError(true);
                } else {
                    setData(response.data);
                }
                return;
            } catch (error) {
                setError(true);
            }
        }
        Alert.alert("Atenção", "por favor preencha o campo");
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                <TextInput onChangeText={setInput} style={styles.input} placeholder="Please, inform your pockemon" />
                <Pressable onPress={handleApi} style={styles.pressable}>
                    <Text style={styles.text}>Pesquisar</Text>
                </Pressable>
            </View>
            {error && <Text style={styles.textHeader}>Erro na consulta</Text>}
            {data?.length > 0 && (
                <FlatList
                    style={styles.flatlistContainer}
                    data={data}
                    ListHeaderComponent={<Text style={styles.textHeader}>Lista das habilidades</Text>}
                    renderItem={({ item, index }) => (
                        <View style={styles.viewList}>
                            <Text>Nome da habilidade:</Text>
                            <Text>{item.ability.name}</Text>
                        </View>
                    )}
                />
            )}

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 50,
    },
    input: { width: "60%", padding: 8, height: 40, borderRadius: 4, borderWidth: 1 },
    pressable: { padding: 12, backgroundColor: "blue", width: "30%", alignItems: "center", borderRadius: 24, margin: 16 },
    text: { color: "white" },
    viewList: {
        flexDirection: "row",
        gap: 4,
        backgroundColor: "#dcdcdc",
        borderRadius: 8,
        marginTop: 8,
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    textHeader: { fontSize: 24 },
    flatlistContainer: { flex: 1 },
});
