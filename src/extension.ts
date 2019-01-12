import * as vscode from 'vscode';
import { default as functions } from './functions';

export function activate(context: vscode.ExtensionContext) {

    console.log('Tianhao Plug-in Start!');
    for (let command in functions) {
        console.log('register command:' + command);
        context.subscriptions.push(
            vscode.commands.registerCommand(command, functions[command]));
    }
    let timeBarBtn = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    timeBarBtn.command = "tianhao.time";
    const format = (method, append = '', fix = 0) =>
        ((new Date()[method]() + fix) / 100).toFixed(2).substr(2) + (append);
    setInterval(function () {
        let displayText = new Date().getFullYear() + '-';
        displayText += format('getMonth', '-', 1);
        displayText += format('getDate', ' ');
        displayText += format('getHours', ':');
        displayText += format('getMinutes', ':');
        displayText += format('getSeconds', '.');
        displayText += format('getMilliseconds').substring(0, 1);
        timeBarBtn.text = displayText;
    }, 120);
    timeBarBtn.tooltip = timeBarBtn.text;
    timeBarBtn.color = "yellow";
    timeBarBtn.show();

}
