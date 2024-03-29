import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useCallback, useState, useRef } from "react";
import { useAsync } from "react-async-hook";
import API from "../api";

/**
 * Hook that has a semantic guarantee for exactly one value at any time,
 * something useMemo doesn't guarantee
 * @param {} fn
 */
const useConstant = (fn = () => {}) => {
  const ref = useRef();
  if (!ref.current) {
    ref.current = { value: fn() };
  }
  return ref.current.value;
};

/**
 * Custom hook for handling input and validating against the API
 * @param {string} initialValue Initial value to be set as input value
 */
const useDeliveryInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [address, setAddress] = useState(null);

  const geoCodeRequest = useCallback((searchVal = "") => {
    API.geocode({
      address: searchVal,
    }).then((response) => {
      if (!response.error) {
        setIsValid(true);
        setAddress(response);
      } else {
        setIsValid(false);
      }
    });
  }, []);

  const onBlur = () => {
    if (value.length !== 0) {
      geoCodeRequest(value);
    }
  };

  const reset = () => {
    setValue("");
    setIsValid(false);
    setAddress(null);
  };

  const debouncedSearch = useConstant((val) =>
    AwesomeDebouncePromise(geoCodeRequest, 1000)
  );

  const searchResult = useAsync(async () => {
    if (value.length === 0) {
      return {};
    }
    return debouncedSearch(value);
  }, [value]);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      setIsValid(false);
    }
  }, []);
  return [value, onChange, isValid, address, onBlur, reset];
};

export default useDeliveryInput;
