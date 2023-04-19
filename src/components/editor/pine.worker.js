import * as worker from 'monaco-editor/esm/vs/editor/editor.worker';
self.onmessage = () => {
	worker.initialize({
    });
};