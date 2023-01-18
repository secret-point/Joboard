declare namespace NodeJS {
  interface Global {
    [key: string]: any;
  }

  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: "development" | "production" | "test" | "devo";
  }
}
