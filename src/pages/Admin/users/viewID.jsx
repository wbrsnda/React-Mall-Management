import React, { Component } from 'react';
import { Card, Button, Input } from 'antd';

export default class ViewID extends Component {
    render() {
        return (
            <Card title="该用户ID为：">
                <Input defaultValue={this.props.match.params.id}></Input>
                <Button>复制</Button>
            </Card>
        );
    }
}

