import React from 'react';

// leanpub-start-insert
import Link from 'react-router/Link';
// leanpub-end-insert

import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {/* leanpub-start-insert */}
    {
      albums.map((album) => (
        <Link
          to={`/albums/${album.id}`}
          className='item'
          key={album.id}
        >
          {album.name}
        </Link>
      ))
    }
    {/* leanpub-end-insert */}
  </div>
);

export default VerticalMenu;
