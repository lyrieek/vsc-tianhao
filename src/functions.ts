'use strict';
import * as vscode from 'vscode';

const $editor = vscode.window.activeTextEditor;
const showMessage = vscode.window.showInformationMessage;

export default {

    'tianhao.toggleCase': () => {
        if (!$editor) {
            return showMessage('There is no activeTextEditor!');
        }
        if (!$editor.selections || $editor.selections.length === 0) {
            return showMessage('There is no selected text!');
        }

        $editor.edit((edit: any) => {
            for (let i = 0; i < $editor.selections.length; i++) {
                const selection = $editor.selections[i];
                if (selection.isEmpty) {
                    return;
                }
                const range = new vscode.Range(selection.start, selection.end);
                let text = $editor.document.getText(range);
                if (text === text.toUpperCase()) {
                    return edit.replace(range, text.toLowerCase());
                }
                edit.replace(range, text.toUpperCase());
            }
        });
    },

    'tianhao.test': () => {
        showMessage('Testx !');
    }

};