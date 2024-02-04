import { addSeconds } from 'date-fns';
import { z } from 'zod';

export const zPhantom = z.object({
  id: z.string(),
  name: z.string(),
  script: z.string(),
  nextLaunchIn: z.number().optional(),
  manifest: z.object({
    tags: z.object({
      categories: z.array(z.string()),
    }),
  }),
  launchType: z.enum(['manually', 'repeatedly']),
  repeatedLaunchTimes: z
    .object({
      simplePreset: z.enum([
        'Once every other day',
        'Once per day',
        'Twice per day',
        'Thrice per day',
        '4 times per day',
        '6 times per day',
        '8 times per day',
        'Once every other hour',
        'Once per hour',
        'Twice per hour',
        'Thrice per hour',
        '4 times per hour',
        'Once every other working hour',
        'Once per working hour',
        'Twice per working hour',
        'Thrice per working hour',
        '4 times per working hour',
        'Once every other working hour, excluding weekends',
        'Once per working hour, excluding weekends',
        'Twice per working hour, excluding weekends',
        'Thrice per working hour, excluding weekends',
        '4 times per working hour, excluding weekends',
      ]),
    })
    .optional(),
});

export type IPhantom = z.infer<typeof zPhantom>;

export type IPhantoms = IPhantom[];

// Reference date for the next launch will be when this module is first imported.
const referenceDate = new Date();

export function getNextLaunchDate(nextLaunchIn: number): Date;
export function getNextLaunchDate(
  nextLaunchIn: number | undefined,
): Date | null;
export function getNextLaunchDate(nextLaunchIn?: number): Date | null {
  return nextLaunchIn ? addSeconds(referenceDate, nextLaunchIn) : null;
}
