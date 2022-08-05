import React, { Component } from 'react';
import { Card, Button, Input } from 'antd';

export default class Viewid extends Component {
    render() {
        return (
            <Card title="该分类ID为：">
                <Input defaultValue={this.props.match.params.id}></Input>
                <Button>复制</Button>
            </Card>
        );
    }
}




