import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NewRecruitmentInfo from "./formParts/NewRecruitmentInfo";

class EditRecruitment extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            show: true,
            validated: false,
            showConfirmationModal: false,
            userData: {acronym: "la", year: "la", semester: ""},
            semesterMapping: {
                "letni": "summer",
                "zimowy": "winter"
            },
        };
    }

    componentDidMount() {
        this.setState({userData: this.props.initialInputValues}, () => console.log(this.state.userData));
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.initialInputValues !== this.props.initialInputValues){
    //         this.setState({userData:this.props.initialInputValues});
    //     }
    // }

    setShowConfirmationModal = (show) => {
        this.setState({
            showConfirmationModal: show
        });
    }

    handleCloseConfirmationModal = () => this.setShowConfirmationModal(false);
    handleOpenConfirmationModal = () => this.setShowConfirmationModal(true);

    handleSaveAndOpenConfirm = () => {
        let promise = new Promise(this.handleSave);
        promise.then(
            this.handleOpenConfirmationModal
        ).catch(
            () => {
                console.log("err")
            }
        )
    }

    setShow = (show) => {
        this.setState({
            show
        });
    }

    setValidated = (validated) => {
        this.setState({
            validated
        });
    }

    getInitialState = () => {
        if (this.props.initialInputValues) {
            return this.props.initialInputValues;
        } else {
            return {acronym: "la", year: "la", semester: ""};
        }
    }

    getFormData = (target, value) => {
        let currentUserData = this.state.userData;
        this.setState({
            userData: {
                ...currentUserData,
                [target]: value
            }
        })
    }

    handleInputChange = (event) => {
        let currentUserData = this.state.userData;
        this.setState({
            userData: {
                ...currentUserData,
                [event.target.id]: event.target.value
            }
        });
    }

    handleSave = (resolve, reject) => {
        let form = this.formRef.current;
        if (!form.checkValidity()) {
            this.setValidated(true);
            reject();
        } else {
            this.setShow(false);
            let userDataToSend = {
                acronym: this.state.userData.acronym,
                year: this.state.userData.year,
                semester: this.state.semesterMapping[this.state.userData.semester]
            }
            // console.log(userDataToSend);
            fetch(`/edit-recruitment/${this.props.initialInputValues.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataToSend)
            })
                .then((response) => response.json())
                .then(() => {
                    this.setState({
                        userData: this.getInitialState()
                    });
                    this.setValidated(false);
                    resolve();
                })
                .catch((error) => console.log(error));
        }
    }

    hideAndClearState = () => {
        this.setState({
            userData: this.getInitialState()
        });
        this.setValidated(false);
        this.setShow(false);
    }

    render() {
        console.log(this.state.userData, this.state.initialInputValues);
        return (
            <>
                <Modal show={this.state.show} dialogClassName={"custom-width-modal"} onHide={this.hideAndClearState}
                       backdrop={"static"} keyboard={false}>
                    <Modal.Header closeButton className={"modal-form-bg-color"}>
                        <Modal.Title className={"custom-margins custom-font text-light"}>Edytowanie
                            rekrutacji</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"custom-margins"}>
                        <Form noValidate validated={this.state.validated} ref={this.formRef}>
                            <NewRecruitmentInfo getFormData={this.getFormData}
                                                inputValuesFromState={this.state.userData}/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className={"modal-form-bg-color"}>
                        <Button variant={"danger"} onClick={this.hideAndClearState}> Anuluj </Button>
                        <Button variant={"success"} className={"custom-margins"}
                                onClick={this.handleSaveAndOpenConfirm}>
                            Zapisz zmiany
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showConfirmationModal} onHide={this.handleCloseConfirmationModal} size={"lg"}>
                    <Modal.Body>
                        <h4 className={"text-center"}>Rekrutacja została edytowana pomyślnie</h4>
                    </Modal.Body>
                    <Modal.Footer className={"modal-form-bg-color"}>
                        <Button variant={"success"} onClick={this.handleCloseConfirmationModal} block
                                size={"sm"}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default EditRecruitment;