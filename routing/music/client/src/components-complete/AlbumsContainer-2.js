import React, { Component } from 'react';

import Match from 'react-router/Match';

import Album from './Album';
import VerticalMenu from './VerticalMenu-1';
import { client } from '../Client';

const ALBUM_IDS = [
  '23O4F21GDWiGd33tFN3ZgI',
  '3AQgdwMNCiN7awXch5fAaG',
  '1kmyirVya5fRxdjsPFDM05',
  '6ymZBbRSmzAvoSGmwAFoxm',
  '4Mw9Gcu1LT7JaipXdwrq1Q',
];

class AlbumsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
      albums: [],
    };

    this.getAlbums = this.getAlbums.bind(this);
  }

  componentDidMount() {
    this.getAlbums();
  }

  getAlbums() {
    client.setToken('D6W69PRgCoDKgHZGJmRUNA');
    client.getAlbums(ALBUM_IDS)
      .then((albums) => (
        this.setState({
          fetched: true,
          albums: albums,
        })
       ));
  }

  render() {
    if (!this.state.fetched) {
      return (
        <div className='ui active centered inline loader' />
      );
    } else {
      return (
// NOTE TO READERS: First, Hi! Second: If you're exploring this file, please
// ignore the leanpub-start-insert / leanpub-end-insert statements below. These
// are included to highlight changed lines in the codeblocks in the book.
// Particularly strange are the `leanpub` attributes on `VerticalMenu`
// and `Album`. Regrettably, JSX does not have any means for comments to be
// interweaved with a React Element declaration. So, as a hack, these magic
// statements are actually attributes on those components — 😅
        <div className='ui two column divided grid'>
          <div
            className='ui six wide column'
            style={{ maxWidth: 250 }}
          >
            <VerticalMenu
              albums={this.state.albums}
              leanpub-start-insert
              albumsPathname={this.props.pathname}
              leanpub-end-insert
            />
          </div>
          <div className='ui ten wide column'>
            <Match
              leanpub-start-insert
              pattern={`${this.props.pathname}/:albumId`}
              leanpub-end-insert
              render={({ params }) => {
                const album = this.state.albums.find(
                  (a) => a.id === params.albumId
                );
                return (
                  <Album
                    album={album}
                    leanpub-start-insert
                    albumsPathname={this.props.pathname}
                    leanpub-end-insert
                  />
                );
              }}
            />
          </div>
        </div>
      );
    }
  }
}

export default AlbumsContainer;
