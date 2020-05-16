import React, { Component } from "react";
import api from "../../services/api";
import './style.css';

import Dragon from '../../components/Dragon';

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//states
			list: '',
		}

		this.load = this.load.bind(this);
	}

	load = async () => {
		const response = await api.get(`/dragon`);
		await this.setState({list: response.data});
	}

	componentDidMount() {
		this.load();
	}

	render() {
		return (
			<>
				<div className="main">
					{this.state.list && <DragonList list={this.state.list} />}
					{Object.keys(this.state.list).length === 0 && (
						<div className="mensagem-erro">
							<h2>Nenhum dragão encontrado!</h2>
						</div>
					)}
				</div>
			</>
		);
	}
}

const DragonList = ({list}) => (
	<>
		{list && list.map(item => (
			<Dragon key={item.id} item={item} />
		))}
	</>
);

export default SignIn;