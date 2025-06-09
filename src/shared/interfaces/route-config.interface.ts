export interface RoutesConfig {
    path: string;
    page?: React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;
    private: boolean;
    roles: string[];
    children?: RoutesConfig[];
  }