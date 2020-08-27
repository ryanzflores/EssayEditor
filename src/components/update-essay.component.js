import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";

export default class UpdateEssay extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            content: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
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

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
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
            content: this.state.content,
            date: this.state.date
        }

        console.log(essay);

        console.log(this.state.date);

        axios.post('http://localhost:5000/essays/update/'+this.props.match.params.id, essay)
            .then(res => console.log(res.data));

        window.location = '/';
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
                        <label>Content: </label>
                        <input  type="text"
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
                        <input type="submit" value="Create Essay" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}