import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HighlightedText from "./highlighted-text.component";

export default class ViewEdits extends Component {
    constructor(props) {
        super(props);

        this.onChangeEdit = this.onChangeEdit.bind(this);


        this.state = {
            editsResponse: {},
            edits: [],
            message: '',
            start: 0,
            end: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/essays/' + this.props.match.params.id)
            .then(response => {
                axios.get('http://localhost:5000/essays/edits/' + this.props.match.params.id)
                    .then(editsResponse => {
                        if (editsResponse.data.length > 0) {
                            this.setState({
                                edits: editsResponse.data.map(function(edit) {
                                    let msg = '';
                                    if (edit.message.length > 50) {
                                        msg = edit.message.substring(0, 50) + "...";
                                    } else {
                                        msg = edit.message;
                                    }

                                    let json = {message: msg, edit: edit};
                                    console.log(json);
                                    return json;
                                }),
                                edit: editsResponse.data[0].date
                            })
                        }

                        this.setState({
                            editsResponse: editsResponse.data,
                            username: response.data.username,
                            description: response.data.description,
                            content: response.data.content,
                        })
                    })
            })
            .then(this.onChangeEdit)
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeEdit(e) {

        console.log(e)

        let targetEdit = this.state.edits[e.target.value];
        console.log(targetEdit);

        if (targetEdit) {
            this.setState({
                edit: e.target.value.edit,
                message: targetEdit.edit.message,
                start: targetEdit.edit.start,
                end: targetEdit.edit.end
            })
        } else {
            this.setState({
                edit: "",
                message: "",
                start: 0,
                end: 0
            })
        }

        console.log(this.state.editsResponse);

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
                        <div className="outside" id="highlightedContent">
                            <HighlightedText
                                content={this.state.content}
                                edits={this.state.edits}
                                start={this.state.start}
                                end={this.state.end}
                            />
                        </div>
                    </Col>
                    <Col>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.edit}
                                onChange={this.onChangeEdit}>
                            <option key={"choose"} value={"choose"}>Choose an option</option>
                            {
                                this.state.edits.map(function(edit, index) {
                                    return <option
                                        key={index}
                                        value={index}>{edit.message}
                                    </option>;
                                })
                            }
                        </select>
                        <div>
                            {this.state.message}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}