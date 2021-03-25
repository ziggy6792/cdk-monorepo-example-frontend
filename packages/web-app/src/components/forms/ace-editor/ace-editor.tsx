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

const AceEditor: React.FC<IAceEditorProps> = ({ field, autoFocus, placeholder, form }) => (
    <Paper>
        <RaceAceAceEditor
            placeholder={placeholder}
            mode='sass'
            theme='github'
            name='blah2'
            onChange={text => form.setFieldValue(field.name, text)}
            focus={autoFocus}
            onBlur={() => form.handleBlur(field.name)}
            fontSize={14}
            showPrintMargin
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

export default AceEditor;
