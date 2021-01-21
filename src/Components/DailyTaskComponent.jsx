import React, { useState } from "react";
import work from "../images/work.png";
import study from "../images/study.png";
import meeting from "../images/meeting.png";
import activities from "../images/activities.png";
import useLocalStorage from "../Components/useLocalStorage";
import "../css/style.css";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "rc-time-picker/assets/index.css";
import Moment from "react-moment";
import Pdf from "react-to-pdf";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { FaTrashAlt } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Modal, Container, Row, Col } from "react-bootstrap";

const ref = React.createRef();

function DailyTaskComponent() {
  //inputTask Handling
  const [inputTask, setInputTask] = useState({
    taskName: "",
    type: "",
    taskDate: "",
    taskStartTime: "",
    taskEndTime: "",
    goal: "",
  });
  const changeInputTask = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setInputTask((inputTask) => ({ ...inputTask, [name]: newValue }));
  };
  const changeDate = (dateValue) => {
    setInputTask({ ...inputTask, taskDate: dateValue });
  };

  const changeStartTime = (startTimeValue) => {
    setInputTask({ ...inputTask, taskStartTime: startTimeValue });
  };
  const changeEndTime = (endTimeValue) => {
    setInputTask({ ...inputTask, taskEndTime: endTimeValue });
  };

  //errorList Handling
  const [errorList, setErrorList] = useState({
    taskNameError: "",
    typeError: "",
    taskDateError: "",
    taskStartTimeError: "",
    taskEndTimeError: "",
    taskGoalError: "",
  });

  // dailyTask Handling
  const [dailyTask, setDailyTask] = useLocalStorage("todos", []);
  let listOfCategories = dailyTask.map((item) => item.dailyTaskDate);
  listOfCategories = listOfCategories
    .sort()
    .filter((v, i) => listOfCategories.indexOf(v) === i);

  const submitDailyTask = (evt) => {
    evt.preventDefault();
    let isError = false;
    const errors = {};

    if (inputTask.taskName === "") {
      isError = true;
      errors.taskNameError = "Please fill task name";
    } else if (inputTask.taskName.length > 35) {
      isError = true;
      errors.taskNameError =
        "Task name needs to be at least 32 characters long";
    }

    if (inputTask.type === "" || inputTask.type === "Select type") {
      isError = true;
      errors.typeError = "Please select task type";
    }

    if (inputTask.taskDate === "") {
      isError = true;
      errors.taskDateError = "Please fill task date";
    }

    if (inputTask.taskStartTime === "") {
      isError = true;
      errors.taskStartTimeError = "Please fill start time";
    }

    if (inputTask.taskEndTime === "") {
      isError = true;
      errors.taskEndTimeError = "Please fill end time";
    } else if (inputTask.taskEndTime <= inputTask.taskStartTime) {
      isError = true;
      errors.taskEndTimeError =
        "End time must not be equal or less than start time";
    }

    if (inputTask.goal === "") {
      isError = true;
      errors.taskGoalError = "Please fill something for your goal";
    }

    if (isError) {
      setErrorList({
        taskNameError: errors.taskNameError,
        typeError: errors.typeError,
        taskDateError: errors.taskDateError,
        taskStartTimeError: errors.taskStartTimeError,
        taskEndTimeError: errors.taskEndTimeError,
        taskGoalError: errors.taskGoalError,
      });
    } else {
      setDailyTask([
        ...dailyTask,
        {
          taskName: inputTask.taskName,
          type: inputTask.type,
          dailyTaskDate: inputTask.taskDate,
          startTime: inputTask.taskStartTime,
          endTime: inputTask.taskEndTime,
          goal: inputTask.goal,
          id: Math.random() * 100,
        },
      ]);
      setErrorList({
        taskNameError: "",
        typeError: "",
        taskDateError: "",
        taskStartTimeError: "",
        taskEndTimeError: "",
        taskGoalError: "",
      });

      setInputTask({
        taskName: "",
        type: "",
        taskDate: "",
        taskStartTime: "",
        taskEndTime: "",
        goal: "",
      });
      toastr.success("Task Submitted");
      window.location.reload(false);
    }
  };

  //deleting task
  const deleteTask = (task) => {
    setDailyTask(dailyTask.filter((el) => el.id !== task.id));
  };

  //previewHandling
  const [previewShow, setPreviewShow] = useState(false);
  const handlePreviewClose = () => setPreviewShow(false);

  return (
    <>
      {/* daily-plan */}
      <div className="container daily-plan">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-4">
            <Link to="/">
              <button className="btn back-btn">Back</button>
            </Link>
          </div>
          <div className="col-lg-4 col-md-4 col-3 daily-text">
            <p>Daily Task</p>
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
          <Form onSubmit={submitDailyTask}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="taskName"
                onChange={changeInputTask}
                value={inputTask.taskName}
              />
              <span className="error">{errorList.taskNameError}</span>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                onChange={changeInputTask}
                value={inputTask.type}
              >
                <option>Select type</option>
                <option>Work</option>
                <option>Other Activities</option>
                <option>Meeting</option>
                <option>Studying</option>
              </Form.Control>
              <span className="error">{errorList.typeError}</span>
            </Form.Group>
            <Form.Row>
              <Col lg={6} md={4} sm={12} xs={12}>
                <Form.Group controlId="task-date">
                  <Form.Label>Date</Form.Label>
                  <div>
                    <DatePicker
                      onChange={changeDate}
                      value={inputTask.taskDate}
                      format="y-MM-dd"
                    />
                  </div>
                  <span className="error">{errorList.taskDateError}</span>
                </Form.Group>
              </Col>

              <Col lg={3} md={4} sm={12} xs={12}>
                <Form.Group controlId="task-startTime">
                  <Form.Label>Start Time</Form.Label>
                  <div>
                    <TimePicker
                      onChange={changeStartTime}
                      value={inputTask.taskStartTime}
                      format="h:m a"
                    />
                  </div>
                  <span className="error">{errorList.taskStartTimeError}</span>
                </Form.Group>
              </Col>
              <Col lg={3} md={4} sm={12} xs={12}>
                <Form.Group controlId="task-endTime">
                  <Form.Label>End Time</Form.Label>
                  <div>
                    <TimePicker
                      onChange={changeEndTime}
                      value={inputTask.taskEndTime}
                      format="h:m a"
                    />
                  </div>
                  <span className="error">{errorList.taskEndTimeError}</span>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Goal Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="goal"
                onChange={changeInputTask}
                value={inputTask.goal}
              />
              <span className="error">{errorList.taskGoalError}</span>
              <input type="hidden" name="id" onChange={changeInputTask} />
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
            {listOfCategories.map((cat) => {
              return (
                <>
                  <Container>
                    <div key={cat} name={cat} className="dateCategory">
                      <div className="dateTitle">
                        <h3>
                          {"\u2728"}
                          <Moment format="YYYY/MM/DD">{cat}</Moment>
                          {"\u2728"}
                        </h3>
                      </div>
                      <Row>
                        {dailyTask
                          .filter((i) => i.dailyTaskDate === cat)
                          .map((i) => (
                            <Col md={6} lg={6}>
                              <div
                                className="planOutput"
                                key={i.id}
                                id={i.id}
                                name={i.id}
                              >
                                {i.type === "Work" && (
                                  <div className="container planOutputTitle">
                                    <div className="row">
                                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                        <img
                                          src={work}
                                          width={30}
                                          height={30}
                                          alt=""
                                        />
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-left">
                                        <h4>{i.taskName}</h4>
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                        <FaTrashAlt
                                          size={16}
                                          onClick={() => deleteTask(i)}
                                        />
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
                                          alt=""
                                        />
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-left">
                                        <h4>{i.taskName}</h4>
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                        <FaTrashAlt
                                          size={16}
                                          onClick={() => deleteTask(i)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {i.type === "Meeting" && (
                                  <div className="container planOutputTitle">
                                    <div className="row">
                                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                        <img
                                          src={meeting}
                                          width={30}
                                          height={30}
                                          alt=""
                                        />
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-left">
                                        <h4>{i.taskName}</h4>
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                        <FaTrashAlt
                                          size={16}
                                          onClick={() => deleteTask(i)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {i.type === "Studying" && (
                                  <div className="container planOutputTitle">
                                    <div className="row">
                                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                        <img
                                          src={study}
                                          width={30}
                                          height={30}
                                          alt=""
                                        />
                                      </div>
                                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-left">
                                        <h4>{i.taskName}</h4>
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-sm-4 col-4 text-right">
                                        <FaTrashAlt
                                          size={16}
                                          onClick={() => deleteTask(i)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <p>
                                  {i.startTime} ~ {i.endTime}
                                </p>
                                <p>{i.goal}</p>
                              </div>
                            </Col>
                          ))}
                      </Row>
                    </div>
                  </Container>
                </>
              );
            })}
            <div className="preview-footer">Be a best day !!</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePreviewClose}>
            Close
          </Button>
          <Pdf targetRef={ref} filename="roadmap.pdf">
            {({ toPdf }) => (
              <Button variant="primary" onClick={toPdf}>
                Export to Pdf
              </Button>
            )}
          </Pdf>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DailyTaskComponent;
