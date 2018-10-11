import * as vscode from 'vscode';
import { default as functions } from './functions';

export function activate(context: vscode.ExtensionContext) {

    console.log('Tianhao Plug-in Start!');
    for (let command in functions) {
        console.log('register command:' + command);
        context.subscriptions.push(
            vscode.commands.registerCommand(command, functions[command]));
    }
    // vscode.window.createTreeView()
    let pathStatusBarBtn = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    pathStatusBarBtn.command = "tianhao.test";
    pathStatusBarBtn.text = "Remote";
    pathStatusBarBtn.tooltip = "Test in click";
    pathStatusBarBtn.show();

}
