import * as path from 'path';
import * as webpack from 'webpack';
import { BuildPaths, BuildMode, BuildPlaftorm, buildWebpack } from '@packages/build-config';
import packageJson from './package.json';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlaftorm;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    src: path.resolve(__dirname, 'src'),
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3001,
    mode: env.mode ?? 'development',
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
    paths,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js', // название файла, который будет подклчюаться в host контейнер
      // указываем что хотим предоставить приложению контейнеру
      exposes: {
        './Router': './src/router/Router.tsx',
      },
      // указываем какие библиотеки у нас общие и какие библиотеки должны шариться
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true, // говорим что необходимо эту библиотеку подгрузить сразу
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    }),
  );

  return config;
};
