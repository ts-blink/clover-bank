import React from 'react';
import { Button, notification } from 'antd';
import { useSurveySender } from '../send-survey-modal/SendSurveyModal';
import { sendFeedbackSurvey } from '../../services/survey/survey-service';

export const Manage = () => {
    const { sendSurvey, modalJSX } = useSurveySender();
    const _sendSurvey = React.useCallback(async () => {
        sendSurvey([
            'ashish.shubham@thoughtspot.com',
            'dave.eyler@thoughtspot.com'
        ]);
    }, []);

    return (<div>
        <Button onClick={_sendSurvey} type="primary">Test send Survey</Button>
        {modalJSX}
    </div>);
}