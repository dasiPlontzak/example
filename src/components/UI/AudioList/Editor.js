import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import './Editor.css'
import 'react-quill/dist/quill.bubble.css';
import $ from 'jquery'
export default function Editor(props) {

    useEffect(() => {
        $(`#${props.id}>.ql-container`).css({
            "fontSize": props.style.fontSize,
            // "minHeight":props.style.minHeight,
            // "maxHeight":props.style.maxHeight
            "height":props.style.height,           
        })
        $(`.ql-editor`).css(
            "textAlign",props.style.textAlign  
        )    
    })

    const handleChange = (html) => {
        props.changeText(html)
    }

    const checkValue = (e) => {
        if (props.value.length > props.maxLength)
            e.preventDefault()
    }

    return (
        <div className="app">
            <ReactQuill
                theme="bubble"
                onChange={handleChange}
                value={props.value}
                modules={Editor.modules}
                formats={Editor.formats}
                bounds={'.app'}
                placeholder={props.placeholder}
                onKeyPress={checkValue}
                id={props.id}
            />
        </div>
    )
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
    toolbar: [
        // [{ 'header': '1' }, { 'header': '2' }],
        // [{ size: [] }],
        ['bold', 'italic', 'underline',
        //  'strike', 'blockquote'
        ],
        // [
        //     { 'indent': '-1' }, { 'indent': '+1' }],
        // ['link'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

Editor.formats = [
    // 'header', 'font', 'size',
    'bold', 'italic', 'underline',
    // 'strike', 'blockquote',
    // 'list', 'bullet', 'indent',
    // 'link',
]
