import React from "react";
import { IconChevronRight } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { CommonColors } from "../../../utils/colors";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { QueryParamItem, Schedule } from "../../../utils/types/common";
import Image from "../../common/Image";
import { PAGE_ROUTES } from "../../pageRoutes";
import ScheduleCardBanner from "./ScheduleCardBanner";
import ScheduleDetails from "./ScheduleDetails";

interface ScheduleCardProps {
  scheduleDetail: Schedule;
  displayOnly?: boolean;
}

const ScheduleCard = ( props: ScheduleCardProps ) => {

  const { scheduleDetail, displayOnly } = props;
  const { JOB_CONFIRMATION } = PAGE_ROUTES;

  const {
    image,
    signOnBonus,
    signOnBonusL10N,
    currencyCode,
    tagLine,
    externalJobTitle,
    scheduleBannerText
  } = scheduleDetail;

  const handleClick = () => {
    if (!displayOnly) {
      boundResetBannerMessage();
      const queryParamItem: QueryParamItem = {
        paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID,
        paramValue: scheduleDetail.scheduleId
      };
      routeToAppPageWithPath(JOB_CONFIRMATION, [queryParamItem]);
    }
  };

  return (
    <Col
      className="scheduleCardContainer"
      padding={{ bottom: "S300" }}
      onClick={handleClick}
    >
      <Row className="scheduleCardHeader" gridGap={12} padding="S300" backgroundColor={CommonColors.Blue05}>
        <Col className="scheduleCardBannerContainer" gridGap={4}>
          <Image
            src={image}
          />
          {
            signOnBonus &&
                        <ScheduleCardBanner signOnBonusL10N={signOnBonusL10N} currencyCode={currencyCode} signOnBonus={signOnBonus} />
          }
        </Col>
        <Col width="auto" gridGap={10}>
          <Text fontSize="T200" fontWeight="bold">{externalJobTitle}</Text>
          <Text fontSize="T100">{tagLine}</Text>
        </Col>
      </Row>
      <Row padding="S300" alignItems="center">
        <ScheduleDetails scheduleDetail={scheduleDetail} />
        {!displayOnly && (
          <Col>
            <IconChevronRight aria-hidden />
          </Col>
        )}
      </Row>
      {
        scheduleBannerText && (
          <Row
            padding={{ left: "S300", right: "S300", bottom: "S300" }}
            className="scheduleBannerText"
          >
            <Text fontSize="T100">{scheduleBannerText}</Text>
          </Row>
        )}
    </Col>
  );
};

export default ScheduleCard;
