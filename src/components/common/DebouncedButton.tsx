import React from "react";
import { Button, ButtonProps } from "@amzn/stencil-react-components/button";
import { DataTestProps } from "@amzn/stencil-react-components/dist/submodules/utils";
import debounce from "lodash/debounce";

interface DebouncedButtonProps extends ButtonProps, DataTestProps {
  // wait time in milliseconds
  debounceTime?: number;
}

// https://ux.stackexchange.com/questions/95336/how-long-should-the-debounce-timeout-be
const DEFAULT_DEBOUNCE_TIME = 500;

export const DebouncedButton = (props: DebouncedButtonProps) => {
  const { debounceTime, onClick, ...restButtonProps } = props;

  const debouncedOnClick = debounce((event) => {
    onClick && onClick(event);
  }, debounceTime || DEFAULT_DEBOUNCE_TIME);

  return (
    onClick ? (
      <Button
        {...restButtonProps}
        onClick={(evt) => debouncedOnClick(evt)}
      />
    ) : (
      <Button {...restButtonProps} />
    )
  );
};

export default DebouncedButton;
