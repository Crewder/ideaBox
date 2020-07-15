import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost/alternance/Windoo/ideaBox/public/index.php/`,
})

class App extends Component {

    constructor() {
        super();
        this.getIdeas();
        this.state = { ideas: [] }
        this.titleFilter = this.titleFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    getIdeas(){
        api.get('/api/ideas').then(res => {
            console.log(res.data)
            this.setState({ ideas: res.data })
        })
    }


    sortByScore(asc = true){
        let table = document.getElementById('ideas-table');
        const dirModifier = asc ? 1 : -1;
        const tBody = table.tBodies[0];
        const rows =  Array.from(tBody.querySelectorAll("tr"));

        const sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(5)`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(5)`).textContent.trim();

            return aColText > bColText ? (1 + dirModifier): (-1 * dirModifier);
        })

        while (tBody.firstChild){
            tBody.removeChild(tBody.firstChild);
        }

        tBody.append(...sortedRows);

        table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        table.querySelector(`th:nth-child(5)`).classList.toggle("th-sort-asc", asc);
        table.querySelector(`th:nth-child(5)`).classList.toggle("th-sort-desc", !asc);
    }

    sortByDateTime(asc = true){
        let table = document.getElementById('ideas-table');
        const dirModifier = asc ? 1 : -1;
        const tBody = table.tBodies[0];
        const rows =  Array.from(tBody.querySelectorAll("tr"));

        const sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(4)`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(4)`).textContent.trim();

            return aColText > bColText ? (1 + dirModifier): (-1 * dirModifier);
        })

        while (tBody.firstChild){
            tBody.removeChild(tBody.firstChild);
        }

        tBody.append(...sortedRows);

        table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        table.querySelector(`th:nth-child(4)`).classList.toggle("th-sort-asc", asc);
        table.querySelector(`th:nth-child(4)`).classList.toggle("th-sort-desc", !asc);
    }



    titleFilter(){
        let title = document.getElementById('title').value;

        this.state.ideas.forEach( (item) =>{
            if(item.title === (title)){
                this.setState({ideas: [item]});
            }
        })
    }

    resetFilter(){
        this.getIdeas();
    }

  render() {
    return (
        <div className="ideaContainer">
            <div className="searchForm">
                <input className="form-control" type="text" id="title" placeholder="Search by title" />
                <button className="btn btn-secondary active" onClick={this.titleFilter} >Find</button>
                <button className="btn btn-secondary active" onClick={this.resetFilter} >Reset</button>
            </div>

            <table border="1px" className="table table-sortable" id="ideas-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th onClick={this.sortByDateTime}>Created At</th>
                        <th onClick={this.sortByScore}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.ideas.map(idea =>
                            <tr key={idea.id}>
                                <td>{idea.id}</td>
                                <td>{idea.title}</td>
                                <td>{idea.author}</td>
                                <td>{(new Date(idea.createdAt.date)).toLocaleDateString()}</td>
                                <td>{idea.score}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
  }
}

export default App;
