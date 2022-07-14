import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            dropdownVisible: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoUser = this.demoUser.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    componentWillUnmount() {
        this.props.removeErrors();
    }

    openDropdown() {
        return(
            <form onSubmit={this.handleSubmit} className="signup-form-box" >

                {this.props.errors.length ? <div className="error-messages">{this.renderErrors()}</div> : null }
                <label className="signup-label" >Ingenious Nickname
                        <br />
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleInput("username")}
                        className="signup-input"
                        maxLength="30"
                    />
                </label>
                <br />
                <label className="signup-label">Password
                        <br />
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInput("password")}
                        className="signup-input"
                        maxLength="70"
                    />
                </label>
                <p
                    className="signup-label"
                >
                    By clicking “Create Account”, you are indicating that you have read and agree to the <a className="hyperlink-color" href="https://genius.com/static/terms" target="blank" >Terms of Service</a>.
                </p>
                <input
                    className="session-submit-button"
                    type="submit"
                    value={this.props.formButton}
                />
                <br />
                <br />
                <label
                    className="signup-label"
                >
                    Already have an account? <Link className="hyperlink-color" to={`/login`}>Sign in here.</Link>
                </label>
            </form>
        )
    }

    closeDropdown() {
        return (
            <div></div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.signup(user)
            .then(() => this.props.history.goBack());
    }

    handleInput(field) {
        return (e) => {
            this.setState({
                [field]: e.currentTarget.value
            });
        };
    }

    demoUser(e) {
        e.preventDefault();
        this.props.login({
            username: "IngeniousFan",
            password: "IngeniousFanpw",
        })
            .then(() => this.props.history.goBack());
    }

    renderErrors() {
        return (
            <div>
                <div className="error-whoops-hed">
                    Whoops
                </div>
                <div className="error-whoops-subhed">
                    There must be some mistake
                </div>
                <ul>
                    {this.props.errors.map((error, i) => (
                        <li key={`error-${i}`}>
                            {error}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div className="signup-form-container">
                <div className="signup-headings">
                    <span className="signup-form-header">
                        {this.props.formHeader}
                    </span>
                    <br/>
                    <span className="signup-form-subhead">
                        {this.props.formSubhead}
                    </span>
                </div>
                <br />
                <button
                    className="session-demo-user-button"
                    onClick={e => this.demoUser(e)}
                >
                    <FontAwesomeIcon icon={faUser} /> &nbsp;Log in as demo user
                </button>
                <br/>
                <button
                    className="signup-username-button"
                    onClick={() => this.state.dropdownVisible
                        ? this.setState({ dropdownVisible: false })
                        : this.setState({ dropdownVisible: true })}
                >
                    <FontAwesomeIcon icon={faEnvelope} /> &nbsp;Sign up for new account
                </button>
                <br />
                {
                    this.state.dropdownVisible
                        ? this.openDropdown()
                        : this.closeDropdown()
                }
            </div>
        );
    }
};

export default SignupForm;
