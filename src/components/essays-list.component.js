import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Essay = props => (
    <tr>
        <td>{props.essay.username}</td>
        <td>{props.essay.description}</td>
        <td>{props.essay.date.substring(0,10)}</td>
        <td>
            <Link to={"/update/"+props.essay._id}>update</Link> |
            <Link to={"/edit/"+props.essay._id}> edit</Link> |
            <a href="#" onClick={() => props.deleteEssay(props.essay._id)}> delete</a>
        </td>
    </tr>
)

export default class EssaysList extends Component {
    constructor(props) {
        super(props);

        this.deleteEssay = this.deleteEssay.bind(this);

        this.state = {
            essays: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/essays/')
            .then(response => {
                this.setState({ essays: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteEssay(id) {
        axios.delete('http://localhost:5000/essays/' + id)
            .then(res => console.log(res.data));
        this.setState({
            essays: this.state.essays.filter(el => el._id !== id)
        })
    }

    essayList() {
        return this.state.essays.map(currentEssay => {
            return <Essay essay={currentEssay} deleteEssay={this.deleteEssay} key={currentEssay._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Essays</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.essayList() }
                    </tbody>
                </table>
            </div>
        )
    }
}