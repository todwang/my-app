'use client';
import { useEffect, useRef } from 'react';


export default function Editor() {
    let container = useRef(null);
    useEffect(() => {
        (async()=>{
            const {PineEditor} = (await import('./pine-editor'))
            new PineEditor(container.current, {
                language: 'pine',
                autoIndent: true,

                quickSuggestions: true,
                suggestOnTriggerCharacters: true,
                parameterHints: {
                    enabled: true
                },
                minimap: {
                    enabled: true
                },
                rulers:[80],
            })
        })()
    }, [])

    return <div ref={container} style={{ height: '90vh', width:'100%', backgroundColor:'#fff' }}></div>;
}