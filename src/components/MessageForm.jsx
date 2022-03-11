import React from 'react'

export function MessageForm({ handleSubmit, text, setText }) {
    return (
        <form className="message_form" onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Enter message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <button className="btn">Send</button>
            </div>
        </form>
    )
}
