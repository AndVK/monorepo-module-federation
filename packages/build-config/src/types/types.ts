export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  src: string;
  public: string;
}

export type BuildMode = 'production' | 'development';
export type BuildPlaftorm = 'mobile' | 'desktop';

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  analyzer?: boolean;
  platform?: BuildPlaftorm;
}
