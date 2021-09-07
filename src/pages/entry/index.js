import React from 'react';
import Header from '../../layout/header';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import Api from '../../helper/api';

class Entry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            name: '',
            entries: []
        };

        // This binding is necessary to make `this` work in the callback
        this.addEntry = this.addEntry.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    addEntry() {
        if (!this.state.name) {
            alert('Input Token Name');
            return;    
        }

        if (!this.state.address) {
            alert('Input Token Address');
            return;
        }

        let param = {
            name: this.state.name,
            address: this.state.address
        }

        console.log(param);

        Api.addEntry(param).then(res => {
            this.loadEntries();
        })
    }

    removeEntry(i) {
        if (window.confirm("Do you really want to delete?")) {
            Api.removeEntry({id: this.state.entries[i].id}).then(res => {
                if (res.data.success) {
                    this.loadEntries();
                }
            })    
        }
    }

    handleAddressChange(event) {
        this.setState({address: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    

    componentDidMount() {
        console.log('component mount');
        this.loadEntries();
    }

    loadEntries() {
        Api.getEntries().then(res => {
            this.setState({entries: res.data});
        })
    }

    render() {

        let entriesEls = this.state.entries.map((entry, index) => {
            return (
                <tr key={entry.id}>
                    <td style={{width: '5%'}}>{index + 1}</td>
                    <td style={{width: '17%'}}>{entry.name}</td>
                    <td style={{width: '80%'}}>{entry.address}</td>
                    <td>
                        <Button className="btn-sam" onClick={() => this.removeEntry(index)}>Remove</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <Header />
                <Container>
                    <div className="pt-3">
                        <Row>
                            <Col sm="2" className="mt-2">
                                <Form.Control type="text" placeholder="Token Name"  value={this.state.name} onChange={this.handleNameChange} />
                            </Col>
                            <Col sm="8" className="mt-2">
                                <Form.Control type="text" placeholder="Token Address"  value={this.state.address} onChange={this.handleAddressChange} />
                            </Col>
                            <Col sm="2" className="mt-2 d-grid gap-2">
                                <Button onClick={this.addEntry}>Add Entry</Button>
                            </Col>
                            
                        </Row>
                    </div>

                    <div className="mt-2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entriesEls}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Entry;