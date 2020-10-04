import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class CreateEssay extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            content: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
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
        const cookies = new Cookies();
        e.preventDefault();

        const essay = {
            description: this.state.description,
            content: this.state.content,
            date: this.state.date
        }

        console.log(essay);

        console.log(this.state.date);

        // When an essay is successfully created, a cookie named ("essayId" + i) is made,
        // where i is the first available number from 0 to 29. If 30 essays exist, no more
        // can be made. Each essay's cookie (and the essay itself) expires after 3 days.
        axios.post('http://localhost:5000/essays/add', essay)
            .then(res => {
                console.log(res.data);
                let cookieSet = false;
                for (let i = 0; i < 30; i++) {
                    let currName = "essayId" + i;
                    let currCookie = cookies.get(currName);
                    if (!currCookie) {
                        let currDate = new Date;
                        currDate.setDate(currDate.getDate() + 3);
                        cookies.set(currName, res.data, { path: '/', expires: currDate });
                        console.log("Cookie set successfully:");
                        console.log(cookies.get(currName));
                        i = 30;
                        cookieSet = true;
                    }
                }

                if (cookieSet) {
                    window.location = '/'
                } else {
                    console.log("More than 30 essays, cannot create another")
                    window.confirm(`You currently have thirty essays, 
                                please wait for one to expire before creating another`)
                }
            })
    }

    render() {
        return (
            <div>
                <h3>Create New Essay</h3>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Create Essay" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}