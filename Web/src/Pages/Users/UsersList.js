import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AddOverlay from './AddOverlay';
import "./users.css"

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isAddOverlayOpen: false,
            isDeleteOverlayOpen: false,
            isEdit: false,
            columns: [],
            usersList: {},
            addUser: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                address: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
            }
        }
    }

    componentDidMount() {
        let columns = [
            {
              heading: 'Id',
              property: 'id'
            },
            {
              heading: 'First Name',
              property: 'firstName'
            },
            {
              heading: 'Last Name',
              property: 'lastName'
            },
            {
              heading: 'Email',
              property: 'email'
            },
            {
              heading: 'Phone Number',
              property: 'phoneNumber'
            },
            {
              heading: 'Address',
              property: 'address'
            },
            {
              heading: 'City',
              property: 'city'
            },
            {
              heading: 'State',
              property: 'state'
            },
            {
              heading: 'Country',
              property: 'country'
            },
            {
              heading: 'Postal Code',
              property: 'postalCode'
            },
        ];
        this.setState({ columns: columns });
        this.handleGetAllUsers();
    }

    handleGetAllUsers = () => {
        fetch("https://localhost:7120/users")
            .then(response => response.json())
            .then(data => {
                this.setState({ usersList: data });
            });
    }

    handleAddUser = () => {
        const { addUser } = this.state;
        if (addUser) {
            fetch("https://localhost:7120/users", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addUser)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ usersList: data });
            });
        }
        this.handleClosePopup();
    }

    handleOpenEditPopup = (user) => {
        this.setState({
            addUser: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
                postalCode: user.postalCode,
            }
        });
        this.setState({ isAddOverlayOpen: true, isEdit: true});
    }

    handleEditUsers = () => {
        const { addUser } = this.state;
        if (addUser) {
            fetch("https://localhost:7120/users/edit", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addUser)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ usersList: data });
            });
        }
        this.handleClosePopup();
    }

    handleOpenDeletePopup = (user) => {
        this.setState({
            addUser: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
                postalCode: user.postalCode,
            }
        });
        this.setState({ isDeleteOverlayOpen: true });
    }

    handleDeleteUsers = () => {
        const { addUser } = this.state;
        if (addUser) {
            fetch("https://localhost:7120/users", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addUser)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ usersList: data });
            });
        }
    }

    handleOpenPopup = () => {
        this.setState({  isAddOverlayOpen: true });
    }

    handleClosePopup = () => {
        this.setState({ 
            isAddOverlayOpen: false,
            isDeleteOverlayOpen: false,
            addUser: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                address: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
            },
            isEdit: false
        });
    }

    handleMapLocation = () => {
        const { usersList } = this.state;
        const { handleUpdateLocation } = this.props;
        let location = [];
        usersList.length > 0 && usersList.map((user) => {
            location.push(user["city"]);
            return location
        });
        handleUpdateLocation(location);
    }

    renderUsersList = () => {
        const { columns, usersList } = this.state;
        if (usersList.length > 0) {
            return (
                <div className="user-table">
                    <table>
                        <thead>
                            <tr>
                                {columns.map(col => <th key={`header-${col.heading}`}>{col.heading}</th>)}
                                <th key={`header-edit`}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map(item => 
                                <tr key={`${item["id"]}-row`}>
                                    {columns.map(col => <td key={`${item["id"]}-${col.property}`}>{item[col.property]}</td>)}
                                    <td key={`header-edit`}>
                                        <div>
                                            <button onClick={() => {this.handleOpenEditPopup(item)}}>Edit</button>
                                            <button onClick={() => {this.handleOpenDeletePopup(item)}}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }
        return <h1>Loading... Please wait...</h1>;
    }

    renderAddUserForm = () => {
        const { addUser, isEdit } = this.state;
        // let column = columns.filter(c => c.property === 'id');
        // column.map((col) => {
        //     return (
        //         <Fragment>
        //             <form>
        //               <div className="user-inputs">
        //                 <label><strong>{col.heading}</strong></label>
        //                 <input type="text" name={col.property} defaultValue={addUser.(col.property)} required onChange={(e) => {this.setState({ addUser: {...addUser, addUser[col.property]: e.target.value} })}} />
        //               </div>
        //             </form>
        //         </Fragment>
        //     );
        // });
        return (
            <Fragment>
                <form>
                    <div className="user-inputs">
                        <label><strong>First Name</strong></label>
                        <input type="text" name="firstname" defaultValue={addUser.firstName} required onChange={(e) => {this.setState({ addUser: {...addUser, firstName: e.target.value} })}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>Last Name</strong></label>
                        <input type="text" name="lastname" defaultValue={addUser.lastName} required onChange={(e) => {this.setState({ addUser: {...addUser, lastName: e.target.value} })}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>Email</strong></label>
                        <input type="text" name="email" defaultValue={addUser.email} disabled onChange={() => {}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>Phone Number</strong></label>
                        <input type="text" name="phonenumber" defaultValue={addUser.phoneNumber} required onChange={(e) => {this.setState({ addUser: {...addUser, phoneNumber: e.target.value} })}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>Address</strong></label>
                        <input type="text" name="address" defaultValue={addUser.address} required onChange={(e) => {this.setState({ addUser: {...addUser, address: e.target.value} })}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>City</strong></label>
                        <input type="text" name="city" defaultValue={addUser.city} required onChange={(e) => {this.setState({ addUser: {...addUser, city: e.target.value} })}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>State</strong></label>
                        <input type="text" name="state" defaultValue={addUser.state} required onChange={(e) => {this.setState({ addUser: {...addUser, state: e.target.value} })}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>Country</strong></label>
                        <input type="text" name="country" defaultValue={addUser.country} required onChange={(e) => {this.setState({ addUser: {...addUser, country: e.target.value} })}} />
                    </div>
                    <div className="user-inputs">
                        <label><strong>Postal Code</strong></label>
                        <input type="text" name="postalcode" defaultValue={addUser.postalCode} required onChange={(e) => {this.setState({ addUser: {...addUser, postalCode: e.target.value} })}} />
                    </div>
                    <div className="submit-button">
                        <input type="submit" onClick={() => {isEdit ? this.handleEditUsers() :this.handleAddUser()}} />
                    </div>
                </form>
            </Fragment>
        );
    }
    render() {
        const { isAddOverlayOpen, isDeleteOverlayOpen, isEdit } = this.state;
        return(
            <Fragment>
                <h1>Users List</h1>
                <div className="users">
                    <div className="user-add">
                        <button onClick={() => {this.handleOpenPopup();}}>Add User</button>
                    </div>
                    {this.renderUsersList()}
                    {isAddOverlayOpen && <AddOverlay
                            content={
                            <div>
                                <b>{isEdit ? "Edit User" : "Add User"}</b>
                                {this.renderAddUserForm()}
                            </div>}
                            handleClose={() => {this.handleClosePopup();}}
                        />}
                    {isDeleteOverlayOpen && <div className="deleteOverlay"><AddOverlay
                            content={
                            <div>
                                <h3>Are you sure to delete?</h3>
                                <button onClick={() => { this.handleClosePopup(); }}>Cancel</button>
                                <button onClick={() => { this.handleDeleteUsers(); }}>Delete</button>
                            </div>}
                            handleClose={() => {this.handleClosePopup();}}
                        /></div>}
                    <Link to="/mapview" onClick={() => {this.handleMapLocation();}}>Go To Map View</Link>
                </div>
            </Fragment>
        );
    }
}

export default UsersList;