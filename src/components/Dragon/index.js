import React, { Component } from "react";
import {Link} from 'react-router-dom';

import api from '../../services/api';

import './style.css';
import MenuImg from "../../assets/dot-menu.png";
import notFoundImg from "../../assets/not-found.png";

export default class Dragon extends Component {
	state = {
		dragonMenuActive: false
	};

	componentDidMount = () => {}

	toggleMenu = () => {
		this.setState((prevState) => ({
			dragonMenuActive:!prevState.dragonMenuActive
		}));
		
	};

	closeMenu = () => {
		this.setState({ dragonMenuActive: false });
	};

	deleteDragon = () => {
		api.delete(`/dragon/${this.props.item.id}`);
		setTimeout(this.props.reload, 1000)
	};

	render() {
		let data_criacao = this.props.item.createdAt;
		let data_completa_arr = data_criacao.split('T');
		let data_arr = data_completa_arr[0].split('-');
		data_arr = data_arr.reverse();
		data_completa_arr[0] = data_arr.join('/');
		data_completa_arr[1] = data_completa_arr[1].split('.')[0];

		return (
			<div className="dragon-container">
				<div>
					<div>
						<h1>{this.props.item.name}</h1>
					</div>
					<div onBlur={this.closeMenu}>
						<img src={MenuImg} alt="menu dragão" onClick={this.toggleMenu} />
					</div>
					{this.state.dragonMenuActive &&
					<div className="menu-dragon">
						<Link className="link-menu" to={`/dragon/${this.props.item.id}`}>Editar</Link>
						<div
							className="link-menu"
							onClick={() => {if(window.confirm('Deseja realmente excluir este dragão?')){this.deleteDragon()};}}
						>
							Excluir
						</div>
					</div>}
				</div>
				{<div className="image"><img src={this.props.item.imageUrl ?? notFoundImg} alt="Imagem dragão" title={this.props.item.name} /></div>}
				<div>
					{this.props.item.type && <div>Type: <strong>{this.props.item.type}</strong></div>}
					{this.props.item.histories && <div>Histories: <strong>{this.props.item.histories}</strong></div>}
					{this.props.item.history && <div>History: <strong>{this.props.item.history}</strong></div>}
					{this.props.item.createdAt && <div>Criado em: <strong>{`${data_completa_arr[0]} - ${data_completa_arr[1]}`}</strong></div>}
				</div>
			</div>
		)
	}
}