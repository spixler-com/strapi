import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import LeftMenuLink from '../../LeftMenu/LeftMenuLink'

const SubMenus = ({ openMenu, title, links }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="submenu-section">
      <h5
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: openMenu ? 'block' : 'none' }}
      >
        {isOpen ? '\u25BE' : '\u25B8'} {title}
      </h5>
      <ul style={{ display: openMenu && isOpen ? 'block' : 'none' }}>
        {links.map((link) => (
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
    </div>
  )
}

SubMenus.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
}

export default memo(SubMenus)
