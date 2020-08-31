import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";

export default class UpdateEssay extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            content: '',
            date: new Date(),
            users: []
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

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    componentDidMount() {

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const essay = {
            username: this.state.username,
            description: this.state.description,
            content: this.state.content,
            date: this.state.date
        }

        console.log(essay);

        console.log(this.state.date);

        axios.post('http://localhost:5000/essays/update/'+this.props.match.params.id, essay)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        // window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Update Essay</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea
                            required
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Essay" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}