import { createContext } from "react";

type ContextProps = {
  form: any;
};

const RenderOutputContext = createContext<Partial<ContextProps>>({});

export default RenderOutputContext;
