import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname;
    return config;
  },
};

export default nextConfig;