import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "./DataTable";
import Button from "react-bootstrap/Button";
import AddExam from "../forms/AddExam";
import AddMajor from "../forms/AddMajor";

class CurrentDataOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddNew: false,
            Majors: {
                displayName: "Kierunki",
                headers: ["Nazwa", "Wydział", "Osoba kontaktowa nr 1", "Osoba kontaktowa nr 2"],
                values: ["fullName", "faculty", "contactPerson1", "contactPerson2"]
            },
            Rooms: {
                displayName: "Sale",
                headers: ["Nazwa", "Nazwa", "Nazwa", "Nazwa"],
                values: []
            },
            Exams: {
                displayName: "Egzaminy",
                headers: ["Nazwa", "Kierunek", "Forma studiów", "Data rozpoczęcia", "Data zakończenia"],
                values: ["name", "faculty", "modeOfStudy", "startDate", "endDate"]
            }
        }
    }

    setShowAddNew = (show) => {
        this.setState({
            showAddNew: show
        });
    }

    handleShow = () => this.setShowAddNew(true);
    handleHide = () => this.setShowAddNew(false);

    render() {
        const nameComponentMapping = {
            "Majors": AddMajor,
            "Rooms": AddExam,
            "Exams": AddExam,
        };

        const nameRequestMapping = {
            "Majors": "/newest-majors",
            "Rooms": "/newest-exams",
            "Exams": "/newest-exams"
        }
        const FormToRender = nameComponentMapping[this.props.name];
        return (
            <div>
                <Row>
                    <Col><h4 className={"mb-3"}>{this.state[this.props.name].displayName}</h4></Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable tableHeader={this.state[this.props.name].headers}
                                   name={this.props.name}
                                   mapping={nameRequestMapping[this.props.name]}
                                   tableValues={this.state[this.props.name].values}/>
                    </Col>
                </Row>
                <Row className={"mb-4"}>
                    <Col xs={2}>
                        <Button variant={"outline-primary"} size={"sm"} block>{this.props.more}</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant={"success"} className={"mb-3"} size={"sm"} block
                                onClick={this.handleShow}>{this.props.addNew}</Button>

                        <FormToRender handleShow={this.handleShow}
                                      handleHide={this.handleHide}
                                      show={this.state.showAddNew}
                                      options={10}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CurrentDataOverview;
