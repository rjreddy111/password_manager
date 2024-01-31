import {Component} from 'react'

import {v4} from 'uuid'
import PasswordList from '../PasswordList'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwrodListItems: [],
    website: '',
    password: '',
    userName: '',
    isCheckboxClicked: false,
    searchInput: '',
  }

  onInputWebsite = event => {
    this.setState({website: event.target.value})
  }

  oninputUsername = event => {
    this.setState({userName: event.target.value})
  }

  onInputPassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {website, password, userName} = this.state

    const newPasswordList = {
      website,
      userName,
      password,
      id: v4(),
      isCheckboxClicked: false,
    }
    if (website.length > 0 && userName.length > 0 && password.length > 0) {
      this.setState(prevState => ({
        passwrodListItems: [...prevState.passwrodListItems, newPasswordList],
        website: '',
        userName: '',
        password: '',
        isCheckboxClicked: false,
      }))
    }
  }

  deletePassoword = id => {
    const {passwrodListItems} = this.state
    this.setState({
      passwrodListItems: passwrodListItems.filter(each => each.id !== id),
    })
  }

  changeStatus = () => {
    const {isCheckboxClicked} = this.state
    this.setState(prevState => ({
      isCheckboxClicked: !prevState.isCheckboxClicked,
    }))
  }

  toggleShow = () => {
    const {isCheckboxClicked} = this.state
    this.setState(prevState => ({
      isCheckboxClicked: !prevState.isCheckboxClicked,
    }))
  }

  renderPasswordList = () => {
    const {passwrodListItems, searchInput} = this.state
    const searchResults = passwrodListItems.filter(eachWebsite =>
      eachWebsite.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const passowrdListOrNot = passwrodListItems.length < 1
    const passWordListNotFound = searchResults.length < 1
    if (passowrdListOrNot || passWordListNotFound) {
      return (
        <div className="no-password-image">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            className="image-no-password"
            alt="no passwords"
          />
          <p>No Passwords</p>
        </div>
      )
    }
    return searchResults.map(eachList => (
      <PasswordList
        passwordDetails={eachList}
        key={eachList.id}
        deletePassoword={this.deletePassoword}
      />
    ))
  }

  searchInputValue = event => {
    const {searchInput} = this.state
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      passwrodListItems,
      userName,
      password,
      website,
      isCheckboxClicked,
      searchInput,
    } = this.state
    const passwordContains = passwrodListItems > 0

    return (
      <div className="main-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />
        <div className="form-bg-container">
          <form type="submit" className="form-style" onSubmit={this.submitForm}>
            <h1>Add New Password</h1>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="search-image"
              />
              <input
                placeholder="Enter Website"
                type="text"
                className="input-style"
                value={website}
                onChange={this.onInputWebsite}
              />
            </div>
            <br />
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="search-image"
              />
              <input
                placeholder="Enter Username"
                type="text"
                className="input-style"
                value={userName}
                onChange={this.oninputUsername}
              />
            </div>
            <br />
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="search-image"
              />

              <input
                placeholder="Enter Password"
                type="password"
                className="input-style"
                value={password}
                onChange={this.onInputPassword}
              />
            </div>
            <br />
            <button type="submit" className="button-style">
              Add
            </button>
          </form>
          <div className="image-display">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt=" password manager"
              className="image-password"
            />
          </div>
        </div>
        <div className="password-list-bg-container">
          <div className="password-list-top-line">
            <div className="password-count">
              <h1 className="heading">Your Passwords</h1>
              <p className="counter">{passwrodListItems.length}</p>
            </div>

            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-image"
              />
              <input
                type="search"
                className="input-style"
                placeholder="Search"
                onChange={this.searchInputValue}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password">
            <label
              className="checkboxItem"
              id="showPasswordId"
              onClick={this.changeStatus}
            >
              Show passwords
              <input type="checkbox" htmlFor="showPasswordId" />
            </label>
          </div>

          <ul className="password-list">{this.renderPasswordList()}</ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
