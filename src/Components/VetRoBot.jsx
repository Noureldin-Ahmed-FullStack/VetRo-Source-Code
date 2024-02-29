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
                avatarUrl: 'https://mostlyflesh.sirv.com/Message%20Bot.png',
                botName: 'VetRo',
                className: 'MyIframe',
                // stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/1fe61979-4593-4d50-b10b-fa82f90262b0/v56771/style.css',
                stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/947328e9-c5b1-4c82-b1c2-39f788ca8cd2/v36145/style.css',
            })
        }
    }, [])
    return (
        <div className=''>
         
        </div>
    )
}
