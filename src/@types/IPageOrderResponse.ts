interface PageOrder {
  orderNumber: number;
  configPath: string;
}

export default interface IPageOrderResponse {
  pageOrders: PageOrder[];
};
