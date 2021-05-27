export type IAction = {
  type: string;
  payload?: any;
};

// TODO: add better typing like this:

// export interface CreateAppAction {
//   type: "createApplication";
//   payload: {
//     applicationId: string;
//   }
// }

// export interface UpdateAppAction {
//   type: "updateApplication";
//   payload: {
//     stuff: boolean;
//   }
// }

// export type IAction = CreateAppAction | UpdateAppAction | SomeAction;

export interface Action {
  action: string;
  options: any;
}

export interface InitialLoadActions {
  actions: Action[];
  async: boolean;
}
