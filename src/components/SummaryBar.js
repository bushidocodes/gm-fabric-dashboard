import filesize from 'filesize';
import ms from 'ms';
import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getLatestAttribute, getAttributeForSparkline, getAttributeChangesForSparkline } from '../utils';
import SummaryBarCard from './SummaryBarCard';
import { getBasename } from '../utils';

SummaryBar.propTypes = {
  finagle: PropTypes.object,
  http: PropTypes.object,
  interval: PropTypes.number,
  jvm: PropTypes.object,
  pathname: PropTypes.string,
  threads: PropTypes.object
};

function SummaryBar({ finagle, http, interval, jvm, pathname, route, threads }) {
  const httpRequests = getLatestAttribute(http, 'requests');
  const successResponses = getLatestAttribute(http, 'success');
  const successRate = successResponses ? Math.round(successResponses / httpRequests * 100) : 100;
  return (
    <div className="summary-bar-container">
      <div
        className="uk-grid-collapse uk-grid-match uk-flex-center uk-child-width-small"
        data-uk-grid
        id="summary-bar"
      >
        <SummaryBarCard
          href={`${getBasename() || '/'}`}
          isActive={pathname === `${getBasename() || '/'}`}
          lineOne={ms(getLatestAttribute(jvm, 'uptime'))}
          tabIndex={1}
          title="Uptime"
        />
        {http &&
          // The HTTP card displays if the HTTP object exists in Redux
          <SummaryBarCard
            href={`${getBasename()}/http`}
            isActive={pathname === `${getBasename()}/http`}
            lineOne={`${String(httpRequests).replace(/(.)(?=(\d{3})+$)/g, '$1,')} - ${successRate}%`}
            tabIndex={2}
            title="HTTP"
          />
        }
        {route &&
          // The Route card displays if the route object exists in Redux
          <SummaryBarCard
            href={`${getBasename()}/route`}
            isActive={pathname.indexOf(`${getBasename()}/route`, 0) !== -1}
            lineOne={route ? Object.keys(route).length : 0}
            tabIndex={3}
            title="Routes"
          />
        }
        {(jvm || threads) &&
          // The Thread card displays if the metrics store has the thread.count from the jvm or the threads object
          // If it has the thread count, but not the detailed threads object, it is treated as part of /jvm
          <SummaryBarCard
            chartData={getAttributeForSparkline(jvm, 'thread.count')}
            href={threads ? `${getBasename()}/threads` : `${getBasename()}/jvm`}
            isActive={threads ? pathname === `${getBasename()}/threads` : pathname === `${getBasename()}/jvm`}
            lineOne={getLatestAttribute(jvm, 'thread.count')}
            tabIndex={4}
            title="Threads"
          />
        }
        {jvm &&
          <SummaryBarCard
            chartData={getAttributeForSparkline(jvm, 'mem.current.used')}
            href={`${getBasename()}/jvm`}
            isActive={pathname === `${getBasename()}/jvm`}
            lineOne={filesize(getLatestAttribute(jvm, 'mem.current.used'))}
            tabIndex={5}
            title="Memory Used"
          />
        }
        {jvm &&
          <SummaryBarCard
            chartData={getAttributeChangesForSparkline(jvm, 'gc.msec')}
            href={`${getBasename()}/jvm`}
            isActive={pathname === `${getBasename()}/jvm`}
            lineOne={ms(getLatestAttribute(jvm, 'gc.msec'))}
            tabIndex={6}
            title="Garbage Col."
          />
        }
        {finagle &&
          <SummaryBarCard
            href={`${getBasename()}/finagle`}
            isActive={pathname === `${getBasename()}/finagle`}
            lineOne={`${getLatestAttribute(finagle, 'futurePool.activeTasks')} Active`}
            lineTwo={`${getLatestAttribute(finagle, 'timer.pendingTasks.count')} Pending`}
            tabIndex={7}
            title="Finagle"
          />
        }
        <SummaryBarCard
          href={`${getBasename()}/json`}
          isActive={pathname === `${getBasename()}/json`}
          lineOne={`{ ... }`}
          tabIndex={8}
          title="JSON"
        />
        <SummaryBarCard
          href={`${getBasename()}/settings`}
          isActive={pathname === `${getBasename()}/settings`}
          lineOne={ms(interval)}
          tabIndex={9}
          title="Settings"
        />
      </div >
    </div >
  );
}

function mapStateToProps({ metrics: { finagle, http, jvm, route, threads }, routing: { locationBeforeTransitions: { pathname } }, settings: { interval } }) {
  return { finagle, http, interval, jvm, pathname, route, threads };
};

export default connect(mapStateToProps)(SummaryBar);