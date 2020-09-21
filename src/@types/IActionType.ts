export type IAction = {
  type: string;
  payload?: any;
};

export interface Action {
  action: string;
  options: any;
}

export interface InitialLoadActions {
  actions: Action[];
  async: boolean;
}
