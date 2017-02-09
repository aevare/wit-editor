import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { get } from '../shared/http';

import Header from '../components/Header';
import Loading from '../components/Loading';

class Layout extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            types: []
        };
    }

    componentDidMount() {
        const self = this;
        get('api/')
            .then(data => data.json())
            .then((data) =>{
                console.log(data);
                self.setState({
                    loading: false,
                    types: data
                });
            });
    }

    render() {
        const state = this.state;

        if (state.loading) {
            return <Loading />
        }
        
        return (
            <div>
                <Header types={state.types} />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }

};

export default Layout;