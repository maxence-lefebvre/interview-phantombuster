import { getNextLaunchDate } from './launch-date';

describe('LaunchDate', () => {
  describe('getNextLaunchDate', () => {
    const referenceDate = new Date('2024-01-01T00:00:00Z');

    it('should return null when nextLaunchIn is not defined', () => {
      expect(getNextLaunchDate()).toBeNull();
    });

    it.each([
      [0, referenceDate],
      [1, new Date('2024-01-01T00:00:01Z')],
      [60, new Date('2024-01-01T00:01:00Z')],
      [3600, new Date('2024-01-01T01:00:00Z')],
      [3661, new Date('2024-01-01T01:01:01Z')],
    ])(
      `when nextLaunchIn is %s, should return the date %s`,
      (nextLaunchIn, expectedDate) => {
        expect(getNextLaunchDate(nextLaunchIn, referenceDate)).toEqual(
          expectedDate,
        );
      },
    );
  });
});
