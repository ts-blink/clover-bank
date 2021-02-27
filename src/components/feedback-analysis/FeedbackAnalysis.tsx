import React from 'react';
import { Button, Space, notification, Spin, Modal } from 'antd';
import { init, SearchEmbed, AuthType, EventType } from "@thoughtspot/embed-sdk";
import { useSurveySender } from '../send-survey-modal/SendSurveyModal';

import { getDataForColumnName } from './FeedbackAnalysis.util';
import "./FeedbackAnalysis.css";


init({
    thoughtSpotHost:
        "https://10.87.90.166",
    authType: AuthType.None
});


export const FeedbackAnalysis = () => {
    const embedRef = React.useRef(null);
    const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);
    const { sendSurvey, modalJSX } = useSurveySender();

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
            .on(EventType.CustomAction, (payload: any) => {
                const data = payload.data;
                if (data.id === 'send-survey') {
                    const recipients = getDataForColumnName(data.columnsAndData, 'email address');
                    sendSurvey(recipients);
                }
            })
            .render({
                dataSources: ['d3db9e03-15b4-4f17-88cc-4e414996a35a'],
            })
    }, [])
    return <div className="feedbackAnalysis">
        {isEmbedLoading ? <div className="embedSpinner">
            <Spin size="large" />
        </div> : ''}
        <div className="tsEmbed" ref={embedRef} id="tsEmbed"></div>
        {modalJSX}
    </div>
}