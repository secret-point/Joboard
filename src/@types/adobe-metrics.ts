export interface MetricDataMapping {
  key: string;
  value: string;
}

export interface MetricsValue {
  [key: string]: MetricDataMapping[];
}

export interface AdobeMetrics {
  name: string;
  metricsValues: MetricsValue;
}

export interface Metric {
  [key: string]: {
    [key: string]: string | number | object;
  };
}

export interface MetricData {
  [key: string]: {
    [key: string]: string | number | string[] | undefined;
  };
}
