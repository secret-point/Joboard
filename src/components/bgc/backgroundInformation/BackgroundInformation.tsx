import { Card } from "@amzn/stencil-react-components/card";
import { Input } from "@amzn/stencil-react-components/form";
import { IconCross, IconSize } from "@amzn/stencil-react-components/icons";
import { Col, View } from "@amzn/stencil-react-components/layout";
import { H5, Label, Text } from "@amzn/stencil-react-components/text";
import React, { useState } from "react";

const BackgroundInformation = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View>
      <Card
        height={showDetails ? "auto" : 200}
        width={"90vw"}
        flexDirection={"column"}
        isElevated
      >
        <View
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize={14} color="#394451">
            Step 2 of 5
          </Text>
          {showDetails && <IconCross size={IconSize.ExtraSmall} />}
        </View>
        <H5 fontSize={16} margin={{ top: 10 }}>
          Background Information
        </H5>
        <Col gridGap="S200">
          <Label htmlFor="legal-first-name">
            Legal first name <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="legal-first-name"
            type="text"
            placeholder="This is what appears on your ID"
          />
          <Label htmlFor="legal-first-name">
            Legal middle name <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="legal-first-name"
            type="text"
            placeholder="This is what appears on your ID"
          />
        </Col>
        {/* <H5 fontSize={16} margin={{ top: 16, bottom: 0 }}>
          Legal First Name <span style={{ color: "red" }}>*</span>
        </H5> */}
        <button
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          expand
        </button>
      </Card>
    </View>
  );
};

export default BackgroundInformation;
