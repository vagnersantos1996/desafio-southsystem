import React, { Component } from "react";
import api from '../../services/api';

import './style.css';
import notFoundImg from "../../assets/not-found.png";
import closeImg from "../../assets/close.png";

export default class Dragon extends Component {
	state = {
		dragon: {
			name: '',
			type: '',
			history: '',
			imageUrl: '',
		},
		edit: false
	}

	async componentDidMount() {
		if(this.props.match.params.id) {
			//editando
			const {id} = this.props.match.params;
			const response = await api.get(`/dragon/${id}`);
		
			await this.setState({dragon: response.data, edit: true});
		}
	}

	handleSave = async e => {
		e.preventDefault();
		if(this.props.match.params.id) {
			const {id} = this.props.match.params;
			await api.put(`/dragon/${id}`, {
				name: this.state.dragon.name,
				type: this.state.dragon.type,
				history: this.state.dragon.history,
				imageUrl: this.state.dragon.imageUrl
			});
		} else {
			await api.post('/dragon', {
				name: this.state.dragon.name,
				type: this.state.dragon.type,
				history: this.state.dragon.history,
				imageUrl: this.state.dragon.imageUrl
			});
		}
		alert("Dragão salvo com sucesso!");
		this.props.history.goBack();
	};

	render() {
		return (
			<div className="dragonpage-container">
				<form onSubmit={this.handleSave}>
					<div className="close-dragon">
						<img src={closeImg} alt="imagem fechar" title="fechar / voltar" onClick={this.props.history.goBack} />
					</div>
					<div className="dragon-image">
						<img src={this.state.dragon.imageUrl && this.state.dragon.imageUrl.length > 0 ? this.state.dragon.imageUrl : notFoundImg} alt="Imagem dragão" title={this.state.dragon.name} />
					</div>
					<div className="dragon-info">
						<div>
							Name
						</div>
						<div>
							<input required type="text" name="name" defaultValue={this.state.dragon.name ?? ''} onChange={(e) => this.setState({
								dragon: {
									...this.state.dragon,
									name: e.target.value
								}
							})} />
						</div>
						<div>
							Type
						</div>
						<div>
							<input required type="text" name="type" defaultValue={this.state.dragon.type ?? ''} onChange={(e) => this.setState({
								dragon: {
									...this.state.dragon,
									type: e.target.value
								}
							})} />
						</div>
						{/* <div>
							Histories
						</div>
						<div>
							<input type="text" name="histories" defaultValue={this.state.dragon.histories ?? ''} onChange={this.state.dragon.histories ? (e) => this.setState({
								dragon: {
									...this.state.dragon,
									histories: e.target.value
								}
							})} />
						</div> */}
						<div>
							History
						</div>
						<div>
							<input type="text" name="history" defaultValue={this.state.dragon.history ?? ''} onChange={(e) => this.setState({
								dragon: {
									...this.state.dragon,
									history: e.target.value
								}
							})} />
						</div>
						<div>
							Imagem (url)
						</div>
						<div>
							<input type="url" name="imageUrl" defaultValue={this.state.dragon.imageUrl ?? ''} onChange={(e) => this.setState({
								dragon: {
									...this.state.dragon,
									imageUrl: e.target.value
								}
							})} />
						</div>
					</div>
					<div>
						<input type="submit" value="Salvar" />
					</div>
				</form>
			</div>
		)
	}
}