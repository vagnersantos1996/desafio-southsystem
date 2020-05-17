import React, { Component } from "react";
import {Link} from 'react-router-dom';

import api from "../../services/api";
import './style.css';

import Dragon from '../../components/Dragon';
import closeImg from "../../assets/close.png";

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//states
			list: '',
		}

		this.load = this.load.bind(this)
	}

	load = async () => {
		const response = await api.get(`/dragon?orderby=name`);
		await this.setState({list: response.data});

		console.log(this.state.list);
	}

	componentDidMount() {
		this.load();
	}

	render() {
		return (
			<>
				<div className="main">
					<div className="action-buttons">
						<Link className="action-button" to={`/dragon`}>
							<div>
								<img src={closeImg} alt="botão cadastrar" />
							</div>
							<div>Cadastrar</div>
						</Link>
					</div>
					{this.state.list && <DragonList list={this.state.list} reload={this.load} />}
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

const DragonList = ({list, reload}) => (
	<>
		{list && list.map(item => (
			<Dragon key={item.id} item={item} reload={reload} />
		))}
	</>
);

export default SignIn;