import React, { useState, useEffect, useRef } from 'react';
import RaceAceAceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sass';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Paper } from '@material-ui/core';
import { FieldProps } from 'formik';

interface IAceEditorProps extends FieldProps {
    label?: string;
    autoFocus: boolean;
    placeholder: string;
}

const AceEditor: React.FC<IAceEditorProps> = ({ field, autoFocus, placeholder, form }) => {
    console.log('field', field);
    return (
        <Paper>
            <RaceAceAceEditor
                placeholder={placeholder}
                mode='sass'
                theme='github'
                name={field.name}
                onChange={text => form.setFieldValue(field.name, text)}
                focus={autoFocus}
                onBlur={e => field.onBlur(e)}
                fontSize={14}
                showPrintMargin
                onLoad={() => document.querySelectorAll(`#${field.name} textarea`)[0].setAttribute('id', field.name)}
                showGutter
                highlightActiveLine
                value={field.value}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </Paper>
    );
};

export default AceEditor;
