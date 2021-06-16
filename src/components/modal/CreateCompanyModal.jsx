import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
export const CreateCompanyModal = (props) => {
    const { onClick } = props;
    const handleCreate = (e) => {
        e.preventDefault();
        onClick();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body style={{ textAlign: "center", marginTop: "10px" }}>
                <h4 style={{ marginBottom: "30px" }}>
                    Masukkan Nama Perusahaanmu
                </h4>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            // value={props.inputCompany}
                            // onChange={(e) => props.onChangeCompany(e)}
                            type="text"
                            placeholder="Enter company name"
                            ref={props.propsref}
                            autoComplete="off"
                            isInvalid={!!props.errors}
                        />
                        <Form.Control.Feedback type="invalid">
                            {props.errors}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => handleCreate(e)}>Tambahkan</Button>
            </Modal.Footer>
        </Modal>
    );
};
