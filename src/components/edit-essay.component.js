import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditEssay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            essay: [],
            test: 'test1 test1 test1 test1'
        };

        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.handleMouseUp, true);
    }

    handleMouseUp(e) {
        console.log("here!");
        console.log(this.state.test);

        let selection = window.getSelection();
        let cursorStart = selection.anchorOffset;
        let cursorEnd = selection.focusOffset;

        const content = document.getElementById("content");
        const found = selection.containsNode(content, true);

        console.log('found: ' + found);

        let textStart = Math.min(cursorStart, cursorEnd);
        let textEnd = Math.max(cursorStart, cursorEnd);

        let text = this.state.test.substring(textStart, textEnd);

        console.log(cursorStart);
        console.log(cursorEnd);
        console.log(text);
    }

    render() {
        return (
            <div id="content">
                This is the edit essay component
            </div>
        )
    }
}