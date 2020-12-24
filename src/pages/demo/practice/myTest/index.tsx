import React, { useState, useEffect, useContext } from 'react';
import { useMount, useResponsive } from '@umijs/hooks';


const test = (props: any) => {
    const [count, setCount] = useState(0);

    useMount(() => {

    });

    useEffect(() => {
        // 使用浏览器的 API 更新页面标题
        document.title = `You clicked ${count} times`;
        // alert(count);
    });

    const themes = {
        light: {
            foreground: "#000000",
            background: "#eeeeee"
        },
        dark: {
            foreground: "#ffffff",
            background: "#222222"
        }
    };
    const ThemeContext = React.createContext(themes.light);

    function App() {
        return (
            <ThemeContext.Provider value={themes.dark}>
                <Toolbar />
            </ThemeContext.Provider>
        );
    }

    function Toolbar(propf) {
        return (
            <div>
                <ThemedButton />
            </div>
        );
    }

    function ThemedButton() {
        const theme = useContext(ThemeContext);
        return (
            <button style={{ background: theme.background, color: theme.foreground }}>
                I am styled by theme context!
            </button>
        );

    }
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );

}

export default test;