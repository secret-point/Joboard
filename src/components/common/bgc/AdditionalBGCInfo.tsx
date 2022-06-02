import React, { ChangeEvent } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { H4 } from "@amzn/stencil-react-components/text";
import CriminalRecordForm from "./CriminalRecordForm";
import PreviousLegalNameForm from "./PreviousLegalNameForm";
import { AdditionalBGCFormConfig } from "../../../utils/constants/common";
import { FormInputItem } from "../../../utils/types/common";
import FormInputText from "../FormInputText";
import DatePicker from "../formDatePicker/DatePicker";
import FormInputSelect from "../FormInputSelect";
import PreviousWorkedAtAmazonForm from "./PreviousWorkedAtAmazonForm";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";

const AdditionalBGCInfo = () => {

    const renderFormItem = ( formItem: FormInputItem ) => {
        const hasError = false;
        formItem.hasError = hasError;

        switch(formItem.type) {
            case 'text':
                return <FormInputText
                    inputItem={formItem}
                    defaultValue={formItem.defaultValue || ''}
                    handleChange={( e: ChangeEvent<HTMLInputElement> ) => console.log(e, formItem)}
                />;
            case 'datePicker':
                return <DatePicker
                    inputItem={formItem}
                    defaultValue={formItem.defaultValue || ''}
                    handleChange={( e: ChangeEvent<HTMLInputElement> ) => console.log(e)}
                />

            case 'select':
                return <FormInputSelect
                    inputItem={formItem}
                    defaultValue={formItem.defaultValue || ''}
                    handleChange={( value: any ) => console.log(value)}
                />

            default:
                return <></>;
        }
    }

    return (
        <Col>
            <H4>Additional Background Information</H4>
            <CriminalRecordForm/>
            <PreviousLegalNameForm/>
            {
                AdditionalBGCFormConfig.map(config => {
                    return (
                        <Col key={config.labelText} gridGap={15}>
                            {
                                renderFormItem(config)
                            }
                        </Col>
                    )
                })
            }
            <PreviousWorkedAtAmazonForm/>
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={() => {
                    }}
                >
                    Next
                </Button>
            </Col>
        </Col>
    )
}

export default AdditionalBGCInfo;
