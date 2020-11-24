import React from 'react'
import { connect } from 'react-redux'

const Profile = ({ language }) => {
    return (
        <div>
            {language === 'Ru' ? 'Профиль' : 'Profile'}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language
    }
}

export default connect(mapStateToProps, null)(Profile)