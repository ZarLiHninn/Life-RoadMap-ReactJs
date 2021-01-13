import React, { useState } from "react";
import work from "../images/work.png";
import study from "../images/study.png";
import meeting from "../images/meeting.png";
import activities from "../images/activities.png";
import "../css/style.css";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
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
  const [previewShow, setPreviewShow] = useState(false);
  const [confirmBoxShow, setConfirmBoxShow] = useState(false);

  const handlePreviewClose = () => setPreviewShow(false);

  const handleConfirmBoxClose = () => setConfirmBoxShow(false);

  const changeDate = (dateValue) => {
    setInputPlan({ ...inputPlan, taskDate: dateValue });
  };

  const changeStartTime = (startTimeValue) => {
    setInputPlan({ ...inputPlan, taskStartTime: startTimeValue });
  };
  const changeEndTime = (endTimeValue) => {
    setInputPlan({ ...inputPlan, taskEndTime: endTimeValue });
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
      <div className="container daily-plan">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-4">
            <button
              className="btn back-btn"
              onClick={() => setConfirmBoxShow(true)}
            >
              Back
            </button>
          </div>
          <div className="col-lg-4 col-md-4 col-3 daily-text">
            <p>Daily</p>
          </div>
          <div className="col-lg-4 col-md-4 col-5 text-right">
            <button
              className="btn preview-btn"
              onClick={() => setPreviewShow(true)}
            >
              Preview
            </button>
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
              <Col lg={6} md={4} sm={12} xs={12}>
                <Form.Group controlId="task-date">
                  <Form.Label>Date</Form.Label>
                  <div>
                    <DatePicker
                      onChange={changeDate}
                      value={inputPlan.taskDate}
                      format="y-MM-dd"
                      required
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col lg={3} md={4} sm={12} xs={12}>
                <Form.Group controlId="task-startTime">
                  <Form.Label>Start Time</Form.Label>
                  <div>
                    <TimePicker
                      onChange={changeStartTime}
                      value={inputPlan.taskStartTime}
                      format="h:m a"
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col lg={3} md={4} sm={12} xs={12}>
                <Form.Group controlId="task-endTime">
                  <Form.Label>End Time</Form.Label>
                  <div>
                    <TimePicker
                      onChange={changeEndTime}
                      value={inputPlan.taskEndTime}
                      format="h:m a"
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
        show={previewShow}
        onHide={() => setPreviewShow(false)}
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
                      <Col md={6} lg={4}>
                        <div className="planOutput" key={i.id}>
                          {i.type === "Work" && (
                            <div className="container planOutputTitle">
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                  <img src={work} width={30} height={30} />
                                </div>
                                <div className="col-md-6 col-md-6 col-sm-6 col-6 text-left">
                                  <h4>{i.taskName}</h4>
                                </div>
                                <div className="col-md-4 col-md-4 col-sm-4 col-4 text-right">
                                  <button
                                    className="trash-btn"
                                    onClick={() => deleteTask(i)}
                                  >
                                    <i className="fa fa-trash-o"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {i.type === "Other Activities" && (
                            <div className="container planOutputTitle">
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                  <img
                                    src={activities}
                                    width={30}
                                    height={30}
                                  />
                                </div>
                                <div className="col-md-6 col-md-6 col-sm-6 col-6 text-left">
                                  <h4>{i.taskName}</h4>
                                </div>
                                <div className="col-md-4 col-md-4 col-sm-4 col-4 text-right">
                                  <button
                                    className="trash-btn"
                                    onClick={() => deleteTask(i)}
                                  >
                                    <i className="fa fa-trash-o"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {i.type === "Meeting" && (
                            <div className="container planOutputTitle">
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                  <img src={meeting} width={30} height={30} />
                                </div>
                                <div className="col-md-6 col-md-6 col-sm-6 col-6 text-left">
                                  <h4>{i.taskName}</h4>
                                </div>
                                <div className="col-md-4 col-md-4 col-sm-4 col-4 text-right">
                                  <button
                                    className="trash-btn"
                                    onClick={() => deleteTask(i)}
                                  >
                                    <i className="fa fa-trash-o"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {i.type === "Studying" && (
                            <div className="container planOutputTitle">
                              <div className="row">
                                <div className="col-md-2 col-md-2 col-sm-2 col-2">
                                  <img src={study} width={30} height={30} />
                                </div>
                                <div className="col-md-6 col-md-6 col-sm-6 col-6 text-left">
                                  <h4>{i.taskName}</h4>
                                </div>
                                <div className="col-md-4 col-md-4 col-sm-4 col-4 text-right">
                                  <button
                                    className="trash-btn"
                                    onClick={() => deleteTask(i)}
                                  >
                                    <i className="fa fa-trash-o"></i>
                                  </button>
                                </div>
                              </div>
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
          <Button variant="secondary" onClick={handlePreviewClose}>
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

      {/* Confirm Modal Box */}
      <Modal show={confirmBoxShow} onHide={handleConfirmBoxClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your data will not be saved! Are you sure to back home page?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmBoxClose}>
            No
          </Button>
          <Link to="/">
            <Button variant="primary">Yes, I will.</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DailyPlanComponent;
