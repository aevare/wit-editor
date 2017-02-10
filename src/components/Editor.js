import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { get, put } from '../shared/http';


import Loading from '../components/Loading';

class Editor extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            data: {}
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
                    data: data
                });
            });
    }

    updateMarkDown(e) {
        this.setState({
            data: {
                ...this.state.data,
                markdown: e.target.value
            }
        });
    }

    updateAttr(key, e){
        this.setState({
            data: {
                ...this.state.data,
                attr: {
                    ...this.state.data.attr,
                    [key]: e.target.value
                }
            }
        });
    }

    saveContent() {
        const self = this;
        const type = self.props.params.type;
        const id = this.props.params.id;

        this.setState({
            loading: true
        });

        const data = this.state.data;

        const dataStr = JSON.stringify(data);

        put(`api/${type}/${id}`, dataStr)
            .then((resp) => {
                console.log(resp);
                this.setState({
                    loading: false
                });
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
                            <button onClick={() => { this.saveContent(); }} className="button">Save</button>
                        </div>
                        <h1>{data.slug}</h1>
                        {Object.keys(data.attr).map((key) => {
                            const val = data.attr[key];
                            return (<div key={key}>
                                <label>{key}</label>
                                <input type="text" value={val} onChange={(e) => { this.updateAttr(key, e); }} />
                            </div>);
                        })}
                        <div className="row editor-w-preview">
                            <div className="column column-50">
                                 <textarea value={state.data.markdown} onChange={(e) => { this.updateMarkDown(e) }} />
                            </div>
                            <div className="column column-50">
                                <ReactMarkdown source={state.data.markdown} />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

};

export default Editor;