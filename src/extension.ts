'use strict';
import * as vscode from 'vscode';
import * as functions from './functions';

export function activate(context: vscode.ExtensionContext) {
    console.log('Tianhao Plug-in Start!');
    for (let command in functions.default) {
        console.log('register command:' + command);
        context.subscriptions.push(
            vscode.commands.registerCommand(command, functions.default[command]);
    }

}
