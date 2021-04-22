import React from "react";
import { Button, Space, notification, Spin, Modal } from "antd";
import qs from "query-string";
import {
  init,
  SearchEmbed,
  AuthType,
  EmbedEvent,
} from "@thoughtspot/visual-embed-sdk";
import { useSurveySender } from "../send-survey-modal/SendSurveyModal";

import { getDataForColumnName } from "./FeedbackAnalysis.util";
import "./FeedbackAnalysis.css";

const queryParams = qs.parse(window.location.search);
const customHost: string = queryParams.host as string;

const thoughtSpotHost = !!customHost
  ? `https://${customHost}`
  : "https://embed-1-do-not-delete.thoughtspotdev.cloud";

init({
  thoughtSpotHost,
  authType: AuthType.SSO,
  noRedirect: true,
  getAuthToken: async () => {
    return fetch(
      "http://ts-everywhere-auth.thoughtspot.com:5000/gettoken/tsadmin"
    ).then((r) => r.text());
  },
  username: "tsadmin",
});

export const FeedbackAnalysis = () => {
  const embedRef = React.useRef(null);
  const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);
  const { sendSurvey, modalJSX } = useSurveySender();

  React.useEffect(() => {
    if (embedRef !== null) {
      embedRef!.current.innerHTML = "";
    }

    const tsSearch = new SearchEmbed("#tsEmbed", {
      frameParams: {},
      hideDataSources: true,
      dataSources: !!customHost ? [] : ["d3845440-5af6-451b-8e12-36b40591fc9f"],
    });
    tsSearch
      .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
      .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
      .on(EmbedEvent.CustomAction, (payload: any) => {
        const data = payload.data;
        if (data.id === "send-survey") {
          const recipients = getDataForColumnName(
            data.columnsAndData,
            "email address"
          );
          sendSurvey(recipients);
        }
      })
      .render();
  }, []);
  return (
    <div className="feedbackAnalysis">
      {isEmbedLoading ? (
        <div className="embedSpinner">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <div className="tsEmbed" ref={embedRef} id="tsEmbed"></div>
      {modalJSX}
    </div>
  );
};
