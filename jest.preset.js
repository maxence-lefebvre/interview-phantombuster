const nxPreset = require('@nx/jest/preset').default;

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 * */
module.exports = { ...nxPreset, testEnvironment: 'jsdom' };
