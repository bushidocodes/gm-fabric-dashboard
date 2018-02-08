// importing a single function instead of the whole _
import isEmpty from "lodash/isEmpty";

/**
 * Converts timeseries with time stamps to a string of values without timestamps
 *
 * @param {array} array a timeseries array with time stamps
 * @returns {array}     an array of values
 */
export function numericalTimeSeriesFunc(array) {
  if (array instanceof Array === true && !isEmpty(array)) {
    return array[0].map(cell => cell[1]);
  } else {
    return 0;
  }
}

/**
 * Produces an average of array of values
 *
 * @param {array} array an array of values
 * @returns {number}
 */
export function average(array) {
  if (array instanceof Array === true && !isEmpty(array)) {
    return array.reduce((a, b) => a + b) / array.length;
  } else {
    return 0;
  }
}

/**
 * Produces a median of array of values
 * (if no middle value, average of 2 most central values is returned)
 *
 * @param {array} array an array of values
 * @returns {number}
 */
export function median(array) {
  if (array instanceof Array === true && !isEmpty(array)) {
    const len = array.length;
    let median = 0;
    array.sort();

    if (len % 2 === 0) {
      // if even, average of two middle numbers
      median = (array[len / 2 - 1] + array[len / 2]) / 2;
    } else {
      // if odd, middle number only
      median = array[(len - 1) / 2];
    }
    return median;
  } else {
    return 0;
  }
}

/**
 * Produces a mode(s) of array of values
 * if more than one mode, returns all applicable modes as well as their frequency
 *
 * @param {array} array an array of values
 * @returns {array}     an array that contains mode(s) and frequency value
 */
export function modes(array) {
  if (array instanceof Array === true && !isEmpty(array)) {
    let modes = [];
    let count = [];
    let i;
    let number;
    let maxIndex = 0;

    for (let i = 0; i < array.length; i++) {
      number = array[i];
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
        maxIndex = count[number];
      }
    }

    for (i in count)
      if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
          modes.push(Number(i));
        }
      }

    modes.push({ frequency: maxIndex });

    if (maxIndex > 1) {
      return modes;
    } else {
      modes = "no value occurs more than once";
      return modes;
    }
  } else {
    return 0;
  }
}

/**
 * Produces a string that contains descriptive statistics of the graph
 *
 * @param {array} timeSeries an array of values
 * @param {string} title chart title
 * @returns {string}     returns a string with summary chart statistics
 */
export function screenReaderGraphDescription(timeSeries, title, intl) {
  const numericalTimeSeries = numericalTimeSeriesFunc(timeSeries);

  // We don't have negative values in our charts, thus average of 0 means that all values are 0, aka no meaningful data
  if (average(numericalTimeSeries) > 0) {
    let screenReaderGraphData = {
      median: median(numericalTimeSeries).toFixed(2),
      average: average(numericalTimeSeries).toFixed(2),
      mode: modes(numericalTimeSeries),
      max: numericalTimeSeries.sort()[numericalTimeSeries.length - 1],
      min: numericalTimeSeries.sort()[0],
      dataPoints: numericalTimeSeries.length,
      timeSeries: numericalTimeSeries,
      title
    };

    if (
      typeof screenReaderGraphData.mode !== "string" &&
      screenReaderGraphData.mode.length > 1
    ) {
      screenReaderGraphData = Object.assign({}, screenReaderGraphData, {
        mode: `Mode has frequency of ${
          screenReaderGraphData.mode.pop().frequency
        } and values of ${screenReaderGraphData.mode}`
      });
    }

    return intl.formatMessage(
      {
        id: "GMLineChart.screenReaderGraphDescription.withData",
        defaultMessage:
          "A tabular representation of the {title} chart data: median {median} average {average} mode {mode} maximum {max} minimum {min} number of observations {dataPoints} complete data time series follows {timeSeries}",
        description: "Screen reader description for GMLineChart"
      },
      screenReaderGraphData
    );
  } else {
    return intl.formatMessage({
      id: "GMLineChart.screenReaderGraphDescription.noData",
      defaultMessage: `The average for currently displayed data is equal to 0.`,
      description: "Screen reader description for GMLineChart"
    });
  }
}
