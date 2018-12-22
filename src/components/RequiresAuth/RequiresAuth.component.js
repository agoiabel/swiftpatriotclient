import React from 'react';
import { withRouter } from 'react-router';
import { getStorage } from '../../utils/storage.js';

export default function requireAuth(Component) {
	
	class AuthenticatedComponent extends React.Component {
		state = {
			isLogedIn: 0
		}

		componentDidMount() {
			this.checkAuth();
		}

		checkAuth = async () => {

			try {
				const authUserId = await getStorage("DayStar:auth_token") || 0;
				// const account_type = await getStorage("DayStar:account_type") || 0;
				// const email_confirmed = await getStorage("DayStar:email_confirmed") || 3;

		        this.setState({
		        	isLogedIn: authUserId
		        });

		        if (authUserId === 0) {
			        return this.props.history.push('/');
				}
				
				// if ( (account_type == 'ADULT' && email_confirmed == 0) || (account_type == 0 && email_confirmed == 3) ) {
				// 	return this.props.history.push('/');
				// }

		    } catch (error) {
		        console.dir('Error getting in storage');
			}
			
		}

		render() {
	      return this.state.isLogedIn !== 0 ? <Component { ...this.props } /> : null;
		}
	}

	return withRouter(AuthenticatedComponent);
}