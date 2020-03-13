import React, { Component } from 'react';
import './App.css';
import { Layout, Statistic, Card, Row, Col, Button, Table, Spin ,Tag } from 'antd';
import ReactFileReader from 'react-file-reader';
import { apiFetch } from '../controller/helpers'
import 'whatwg-fetch'

const { Header, Content, Footer } = Layout;
class HealthCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: '',
            listUrl: [],
            resListUrl: [],
            resSumamry: {},
            loading: false

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

    fetchCheck = () => {
        this.setState({ loading: true })
        apiFetch({
            url: 'http://localhost:3001/api/checkUrl',
            method: 'POST',
            body: {
                listUrl: this.state.listUrl
            }
        }).then(res => {
            this.setState({
                resListUrl: res.data.listUrl,
                resSumamry: res.data.summary,
                loading: false
            })
        })

    }

    render() {
        const { state } = this

        const columns = [
            {
                title: 'Website',
                dataIndex: 'url',
                key: 'url',
                width: '60%',
                align: 'center'
            },
            {
                title: 'Status',
                dataIndex: 'alive',
                key: 'alive',
                width: '10%',
                align: 'center',
                render: text => (text ? <Tag color="#87d068">Pass</Tag> : <Tag color="#f50">Fail</Tag>),
            },
            {
                title: 'Process Time (unix nano)',
                dataIndex: 'durationNano',
                key: 'durationNano',
                width: '30%',
                align: 'center'
            }
        ];


        return (
            <>
                <Layout className="layout" style={{ minHeight: '100vh' }}>
                    <Content style={{ margin: 50 }}>
                        <Spin spinning={state.loading}>
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
                                        <Button
                                            type="primary"
                                            style={{ width: '100%' }}
                                            disabled={this.state.listUrl.length === 0}
                                            onClick={e => {

                                                this.fetchCheck()
                                            }}>Process</Button>
                                        <Row
                                            gutter={12}
                                            style={{ marginTop: 20 }}
                                        >
                                            <Col sm={5}>
                                                <Card style={{ width: '100%' }}>
                                                    <Statistic title="Total Website" value={state.resSumamry.total_websites} />
                                                </Card>
                                            </Col>
                                            <Col sm={5}>
                                                <Card style={{ width: '100%' }}>

                                                    <Statistic title="Successful" value={state.resSumamry.success} />
                                                </Card>
                                            </Col>
                                            <Col sm={5}>
                                                <Card style={{ width: '100%' }}>

                                                    <Statistic title="Failure" value={state.resSumamry.failure} />
                                                </Card>
                                            </Col>
                                            <Col sm={9}>
                                                <Card style={{ width: '100%' }}>
                                                    <Statistic title="Total times (unix nano)" value={state.resSumamry.total_time} />
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop : 20}}>
                                            <Table
                                                style={{ width: '100%' }}
                                                dataSource={this.state.resListUrl}
                                                columns={columns} />
                                        </Row>
                                    </Card>




                                </Col>


                            </Row>
                        </Spin>
                    </Content>
                </Layout>
            </>
        );
    }
}

export default HealthCheck;
