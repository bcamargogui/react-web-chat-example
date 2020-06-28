import React from 'react';
import { Input, Button } from 'react-chat-elements';
import { Container } from 'reactstrap';
import './index.css';

class InputBar extends React.Component {
	clearInput = () => {
		this.refs.input.input.value = '';
	}

	onSubmit = () => {
		const value = this.refs.input.input.value;
		this.props.onSubmit(value);
		setTimeout(() => this.clearInput(), 100);
	}

	renderSubmitBtn = () => <Button
		color='white'
		backgroundColor='black'
		text='Enviar'
		onClick={this.onSubmit}
	/>;

	render() {
		return (
			<Container className={'input-bar'}>
				<Input
					placeholder="Digite aqui..."
					multiline={true}
					ref={'input'}
					rightButtons={this.renderSubmitBtn()}
				/>
			</Container>
		)
	}
}

export default InputBar;