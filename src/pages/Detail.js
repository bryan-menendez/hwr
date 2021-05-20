import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {
    constructor(props){
        super (props);
        
        this.state = { 
            mode: '',
            commits: [],
            forks: [],
            pulls: []
        };
    }

    render() {
        let content;

        // if (this.state.mode === 'commits')
        //     content = this.renderCommits();
        // else if (this.state.mode === 'forks')
        //     content = this.renderForks();
        // else if (this.state.mode === 'pulls')
        //     content = this.renderPulls();


        switch(this.state.mode){
            case "commits":
                content = this.renderCommits();
                break;
            case "forks":
                content = this.renderForks();
                break;
            case "pulls":
                content = this.renderPulls();
                break;                
            default:
                content = "none"
        }

        return(
            <div>
                <button onClick={this.showCommits.bind(this)}>render commits</button>
                <button onClick={this.showForks.bind(this)}>render forks</button>
                <button onClick={this.showPulls.bind(this)}>render pulls</button>
                <div>{content}</div> 
            </div>
        )
    }
    
    showCommits() {
        this.setState({ mode: 'commits' });
    }
    
    renderCommits(){
        return(
            <div>
                {this.state.commits.map(
                    (commit, index) => (
                        <p key={index}>{commit.author.login} - {commit.commit.message}</p>
                    )
                )}
            </div>
        );
    }

    showForks() {
        this.setState({ mode: 'forks' });
    }
    
    renderForks(){
        return(
            <div>
                {this.state.forks.map(
                    (fork, index) => (
                        <p key={index}>{fork.full_name} - {fork.description}</p>
                    )
                )}
            </div>
        );
    }

    showPulls() {
        this.setState({ mode: 'pulls' });
    }
    
    renderPulls(){
        return(
            <div>
                {this.state.pulls.map(
                    (pull, index) => (
                        <p key={index}>{pull.user.login} - {pull.html_url}</p>
                    )
                )}
            </div>
        );
    }

    componentDidMount(){
        ajax.get('https://api.github.com/repos/facebook/react/commits')
            .end((error, response) => {
                if (!error && response)
                    this.setState({commits: response.body});
                else
                    console.log("error while fetching api");
        })

        ajax.get('https://api.github.com/repos/facebook/react/forks')
            .end((error, response) => {
                if (!error && response)
                    this.setState({forks: response.body});
                else
                    console.log("error while fetching api");
        })

        ajax.get('https://api.github.com/repos/facebook/react/pulls')
            .end((error, response) => {
                if (!error && response)
                    this.setState({pulls: response.body});
                else
                    console.log("error while fetching api");
        })
    }
}

export default Detail;