import React from "react";
import {
  PageHeader,
  PageHeaderButton
} from "@amzn/stencil-react-components/page";

type Props = {};

const DsPageHeader: React.FC<Props> = ({}) => {
  const onClick = () => {
    window.location.assign("http://amazondelivers.jobs/")
  };

  return (
    <PageHeader hasShadow fixed data-testid="navbar">
      <PageHeaderButton
        data-testid="home-button"
        title="Home"
        onClick={onClick}
        hasHover={false}
        paddingHorizontal={0}
      >
        <span className="navbar-logo">
          <img
            data-testid="logo-image"
            src="https://static.amazon.jobs/assets/icons/jobs_logo-5f4dd79a8e72aeaabe6aa3acae80962cd16317cff83e3a29c2f5dd5f30d33b31.svg"
            aria-hidden="true"
            role="presentation"
            tabIndex={-1}
          />
        </span>
      </PageHeaderButton>
    </PageHeader>
  );
};

export { DsPageHeader };
