'use babel';

import WorkspaceSaverView from './workspace-saver-view';
console.log('WorkspaceSaverView', WorkspaceSaverView);
import { CompositeDisposable } from 'atom';

export default {

    workspaceSaverView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        
        this.workspaceSaverView = new WorkspaceSaverView(state.workspaceSaverViewState, function(res){
            console.log(res);
        });

        this.modalPanel = atom.workspace.addModalPanel({
            item: this.workspaceSaverView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {

            'workspace-saver:toggle': () => {
                var paths = atom.workspace.getTextEditors().map(editor => {
                    return {
                        path: editor.getPath(),
                        buffer: editor.buffer.isModified() ? editor.buffer.getText() : false,
                    }
                });

                // Open the saved paths
                for (var i = 0; i < paths.length; i++) {
                    atom.workspace.open(paths[i]);
                }
            }

        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.workspaceSaverView.destroy();
    },

    serialize() {
        return {
            workspaceSaverViewState: this.workspaceSaverView.serialize()
        };
    },

    toggle() {
        console.log('WorkspaceSaver was toggled!');
        return (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    }

};
