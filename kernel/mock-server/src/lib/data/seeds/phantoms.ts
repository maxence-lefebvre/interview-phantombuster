import { IPhantom } from '@phantombuster/phantoms/types';

export const phantomsSeed = [
  {
    id: '6941466533774460',
    name: 'Grow Your LinkedIn Network',
    script: 'Grow Your LinkedIn Network.js',
    manifest: {
      tags: {
        categories: ['workflow', 'linkedin', 'salesNavigator'],
      },
    },
    launchType: 'repeatedly',
    repeatedLaunchTimes: {
      simplePreset: 'Once per day',
    },
    nextLaunchIn: 3654,
  },
  {
    id: '1936902841792005',
    name: 'LinkedIn Contacts Email Finder Workflow',
    script: 'LinkedIn Contacts to Emails.js',
    manifest: {
      tags: {
        categories: ['workflow', 'linkedin', 'mail'],
      },
    },
    launchType: 'repeatedly',
    repeatedLaunchTimes: {
      simplePreset: 'Twice per day',
    },
    nextLaunchIn: 6842,
  },
  {
    id: '5728802186298527',
    name: 'LinkedIn Profile Scraper',
    script: 'LinkedIn Profile Scraper.js',
    manifest: {
      tags: {
        categories: ['linkedin', 'mail'],
      },
    },
    launchType: 'manually',
  },
  {
    id: '8937174725125918',
    name: 'Instagram Notifications Extractor',
    script: 'Instagram Notifications Extractor.js',
    manifest: {
      tags: {
        categories: ['instagram'],
      },
    },
    launchType: 'manually',
  },
  {
    id: '891500502819788',
    name: 'LinkedIn Event Inviter',
    script: 'LinkedIn Event Inviter.js',
    manifest: {
      tags: {
        categories: ['linkedin'],
      },
    },
    launchType: 'manually',
  },
] as const satisfies IPhantom[];
