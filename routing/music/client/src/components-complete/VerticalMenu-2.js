import React from 'react';

// NOTE TO READERS: First, Hi! Second: If you're exploring this file, please
// ignore the leanpub-start-insert / leanpub-end-insert statements below. These
// are included to highlight changed lines in the codeblocks in the book.
// Particularly strange are the `leanpub` attributes on `Link`. Regrettably,
// JSX does not have any means for comments to be interweaved with a React
// Element declaration. So, as a hack, these magic statements are actually
// attributes on `Link`. — 😅

import Link from 'react-router/Link';

import '../styles/VerticalMenu.css';

// leanpub-start-insert
const VerticalMenu = ({ albums, albumsPathname }) => (
  // leanpub-end-insert
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {
      albums.map((album) => (
        <Link
          leanpub-start-insert='🐬'
          to={`${albumsPathname}/${album.id}`}
          leanpub-end-insert='🐬'
          className='item'
          key={album.id}
        >
          {album.name}
        </Link>
      ))
    }
  </div>
);

export default VerticalMenu;
