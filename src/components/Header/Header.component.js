import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { withRouter } from 'react-router';
import styles from './Header.component.module.css';
import { getStorage, removeStorage } from '../../utils/storage.js';

class Header extends React.Component {
	
	state = {
		role_id: 0,
		showDropDown: false,
		showMobileMenu: false
	}

	logout = () => {
		removeStorage("DayStar:auth_token");
		removeStorage("DayStar:role_id");
		removeStorage("reduxState");
		
		return this.props.history.push('/');
	}

	getUserRole = async () => {
		try {
			const authUserId = await getStorage("DayStar:role_id") || 0;

			this.setState({
				role_id: authUserId
			});

		} catch (error) {
			console.dir('Error getting in storage');
		}
	}

	componentDidMount() {
		this.getUserRole();
	}

	componentWillUnmount() {
	}

	toogleDropdown = () => {
		this.setState(prevState => ({
			showDropDown: !prevState.showDropDown
		}));
	}

	showMobileMenu = () => {
		this.setState(prevState => ({
			showMobileMenu: !prevState.showMobileMenu
		}));
	}

	
	render() {

		let mobileMenu, dropdown;

		if (this.state.showMobileMenu) {
			mobileMenu = (
				<div className={styles.mobileMenu}>
					<div className={styles.mobileNavItem}>
						<Link to={{ pathname: '/student-dashboard' }}>Dashboard</Link>
					</div>

					<div className={styles.mobileNavItem}>
						<Link to={{ pathname: '/forum/index' }}>Forum</Link>
					</div>

					<div className={styles.mobileNavItem}>
						<Link to={{ pathname: '/donate/create' }}>Donate</Link>
					</div>

					<div className={styles.mobileNavItem}>
						<Link to={{ pathname: '/feedback-general/create' }}>Feedback</Link>
					</div>
					
					<div className={styles.mobileNavItem}>
						<Link to={{ pathname: '/message/index' }}>Message</Link>
					</div>

					<div className={styles.mobileNavItem}>
						<Link to={{ pathname: '/profile/index' }}>View Profile</Link>
					</div>

					<div className={styles.mobileNavItem}>
						<a onClick={this.logout}>Logout</a>
					</div>

				</div>
			)
		}

		if (this.state.showDropDown) {
			dropdown = (
				<div className={styles.dropdown}>
					<div className={[styles.dropdown1, styles.profile].join(" ")}>
						<div className={styles.profileName}>{this.props.user.name}</div>
						<div className={styles.profileLink}>
							<Link to={{ pathname: '/profile/index' }}>View Profile</Link>
						</div>
					</div>

					<div className={styles.dropdown1}>
						<Link to={{ pathname: '/profile/session' }}>Session</Link>
					</div>

					<div className={styles.dropdown1} onClick={this.logout}>Logout</div>
				</div>
			);
		}

		let rightSideBar = (
			<div>
				<div>
					<div className={styles.account} onClick={this.toogleDropdown}>
						{/* <i className="fa fa-caret-down" aria-hidden="true"></i> */}
						<img src={require('../../assets/images/user.png')} />
					</div>

					{dropdown}
				</div>

				<div>
					<div className={styles.mobileMenuIcon} onClick={this.showMobileMenu}>
						<i className="fa fa-bars" aria-hidden="true"></i>
					</div>
				</div>

			</div>
		)

		let navs = (
			<div className={styles.navItems}>
				<div className={[styles.navItem, styles.active].join(" ")}>
					<Link to={{ pathname: '/student-dashboard' }}>Dashboard</Link>
				</div>
				<div className={styles.navItem}>
					<Link to={{ pathname: '/forum/index' }}>Forum</Link>
				</div>
				<div className={styles.navItem}>
					<Link to={{ pathname: '/donate/create' }}>Donate</Link>
				</div>
				<div className={styles.navItem}>
					<Link to={{ pathname: '/feedback-general/create' }}>Feedback</Link>
				</div>
				<div className={styles.navItem}>
					<Link to={{ pathname: '/message/index' }}>Message</Link>
				</div>
			</div>
		);

		if (this.state.role_id === 2) {
			navs = (
				<div className={styles.navItems}>
					<div className={[styles.navItem, styles.active].join(" ")}>
						<Link to={{ pathname: '/course/index' }}>Dashboard</Link>
					</div>
					<div className={styles.navItem}>
						<Link to={{ pathname: '/course/index' }}>Courses</Link>
					</div>
					<div className={styles.navItem}>
						<Link to={{ pathname: '/session/index' }}>Sessions</Link>
					</div>
					<div className={styles.navItem}>
						<Link to={{ pathname: '/outline/index' }}>Outlines</Link>
					</div>
					<div className={styles.navItem}>
						<Link to={{ pathname: '/facilitator/index' }}>Facilitators</Link>
					</div>
					<div className={styles.navItem}>
						<Link to={{ pathname: '/feedback-question/index' }}>Feedback</Link>
					</div>
					<div className={styles.navItem}>
						<Link to={{ pathname: '/message/index' }}>Message</Link>
					</div>
					<div className={styles.navItem}>
						<Link to={{ pathname: '/forum/management' }}>Forum</Link>
					</div>
				</div>
			);

			rightSideBar = (
				<div>
					<a className={styles.account} onClick={this.logout}>
						<i className="fa fa-sign-out" aria-hidden="true"></i>
					</a>

					<div>
						<div className={styles.mobileMenuIcon} onClick={this.showMobileMenu}>
							<i className="fa fa-bars" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			);

			if (this.state.showMobileMenu) {
				mobileMenu = (
					<div className={styles.mobileMenu}>
						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/course/index' }}>Dashboard</Link>
						</div>

						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/course/index' }}>Courses</Link>
						</div>

						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/session/index' }}>Sessions</Link>
						</div>

						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/outline/index' }}>Outlines</Link>
						</div>

						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/facilitator/index' }}>Facilitators</Link>
						</div>

						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/feedback-question/index' }}>Feedback</Link>
						</div>
						
						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/message/index' }}>Message</Link>
						</div>

						<div className={styles.mobileNavItem}>
							<Link to={{ pathname: '/forum/management' }}>Forum</Link>
						</div>

						<div className={styles.mobileNavItem}>
							<a onClick={this.logout}>Logout</a>
						</div>
					</div>
				)
			}
		}



		return (
			<div>
				<div className={styles.headerContainer}>
					<div className={styles.container}>
						<div className={styles.header}>

							<div className={styles.logoNav}>
								<div className={styles.logo}><a><img src={require('../../assets/images/dlalogo.png')} /></a></div>
								{navs}
							</div>

							{rightSideBar}

						</div>
					</div>
				</div>

				{ mobileMenu }
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		user: state.authReducer.user
	}
}

export default withRouter(connect(mapStateToProps)(Header));