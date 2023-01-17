import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import Row from './components/Row/Row';
import Button from './components/Button/Button';

export default function App() {
    const [currVal, setCurrVal] = useState("");
    const [operator, setOperator] = useState(null);
    const [prevVal, setPrevVal] = useState(null);


    const handleTap = (type, value) => {
        if (type === "number") {
            setCurrVal(`${currVal}${value}`);
            console.log(currVal)
        }
        if (type === "dot") {
            let text = currVal;
            let newText = currVal + '.';
            if (newText.match("^(\\d+)(\\.{0,1})?$")) {
                setCurrVal(newText)
            }
        }

        if (type === "operator") {
            setOperator(value);
            setPrevVal(currVal);
            setCurrVal("");

        }

        if (type === "clear") {
            setCurrVal("");
            setOperator(null);
            setPrevVal(null);
        }

        if (type === "posneg") {
            if (currVal === "") {
                return
            }
            setCurrVal(`${parseFloat(currVal) * -1}`);
        }

        if (type === "percentage") {
            if (currVal === "") {
                return
            }
            let res = `${parseFloat(currVal) * 0.01}`;
            if (res.length < 15) {
                setCurrVal(`${parseFloat(currVal) * 0.01}`);
            } else return;

        }

        if (type === "equal") {
            const current = parseFloat(currVal);
            const previous = parseFloat(prevVal);

            if (operator === "+") {
                setCurrVal(previous + current);
                setOperator(null);
                setPrevVal(null);
            }
            if (operator === "/") {
                setCurrVal(previous / current);
                setOperator(null);
                setPrevVal(null);
            }

            if (operator === "-") {
                setCurrVal(previous - current);
                setOperator(null);
                setPrevVal(null);
            }

            if (operator === "*") {
                setCurrVal(previous * current);
                setOperator(null);
                setPrevVal(null);
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView>
                <Text style={styles.value}>{currVal}</Text>
                <Row>
                    <Button text="C" theme="secondary" onPress={() => handleTap("clear")}/>
                    <Button text="+/-" theme="secondary" onPress={() => handleTap("posneg")}/>
                    <Button text="%" theme="secondary" onPress={() => handleTap("percentage")}/>
                    <Button text="/" theme="accent" onPress={() => handleTap("operator", "/")}/>
                </Row>
                <Row>
                    <Button text="7" onPress={() => handleTap("number", 7)}/>
                    <Button text="8" onPress={() => handleTap("number", 8)}/>
                    <Button text="9" onPress={() => handleTap("number", 9)}/>
                    <Button text="x" theme="accent" onPress={() => handleTap("operator", "*")}/>
                </Row>
                <Row>
                    <Button text="4" onPress={() => handleTap("number", 4)}/>
                    <Button text="5" onPress={() => handleTap("number", 5)}/>
                    <Button text="6" onPress={() => handleTap("number", 6)}/>
                    <Button text="-" theme="accent" onPress={() => handleTap("operator", "-")}/>
                </Row>
                <Row>
                    <Button text="1" onPress={() => handleTap("number", 1)}/>
                    <Button text="2" onPress={() => handleTap("number", 2)}/>
                    <Button text="3" onPress={() => handleTap("number", 3)}/>
                    <Button text="+" theme="accent" onPress={() => handleTap("operator", "+")}/>
                </Row>
                <Row>
                    <Button text="0" size="double" onPress={() => handleTap("number", 0)}/>
                    <Button text="." onPress={() => handleTap("dot", ".")}/>
                    <Button text="=" theme="accent" onPress={() => handleTap("equal")}/>
                </Row>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
        justifyContent: "flex-end",
    },
    value: {
        color: "#fff",
        fontSize: 40,
        textAlign: "right",
        marginRight: 20,
        marginBottom: 10
    }
});