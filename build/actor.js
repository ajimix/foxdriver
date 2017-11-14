'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Actor extends _events2.default {
    constructor(client, name, data) {
        super();
        this.client = client;
        this.name = name;
        this.isEnabled = false;
        this.data = data;
        this.log = (0, _logger2.default)(`Actor:${name}`);

        // this.client.on('message', (message) => {
        //     if (message.from === this.name) {
        //         this.emit(message.type, message)
        //     }
        // })

        this._registeredDomains = {};
        this.setActors(data);
    }

    setActors(payload = {}) {
        this._actors = (0, _keys2.default)(payload).filter(key => key.endsWith('Actor')).reduce((obj, key) => {
            obj[key] = payload[key];
            return obj;
        }, {});
    }

    request(type, message = {}) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            message.to = _this.name;
            message.type = type;

            const result = yield _this.client.makeRequest(message);

            if (result.error) {
                throw new Error(`${result.message} (${result.error})`);
            }

            return result;
        })();
    }

    _get(domain, alias) {
        const apiName = alias || domain;
        const actorId = this._actors[`${domain}Actor`];

        if (!this._registeredDomains[apiName] && actorId) {
            /**
             * require domain actor dynamically
             */
            const Domain = require(`./domains/${apiName}`);
            this._registeredDomains[apiName] = new Domain(this.client, actorId);
            this.log.info(`registered ${apiName} with actor id ${actorId}`);
        }

        return this._registeredDomains[apiName];
    }
}
exports.default = Actor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hY3Rvci5qcyJdLCJuYW1lcyI6WyJBY3RvciIsImNvbnN0cnVjdG9yIiwiY2xpZW50IiwibmFtZSIsImRhdGEiLCJpc0VuYWJsZWQiLCJsb2ciLCJfcmVnaXN0ZXJlZERvbWFpbnMiLCJzZXRBY3RvcnMiLCJwYXlsb2FkIiwiX2FjdG9ycyIsImZpbHRlciIsImtleSIsImVuZHNXaXRoIiwicmVkdWNlIiwib2JqIiwicmVxdWVzdCIsInR5cGUiLCJtZXNzYWdlIiwidG8iLCJyZXN1bHQiLCJtYWtlUmVxdWVzdCIsImVycm9yIiwiRXJyb3IiLCJfZ2V0IiwiZG9tYWluIiwiYWxpYXMiLCJhcGlOYW1lIiwiYWN0b3JJZCIsIkRvbWFpbiIsInJlcXVpcmUiLCJpbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7OztBQUVlLE1BQU1BLEtBQU4sMEJBQWlDO0FBQzVDQyxnQkFBYUMsTUFBYixFQUFxQkMsSUFBckIsRUFBMkJDLElBQTNCLEVBQWlDO0FBQzdCO0FBQ0EsYUFBS0YsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsYUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0UsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGFBQUtELElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtFLEdBQUwsR0FBVyxzQkFBUSxTQUFRSCxJQUFLLEVBQXJCLENBQVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFLSSxrQkFBTCxHQUEwQixFQUExQjtBQUNBLGFBQUtDLFNBQUwsQ0FBZUosSUFBZjtBQUNIOztBQUVESSxjQUFXQyxVQUFVLEVBQXJCLEVBQXlCO0FBQ3JCLGFBQUtDLE9BQUwsR0FBZSxvQkFBWUQsT0FBWixFQUNWRSxNQURVLENBQ0ZDLEdBQUQsSUFBU0EsSUFBSUMsUUFBSixDQUFhLE9BQWIsQ0FETixFQUVWQyxNQUZVLENBRUgsQ0FBQ0MsR0FBRCxFQUFNSCxHQUFOLEtBQWM7QUFDbEJHLGdCQUFJSCxHQUFKLElBQVdILFFBQVFHLEdBQVIsQ0FBWDtBQUNBLG1CQUFPRyxHQUFQO0FBQ0gsU0FMVSxFQUtSLEVBTFEsQ0FBZjtBQU1IOztBQUVLQyxXQUFOLENBQWVDLElBQWYsRUFBcUJDLFVBQVUsRUFBL0IsRUFBbUM7QUFBQTs7QUFBQTtBQUMvQkEsb0JBQVFDLEVBQVIsR0FBYSxNQUFLaEIsSUFBbEI7QUFDQWUsb0JBQVFELElBQVIsR0FBZUEsSUFBZjs7QUFFQSxrQkFBTUcsU0FBUyxNQUFNLE1BQUtsQixNQUFMLENBQVltQixXQUFaLENBQXdCSCxPQUF4QixDQUFyQjs7QUFFQSxnQkFBSUUsT0FBT0UsS0FBWCxFQUFrQjtBQUNkLHNCQUFNLElBQUlDLEtBQUosQ0FBVyxHQUFFSCxPQUFPRixPQUFRLEtBQUlFLE9BQU9FLEtBQU0sR0FBN0MsQ0FBTjtBQUNIOztBQUVELG1CQUFPRixNQUFQO0FBVitCO0FBV2xDOztBQUVESSxTQUFNQyxNQUFOLEVBQWNDLEtBQWQsRUFBcUI7QUFDakIsY0FBTUMsVUFBVUQsU0FBU0QsTUFBekI7QUFDQSxjQUFNRyxVQUFVLEtBQUtsQixPQUFMLENBQWMsR0FBRWUsTUFBTyxPQUF2QixDQUFoQjs7QUFFQSxZQUFJLENBQUMsS0FBS2xCLGtCQUFMLENBQXdCb0IsT0FBeEIsQ0FBRCxJQUFxQ0MsT0FBekMsRUFBa0Q7QUFDOUM7OztBQUdBLGtCQUFNQyxTQUFTQyxRQUFTLGFBQVlILE9BQVEsRUFBN0IsQ0FBZjtBQUNBLGlCQUFLcEIsa0JBQUwsQ0FBd0JvQixPQUF4QixJQUFtQyxJQUFJRSxNQUFKLENBQVcsS0FBSzNCLE1BQWhCLEVBQXdCMEIsT0FBeEIsQ0FBbkM7QUFDQSxpQkFBS3RCLEdBQUwsQ0FBU3lCLElBQVQsQ0FBZSxjQUFhSixPQUFRLGtCQUFpQkMsT0FBUSxFQUE3RDtBQUNIOztBQUVELGVBQU8sS0FBS3JCLGtCQUFMLENBQXdCb0IsT0FBeEIsQ0FBUDtBQUNIO0FBdkQyQztrQkFBM0IzQixLIiwiZmlsZSI6ImFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5cbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoY2xpZW50LCBuYW1lLCBkYXRhKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnRcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICAgICAgdGhpcy5sb2cgPSBsb2dnZXIoYEFjdG9yOiR7bmFtZX1gKVxuXG4gICAgICAgIC8vIHRoaXMuY2xpZW50Lm9uKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgLy8gICAgIGlmIChtZXNzYWdlLmZyb20gPT09IHRoaXMubmFtZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuZW1pdChtZXNzYWdlLnR5cGUsIG1lc3NhZ2UpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZERvbWFpbnMgPSB7fVxuICAgICAgICB0aGlzLnNldEFjdG9ycyhkYXRhKVxuICAgIH1cblxuICAgIHNldEFjdG9ycyAocGF5bG9hZCA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2FjdG9ycyA9IE9iamVjdC5rZXlzKHBheWxvYWQpXG4gICAgICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleS5lbmRzV2l0aCgnQWN0b3InKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBwYXlsb2FkW2tleV1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgICAgICB9LCB7fSlcbiAgICB9XG5cbiAgICBhc3luYyByZXF1ZXN0ICh0eXBlLCBtZXNzYWdlID0ge30pIHtcbiAgICAgICAgbWVzc2FnZS50byA9IHRoaXMubmFtZVxuICAgICAgICBtZXNzYWdlLnR5cGUgPSB0eXBlXG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQubWFrZVJlcXVlc3QobWVzc2FnZSlcblxuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmVzdWx0Lm1lc3NhZ2V9ICgke3Jlc3VsdC5lcnJvcn0pYClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICBfZ2V0IChkb21haW4sIGFsaWFzKSB7XG4gICAgICAgIGNvbnN0IGFwaU5hbWUgPSBhbGlhcyB8fCBkb21haW5cbiAgICAgICAgY29uc3QgYWN0b3JJZCA9IHRoaXMuX2FjdG9yc1tgJHtkb21haW59QWN0b3JgXVxuXG4gICAgICAgIGlmICghdGhpcy5fcmVnaXN0ZXJlZERvbWFpbnNbYXBpTmFtZV0gJiYgYWN0b3JJZCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiByZXF1aXJlIGRvbWFpbiBhY3RvciBkeW5hbWljYWxseVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBEb21haW4gPSByZXF1aXJlKGAuL2RvbWFpbnMvJHthcGlOYW1lfWApXG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcmVkRG9tYWluc1thcGlOYW1lXSA9IG5ldyBEb21haW4odGhpcy5jbGllbnQsIGFjdG9ySWQpXG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGByZWdpc3RlcmVkICR7YXBpTmFtZX0gd2l0aCBhY3RvciBpZCAke2FjdG9ySWR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RlcmVkRG9tYWluc1thcGlOYW1lXVxuICAgIH1cbn1cbiJdfQ==