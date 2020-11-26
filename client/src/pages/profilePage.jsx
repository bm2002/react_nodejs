import React, {useContext} from 'react'
import { connect } from 'react-redux'
import { LanguageContext } from '../../src/context/language'

const Profile = () => {
    const state = useContext(LanguageContext)
    return (
        <div>
            {state.language === 'Ru' ? 'Профиль' : 'Profile'}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // language: state.app.language
    }
}

export default connect(mapStateToProps, null)(Profile)