/*
 * verifyBeaconSimple handles verifying beacons whose query paramaters do not have repeating keys.
 * properties: object where each value is a string or function
 * params: object where each value is a string or function
 * resources: array of `PerformanceResourceTiming` objects (it may be helpful to run `performance.clearResourceTimings()` before this function or call `slice` on the output of `performance.getEntriesByType('resource')` to get a subset of the resource requests
 */
const verifyBeaconSimple = (properties = {}, params = {}, resources = performance.getEntriesByType('resource')) => {
  return resources.some(resource => {
    const url = new URL(resource.name);
    const propertiesMatch = !Object.entries(properties).some(([k, v]) => {
      const x = url[k];
      return typeof v === 'function' ? !v(x) : v !== x;
    });
    const paramsMatch = !Object.entries(params).some(([k, v]) => {
      const x = url.searchParams.get(k);
      return typeof v === 'function' ? !v(x) : v !== x;
    });
    return propertiesMatch && paramsMatch;
  });
};
