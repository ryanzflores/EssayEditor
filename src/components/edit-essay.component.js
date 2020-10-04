import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HighlightedText from "./highlighted-text.component";

export default class EditEssay extends Component {
    constructor(props) {
        super(props);

        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.onClearHighlight = this.onClearHighlight.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            content: '',
            date: new Date(),
            edits: [],
            start: 0,
            end: 0,
            message: '',
            valid: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/essays/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    content: response.data.content,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        window.addEventListener('mouseup', this.handleMouseUp, true);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.handleMouseUp, true)
    }

    handleMouseUp(ready) {
        // Delay necessary to prevent accidental trigger upon deselection
        setTimeout(this.handleSelection, 50);
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    onClearHighlight() {
        this.setState({
            start: 0,
            end: 0,
            valid: false
        });

        document.getElementById('highlightedContent').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');

        window.getSelection().empty();

        this.setState({
            valid: false
        });
    }

    handleSelection() {
        const content = document.getElementById("content");

        let selection = window.getSelection();
        console.log("content:");
        console.log(content)
        let cursorStart = selection.anchorOffset;
        let cursorEnd = selection.focusOffset;
        let textStart = Math.min(cursorStart, cursorEnd);
        let textEnd = Math.max(cursorStart, cursorEnd);

        let found = false;
        // Check that essay content is being selected and selection size != 0
        if (content !== null && selection.type !== "None" && selection.type !== "Caret") {
            found = selection.containsNode(content, true) && !(textStart === textEnd);
        }
        const outsides = document.getElementsByClassName("outside");

        Array.from(outsides).forEach((element) => {
            if (selection.containsNode(element, true)) {
                found = false;
            }
        });

        if (found) {
            let text = this.state.content.substring(textStart, textEnd);

            this.setState({
                start: textStart,
                end: textEnd,
                valid: true
            });

            document.getElementById('content').classList.add('hidden');
            document.getElementById('highlightedContent').classList.remove('hidden');

            console.log("start: " + textStart + " end: " + textEnd + " text: " + text);
        } else if (textStart !== textEnd) {
            console.log("textStart: " + textStart + " textEnd: " + textEnd + " !found");
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const edit = {
            start: this.state.start,
            end: this.state.end,
            message: this.state.message,
            date: this.state.date
        }

        if (this.state.end !== 0 && this.state.start !== this.state.end) {
            axios.post('http://localhost:5000/essays/edit/' + this.props.match.params.id, edit)
                .then(res => console.log(res.data))
                .catch(function (error) {
                    console.log(error);
                });

            window.location = '/';

        } else {
            window.confirm("Select part of the essay before submitting.");
        }
    }

    render() {
        return (
            <Container>
                <style type="text/css">
                    {`
                .hidden {
                   display: none; 
                }
                div {
                   white-space: pre-wrap;
                }
                `}
                </style>
                <Row>
                    <Col>
                        <br/>
                        <label className="outside"> Content: </label>
                        <br/>
                        <div id="content">
                            {this.state.content}
                        </div>
                        <div className="outside hidden" id="highlightedContent">
                            <HighlightedText
                                content={this.state.content}
                                edits={this.state.edits}
                                start={this.state.start}
                                end={this.state.end}
                            />
                        </div>
                    </Col>
                    <Col>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Message: </label>
                                <textarea
                                    required
                                    className="form-control"
                                    value={this.state.message}
                                    onChange={this.onChangeMessage}
                                />
                            </div>
                            <div className="form-group">
                                <Button onClick={this.onClearHighlight} variant="secondary" >Clear Highlight</Button>
                                <input disabled={!this.state.valid} type="submit" value="Submit Edit" className="btn btn-primary" />
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}