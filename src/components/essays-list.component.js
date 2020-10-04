import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";

const Essay = props => (
    <tr>
        <td>{(props.essay.date)}</td>
        <td>{props.essay.description}</td>
        <td>{props.essay.edits.length}</td>
        <td><Link to={"/edit/"+props.essay._id}> edit</Link></td>
        <td><Link to={"/view/"+props.essay._id}> view edits</Link></td>
        <td><a href="#" onClick={() => props.deleteEssay(props.essay._id)}> delete</a></td>
    </tr>
)

export default class EssaysList extends Component {
    constructor(props) {
        super(props);

        this.deleteEssay = this.deleteEssay.bind(this);

        this.state = {
            essays: []
        };

        const cookies = new Cookies();

        const essayIds = [];

        for (let i = 0; i < 30; i++) {
            let currName = "essayId" + i;
            let currCookie = cookies.get(currName);
            if (currCookie) {
                essayIds.push(currCookie);
            } else {
                console.log(currName + "not found");
                break;
            }
        }

        for (const essayId of essayIds) {
            console.log('current id: ' + essayId);
            axios.get('http://localhost:5000/essays/' + essayId)
                .then(response => {
                    console.log('this is the response:');
                    console.log(response);
                    console.log(typeof(response.data.date));

                    let processedResponse = response;

                    processedResponse.data.date = Date.parse(response.data.date) + (60*60*24*3);
                    console.log(processedResponse.data.date)
                    this.setState(prevState => ({
                        essays: [...prevState.essays, processedResponse.data]
                    }));
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    componentDidMount() {


        //console.log('essayIds: ' + essayIds)
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
            let date = new Date(currentEssay.date)
            date.setDate(date.getDate() + 3)
            currentEssay.date = date.toString();
            return <Essay essay={currentEssay} deleteEssay={this.deleteEssay} key={currentEssay._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Your Essays</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Expiration Date</th>
                        <th>Description</th>
                        <th>Edits</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
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