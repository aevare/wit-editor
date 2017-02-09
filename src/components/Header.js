import React from 'react';
import { Link } from 'react-router';

const Header = (props) => {
	return (<nav className="navigation">
		<section className="container">
			<Link className="navigation-title" to="/">
				<h1 className="title">WIT Editor</h1>
			</Link>
			<ul className="navigation-list float-right">
                {props.types.map((type) => {
                    return (<li key={type} className="navigation-item"><Link className="navigation-link" activeClassName="active" to={`${type}`}>{type}</Link></li>);
                })}
            </ul>
		</section>
	</nav>);
};

export default Header;