import { describe, expect, it } from 'vitest';
import { clockTimeToTurkish, eventTimeToTurkish, generateRandomTime } from './time-utils';

describe('time-utils', () => {
  describe('clockTimeToTurkish', () => {
    it('should handle exact hours', () => {
      expect(clockTimeToTurkish({ hour: 1, minute: 0 })).toBe('saat bir');
      expect(clockTimeToTurkish({ hour: 12, minute: 0 })).toBe('saat on iki');
    });

    it('should handle quarter past', () => {
      expect(clockTimeToTurkish({ hour: 1, minute: 15 })).toBe('biri çeyrek geçiyor');
      expect(clockTimeToTurkish({ hour: 12, minute: 15 })).toBe('on ikiyi çeyrek geçiyor');
    });

    it('should handle half past', () => {
      expect(clockTimeToTurkish({ hour: 1, minute: 30 })).toBe('bir buçuk');
      expect(clockTimeToTurkish({ hour: 12, minute: 30 })).toBe('on iki buçuk');
    });

    it('should handle quarter to', () => {
      expect(clockTimeToTurkish({ hour: 1, minute: 45 })).toBe('ikiye çeyrek var');
      expect(clockTimeToTurkish({ hour: 12, minute: 45 })).toBe('bire çeyrek var');
    });
  });

  describe('eventTimeToTurkish', () => {
    it('should handle exact hours', () => {
      expect(eventTimeToTurkish({ hour: 1, minute: 0 })).toBe('saat birde');
      expect(eventTimeToTurkish({ hour: 12, minute: 0 })).toBe('saat on ikide');
    });

    it('should handle quarter past', () => {
      expect(eventTimeToTurkish({ hour: 10, minute: 15 })).toBe('onu çeyrek geçe');
      expect(eventTimeToTurkish({ hour: 4, minute: 15 })).toBe('dördü çeyrek geçe');
    });

    it('should handle half past', () => {
      expect(eventTimeToTurkish({ hour: 7, minute: 30 })).toBe('yedi buçukta');
      expect(eventTimeToTurkish({ hour: 1, minute: 30 })).toBe('bir buçukta');
    });

    it('should handle quarter to', () => {
      expect(eventTimeToTurkish({ hour: 3, minute: 45 })).toBe('dörde çeyrek kala');
      expect(eventTimeToTurkish({ hour: 12, minute: 45 })).toBe('bire çeyrek kala');
    });
  });

  describe('generateRandomTime', () => {
    it('should generate valid time objects', () => {
      const time = generateRandomTime();
      expect(time.hour).toBeGreaterThanOrEqual(1);
      expect(time.hour).toBeLessThanOrEqual(12);
      expect(time.minute).toBeGreaterThanOrEqual(0);
      expect(time.minute).toBeLessThanOrEqual(55);
      expect(time.minute % 5).toBe(0); // Minutes should be multiples of 5
    });
  });
});
