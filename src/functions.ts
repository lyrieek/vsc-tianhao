'use strict';
import * as vscode from 'vscode';
import { Client } from 'ssh2';
import { default as utils } from './utils';

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

        $editor.edit((edit) => {
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
        showMessage('Test !');
    },
    'tianhao.remote': () => {
        utils.read(utils.path('remoteConfigPath'), (data) => {
            data = JSON.parse(data);
            console.log(data);
            const conn = new Client();
            conn.on('ready', () => {
                console.log('connect ...');
                conn.exec('uptime\nservice tomcat8 status\nls -l\nuptime', function (err, stream) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("======Remote Received=================");
                    const result = [];
                    stream.on('data', function (data) {
                        console.log(data.toString('UTF-8'));
                        result.push(data.toString('UTF-8');
                        console.log("--------------------------------------");
                    }).on('close', function (code, signal) {
                        vscode.window.showTextDocument(vscode.workspace.openTextDocument({
                            language: 'plaintext',
                            content: result.join('\n--------------------------------------\n')
                        }));
                        console.log('remote close: ' + code + ':' + signal);
                        conn.end();
                        console.log("======Remote End======================\n");
                    }).stderr.on('data', function (data) {
                        console.log('remote error: ' + data);
                    });
                });
            }).connect(data.connect);
        });
        showMessage("ok");
    }

};