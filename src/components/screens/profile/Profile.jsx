import UserService from '/src/services/user.service.js'
import { useQuery } from '@tanstack/react-query'

import Loader from '/src/components/ui/Loader'

import styles from './Profile.module.scss'
import ProfileOrganization from './organization/ProfileOrganization'
import ProfileUser from './user/ProfileUser'

const Profile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['profileUserOnly'],
		queryFn: () => UserService.getUser()
	})

	if (isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	if (data.ROLE_ID === 2) {
		return <ProfileOrganization />
	} else {
		return <ProfileUser user={data} />
	}
}

export default Profile
