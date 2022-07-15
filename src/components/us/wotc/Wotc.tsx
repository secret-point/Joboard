import React, { useEffect } from "react";
import queryString from "query-string";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import IFrame from "../../common/IFrame";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { getLocale } from "../../../utils/helper";
import { connect } from "react-redux";
import { Locale } from "../../../utils/types/common";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
  application: ApplicationState;
};

const LocaleToWotcLangMapping: Record<Locale, string> = {
  [Locale.enGB]: 'en',
  [Locale.enUS]: 'en',
  [Locale.esUS]: 'es',
};

export const Wotc = (props: MapStateToProps) => {
  const { application } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId } = queryParams;
  const applicationData = application.results;

  useEffect(() => {
    applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
  }, [applicationId]);

  useEffect(() => {
    applicationData && addMetricForPageLoad(pageName);
  }, [applicationData, pageName]);

  const wotcLocalizedUrl = (wotcUrl: string): string => {
    if (!wotcUrl) {
      return "";
    }
    return `${wotcUrl}&lang=${LocaleToWotcLangMapping[getLocale()]}`;
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text fontSize="T500">
        {t("BB-WOTC-page-title-text", "Work opportunity tax credit questionnaire")}
      </Text>

      <Text>
        {t("BB-WOTC-page-description-text", "Amazon IAT testing participates in federal and or state tax credit programs. The information you give will be used to determine the company's eligibility for these programs and will in no way negatively impact any hiring, retention or promotion decisions.")}
      </Text>

      {applicationData?.wotcScreening?.wotcUrl && (
        <IFrame src={wotcLocalizedUrl(applicationData?.wotcScreening?.wotcUrl)} />
      )}
    </Col>
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(Wotc);
