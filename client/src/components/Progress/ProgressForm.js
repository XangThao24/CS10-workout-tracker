import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addProgress } from "../../actions";
import "../../less/progressForm.css";

class ProgressForm extends Component {
  state = {
    weight: "",
    hips: "",
    waist: "",
    r_arm: "",
    l_arm: "",
    r_leg: "",
    l_leg: "",
    error: false,
    modal: false
  };

  toggle = () => {
    this.setState({
      weight: "",
      hips: "",
      waist: "",
      r_arm: "",
      l_arm: "",
      r_leg: "",
      l_leg: "",
      error: false,
      modal: !this.state.modal
    });
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    let { weight, hips, waist, r_arm, l_arm, r_leg, l_leg } = this.state;

    if (weight !== "" || waist !== "") {
      this.props.addProgress({
        weight,
        hips,
        waist,
        r_arm,
        l_arm,
        r_leg,
        l_leg
      });

      this.setState({
        weight: "",
        hips: "",
        waist: "",
        r_arm: "",
        l_arm: "",
        r_leg: "",
        l_leg: "",
        error: false,
        modal: !this.state.modal
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="modal-container">
        <Button color="danger" onClick={this.toggle}>
          Add Progress
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Progress Form</ModalHeader>
          <ModalBody>
            <form className="progressForm">
              {this.state.error && (
                <div className="error">
                  * Weight and waist are required fields.
                </div>
              )}
              <div>{moment().format("MM/DD/YYYY")}</div>
              Weight:
              <input
                type="text"
                name="weight"
                value={this.state.weight}
                onChange={this.handleFieldChange}
              />
              Waist:
              <input
                type="text"
                name="waist"
                value={this.state.waist}
                onChange={this.handleFieldChange}
              />
              Hips:
              <input
                type="text"
                name="hips"
                value={this.state.hips}
                onChange={this.handleFieldChange}
              />
              (R) Arm:
              <input
                type="text"
                name="r_arm"
                value={this.state.r_arm}
                onChange={this.handleFieldChange}
              />
              (L) Arm:
              <input
                type="text"
                name="l_arm"
                value={this.state.l_arm}
                onChange={this.handleFieldChange}
              />
              (R) Leg:
              <input
                type="text"
                name="r_leg"
                value={this.state.r_leg}
                onChange={this.handleFieldChange}
              />
              (L) Leg:
              <input
                type="text"
                name="l_leg"
                value={this.state.l_leg}
                onChange={this.handleFieldChange}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit Progress
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ProgressForm.propTypes = {
  addProgress: PropTypes.func
};

export default connect(
  null,
  { addProgress }
)(ProgressForm);