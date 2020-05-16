import crypto from "crypto";

const token_psw = "@desafio-token"

export const TOKEN_KEY = "@auth-token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (usuario) => {
	let header = {
		"typ": "JWT",
		"alg": "HS256"
	}

	header = JSON.stringify(header);
	header = Buffer.from(header).toString('base64');

	let payload = {"username": usuario};

	payload = JSON.stringify(payload);
	payload = Buffer.from(payload).toString('base64');

	let key = token_psw;
	let signature = crypto.createHmac('sha256', key)
		.update(header + "." + payload)
		.digest('base64');

	signature = Buffer.from(signature).toString('base64');

	let token = header + "." + payload + "." + signature;

	localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  	localStorage.removeItem(TOKEN_KEY);
};