'use strict';
import * as vscode from 'vscode';
import { Client } from 'ssh2';
import { default as utils } from './utils';

const getEditor = () => vscode.window.activeTextEditor;
const showMessage = vscode.window.showInformationMessage;

export default {

    'tianhao.toggleCase': () => {
        const $editor = getEditor();
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
        const conn = new Client();
        const execCallBack = (err, stream) => {
            if (err) {
                return console.log(err);
            }
            console.log("======Remote Received=================");
            let result = '';
            stream.on('data', (resultBuffer) => result += resultBuffer.toString('UTF-8'))
                .on('close', function (code, signal) {
                    vscode.workspace.openTextDocument({
                        language: 'log',
                        content: result
                    }).then((doc) => vscode.window.showTextDocument(doc));
                    console.log('remote close: ' + code + ':' + signal);
                    conn.end();
                    console.log("======Remote End======================\n");
                }).stderr.on('data', (error) => result += "error:" + error.toString('UTF-8'));
        };

        utils.read(utils.path('remoteConfigPath'), (data) => {
            data = JSON.parse(data);
            console.log(data);
            utils.read(utils.path(data.execPath), (shellContext) => {
                conn.on('ready', () => {
                    showMessage('Connect Success');
                    conn.exec('uptime\n' + shellContext + '\nuptime', execCallBack);
                }).connect(data.connect);
            });
        });
    }

};