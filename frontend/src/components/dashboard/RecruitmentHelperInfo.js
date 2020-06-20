import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import AddRecruitment from "../forms/AddRecruitment";
import EditRecruitment from "../forms/EditRecruitment";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

class RecruitmentHelperInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddNew: false,
            showEdit: false,
            recruitments: [],
            recruitment: {acronym: ""},
            currentID: 0
        }
    }

    handleShowAddNew = () => {
        if (this.state.showAddNew) {
            this.setState({
                showAddNew: false
            });
        } else {
            this.setState({
                showAddNew: true
            });
        }
    }

    handleShowEdit = () => {
        if (this.state.showEdit) {
            this.setState({
                showEdit: false
            });
        } else {
            this.setState({
                showEdit: true
            });
        }
    }

    hideAndClearState = () => {
        this.setState({
            userData: this.getInitialState()
        });
        this.setValidated(false);
        this.handleHide();
    }

    handleControlChange = (event) => {
        this.props.getFormData(event.target.id, event.target.value);
    }


    componentDidMount() {
        this.getRecruitments()
    }

    getRecruitments = () => {
        fetch("/newest-recruitments")
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    recruitments: response,
                    recruitment: response[0],
                });
                console.log(response)
            });
    }

    updateRecruitment = (id) => {
        console.log(id);
        const recruitment = this.state.recruitments.filter(r => {
            console.log(id, r.id);
            return r.id == id;
        })[0];
        this.setState({recruitment});
    };

    render() {
        return (
            <Row className={"mb-4"}>
                <Col xs={12}>
                    <Alert variant={"primary"} className={"mt-3"}>
                        <div style={{marginLeft: '17px'}}>Aktualna Rekrutacja: <strong>{this.state.recruitment.acronym}</strong>
                        </div>
                        <FormGroup as={Col} controlId={"newRecruitment"}>
                            <Form.Control as={"select"} style={{width: 600, marginTop: '10px'}}
                                          onChange={(e) => this.updateRecruitment(e.target.value)} required>
                                {this.state.recruitments.map((r, index) => <option
                                    key={index} value={r.id}>{r.acronym} </option>)}
                            </Form.Control>
                        </FormGroup>

                    </Alert>
                </Col>
                <Col xs={2}>
                    <Button variant={"outline-dark"} size={"sm"} block onClick={() => this.handleShowAddNew()}>Informacje
                        o rekrutacji</Button>
                </Col>
                <Col xs={2}>
                    <Button variant={"success"} className={"mb-3"} size={"sm"} block
                            onClick={() => this.handleShowAddNew()}>Dodaj nową rekrutację</Button>
                    {this.state.showAddNew && <AddRecruitment> </AddRecruitment>}
                </Col>

                <Col xs={2}>
                    <Button variant={"info"} className={"mb-3"} size={"sm"} block onClick={() => this.handleShowEdit()}>Edytuj
                        rekrutację</Button>
                    {this.state.showEdit &&
                    <EditRecruitment initialInputValues={this.state.recruitment}> </EditRecruitment>}
                </Col>
            </Row>
        );
    }
}

export default RecruitmentHelperInfo;