import React, { Component } from 'react';
import './App.css';
import { Layout, Statistic, Card, Row, Col, Button } from 'antd';
import ReactFileReader from 'react-file-reader';
import { apiFetch } from '../controller/helpers'
import 'whatwg-fetch'

const { Header, Content, Footer } = Layout;
class HealthCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: '',
            listUrl: []
        }
    }
    componentDidMount() {
    }

    handleFiles = (files) => {
        var fileListBase64 = files.base64.split(',')[1];
        var fileListString = atob(fileListBase64)
        this.setState({
            fileName: files.fileList[0].name,
            listUrl: fileListString.split("\r\n")
        })
    }

    testFetch = () => {
        apiFetch({
            url: 'http://localhost:3001/api/checkUrl',
            method: 'POST',
            body: {
                listUrl: this.state.listUrl
            }
        }).then(res => {
            console.log(res)
        })

    }

    render() {
        const { state } = this
        return (
            <>
                <Layout className="layout" style={{ minHeight: '100vh' }}>
                    <Content style={{ margin: 50 }}>
                        <Row>
                            <Col span={16} offset={4}
                            // style={{ backgroundColor: '#fff' }}
                            >
                                <Card title="Health Check" bordered={false} >
                                    <ReactFileReader
                                        fileTypes={[".csv"]}
                                        base64={true}
                                        multipleFiles={false}
                                        handleFiles={this.handleFiles}
                                    >
                                        <Button
                                            type="dashed"
                                            style={{
                                                width: '100%',
                                                height: 70,
                                                backgroundColor: '#ededed',
                                                color: '#000'
                                            }}
                                        >
                                            Click to upload .csv file
                                            </Button>
                                    </ReactFileReader>
                                    <p>{this.state.fileName}</p>
                                    {/* <p></p> */}
                                    <Button
                                        type="primary"
                                        style={{ width: '100%' }}
                                        disabled={this.state.listUrl.length === 0}
                                        onClick={e => {
                                            console.log(this.state.listUrl)
                                            this.testFetch()
                                        }}>Process</Button>
                                    <Row
                                        gutter={12}
                                        style={{ marginTop: 20 }}
                                    >
                                        <Col sm={6}>
                                            <Card style={{ width: '100%' }}>
                                                <Statistic title="Total Website" value={350} />
                                            </Card>
                                        </Col>
                                        <Col sm={6}>
                                            <Card style={{ width: '100%' }}>
                                                <p>Card content</p>
                                                <p>Card content</p>
                                                <p>Card content</p>
                                            </Card>
                                        </Col>
                                        <Col sm={6}>
                                            <Card style={{ width: '100%' }}>
                                                <p>Card content</p>
                                                <p>Card content</p>
                                                <p>Card content</p>
                                            </Card>
                                        </Col>
                                        <Col sm={6}>
                                            <Card style={{ width: '100%' }}>
                                                <p>Card content</p>
                                                <p>Card content</p>
                                                <p>Card content</p>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card>




                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </>
        );
    }
}

export default HealthCheck;
