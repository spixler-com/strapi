import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import LeftMenuLink from '../../LeftMenu/LeftMenuLink';
import SubMenus from './SubMenus';

const SpixlerLeftMenuSection = ({ title, links }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  if (title == 'common') {
    return (
      <div className="menu-section">
        <h5 // eslint-disable-line
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '\u2B9F' : '\u27A4'} {title}
        </h5>
        <ul style={{ display: isOpen ? 'block' : 'none' }}>
          {links.map(link => (
            <li key={link.destination}>
              <LeftMenuLink
                location={location}
                iconName={link.icon}
                label={link.label}
                destination={link.destination}
                notificationsCount={link.notificationsCount || 0}
                search={link.search}
              />
            </li>
          ))}
        </ul>
      </div >
    );
  } else {
    let enLink = links['en']
    delete links['en']; 
    links.en = enLink
    return (
      <div className="menu-section">
        <h5 // eslint-disable-line
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '\u2B9F' : '\u27A4'} {title}
        </h5>
        {Object.keys(links).map(language => {
          if (language == 'en') {
            return (
              <ul style={{ display: isOpen ? 'block' : 'none' }}>
                {links['en'].map(link => (
                  <li key={link.destination}>
                    <LeftMenuLink
                      location={location}
                      iconName={link.icon}
                      label={link.label}
                      destination={link.destination}
                      notificationsCount={link.notificationsCount || 0}
                      search={link.search}
                    />
                  </li>
                ))}
              </ul>
            )
          } else {
            return (<SubMenus key={title} openMenu={isOpen} title={language} links={links[language]} />)
          }
        }

        )}
      </div >
    );
  }

};

SpixlerLeftMenuSection.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
};

export default memo(SpixlerLeftMenuSection);
