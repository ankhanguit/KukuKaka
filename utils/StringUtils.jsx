import {REGEX_NUMBER} from '../constants/Constant';

export function isEmpty(data) {
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

export function isDigit(value) {
  if (value === null) {
    return false;
  } else if (REGEX_NUMBER.test(value)) {
    return true;
  }
  return false;
}

export function convertNumber(value) {
  try {
    return Number.parseFloat(value);
  } catch(e) {
    return 0;
  }
}


export function getAge(strdate) {
  if (strdate == null) {
    return '';
  }
  let today = new Date();
  let date = new Date(strdate.slice(0, 10));
  let intBuf = today.getFullYear() - date.getFullYear();
  if (date.getMonth() > today.getMonth()) {
    intBuf = intBuf - 1;
  } else if (date.getMonth() > today.getMonth()) {
    if (date.getDate() > today.getDate()) {
      intBuf = intBuf - 1;
    }
  }
  return intBuf;
}

export function formatNumber(value, fix = 2) {
  let n = parseFloat(value);
  return n.toFixed(fix).replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0)  ? ',' + c  : c;
  });
}

export function addLeaderZero(value, size) {
    let s = value + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export function formatDate(value, pattern, time = false) {
  let isIE = /*@cc_on!@*/false || !!document.documentMode;
  let isEdge = !isIE && !!window.StyleMedia;
  let date;

  if (time) {
    date = new Date(value);
  } else {
    if (isIE || isEdge) {
      date = new Date(value.replace(/\-/g, "/"));
    } else {
      date = new Date(value.replace(/\-/g, "/").replace(/[TZ]/g," "));
    }
  }

  let str = pattern.replace('yyyy', date.getFullYear());
  str = str.replace('MM', addLeaderZero(date.getMonth() + 1, 2));
  str = str.replace('dd', addLeaderZero(date.getDate(), 2));
  str = str.replace('HH', addLeaderZero(date.getHours(), 2));
  str = str.replace('mm', addLeaderZero(date.getMinutes(), 2));
  str = str.replace('ss', addLeaderZero(date.getSeconds(), 2));
  return str;
}

export function emptyString(value) {
  if (value == null) {
    return '';
  }
  return value;
}

export function checkInput1Byte(value) {
  return chrChkText(value, "0123456789");
}

export function chrChkText(value, arrChar) {
  for (let i = 0; i < value.length; i++) {
    if (!arrChar.includes(value[i])) {
      return value.substring(0, i);
    }
  }
  return value;
}


export function polyfillForIE() {
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
        'use strict';
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        let list = Object(this);
        let length = list.length >>> 0;
        let thisArg = arguments[1];

        for (let i = 0; i !== length; i++) {
          if (predicate.call(thisArg, this[i], i, list)) {
            return this[i];
          }
        }
        return undefined;
      }
    });
  }
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        let o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        let len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        let n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          // NOTE: === provides the correct "SameValueZero" comparison needed here.
          if (o[k] === searchElement) {
            return true;
          }
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }

  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
}

export function sortDescending(a, b) {
  return (a > b) ? -1 : ((b > a) ? 1 : 0);
}

export function trimData(value) {
  if(isNullOrUndefined(value)) {
    return '';
  } else {
    let str = value.toString();
    return str.trim();
  }
}
export function isNullOrUndefined(value) {
  if(typeof(value) === 'undefined' || value === null) {
    return true;
  }
  return false;
}
