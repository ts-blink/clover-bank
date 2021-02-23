import React from 'react';
import { Button, notification } from 'antd';
import { sendFeedbackSurvey } from '../../services/survey/survey-service';

export const Manage = () => {
    const sendSurvey = React.useCallback(async () => {
        const messageLink = await sendFeedbackSurvey([
            'ashish.shubham@thoughtspot.com',
            'dave.eyler@thoughtspot.com'
        ]);
        notification['success']({
            message: 'Survey Sent!',
            description:
                `The survey will be sent to the recipients within the next 5 minutes. You can click on this notification to manage this.`,
            onClick: () => {
                window.open(messageLink, '_blank');
            }
        });
    }, []);

    return (<div>
        <Button onClick={sendSurvey} type="primary">Test send Survey</Button>
    </div>);
}