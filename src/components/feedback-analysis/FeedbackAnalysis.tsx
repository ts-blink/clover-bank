import React from 'react';
import { Button, Space, notification, Spin } from 'antd';
import { init, SearchEmbed, AuthType, EventType } from "@thoughtspot/embed-sdk";

import { sendFeedbackSurvey } from '../../services/survey/survey-service';
import "./FeedbackAnalysis.css";

init({
    thoughtSpotHost:
        "https://10.87.90.166",
    authType: AuthType.None
});


export const FeedbackAnalysis = () => {
    const embedRef = React.useRef(null);
    const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);

    React.useEffect(() => {
        if (embedRef !== null) {
            embedRef!.current.innerHTML = '';
        }

        const tsSearch = new SearchEmbed("#tsEmbed", {
            frameParams: {},
            hideDataSources: true,
        });
        tsSearch
            .on('init', () => setIsEmbedLoading(true))
            .on('load', () => setIsEmbedLoading(false))
            .on(EventType.CustomAction, (data) => {
                console.log(data);
                if (data.type === 'send-survey') {
                    // sendSurvey(data.recipients);
                }
            })
            .render({
                dataSources: ["5b6cbcc7-8e7e-4028-82a8-556bdac5ab66"],
            })
    }, [])
    const sendSurvey = React.useCallback(async () => {
        const messageLink = await sendFeedbackSurvey(['ashubham@gmail.com']);
        notification['success']({
            message: 'Survey Sent!',
            description:
                `The survey will be sent to the recipients within the next 5 minutes. You can click on this notification to manage this.`,
            onClick: () => {
                window.open(messageLink, '_blank');
            }
        });
    }, []);
    return <div className="feedbackAnalysis">
        {isEmbedLoading ? <div className="embedSpinner">
            <Spin size="large" />
        </div> : ''}
        <div className="tsEmbed" ref={embedRef} id="tsEmbed"></div>
    </div>
}