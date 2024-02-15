import { Box, Flex, Text } from '@radix-ui/themes';
import { Greet } from "../../../wailsjs/go/main/App";
import { useState } from 'react';

export function AppManagement() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <Flex gap="3">
            <Text size="2">Create a new app or Select an existing one.</Text>
            <Box width="9" height="9">
                Test
            </Box>
            <Box width="9" height="9">
                Test
            </Box>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn" onClick={greet}>Greet</button>
            </div>
        </Flex>
    )
}