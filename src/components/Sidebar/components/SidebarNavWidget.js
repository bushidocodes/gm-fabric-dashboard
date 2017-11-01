import { PropTypes } from "prop-types";
import React from "react";
import _ from "lodash";

SidebarNavWidget.propTypes = {
  elementName: PropTypes.string,
  history: PropTypes.object, // used to navigate
  parent: PropTypes.object,
  parentPathIsExternal: PropTypes.bool,
  siblings: PropTypes.array
};

/**
 * Stateless functional component used by fabric/SidebarNavWidget and instance/SidebarNavWidget
 *
 * @param {Object} {
 *   elementName,
 *   history,
 *   parent,
 *   parentPathIsExternal,
 *   siblings = [] //{name, path}
 * }
 * @returns
 */
function SidebarNavWidget({
  elementName,
  history,
  parent, //{name, path}
  parentPathIsExternal,
  siblings = [] //{name, path}
}) {
  return (
    <div className="nav-widget">
      {_.has(parent, "name") &&
        _.has(parent, "path") &&
        (parentPathIsExternal ? (
          <a className="nav-go-up" href={parent.path}>
            <span
              className="icon"
              data-uk-icon={`icon: chevron-left; ratio: 1`}
            />
            <span className="label">{parent.name}</span>
          </a>
        ) : (
          <a
            className="nav-go-up"
            onClick={evt => {
              evt.preventDefault();
              history.push(parent.path);
            }}
          >
            <span
              className="icon"
              data-uk-icon={`icon: chevron-left; ratio: 1`}
            />
            <span className="label">{parent.name}</span>
          </a>
        ))}
      {siblings.length > 0 && (
        <a className="nav-siblings">
          <span className="label">{elementName}</span>
          <span
            className="icon"
            data-uk-icon={`icon: triangle-down; ratio: 1`}
          />
        </a>
      )}
      {siblings.length > 0 && (
        <div
          className="nav-siblings-dropdown"
          data-uk-dropdown="mode: click; pos: bottom-justify; boundary: .nav-widget; boundary-align: true; offset: 1;"
        >
          <ol className="instances">
            {siblings.map(({ name, path }, idx) => (
              <li key={idx}>
                <a
                  onClick={evt => {
                    evt.preventDefault();
                    history.push(path);
                  }}
                >
                  {name}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default SidebarNavWidget;
