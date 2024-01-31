import './index.css'

const PasswordList = props => {
  const {passwordDetails, checkBoxStatus} = props
  const {id, userName, password, website} = passwordDetails

  const initial = website ? website[0].toUpperCase() : ''

  const deletePasswordList = () => {
    const {deletePassoword} = props
    deletePassoword(id)
  }
  console.log(checkBoxStatus)

  const imageurl =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  return (
    <li className="password-list-container">
      <div className="initaial-bg-color">
        <p>{initial}</p>
      </div>
      <div className="texts">
        <p>{website}</p>
        <p>{userName}</p>
        {checkBoxStatus ? (
          <p>{parseInt(password.length) * '*'}</p>
        ) : (
          <p>{password}</p>
        )}
      </div>
      <button
        className="buton-style"
        onClick={deletePasswordList}
        type="delete"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-image"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordList
