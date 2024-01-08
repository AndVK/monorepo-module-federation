import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    // для работы фронтовых роутов в dev режиме
    // в проде проксируем статику через nginx на index.html
    historyApiFallback: true,
    hot: true,
  };
}
