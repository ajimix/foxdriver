'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _getPort = require('get-port');

var _getPort2 = _interopRequireDefault(_getPort);

var _tcpPortUsed = require('tcp-port-used');

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONNECTION_TIMEOUT = 10000;
const CONNECTION_INTERVAL = 250;
const FIREFOX_PROFILE_PATH = _path2.default.join(_os2.default.tmpdir(), 'firefox_dev_profile-');

class Launcher {
    static launch(options = {}) {
        return (0, _asyncToGenerator3.default)(function* () {
            const host = '127.0.0.1';
            const listeners = [];
            const debuggerPort = yield (0, _getPort2.default)({ port: options.port || 9222 });

            /**
             * create custom profile
             */
            const profileDir = _fsExtra2.default.mkdtempSync(FIREFOX_PROFILE_PATH);
            _fsExtra2.default.copySync(_path2.default.resolve(__dirname, 'config', 'profile', 'prefs.js'), _path2.default.resolve(profileDir, 'prefs.js'));

            const firefoxExecuteable = options.bin || Launcher.getFirefoxBin();
            const firefoxArguments = (options.args || []).concat('-start-debugger-server', debuggerPort, '-url', options.url || 'https://google.com', '-override', _path2.default.resolve(__dirname, 'config', 'override.ini'), '-profile', profileDir);
            const firefoxProcess = (0, _child_process.spawn)(firefoxExecuteable, firefoxArguments, {});

            function killAndCleanup() {
                (0, _utils.removeEventListeners)(listeners);
                firefoxProcess.kill('SIGKILL');
            }

            listeners.push((0, _utils.addEventListener)(process, 'exit', killAndCleanup));
            listeners.push((0, _utils.addEventListener)(firefoxProcess, 'exit', killAndCleanup));

            yield Launcher.waitUntilConnected(host, debuggerPort);
            const browser = new _browser2.default(host, debuggerPort);
            yield browser.connect();

            browser.firefoxProcess = firefoxProcess;
            return Launcher.waitForTab(browser);
        })();
    }

    static getFirefoxExe() {
        // Only run these checks on win32
        if (process.platform !== 'win32') {
            return null;
        }

        const suffix = '\\Mozilla\\firefox.exe';
        const prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)']];

        let windowsFirefoxDirectory;
        for (const prefix of prefixes) {
            try {
                windowsFirefoxDirectory = _path2.default.join(prefix, suffix);
                _fsExtra2.default.accessSync(windowsFirefoxDirectory);
                return windowsFirefoxDirectory;
            } catch (e) {}
        }

        return windowsFirefoxDirectory;
    }

    static getFirefoxBin() {
        if (process.platform === 'win32') {
            return Launcher.getFirefoxExe();
        }

        if (process.platform === 'darwin') {
            return '/Applications/Firefox.app/Contents/MacOS/firefox';
        }

        if (process.platform === 'linux') {
            return 'firefox';
        }

        throw new Error(`Couldn't find executable for platform "${process.platform}"`);
    }

    static waitUntilConnected(host, port, timeout = CONNECTION_TIMEOUT) {
        return (0, _asyncToGenerator3.default)(function* () {
            const isConnected = yield (0, _tcpPortUsed.check)(port, host);
            if (isConnected) {
                return true;
            }

            yield new _promise2.default(function (resolve) {
                return setTimeout(resolve, CONNECTION_INTERVAL);
            });
            return Launcher.waitUntilConnected(host, port, timeout - CONNECTION_INTERVAL);
        })();
    }

    static waitForTab(browser) {
        return (0, _asyncToGenerator3.default)(function* () {
            const tabs = yield browser.listTabs();
            if (tabs.length > 0) {
                return { browser, tab: tabs[0] };
            }

            yield new _promise2.default(function (resolve) {
                return setTimeout(resolve, CONNECTION_INTERVAL);
            });
            return Launcher.waitForTab(browser);
        })();
    }
}
exports.default = Launcher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9sYXVuY2hlci5qcyJdLCJuYW1lcyI6WyJDT05ORUNUSU9OX1RJTUVPVVQiLCJDT05ORUNUSU9OX0lOVEVSVkFMIiwiRklSRUZPWF9QUk9GSUxFX1BBVEgiLCJqb2luIiwidG1wZGlyIiwiTGF1bmNoZXIiLCJsYXVuY2giLCJvcHRpb25zIiwiaG9zdCIsImxpc3RlbmVycyIsImRlYnVnZ2VyUG9ydCIsInBvcnQiLCJwcm9maWxlRGlyIiwibWtkdGVtcFN5bmMiLCJjb3B5U3luYyIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJmaXJlZm94RXhlY3V0ZWFibGUiLCJiaW4iLCJnZXRGaXJlZm94QmluIiwiZmlyZWZveEFyZ3VtZW50cyIsImFyZ3MiLCJjb25jYXQiLCJ1cmwiLCJmaXJlZm94UHJvY2VzcyIsImtpbGxBbmRDbGVhbnVwIiwia2lsbCIsInB1c2giLCJwcm9jZXNzIiwid2FpdFVudGlsQ29ubmVjdGVkIiwiYnJvd3NlciIsImNvbm5lY3QiLCJ3YWl0Rm9yVGFiIiwiZ2V0RmlyZWZveEV4ZSIsInBsYXRmb3JtIiwic3VmZml4IiwicHJlZml4ZXMiLCJlbnYiLCJMT0NBTEFQUERBVEEiLCJQUk9HUkFNRklMRVMiLCJ3aW5kb3dzRmlyZWZveERpcmVjdG9yeSIsInByZWZpeCIsImFjY2Vzc1N5bmMiLCJlIiwiRXJyb3IiLCJ0aW1lb3V0IiwiaXNDb25uZWN0ZWQiLCJzZXRUaW1lb3V0IiwidGFicyIsImxpc3RUYWJzIiwibGVuZ3RoIiwidGFiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBLE1BQU1BLHFCQUFxQixLQUEzQjtBQUNBLE1BQU1DLHNCQUFzQixHQUE1QjtBQUNBLE1BQU1DLHVCQUF1QixlQUFLQyxJQUFMLENBQVUsYUFBR0MsTUFBSCxFQUFWLEVBQXVCLHNCQUF2QixDQUE3Qjs7QUFFZSxNQUFNQyxRQUFOLENB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QXFCLE9BQXpCLEVBQWtDO0FBQzlCLG1CQUFPLFNBQVA7QUFDSDs7QUFFRCxjQUFNLElBQUlVLEtBQUosQ0FBVywwQ0FBeUNoQixRQUFRTSxRQUFTLEdBQXJFLENBQU47QUFDSDs7QUFFRCxXQUFhTCxrQkFBYixDQUFpQ3JCLElBQWpDLEVBQXVDRyxJQUF2QyxFQUE2Q2tDLFVBQVU3QyxrQkFBdkQsRUFBMkU7QUFBQTtBQUN2RSxrQkFBTThDLGNBQWMsTUFBTSx3QkFBTW5DLElBQU4sRUFBWUgsSUFBWixDQUExQjtBQUNBLGdCQUFJc0MsV0FBSixFQUFpQjtBQUNiLHVCQUFPLElBQVA7QUFDSDs7QUFFRCxrQkFBTSxzQkFBWSxVQUFDL0IsT0FBRDtBQUFBLHVCQUFhZ0MsV0FBV2hDLE9BQVgsRUFBb0JkLG1CQUFwQixDQUFiO0FBQUEsYUFBWixDQUFOO0FBQ0EsbUJBQU9JLFNBQVN3QixrQkFBVCxDQUE0QnJCLElBQTVCLEVBQWtDRyxJQUFsQyxFQUF3Q2tDLFVBQVU1QyxtQkFBbEQsQ0FBUDtBQVB1RTtBQVExRTs7QUFFRCxXQUFhK0IsVUFBYixDQUF5QkYsT0FBekIsRUFBa0M7QUFBQTtBQUM5QixrQkFBTWtCLE9BQU8sTUFBTWxCLFFBQVFtQixRQUFSLEVBQW5CO0FBQ0EsZ0JBQUlELEtBQUtFLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNqQix1QkFBTyxFQUFFcEIsT0FBRixFQUFXcUIsS0FBS0gsS0FBSyxDQUFMLENBQWhCLEVBQVA7QUFDSDs7QUFFRCxrQkFBTSxzQkFBWSxVQUFDakMsT0FBRDtBQUFBLHVCQUFhZ0MsV0FBV2hDLE9BQVgsRUFBb0JkLG1CQUFwQixDQUFiO0FBQUEsYUFBWixDQUFOO0FBQ0EsbUJBQU9JLFNBQVMyQixVQUFULENBQW9CRixPQUFwQixDQUFQO0FBUDhCO0FBUWpDO0FBNUZ5QjtrQkFBVHpCLFEiLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb3MgZnJvbSAnb3MnXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuXG5pbXBvcnQgZ2V0UG9ydCBmcm9tICdnZXQtcG9ydCdcbmltcG9ydCB7IGNoZWNrIH0gZnJvbSAndGNwLXBvcnQtdXNlZCdcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSAnLi9icm93c2VyJ1xuaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5jb25zdCBDT05ORUNUSU9OX1RJTUVPVVQgPSAxMDAwMFxuY29uc3QgQ09OTkVDVElPTl9JTlRFUlZBTCA9IDI1MFxuY29uc3QgRklSRUZPWF9QUk9GSUxFX1BBVEggPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksICdmaXJlZm94X2Rldl9wcm9maWxlLScpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhdW5jaGVyIHtcbiAgICBzdGF0aWMgYXN5bmMgbGF1bmNoIChvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgaG9zdCA9ICcxMjcuMC4wLjEnXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IFtdXG4gICAgICAgIGNvbnN0IGRlYnVnZ2VyUG9ydCA9IGF3YWl0IGdldFBvcnQoeyBwb3J0OiBvcHRpb25zLnBvcnQgfHwgOTIyMiB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjcmVhdGUgY3VzdG9tIHByb2ZpbGVcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHByb2ZpbGVEaXIgPSBmcy5ta2R0ZW1wU3luYyhGSVJFRk9YX1BST0ZJTEVfUEFUSClcbiAgICAgICAgZnMuY29weVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2NvbmZpZycsICdwcm9maWxlJywgJ3ByZWZzLmpzJyksIHBhdGgucmVzb2x2ZShwcm9maWxlRGlyLCAncHJlZnMuanMnKSlcblxuICAgICAgICBjb25zdCBmaXJlZm94RXhlY3V0ZWFibGUgPSBvcHRpb25zLmJpbiB8fCBMYXVuY2hlci5nZXRGaXJlZm94QmluKClcbiAgICAgICAgY29uc3QgZmlyZWZveEFyZ3VtZW50cyA9IChvcHRpb25zLmFyZ3MgfHwgW10pLmNvbmNhdChcbiAgICAgICAgICAgICctc3RhcnQtZGVidWdnZXItc2VydmVyJywgZGVidWdnZXJQb3J0LFxuICAgICAgICAgICAgJy11cmwnLCBvcHRpb25zLnVybCB8fCAnaHR0cHM6Ly9nb29nbGUuY29tJyxcbiAgICAgICAgICAgICctb3ZlcnJpZGUnLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnY29uZmlnJywgJ292ZXJyaWRlLmluaScpLFxuICAgICAgICAgICAgJy1wcm9maWxlJywgcHJvZmlsZURpclxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGZpcmVmb3hQcm9jZXNzID0gc3Bhd24oZmlyZWZveEV4ZWN1dGVhYmxlLCBmaXJlZm94QXJndW1lbnRzLCB7fSlcblxuICAgICAgICBmdW5jdGlvbiBraWxsQW5kQ2xlYW51cCAoKSB7XG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhsaXN0ZW5lcnMpXG4gICAgICAgICAgICBmaXJlZm94UHJvY2Vzcy5raWxsKCdTSUdLSUxMJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGFkZEV2ZW50TGlzdGVuZXIocHJvY2VzcywgJ2V4aXQnLCBraWxsQW5kQ2xlYW51cCkpXG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGFkZEV2ZW50TGlzdGVuZXIoZmlyZWZveFByb2Nlc3MsICdleGl0Jywga2lsbEFuZENsZWFudXApKVxuXG4gICAgICAgIGF3YWl0IExhdW5jaGVyLndhaXRVbnRpbENvbm5lY3RlZChob3N0LCBkZWJ1Z2dlclBvcnQpXG4gICAgICAgIGNvbnN0IGJyb3dzZXIgPSBuZXcgQnJvd3Nlcihob3N0LCBkZWJ1Z2dlclBvcnQpXG4gICAgICAgIGF3YWl0IGJyb3dzZXIuY29ubmVjdCgpXG5cbiAgICAgICAgYnJvd3Nlci5maXJlZm94UHJvY2VzcyA9IGZpcmVmb3hQcm9jZXNzXG4gICAgICAgIHJldHVybiBMYXVuY2hlci53YWl0Rm9yVGFiKGJyb3dzZXIpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEZpcmVmb3hFeGUgKCkge1xuICAgICAgICAvLyBPbmx5IHJ1biB0aGVzZSBjaGVja3Mgb24gd2luMzJcbiAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdWZmaXggPSAnXFxcXE1vemlsbGFcXFxcZmlyZWZveC5leGUnXG4gICAgICAgIGNvbnN0IHByZWZpeGVzID0gW3Byb2Nlc3MuZW52LkxPQ0FMQVBQREFUQSwgcHJvY2Vzcy5lbnYuUFJPR1JBTUZJTEVTLCBwcm9jZXNzLmVudlsnUFJPR1JBTUZJTEVTKFg4NiknXV1cblxuICAgICAgICBsZXQgd2luZG93c0ZpcmVmb3hEaXJlY3RvcnlcbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggb2YgcHJlZml4ZXMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgd2luZG93c0ZpcmVmb3hEaXJlY3RvcnkgPSBwYXRoLmpvaW4ocHJlZml4LCBzdWZmaXgpXG4gICAgICAgICAgICAgICAgZnMuYWNjZXNzU3luYyh3aW5kb3dzRmlyZWZveERpcmVjdG9yeSlcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93c0ZpcmVmb3hEaXJlY3RvcnlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2luZG93c0ZpcmVmb3hEaXJlY3RvcnlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RmlyZWZveEJpbiAoKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICByZXR1cm4gTGF1bmNoZXIuZ2V0RmlyZWZveEV4ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICAgICAgICAgIHJldHVybiAnL0FwcGxpY2F0aW9ucy9GaXJlZm94LmFwcC9Db250ZW50cy9NYWNPUy9maXJlZm94J1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmlyZWZveCdcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGRuJ3QgZmluZCBleGVjdXRhYmxlIGZvciBwbGF0Zm9ybSBcIiR7cHJvY2Vzcy5wbGF0Zm9ybX1cImApXG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIHdhaXRVbnRpbENvbm5lY3RlZCAoaG9zdCwgcG9ydCwgdGltZW91dCA9IENPTk5FQ1RJT05fVElNRU9VVCkge1xuICAgICAgICBjb25zdCBpc0Nvbm5lY3RlZCA9IGF3YWl0IGNoZWNrKHBvcnQsIGhvc3QpXG4gICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIENPTk5FQ1RJT05fSU5URVJWQUwpKVxuICAgICAgICByZXR1cm4gTGF1bmNoZXIud2FpdFVudGlsQ29ubmVjdGVkKGhvc3QsIHBvcnQsIHRpbWVvdXQgLSBDT05ORUNUSU9OX0lOVEVSVkFMKVxuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyB3YWl0Rm9yVGFiIChicm93c2VyKSB7XG4gICAgICAgIGNvbnN0IHRhYnMgPSBhd2FpdCBicm93c2VyLmxpc3RUYWJzKClcbiAgICAgICAgaWYgKHRhYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgYnJvd3NlciwgdGFiOiB0YWJzWzBdIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIENPTk5FQ1RJT05fSU5URVJWQUwpKVxuICAgICAgICByZXR1cm4gTGF1bmNoZXIud2FpdEZvclRhYihicm93c2VyKVxuICAgIH1cbn1cbiJdfQ==