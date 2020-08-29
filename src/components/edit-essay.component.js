import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HighlightedText from "./highlighted-text.component";

export default class EditEssay extends Component {
    constructor(props) {
        super(props);

        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);

        this.state = {
            username: '',
            description: '',
            content: '',
            date: new Date(),
            message: ''
        }

        axios.get('http://localhost:5000/essays/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data.username);
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    content: response.data.content,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.handleMouseUp, true);
    }

    handleMouseUp(ready) {
        // Delay necessary to prevent accidental trigger upon deselection
        setTimeout(this.handleSelection, 50);
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSelection() {
        const content = document.getElementById("content");

        let selection = window.getSelection();
        let cursorStart = selection.anchorOffset;
        let cursorEnd = selection.focusOffset;
        let textStart = Math.min(cursorStart, cursorEnd);
        let textEnd = Math.max(cursorStart, cursorEnd);

        // Check that essay content is being selected and selection size != 0
        const found = selection.containsNode(content, true) && !(textStart === textEnd);

        if (found) {
            let text = this.state.content.substring(textStart, textEnd);

            console.log("start: " + textStart + " end: " + textEnd + " text: " + text);
        }
    }

    render() {
        return (
            <Container>
                This is the edit essay component
                <br/>

                <Row>
                    <Col>
                        <label>Content: </label>
                        <br/>
                        <p
                            id="content"
                        >
                            {this.state.content}
                        </p>
                        <HighlightedText />
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>Message: </label>
                            <textarea
                                required
                                className="form-control"
                                value={this.state.message}
                                onChange={this.onChangeMessage}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}