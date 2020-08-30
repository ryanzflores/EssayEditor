import React, { Component } from 'react';

export default class HighlightedText extends Component {
    constructor(props) {
        super(props)
        console.log(props);

        this.state = {
            content: this.props.content,
            start: 0,
            end: 0,
            beforeHighlight: '',
            highlightedContent: '',
            afterHighlight: ''
        }
    }

    /*componentWillReceiveProps(nextProps, nextContent) {
        this.setState({
            content: this.props.content,
            highlightedContent: this.props.content,
            edits: this.props.edits,
            start: this.props.start,
            end: this.props.end
        });
    } */

    componentDidMount() {
        console.log(this.state);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("updating. props.content: " + this.props.content + " state.content: " + this.state.content);
        if (this.props.content !== this.state.content || this.props.start !== this.state.start
            || this.props.end !== this.state.end) {
            let content = this.props.content;

            let beforeHighlight = content.slice(0, this.props.start);
            let highlightedContent = content.slice(this.props.start, this.props.end);
            let afterHighlight = content.slice(this.props.end);

            this.setState({
                content: content,
                start: this.props.start,
                end: this.props.end,
                beforeHighlight: beforeHighlight,
                highlightedContent: highlightedContent,
                afterHighlight: afterHighlight
            })

            console.log("component updated")
        }
    }

    render() {
        return (
            <p id={"highlightedText"}>
                <style type="text/css">
                {`
                .redHighlight {
                   background-color: red; 
                }
                `}
                </style>
                {this.state.beforeHighlight}
                <span className={"redHighlight"}>{this.state.highlightedContent}</span>
                {this.state.afterHighlight}
            </p>
        );
    }
}