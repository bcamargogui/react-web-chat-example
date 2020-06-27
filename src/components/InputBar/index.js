import React from 'react';
import { Input, Button } from 'react-chat-elements';
import { Container } from 'reactstrap';
import './index.css';

class InputBar extends React.Component {
	renderSubmitBtn = () => <Button
		color='white'
		backgroundColor='black'
		text='Send'
	/>;

	render() {
		return (
			<Container className={'input-bar'}>
				<Input
					placeholder="Type here..."
					multiline={true}
					rightButtons={this.renderSubmitBtn()}
				/>
			</Container>
		)
	}
}

export default InputBar;