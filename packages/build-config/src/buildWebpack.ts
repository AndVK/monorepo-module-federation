import { Configuration } from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    // точка входа в приложение (может быть несколько)
    entry: paths.entry,
    // где будут храниться файлы сборки
    output: {
      path: paths.output,
      // у статиченого filename есть проблемы с кеширование в браузере
      filename: '[name].[contenthash].js',
      // чистим старые файлы перед пбилдом
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
