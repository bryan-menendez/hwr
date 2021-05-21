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
                <button onClick={this.selectMode.bind(this, 'commits')}>render commits</button>
                <button onClick={this.selectMode.bind(this, 'forks')}>render forks</button>
                <button onClick={this.selectMode.bind(this, 'pulls')}>render pulls</button>
                <div>{content}</div> 
            </div>
        )
    }
    
    selectMode(mode_){
        this.setState({ mode: mode_ });   
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

    fetchFeed(type){
        ajax.get("https://api.github.com/repos/facebook/react/" + type)
            .end((error, response) => {
                if (!error && response)
                    this.setState({[type]: response.body});
                else
                    console.log("error while fetching api " + type);
        })
    }

    componentDidMount(){
        this.fetchFeed('commits');
        this.fetchFeed('forks');
        this.fetchFeed('pulls');
    }
}

export default Detail;