import React from 'react';
import { Button, Space, notification, Spin, Modal } from 'antd';
import qs from 'query-string';
import { init, SearchEmbed, AuthType, EventType } from "@thoughtspot/embed-sdk";
import { useSurveySender } from '../send-survey-modal/SendSurveyModal';

import { getDataForColumnName } from './FeedbackAnalysis.util';
import "./FeedbackAnalysis.css";


const queryParams = qs.parse(window.location.search);
const customHost: string = queryParams.host as string;
init({
    thoughtSpotHost:
        (!!customHost) ? `https://${customHost}` : "https://10.87.89.232",
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
                dataSources: (!!customHost) ? [] : ['0d3713c5-9b7d-473f-a262-b2f23ae4fce6'],
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