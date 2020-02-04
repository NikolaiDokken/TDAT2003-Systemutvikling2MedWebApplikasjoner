// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, Card, NavBar, Button, Row, Column, AddButton } from './widgets';

import { createHashHistory } from 'history';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Student {
  id: number;
  static nextId = 1;

  firstName: string;
  lastName: string;
  email: string;
  subjects: Array<number>;

  constructor(firstName: string, lastName: string, email: string, subjects: Array<number>) {
    this.id = Student.nextId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.subjects = subjects;
  }
}
let students = [
  new Student('Ola', 'Jensen', 'ola.jensen@ntnu.no', [0, 1]),
  new Student('Kari', 'Larsen', 'kari.larsen@ntnu.no', [1])
];

class Subject {
  id: number;
  static nextId = 1;

  studArr: Array<number>;
  code: string;
  title: string;

  constructor(code: string, title: string, studArr: Array<number>) {
    this.id = Subject.nextId++;
    this.code = code;
    this.title = title;
    this.studArr = studArr;
  }
}
let subjects = [
  new Subject('TDAT2003', 'Systemutvikling 2 med Web Applikasjoner', [0, 1]),
  new Subject('IINI1440', 'Python for programmers', [1])
];

class Menu extends Component {
  render() {
    return (
      <NavBar brand="React example">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/subjects">Subjects</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <Card title="React example with component state">Client-server communication will be covered next week.</Card>
    );
  }
}

class StudentList extends Component {
  render() {
    return (
      <div>
        <Card title="Students">
          {students.map(student => (
            <Row key={student.id}>
              <Column width={2}>
                <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/students/' + student.id}>
                  {student.firstName} {student.lastName}
                </NavLink>
              </Column>
              <Column>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/edit'}>
                  Edit
                </NavLink>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/remove'}>
                  Remove
                </NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <NavLink activeStyle={{ color: 'darkblue' }} to={'/studentsAdd'}>
          <AddButton />
        </NavLink>
      </div>
    );
  }
}

class SubjectList extends Component {
  render() {
    return (
      <div>
        <Card title="Subjects">
          {subjects.map(subject => (
            <Row key={subject.id}>
              <Column width={5}>
                <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/subjects/' + subject.id}>
                  {subject.code} {subject.title}
                </NavLink>
              </Column>
              <Column>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/subjects/' + subject.id + '/edit'}>
                  Edit
                </NavLink>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/subjects/' + subject.id + '/remove'}>
                  Remove
                </NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <NavLink activeStyle={{ color: 'darkblue' }} to={'/subjectsAdd'}>
          <AddButton />
        </NavLink>
      </div>
    );
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return null; // Return empty object (nothing to render)
    }
    return (
      <Card title="Details">
        <Row>
          <Column width={2}>First name</Column>
          <Column>{student.firstName}</Column>
        </Row>
        <Row>
          <Column width={2}>Last name</Column>
          <Column>{student.lastName}</Column>
        </Row>
        <Row>
          <Column width={2}>Email</Column>
          <Column>{student.email}</Column>
        </Row>
      </Card>
    );
  }
}

class SubjectDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let subject = subjects.find(subject => subject.id == this.props.match.params.id);
    if (!subject) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return null; // Return empty object (nothing to render)
    }
    return (
      <Card title="Details">
        <Row>
          <Column width={2}>Subject code</Column>
          <Column>{subject.code}</Column>
        </Row>
        <Row>
          <Column width={2}>Subject title</Column>
          <Column>{subject.title}</Column>
        </Row>
      </Card>
    );
  }
}

class StudentEdit extends Component<{ match: { params: { id: number } } }> {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <Card title="Edit">
        <form>
          <Row>
            <Column width={2}>First name</Column>
            <Column>
              <input
                type="text"
                value={this.firstName}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Last name</Column>
            <Column>
              <input
                type="text"
                value={this.lastName}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Email</Column>
            <Column>
              <input
                type="text"
                value={this.email}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}
              />
            </Column>
          </Row>
          <Button.Danger onClick={this.save}>Save</Button.Danger>
        </form>
      </Card>
    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
  }

  save() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    student.firstName = this.firstName;
    student.lastName = this.lastName;
    student.email = this.email;

    // Go to StudentDetails after successful save
    history.push('/students/' + student.id);
  }
}

class SubjectEdit extends Component<{ match: { params: { id: number } } }> {
  code = ''; // Always initialize component member variables
  title = '';

  render() {
    return (
      <Card title="Edit">
        <form>
          <Row>
            <Column width={2}>Code</Column>
            <Column>
              <input
                type="text"
                value={this.code}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.code = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Title</Column>
            <Column>
              <input
                type="text"
                value={this.title}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.title = event.target.value)}
              />
            </Column>
          </Row>
          <Button.Danger onClick={this.save}>Save</Button.Danger>
        </form>
      </Card>
    );
  }
  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let subject = subjects.find(subject => subject.id == this.props.match.params.id);
    if (!subject) {
      Alert.danger('Subject not found: ' + this.props.match.params.id);
      return;
    }

    this.code = subject.code;
    this.title = subject.title;
  }

  save() {
    let subject = subjects.find(subject => subject.id == this.props.match.params.id);
    if (!subject) {
      Alert.danger('Subject not found: ' + this.props.match.params.id);
      return;
    }

    subject.code = this.code;
    subject.title = this.title;

    // Go to StudentDetails after successful save
    history.push('/subjects/' + subject.id);
  }
}

class StudentAdd extends Component<{ match: { params: { id: number } } }> {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <Card title="Add Student">
        <form>
          <Row>
            <Column width={2}>First name</Column>
            <Column>
              <input
                type="text"
                value={this.firstName}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Last name</Column>
            <Column>
              <input
                type="text"
                value={this.lastName}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Email</Column>
            <Column>
              <input
                type="text"
                value={this.email}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}
              />
            </Column>
          </Row>
          <Button.Danger onClick={this.save}>Save</Button.Danger>
        </form>
      </Card>
    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)

  save() {
    students.push(new Student(this.firstName, this.lastName, this.email, []));

    // Go to StudentDetails after successful save
    history.push('/students');
  }
}

class SubjectAdd extends Component<{ match: { params: { id: number } } }> {
  code = ''; // Always initialize component member variables
  title = '';

  render() {
    return (
      <Card title="Add">
        <form>
          <Row>
            <Column width={2}>Code</Column>
            <Column>
              <input
                type="text"
                value={this.code}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.code = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Title</Column>
            <Column>
              <input
                type="text"
                value={this.title}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.title = event.target.value)}
              />
            </Column>
          </Row>
          <Button.Danger onClick={this.save}>Save</Button.Danger>
        </form>
      </Card>
    );
  }
  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)

  save() {
    subjects.push(new Subject(this.code, this.title, []));

    // Go to StudentDetails after successful save
    history.push('/subjects');
  }
}

class StudentRemove extends Component<{ match: { params: { id: number } } }> {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <Card title="Remove">
        <div>Are you sure you want to remove this student?</div>
        <Button.Danger onClick={this.save}>Yes</Button.Danger>
        <Button.Danger onClick={this.abort}>No</Button.Danger>
      </Card>
    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
  }

  save() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    delete students[students.indexOf(student)];

    // Go to StudentDetails after successful save
    history.push('/students');
  }

  abort() {
    // Go to StudentDetails after successful save
    history.push('/students');
  }
}

class SubjectRemove extends Component<{ match: { params: { id: number } } }> {
  code = ''; // Always initialize component member variables
  title = '';

  render() {
    return (
      <Card title="Remove">
        <div>Are you sure you want to remove this subject?</div>
        <Button.Danger onClick={this.save}>Yes</Button.Danger>
        <Button.Danger onClick={this.abort}>No</Button.Danger>
      </Card>
    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let subject = subjects.find(subject => subject.id == this.props.match.params.id);
    if (!subject) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    this.code = subject.code;
    this.title = subject.title;
  }

  save() {
    let subject = subjects.find(subject => subject.id == this.props.match.params.id);
    if (!subject) {
      Alert.danger('Subject not found: ' + this.props.match.params.id);
      return;
    }

    delete subjects[subjects.indexOf(subject)];

    // Go to StudentDetails after successful save
    history.push('/subjects');
  }

  abort() {
    // Go to StudentDetails after successful save
    history.push('/students');
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
        <Route exact path="/studentsAdd" component={StudentAdd} />
        <Route exact path="/students/:id/remove" component={StudentRemove} />

        <Route path="/subjects" component={SubjectList} />
        <Route exact path="/subjects/:id" component={SubjectDetails} />
        <Route exact path="/subjects/:id/edit" component={SubjectEdit} />
        <Route exact path="/subjectsAdd" component={SubjectAdd} />
        <Route exact path="/subjects/:id/remove" component={SubjectRemove} />
      </div>
    </HashRouter>,
    root
  );
