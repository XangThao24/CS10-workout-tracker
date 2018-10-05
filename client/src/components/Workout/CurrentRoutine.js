import React from "react";
import { connect } from "react-redux";
import { deleteExercise, deleteRoutine, updateRoutine, updateExercise} from "../../actions";
import { Button, Modal, Input, ModalHeader, ModalBody, InputGroup, ModalFooter} from 'reactstrap';

class CurrentRoutine extends React.Component {

  state = {
    routineName: "",
    exerciseName: "",
    weight: "",
    reps: "",
    sets: "",
    exerciseId: "",
    routineModal: false,
    exerciseModal: false,
    errors: {}
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleRoutine = () => {
    const { title } = this.props.currentRoutine;
    this.setState({
      routineModal: !this.state.routineModal,
      routineName: title
    });
  }

  toggleExercise = (id ,name="name", weight="5", reps="5", sets="5") => {

    this.setState({
      exerciseModal: !this.state.exerciseModal,
      exerciseName: name,
      weight: weight,
      reps: reps,
      sets: sets,
      exerciseId: id
    });
  }

  handleDelete = (exerciseId) => {
    this.props.deleteExercise(exerciseId);
  }

  handleDeleteRoutine = (routineId) => {
    this.props.deleteRoutine(routineId);
    console.log("hitting this")
  }

  handleExerciseUpdate = () => {
    const {exerciseId, exerciseName, weight, reps, sets } = this.state;
  
    this.props.updateExercise(exerciseId, exerciseName, weight, reps, sets);

    this.setState({
      exerciseName: "",
      weight: "",
      reps: "",
      sets: "",
      exerciseId: "",
      exerciseModal: !this.state.exerciseModal
    });
  }

  handleRoutineUpdate = () => {
    const { _id } = this.props.currentRoutine;
    const { routineName } = this.state;
    const newErrors = {}
    // call the routine add action here
    if(routineName.trim() === "") {
      newErrors.routineName = "Required Routine Name"
    }

    if(Object.keys(newErrors).length > 0) {
      return this.setState({errors: newErrors});
    }
    this.toggleRoutine();
    this.props.updateRoutine(_id, routineName);
    this.setState({routineName: ""});
  }

  render() {
    const { currentRoutine } = this.props;
    console.log("What is current ", currentRoutine)
    {currentRoutine && console.log(currentRoutine.title)}

    return (
      <div className="current__routine">
        <div className="current__routine__container">
        
        {/* update routine modal   */}

        <Modal
          isOpen={this.state.routineModal}
          toggle={this.toggleRoutine}
          className="sign__in"
        >
          <ModalHeader toggle={this.toggleSignInModal}>New Routine Name</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="New Routine Name"
                value={this.state.routineName}
                onChange={this.handleFieldChange}
                name="routineName"
                autoComplete="off"
                maxlength="15"
              />
            </InputGroup>
            {this.state.errors.routineName ? <span className="form__validation">{this.state.errors.routineName} </span>: null}
            {/* {this.props.valError.error ?<span className="form__validation">{this.props.valError.error}</span> : null}
            <InputGroup>
              <Input
                placeholder="password"
                type="password"
                value={this.state.signInPass}
                onChange={this.handleFieldChange}
                name="signInPass"
                autoComplete="off"
              />
            </InputGroup>
            {this.props.valError.error ? <span className="form__validation">{this.props.valError.error}</span> : null} */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleRoutineUpdate}>
              Update Routine Name
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleRoutine}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* End update routine modal */}

        {/* Update Exercise modal */}
        <Modal
          isOpen={this.state.exerciseModal}
          toggle={this.toggleExercise}
          className="sign__in"
        >
          <ModalHeader toggle={this.toggleSignInModal}>New Exercise</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="New Exercise Name"
                value={this.state.exerciseName}
                onChange={this.handleFieldChange}
                name="exerciseName"
                autoComplete="off"
                maxlength="15"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="New Weight"
                value={this.state.weight}
                onChange={this.handleFieldChange}
                name="weight"
                autoComplete="off"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="New Reps"
                value={this.state.reps}
                onChange={this.handleFieldChange}
                name="reps"
                autoComplete="off"
              />
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="New Sets"
                value={this.state.sets}
                onChange={this.handleFieldChange}
                name="sets"
                autoComplete="off"
              />
            </InputGroup>
            
            {/* {this.props.valError.error ?<span className="form__validation">{this.props.valError.error}</span> : null}
            <InputGroup>
              <Input
                placeholder="password"
                type="password"
                value={this.state.signInPass}
                onChange={this.handleFieldChange}
                name="signInPass"
                autoComplete="off"
              />
            </InputGroup>
            {this.props.valError.error ? <span className="form__validation">{this.props.valError.error}</span> : null} */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleExerciseUpdate}>
              Update Exercise
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleExercise}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* End Exercise modal */}

        <h2>CURRENT ROUTINE</h2>
        <h3 className="current__title">- Routine Title -----------------</h3>
        <div className="exercise__title">
          <h3>{currentRoutine &&  currentRoutine.title}</h3>
          {currentRoutine ? (
            <div className="pencil__trash__icon__container">
              <i className="fas fa-pencil-alt icon" onClick={this.toggleRoutine}/>
              <i className="fas fa-trash-alt icon" onClick={() => this.handleDeleteRoutine(currentRoutine._id)}/>
            </div>
          ): null} 
        </div>
        <h3 className="current__title">- Exercises ---------------------</h3>
        <div className="exercise__list">
          {currentRoutine && currentRoutine.exercises.map(exercise => {
            return(
              <div key={exercise._id} className="exercise__card">
                <div className="exercise__card__header">
                  <h3>{exercise.name}</h3>
                  <div className="pencil__trash__icon__container">
                  <i className="fas fa-pencil-alt icon" onClick={()=> this.toggleExercise(exercise._id, exercise.name, exercise.currentWeight, exercise.currentReps, exercise.currentSets)}/>
                  <i className="fas fa-trash-alt icon" onClick={() => this.handleDelete(exercise._id)}/>
                  </div>
                </div>
                <div className="exercise__card__body">
                  <div>Weight: {exercise.currentWeight} lbs</div>
                  <div>Reps: {exercise.currentReps}</div>
                  <div>Sets: {exercise.currentSets}</div>
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRoutine: state.RoutineManager.focusedRoutine
  };
};

export default connect(mapStateToProps, { deleteExercise, deleteRoutine, updateRoutine, updateExercise })(CurrentRoutine);