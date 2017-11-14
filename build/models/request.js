'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actor = require('../actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Request extends _actor2.default {
    constructor(client, event) {
        super(client, event.actor);

        this.startedDateTime = event.startedDateTime;
        this.timeStamp = event.timeStamp;
        this.url = event.url;
        this.method = event.method;
        this.isXHR = event.isXHR;
        this.fromCache = event.fromCache;
        this.cause = event.cause;
        this.private = event.private;

        // this.on('networkEventUpdate', ::this.onUpdate)
    }

    /**
     * Retrieve the request headers from the given NetworkEventActor.
     */
    getRequestHeaders() {
        return this.request('getRequestHeaders');
    }

    /**
     * Retrieve the request cookies from the given NetworkEventActor.
     */
    getRequestCookies() {
        return this.request('getRequestCookies');
    }

    /**
     * Retrieve the request post data from the given NetworkEventActor.
     */
    getRequestPostData() {
        return this.request('getRequestPostData');
    }

    /**
     * Retrieve the response headers from the given NetworkEventActor.
     */
    getResponseHeaders() {
        return this.request('getResponseHeaders');
    }

    /**
     * Retrieve the response cookies from the given NetworkEventActor.
     */
    getResponseCookies() {
        return this.request('getResponseCookies');
    }

    /**
     * Retrieve the response content from the given NetworkEventActor.
     */
    getResponseContent() {
        return this.request('getResponseContent');
    }

    /**
     * Retrieve the timing information for the given NetworkEventActor.
     */
    getEventTimings() {
        return this.request('getEventTimings');
    }

    getResponseStart() {
        return this.request('getResponseStart');
    }

    onUpdate(e) {
        const type = `on${e.updateType[0].toUpperCase()}${e.updateType.slice(1)}`;
        this.emit(type, e);
    }

    /**
     * Retrieve the security information for the given NetworkEventActor.
     */
    getSecurityInfo() {
        return this.request('getSecurityInfo');
    }
}
exports.default = Request;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvcmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJSZXF1ZXN0IiwiY29uc3RydWN0b3IiLCJjbGllbnQiLCJldmVudCIsImFjdG9yIiwic3RhcnRlZERhdGVUaW1lIiwidGltZVN0YW1wIiwidXJsIiwibWV0aG9kIiwiaXNYSFIiLCJmcm9tQ2FjaGUiLCJjYXVzZSIsInByaXZhdGUiLCJnZXRSZXF1ZXN0SGVhZGVycyIsInJlcXVlc3QiLCJnZXRSZXF1ZXN0Q29va2llcyIsImdldFJlcXVlc3RQb3N0RGF0YSIsImdldFJlc3BvbnNlSGVhZGVycyIsImdldFJlc3BvbnNlQ29va2llcyIsImdldFJlc3BvbnNlQ29udGVudCIsImdldEV2ZW50VGltaW5ncyIsImdldFJlc3BvbnNlU3RhcnQiLCJvblVwZGF0ZSIsImUiLCJ0eXBlIiwidXBkYXRlVHlwZSIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJlbWl0IiwiZ2V0U2VjdXJpdHlJbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRWUsTUFBTUEsT0FBTix5QkFBNEI7QUFDdkNDLGdCQUFhQyxNQUFiLEVBQXFCQyxLQUFyQixFQUE0QjtBQUN4QixjQUFNRCxNQUFOLEVBQWNDLE1BQU1DLEtBQXBCOztBQUVBLGFBQUtDLGVBQUwsR0FBdUJGLE1BQU1FLGVBQTdCO0FBQ0EsYUFBS0MsU0FBTCxHQUFpQkgsTUFBTUcsU0FBdkI7QUFDQSxhQUFLQyxHQUFMLEdBQVdKLE1BQU1JLEdBQWpCO0FBQ0EsYUFBS0MsTUFBTCxHQUFjTCxNQUFNSyxNQUFwQjtBQUNBLGFBQUtDLEtBQUwsR0FBYU4sTUFBTU0sS0FBbkI7QUFDQSxhQUFLQyxTQUFMLEdBQWlCUCxNQUFNTyxTQUF2QjtBQUNBLGFBQUtDLEtBQUwsR0FBYVIsTUFBTVEsS0FBbkI7QUFDQSxhQUFLQyxPQUFMLEdBQWVULE1BQU1TLE9BQXJCOztBQUVBO0FBQ0g7O0FBRUQ7OztBQUdBQyx3QkFBcUI7QUFDakIsZUFBTyxLQUFLQyxPQUFMLENBQWEsbUJBQWIsQ0FBUDtBQUNIOztBQUVEOzs7QUFHQUMsd0JBQXFCO0FBQ2pCLGVBQU8sS0FBS0QsT0FBTCxDQUFhLG1CQUFiLENBQVA7QUFDSDs7QUFFRDs7O0FBR0FFLHlCQUFzQjtBQUNsQixlQUFPLEtBQUtGLE9BQUwsQ0FBYSxvQkFBYixDQUFQO0FBQ0g7O0FBRUQ7OztBQUdBRyx5QkFBc0I7QUFDbEIsZUFBTyxLQUFLSCxPQUFMLENBQWEsb0JBQWIsQ0FBUDtBQUNIOztBQUVEOzs7QUFHQUkseUJBQXNCO0FBQ2xCLGVBQU8sS0FBS0osT0FBTCxDQUFhLG9CQUFiLENBQVA7QUFDSDs7QUFFRDs7O0FBR0FLLHlCQUFzQjtBQUNsQixlQUFPLEtBQUtMLE9BQUwsQ0FBYSxvQkFBYixDQUFQO0FBQ0g7O0FBRUQ7OztBQUdBTSxzQkFBbUI7QUFDZixlQUFPLEtBQUtOLE9BQUwsQ0FBYSxpQkFBYixDQUFQO0FBQ0g7O0FBRURPLHVCQUFvQjtBQUNoQixlQUFPLEtBQUtQLE9BQUwsQ0FBYSxrQkFBYixDQUFQO0FBQ0g7O0FBRURRLGFBQVVDLENBQVYsRUFBYTtBQUNULGNBQU1DLE9BQVEsS0FBSUQsRUFBRUUsVUFBRixDQUFhLENBQWIsRUFBZ0JDLFdBQWhCLEVBQThCLEdBQUVILEVBQUVFLFVBQUYsQ0FBYUUsS0FBYixDQUFtQixDQUFuQixDQUFzQixFQUF4RTtBQUNBLGFBQUtDLElBQUwsQ0FBVUosSUFBVixFQUFnQkQsQ0FBaEI7QUFDSDs7QUFFRDs7O0FBR0FNLHNCQUFtQjtBQUNmLGVBQU8sS0FBS2YsT0FBTCxDQUFhLGlCQUFiLENBQVA7QUFDSDtBQS9Fc0M7a0JBQXRCZCxPIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWN0b3IgZnJvbSAnLi4vYWN0b3InXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBBY3RvciB7XG4gICAgY29uc3RydWN0b3IgKGNsaWVudCwgZXZlbnQpIHtcbiAgICAgICAgc3VwZXIoY2xpZW50LCBldmVudC5hY3RvcilcblxuICAgICAgICB0aGlzLnN0YXJ0ZWREYXRlVGltZSA9IGV2ZW50LnN0YXJ0ZWREYXRlVGltZVxuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IGV2ZW50LnRpbWVTdGFtcFxuICAgICAgICB0aGlzLnVybCA9IGV2ZW50LnVybFxuICAgICAgICB0aGlzLm1ldGhvZCA9IGV2ZW50Lm1ldGhvZFxuICAgICAgICB0aGlzLmlzWEhSID0gZXZlbnQuaXNYSFJcbiAgICAgICAgdGhpcy5mcm9tQ2FjaGUgPSBldmVudC5mcm9tQ2FjaGVcbiAgICAgICAgdGhpcy5jYXVzZSA9IGV2ZW50LmNhdXNlXG4gICAgICAgIHRoaXMucHJpdmF0ZSA9IGV2ZW50LnByaXZhdGVcblxuICAgICAgICAvLyB0aGlzLm9uKCduZXR3b3JrRXZlbnRVcGRhdGUnLCA6OnRoaXMub25VcGRhdGUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgdGhlIHJlcXVlc3QgaGVhZGVycyBmcm9tIHRoZSBnaXZlbiBOZXR3b3JrRXZlbnRBY3Rvci5cbiAgICAgKi9cbiAgICBnZXRSZXF1ZXN0SGVhZGVycyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldFJlcXVlc3RIZWFkZXJzJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgcmVxdWVzdCBjb29raWVzIGZyb20gdGhlIGdpdmVuIE5ldHdvcmtFdmVudEFjdG9yLlxuICAgICAqL1xuICAgIGdldFJlcXVlc3RDb29raWVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0UmVxdWVzdENvb2tpZXMnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSByZXF1ZXN0IHBvc3QgZGF0YSBmcm9tIHRoZSBnaXZlbiBOZXR3b3JrRXZlbnRBY3Rvci5cbiAgICAgKi9cbiAgICBnZXRSZXF1ZXN0UG9zdERhdGEgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdnZXRSZXF1ZXN0UG9zdERhdGEnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSByZXNwb25zZSBoZWFkZXJzIGZyb20gdGhlIGdpdmVuIE5ldHdvcmtFdmVudEFjdG9yLlxuICAgICAqL1xuICAgIGdldFJlc3BvbnNlSGVhZGVycyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldFJlc3BvbnNlSGVhZGVycycpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgdGhlIHJlc3BvbnNlIGNvb2tpZXMgZnJvbSB0aGUgZ2l2ZW4gTmV0d29ya0V2ZW50QWN0b3IuXG4gICAgICovXG4gICAgZ2V0UmVzcG9uc2VDb29raWVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0UmVzcG9uc2VDb29raWVzJylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgcmVzcG9uc2UgY29udGVudCBmcm9tIHRoZSBnaXZlbiBOZXR3b3JrRXZlbnRBY3Rvci5cbiAgICAgKi9cbiAgICBnZXRSZXNwb25zZUNvbnRlbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdnZXRSZXNwb25zZUNvbnRlbnQnKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSB0aW1pbmcgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBOZXR3b3JrRXZlbnRBY3Rvci5cbiAgICAgKi9cbiAgICBnZXRFdmVudFRpbWluZ3MgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdnZXRFdmVudFRpbWluZ3MnKVxuICAgIH1cblxuICAgIGdldFJlc3BvbnNlU3RhcnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdnZXRSZXNwb25zZVN0YXJ0JylcbiAgICB9XG5cbiAgICBvblVwZGF0ZSAoZSkge1xuICAgICAgICBjb25zdCB0eXBlID0gYG9uJHtlLnVwZGF0ZVR5cGVbMF0udG9VcHBlckNhc2UoKX0ke2UudXBkYXRlVHlwZS5zbGljZSgxKX1gXG4gICAgICAgIHRoaXMuZW1pdCh0eXBlLCBlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBzZWN1cml0eSBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIE5ldHdvcmtFdmVudEFjdG9yLlxuICAgICAqL1xuICAgIGdldFNlY3VyaXR5SW5mbyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldFNlY3VyaXR5SW5mbycpXG4gICAgfVxufVxuIl19