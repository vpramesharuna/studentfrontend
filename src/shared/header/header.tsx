import logo from '../../assets/images/School.png'
import '../../assets/css/header.css'
export default function Header() {
    return (<div className="admin-panel__header header">
        <img className="logo" src={logo} />
        <h3>School Management</h3>
    </div>)
}
