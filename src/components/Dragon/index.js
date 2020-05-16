import React, { Component } from "react";
import {Link} from 'react-router-dom';

import './style.css';
import MenuImg from "../../assets/dot-menu.png";
import notFoundImg from "../../assets/not-found.png";

export default class Dispositivo extends Component {
	state = {
		dragonMenuActive: false
	};

	toggleMenu = () => {
		this.setState((prevState) => ({
			dragonMenuActive:!prevState.dragonMenuActive
		}));
		
	};

	closeMenu = () => {
		this.setState({ dragonMenuActive: false });
	};

	deleteDragon = () => {
		console.log("delete");
		
	};

	render() {
		return (
			<div className="dragon-container">
				<div>
					<div>
						<h1>{this.props.item.name}</h1>
					</div>
					<div>
						<img src={MenuImg} alt="menu dragão" onClick={this.toggleMenu} onBlur={this.closeMenu} />
					</div>
					{this.state.dragonMenuActive &&
					<div className="menu-dragon">
						<Link className="link-menu" to={`/dragon/${this.props.item.id}`}>Editar</Link>
						<div className="link-menu" onClick={this.deleteDragon}>Excluir</div>
					</div>}
				</div>
				{<div className="image"><img src={this.props.item.imageUrl ?? notFoundImg} alt="Imagem dragão" title={this.props.item.name} /></div>}
				<div>
					{this.props.item.type && <div>Type: <strong>{this.props.item.type}</strong></div>}
					{this.props.item.histories && <div>Histories: <strong>{this.props.item.histories}</strong></div>}
					{this.props.item.history && <div>History: <strong>{this.props.item.history}</strong></div>}
				</div>
			</div>
		)
	}
}