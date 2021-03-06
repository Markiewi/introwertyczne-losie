import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import AddRecruitment from "../forms/AddRecruitment";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

class RecruitmentHelperInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddNew: false,
            recruitments: [],
            recruitment: null
        }
    }

    handleShowAddNew = () => {
        if(this.state.showAddNew){
            this.setState({
                showAddNew: false
            });
        }
        else{
            this.setState({
                showAddNew: true
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
        this.getRecruitments();
        let currentRecruitment = localStorage.getItem('selectedRecruitment') || this.props.currentRecruitment;
        this.setState({
            recruitment: currentRecruitment
        })
    }

    getRecruitments = () => {
        fetch("/newest-recruitments")
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    recruitments: response
                });
                console.log(response)
            });
    }

    render() {

        return (
            <Row className={"mb-4"}>
                <Col xs={12}>
                    <Alert variant={"primary"} className={"mt-3"}>
                        <div style={{marginLeft: '17px'}}>Aktualna Rekrutacja: <strong>{this.state.recruitment}</strong></div>
                        <FormGroup as={Col} controlId={"newRecruitment"}>
                            <Form.Control as={"select"} style={{width: 600, marginTop: '10px'}} onChange={(e) =>
                            { this.setState({recruitment: e.target.value});
                            localStorage.setItem('selectedRecruitment', e.target.value);
                            }} required>
                                {this.state.recruitments.map((r, index) => <option
                                    key={index}>{r.acronym} </option>)}
                            </Form.Control>
                        </FormGroup>

                    </Alert>
                </Col>
                <Col xs={2}>
                    <Button variant={"outline-dark"} size={"sm"} block>Informacje o rekrutacji</Button>
                </Col>
                <Col xs={2}>
                    <Button variant={"success"} className={"mb-3"} size={"sm"} block onClick={()=>this.handleShowAddNew()}>Dodaj nową rekrutację</Button>
                    {this.state.showAddNew && <AddRecruitment> </AddRecruitment>}
                </Col>
            </Row>
        );
    }
}

export default RecruitmentHelperInfo;
