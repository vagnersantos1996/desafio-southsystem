import React, { Component } from "react";
import DragaoPNG from "../../assets/dragon.png"
import {login} from "../../services/auth";
import './style.css';

class SignIn extends Component {
	state = {
		usuario: "",
		senha: "",
		error: ""
	};

	handleSignIn = async e => {
		e.preventDefault();
		const { usuario, senha } = this.state;
		if(!usuario || !senha) {
			this.setState({error: "Preencha com usuário e senha para continuar!"});
		} else {
			if(usuario !== "admin" || senha !== "1234") {
				this.setState({error: "Usuário e/ou senha inválido(s)!"});
			} else {
				login(usuario);
				this.props.history.push("/dragons");
			}
		}
	};

	render() {
		return (
			<div className="container-login">
				<div>
					<h1>
						Desafio Front Dragon
					</h1>
					{this.state.error && <p>{this.state.error}</p>}
					<form onSubmit={this.handleSignIn}>
						<div>
							<label for="usuario">
								Usuário
							</label>
							<input
								name="usuario"
								id="usuario"
								onChange={e => this.setState({ usuario: e.target.value })}
							/>
						</div>
						<div>
							<label for="senha">
								Senha
							</label>
							<input
								name="senha"
								id="senha"
								type="password"
								onChange={e => this.setState({ senha: e.target.value })}
							/>
						</div>
						<div>
							<input type="submit" value="Entrar" />
						</div>
					</form>
				</div>
				<img src={DragaoPNG} alt="Imagem de um dragão" />
			</div>
		);
	}
}

export default SignIn;