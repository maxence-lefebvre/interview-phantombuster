import { addSeconds } from 'date-fns';

// Reference date for the next launch will be when this module is first imported.
const moduleFirstImportDate = new Date();

export function getNextLaunchDate(
  nextLaunchIn: number,
  referenceDate?: Date,
): Date;
export function getNextLaunchDate(
  nextLaunchIn?: number | undefined,
  referenceDate?: Date,
): Date | null;
export function getNextLaunchDate(
  nextLaunchIn?: number | undefined,
  referenceDate: Date = moduleFirstImportDate,
): Date | null {
  return typeof nextLaunchIn === 'number' && Number.isFinite(nextLaunchIn)
    ? addSeconds(referenceDate, nextLaunchIn)
    : null;
}
