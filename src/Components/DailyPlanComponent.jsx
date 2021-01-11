import React, { useState, useRef } from "react";
import work from "../images/work.png";
import study from "../images/study.png";
import meeting from "../images/meeting.png";
import activities from "../images/activities.png";
import "../css/style.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import Moment from "react-moment";
import Pdf from "react-to-pdf";

import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const ref = React.createRef();
const options = {
  orientation: "landscape",
  unit: "in",
  format: [4, 2],
  width: "100%",
  height: "100%",
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

function DailyPlanComponent() {
  const [inputPlan, setInputPlan] = useState({
    taskName: "",
    type: "",
    taskDate: "",
    taskStartTime: "",
    taskEndTime: "",
    goal: "",
  });
  const [dailyPlan, setDailyPlan] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const handleClose = () => setLgShow(false);
  const changeDate = (dateValue) => {
    setInputPlan({ ...inputPlan, taskDate: dateValue });
  };
  const changeStartTime = (startTimeValue) => {
    setInputPlan({ ...inputPlan, taskStartTime: startTimeValue.format("LT") });
  };
  const changeEndTime = (endTimeValue) => {
    setInputPlan({ ...inputPlan, taskEndTime: endTimeValue.format("LT") });
  };
  const changeInputPlan = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setInputPlan((inputPlan) => ({ ...inputPlan, [name]: newValue }));
  };
  const submitDailyPlan = (evt) => {
    evt.preventDefault();
    console.log(evt);
    if (inputPlan.type == "" || inputPlan.type == "None") {
      alert("Select task type!!");
    } else {
      setDailyPlan([
        ...dailyPlan,
        {
          taskName: inputPlan.taskName,
          type: inputPlan.type,
          dailyTaskDate: inputPlan.taskDate,
          startTime: inputPlan.taskStartTime,
          endTime: inputPlan.taskEndTime,
          goal: inputPlan.goal,
          id: Math.random() * 100,
        },
      ]);
      alert("Form Submitted !!");
      setInputPlan({
        taskName: "",
        type: "",
        taskDate: "",
        goal: "",
      });
    }
  };

  const deleteTask = (task) => {
    console.log(task);
    setDailyPlan(dailyPlan.filter((el) => el.id !== task.id));
  };

  return (
    <>
      {/* daily-plan */}
      <div className="container plan">
        <div className="row">
          <div className="col-md-4 col-4">
            <button
              style={{ marginLeft: 20 }}
              className="btn"
              onClick={() => setLgShow(true)}
            >
              Preview
            </button>
          </div>
          <div className="col-md-4 col-4 daily-monthly-text">
            <p>Daily</p>
          </div>
          <div className="col-md-4 col-4 text-right">
            <Link to="/">
              <button style={{ marginRight: 20 }} className="btn">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="form">
          <Form onSubmit={submitDailyPlan}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="taskName"
                onChange={changeInputPlan}
                value={inputPlan.taskName}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                onChange={changeInputPlan}
                value={inputPlan.type}
                required
              >
                <option>None</option>
                <option>Work</option>
                <option>Other Activities</option>
                <option>Meeting</option>
                <option>Studying</option>
              </Form.Control>
            </Form.Group>
            <Form.Row>
              <Col md={6} sm={12} xs={12}>
                <Form.Group controlId="task-date">
                  <Form.Label>Date</Form.Label>
                  <div>
                    <DatePicker
                      name="task-date"
                      selected={inputPlan.taskDate}
                      onChange={changeDate}
                      required
                      placeholderText="Select Task Date"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={3} sm={12} xs={12}>
                <Form.Group controlId="task-startTime">
                  <Form.Label>Start Time</Form.Label>
                  <div>
                    <TimePicker
                      placeholder="Select Time"
                      use12Hours
                      showSecond={false}
                      focusOnOpen={true}
                      format="hh:mm A"
                      onChange={changeStartTime}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <Form.Group controlId="task-endTime">
                  <Form.Label>End Time</Form.Label>
                  <div>
                    <TimePicker
                      placeholder="Select Time"
                      use12Hours
                      showSecond={false}
                      focusOnOpen={true}
                      format="hh:mm A"
                      onChange={changeEndTime}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Goal Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="goal"
                onChange={changeInputPlan}
                value={inputPlan.goal}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>

      {/* Preview Modal Box */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Your Daily RoadMap
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <div ref={ref}>
            <div style={styles}>
              <h2>
                {"\u2728"} Your RoadMap List {"\u2728"}
              </h2>
            </div>
            <Container>
              <Row>
                {dailyPlan.map((i) => {
                  return (
                    <>
                      <Col xs={12} md={4}>
                        <div className="planOutput" key={i.id}>
                          {i.type === "Work" && (
                            <div className="planOutputTitle">
                              <img
                                src={work}
                                width={30}
                                height={30}
                                style={{ float: "left" }}
                              />
                              <h4>{i.taskName}</h4>
                              <button
                                className="trash-btn textRight"
                                onClick={() => deleteTask(i)}
                              >
                                <i className="fa fa-trash-o"></i>
                              </button>
                            </div>
                          )}
                          {i.type === "Other Activities" && (
                            <div className="planOutputTitle">
                              <img
                                src={activities}
                                width={30}
                                height={30}
                                style={{ float: "left" }}
                              />
                              <h4>{i.taskName}</h4>
                              <button
                                className="trash-btn textRight"
                                onClick={() => deleteTask(i)}
                              >
                                <i className="fa fa-trash-o"></i>
                              </button>
                            </div>
                          )}
                          {i.type === "Meeting" && (
                            <div className="planOutputTitle">
                              <img
                                src={meeting}
                                width={30}
                                height={30}
                                style={{ float: "left" }}
                              />
                              <h4>{i.taskName}</h4>
                              <button
                                className="trash-btn textRight"
                                onClick={() => deleteTask(i)}
                              >
                                <i className="fa fa-trash-o"></i>
                              </button>
                            </div>
                          )}
                          {i.type === "Studying" && (
                            <div className="planOutputTitle">
                              <img
                                src={study}
                                width={30}
                                height={30}
                                style={{ float: "left" }}
                              />
                              <h4>{i.taskName}</h4>
                              <button
                                className="trash-btn textRight"
                                onClick={() => deleteTask(i)}
                              >
                                <i className="fa fa-trash-o"></i>
                              </button>
                            </div>
                          )}
                          {i.type === "None" && <h4>{i.taskName}</h4>}
                          <p>
                            {i.startTime} ~ {i.endTime}
                          </p>
                          <p>
                            Date -
                            <Moment format="YYYY/MM/DD">
                              {i.dailyTaskDate.toString()}
                            </Moment>
                          </p>
                          <p>{i.goal}</p>
                        </div>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Container>
            <div className="thank">Be a best day !!</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Pdf targetRef={ref} filename="roadmap.pdf">
            {({ toPdf }) => (
              <Button variant="primary" onClick={toPdf}>
                Download
              </Button>
            )}
          </Pdf>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DailyPlanComponent;