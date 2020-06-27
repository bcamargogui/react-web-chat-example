import React from 'react';
import { MessageList as List } from 'react-chat-elements';
import { connect } from 'react-redux';
import './index.css';

const mapStateToProps = ({ core: { username, users } }) => ({ username, users });

class MessageList extends React.Component{
    state = {
        dataSource: [],
    }

    componentDidUpdate() {
        this.provideList();
    }

    getUserImageByName = (name) => {
        const { users } = this.props;
        const target = users.find(el => el.name === name);
        if (!target) return '';
        return target.image;
    }

    checkIsMe = (sender) => {
        const { username } = this.props;
        return sender === username;
    }

    getPosition = (sender) => {
        return this.checkIsMe(sender) ? 'left' : 'right';
    }

    provideDataSourceItem = ({ sender, text }) => ({
        text,
        title: sender,
        avatar: this.getUserImageByName(sender),
        position: this.getPosition(sender),
        type: 'text',
    })

    provideList = () => {
        const { data } = this.props;
        const { dataSource } = this.state;
        const startIndex = dataSource.length;
        const iterator = data.slice(startIndex);
        iterator.forEach(element => {
            this.setState(({ dataSource }) => ({ dataSource: [ ...dataSource, this.provideDataSourceItem(element) ] }));
        });
    }


    render() {
        const { dataSource } = this.state;
        return (
            <List
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={dataSource} />
        )
    }
}

export default connect(mapStateToProps, null)(MessageList);