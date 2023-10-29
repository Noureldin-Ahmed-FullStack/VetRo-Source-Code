import React, { useEffect } from 'react'
import '../MyCss/MyCustomStylesheet.css'

export default function VetRoBot() {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            window.botpressWebChat.init({
                botId: 'dffa1cce-7f36-4641-812c-5149525de0e5',
                hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
                messagingUrl: 'https://messaging.botpress.cloud',
                clientId: 'dffa1cce-7f36-4641-812c-5149525de0e5',
                stylesheet: 'https://webchat-styler-css.botpress.app/prod/1fe61979-4593-4d50-b10b-fa82f90262b0/v37826/style.css'

            })
        }
    }, [])
    return (
        <div className=''>
         
        </div>
    )
}
