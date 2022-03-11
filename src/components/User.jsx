import React from 'react'

// once clicking on user -> give access to that user information
export function User({ user, selectUser }) {
    return (
        <div className="userWapper" onClick={() => selectUser(user)}>
            <div className="userInfo">
                <div className="userDetails">
                    <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="avatar"
                    />
                    <h4>{user.username}</h4>
                </div>
                <div
                    className={`user_status ${
                        user.isOnline ? 'online' : 'offline'
                    }`}
                ></div>
            </div>
        </div>
    )
}
