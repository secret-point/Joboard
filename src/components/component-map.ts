import Loader from "./loader";
import {
  TextBox,
  Button,
  PageTitle,
  PhoneNumber,
  RedirectButton,
  Checkbox,
  DisqualifiedQuestions,
  Text,
  PageHeader,
  Steps,
  DetailedCheckbox,
  Link,
  DetailedRadioButton,
  DetailedRadioButtonList,
  Action,
  Markdown,
  UL,
  StatusLink,
  Dropdown,
  DatePicker,
  MessageBanner,
  Card,
  Image
} from "@amzn/hvh-candidate-application-ui-components/lib";
import PanelContainer from "../containers/panel/panel-container";
import FlyoutContainer from "../containers/flyout";
import ImageContainer from "./image";
import { Col, Row, Spacer, View } from "@stencil-react/components/layout";
import { Card as StencilCard } from "@stencil-react/components/card";

const ComponentMap: any = {
  loader: Loader,
  TextBox,
  Button,
  PageTitle,
  PhoneNumber,
  RedirectButton,
  Checkbox,
  DisqualifiedQuestions,
  Text,
  PageHeader,
  Steps,
  DetailedCheckbox,
  StatusLink,
  Link,
  DetailedRadioButton,
  DetailedRadioButtonList,
  Action,
  Markdown,
  UL,
  Dropdown,
  DatePicker,
  MessageBanner,
  Card,
  Panel: PanelContainer,
  Flyout: FlyoutContainer,
  Image,
  ImageContainer,
  Col,
  Row,
  Spacer,
  View,
  StencilCard
};

export default ComponentMap;
