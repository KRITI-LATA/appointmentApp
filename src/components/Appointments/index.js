// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggledStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppoinment => {
        if (id === eachAppoinment.id) {
          return {...eachAppoinment, isStarred: !eachAppoinment.isStarred}
        }
        return eachAppoinment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppoinment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppoinment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarredd: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppoinment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppoinmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppoinmentsList = this.getFilteredAppoinmentList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppoinment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label className="label" htmlFor="Title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="title"
                />
                <label htmlFor="Date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="Date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>

            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filteredAppoinmentsList.map(eachAppoinment => (
                <AppointmentItem
                  key={eachAppoinment.id}
                  appointmentDetails={eachAppoinment}
                  toggledStarred={this.toggledStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
