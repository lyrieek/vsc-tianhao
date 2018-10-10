'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Tianhao Plug-in Start!');
    const commands = vscode.commands.registerCommand('tianhao.toggleCase', () => {
        vscode.window.showInformationMessage('Toggle Start!');

        const $editor = vscode.window.activeTextEditor;
        if (!$editor) {
            return vscode.window.showInformationMessage('There is no activeTextEditor!');
        }
        if (!$editor.selections || $editor.selections.length === 0) {
            return vscode.window.showInformationMessage('There is no selected text!');
        }

        $editor.edit(function (edit) {
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
    });

    context.subscriptions.push(commands);
}
