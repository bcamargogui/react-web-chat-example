import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

const mapStateToProps = ({ core: { username, avatar } }) => ({ username, avatar });

class MyProfile extends React.Component {
    render() {
        const { username, avatar } = this.props;

        return (
            <Container>
                <Row>
                    <Col>Seu nome de usuário: {username}</Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps, null)(MyProfile);