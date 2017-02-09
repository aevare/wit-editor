import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { get } from '../shared/http';


import Loading from '../components/Loading';

class Editor extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            items: []
        };
    }

    componentWillReceiveProps(newProps) {
        console.log('Will Receive', (newProps.params.type !== this.props.params.type));
        if (newProps.params.type !== this.props.params.type) {
            this.setState({
                loading: true
            });
        }
    }

    getPropsInfo(props){
        const self = this;
        const type = props.params.type;

        get(`api/${type}`)
            .then(data => data.json())
            .then((data) =>{
                self.setState({
                    loading: false,
                    items: data
                });
            });

    }

    componentDidMount() {
        console.log('Did mount');
        this.getPropsInfo(this.props);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.params.type !== this.props.params.type) {
            console.log('Will Update!')
            this.getPropsInfo(nextProps);
        }
    }

    render() {
        const type = this.props.params.type;
        const state = this.state;

        if (state.loading) {
            return <Loading />
        }

        return (
            <div>
                <table>
                    <tbody>
                        {state.items.map(item => (<tr>
                            <td>
                                <Link to={`${type}/${item}`} key={item}>{item}</Link>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        );
    }

};

export default Editor;