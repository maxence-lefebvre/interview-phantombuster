import { addSeconds } from 'date-fns';

export type IPhantoms = {
  id: string;
  name: string;
  script: string;
  nextLaunchIn?: number;
  manifest: {
    tags: {
      categories: string[];
    };
  };
  launchType: 'manually' | 'repeatedly';
  repeatedLaunchTimes?: {
    simplePreset:
      | 'Once every other day'
      | 'Once per day'
      | 'Twice per day'
      | 'Thrice per day'
      | '4 times per day'
      | '6 times per day'
      | '8 times per day'
      | 'Once every other hour'
      | 'Once per hour'
      | 'Twice per hour'
      | 'Thrice per hour'
      | '4 times per hour'
      | 'Once every other working hour'
      | 'Once per working hour'
      | 'Twice per working hour'
      | 'Thrice per working hour'
      | '4 times per working hour'
      | 'Once every other working hour, excluding weekends'
      | 'Once per working hour, excluding weekends'
      | 'Twice per working hour, excluding weekends'
      | 'Thrice per working hour, excluding weekends'
      | '4 times per working hour, excluding weekends';
  };
}[];

export type IPhantom = IPhantoms[number];

// Reference date for the next launch will be when this module is first imported.
const referenceDate = new Date();

export function getNextLaunchDate(nextLaunchIn: number): Date;
export function getNextLaunchDate(
  nextLaunchIn: number | undefined
): Date | null;
export function getNextLaunchDate(nextLaunchIn?: number): Date | null {
  if (!nextLaunchIn) {
    return null;
  }

  return addSeconds(referenceDate, nextLaunchIn);
}
