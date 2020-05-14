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
  Card
} from "@amzn/hvh-candidate-application-ui-components/lib";
import PanelContainer from "../containers/panel/panel-container";

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
  Panel: PanelContainer
};

export default ComponentMap;
