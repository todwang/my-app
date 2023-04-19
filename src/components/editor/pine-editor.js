import { MonacoServices, MonacoLanguageClient } from "monaco-languageclient"
import {BrowserMessageReader, BrowserMessageWriter} from 'vscode-jsonrpc/browser'
// import { CloseAction, ErrorAction} from 'vscode-languageclient/lib/common/client.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'


const constCfg = {
    fontFamily: 'Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
    lineNumbersMinChars: 0,
    padding: {
        top: 8
    },
    lineDecorationsWidth: 10,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",

}

function createPineLanguageClient() {
    const lspWorker = window.pineEditor?.lspWorker || new Worker(
        /* webpackChunkName: "lsp.worker" */ new URL('./lsp.worker.js', import.meta.url), 
        {
            name: "Language Server"
        }
    );
    window.pineEditor = {
        lspWorker,
        languageClientReady: false
    };

    const clientOptions = {
        documentSelector: ['pine'],
        // errorHandler: { 
        //     error: ()=>({action: ErrorAction.Continue}), 
        //     closed: ()=>({action: CloseAction.DoNotRestart})
        // },
        markdown: { isTrusted: true },
    };
    const connectionProvider = { 
        get: () => (
            Promise.resolve({ 
                reader: new BrowserMessageReader(lspWorker), 
                writer: new BrowserMessageWriter(lspWorker) 
            })
        )
    };

    const monacoLanguageClient = new MonacoLanguageClient({ 
        name: "Language Client", 
        clientOptions, 
        connectionProvider 
    });
    return monacoLanguageClient;
}

export class PineEditor {
    constructor(divRef, cfg) {
        this._editor = this._create(divRef, cfg)
        this._initMonacoConfig()
    }

    _create(divRef, cfg) {
        return monaco.editor.create(divRef, {
            ...constCfg,
            ...cfg
        })
    }

    _initMonacoConfig() {
        window.MonacoEnvironment = {
            getWorker() {
                return new Worker(
                    /* webpackChunkName: "pine.worker" */ new URL('./pine.worker.js', import.meta.url),
                    {
                        name:"Editor Worker"
                    }
                )
            }
        }
        MonacoServices.install()
        const languageClient = createPineLanguageClient()
        // this._monaco.languageClient.start().then(()=>{

        // })
    }
}