import { FC, useEffect } from 'react';
import packageJson from '../package.json';

// version from response - first param, local version second param
const semverGreaterThan = (versionA: string, versionB: string) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

type Props = {
  children: React.ReactNode;
};

const AppLatestVersionControllWrapper: FC<Props> = ({ children }) => {
  useEffect(() => {
    fetch('/cache-busting/meta.json')
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = packageJson.version;
        console.log('latestVersion:', latestVersion);
        console.log('currentVersion:', currentVersion);

        const shouldForceRefresh = semverGreaterThan(
          latestVersion,
          currentVersion,
        );
        if (shouldForceRefresh) {
          console.log(
            `We have a new version - ${latestVersion}. Should force refresh`,
          );
        } else {
          console.log(
            `You already have the latest version - ${latestVersion}. No cache refresh needed.`,
          );
        }
      });
  }, []);

  return <>{children}</>;
};

export default AppLatestVersionControllWrapper;
