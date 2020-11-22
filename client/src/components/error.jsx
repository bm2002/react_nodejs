import React from 'react'

const Error = ({ errorText }) => {

    return (
        <div
            className='alert alert-danger'
        >
            {errorText}
        </div>
    )
}

export default Error