import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { History } from "history";
import { match } from "react-router";

type IConsentPageProps = {
  header: any;
  history: History;
  match?: match;
  currentPageId?: string;
  urlPageId?: string;
  onUpdatePageId: Function
};

const ConsentPage: React.FC<IConsentPageProps> = ({
  header,
  match,
  history,
  currentPageId,
  urlPageId,
  onUpdatePageId
}) => {
  useEffect(() => {
    if(urlPageId !== currentPageId) {
      onUpdatePageId({ updatedPageId: urlPageId });
    }
  }, [urlPageId, currentPageId, onUpdatePageId])
  return (
    <div>
      <Layout headerData={header} match={match} history={history} />
    </div>
  );
};

export default ConsentPage;
