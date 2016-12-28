import React from 'react';

import Link from 'react-router/Link';

import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums, albumsPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {
      albums.map((album) => (
        <Link
          leanpub-start-insert
          to={`${albumsPathname}/${album.id}`}
          key={album.id}
        >
        {
          ({ onClick, href, isActive }) => (
            <a
              className={isActive ? 'active item' : 'item'}
              onClick={onClick}
              href={href}
            >
              {album.name}
            </a>
          )
        }
        {/* leanpub-end-insert */}
        </Link>
      ))
    }
  </div>
);

export default VerticalMenu;
