import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { get } from '../shared/http';
import ReactMarkdown from 'react-markdown';


import Loading from '../components/Loading';

class Editor extends Component {

    constructor(props){
        super(props);

        this.updateMarkDown = this.updateMarkDown.bind(this);

        this.state = {
            loading: true,
            data: {},
            markdown: ''
        };
    }

    componentDidMount() {
        const self = this;
        const type = self.props.params.type;
        const id = this.props.params.id;
        
        get(`api/${type}/${id}`)
            .then(data => data.json())
            .then((data) =>{
                self.setState({
                    loading: false,
                    data: data,
                    markdown: data.markdown
                });
            });
    }

    updateMarkDown(e) {
        console.log(e.target.value);
        this.setState({
            markdown: e.target.value
        });
    }

    render() {
        const id = this.props.params.id;
        const state = this.state;
        const data = state.data;

        if (state.loading) {
            return <Loading />
        }

        return (
            <div className="container-wrapper">
                <div className="types-list container">
                    <fieldset>
                        <div className="float-right">
                            <button className="button">Save</button>
                        </div>
                        <h1>{data.slug}</h1>
                        {Object.keys(data.attr).map((key) => {
                            const val = data.attr[key];
                            return (<div key={key}>
                                <label>{key}</label>
                                <input type="text" value={val} />
                            </div>);
                        })}
                        <div className="row editor-w-preview">
                            <div className="column column-50">
                                 <textarea onChange={this.updateMarkDown} value={state.markdown} />
                            </div>
                            <div className="column column-50">
                                <ReactMarkdown source={state.markdown} />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

};

export default Editor;