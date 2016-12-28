import React, { Component } from 'react';

// leanpub-start-insert
import Match from 'react-router/Match';
// leanpub-end-insert

import Album from './Album-1';
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
        <div className='ui two column divided grid'>
          <div
            className='ui six wide column'
            style={{ maxWidth: 250 }}
          >
          {/* leanpub-start-insert */}
            <VerticalMenu
              albums={this.state.albums}
            />
          {/* leanpub-end-insert */}
          </div>
          <div className='ui ten wide column'>
            {/* leanpub-start-insert */}
            <Match
              pattern='/albums/:albumId'
              render={({ params }) => {
                const album = this.state.albums.find(
                  (a) => a.id === params.albumId
                );
                return (
                  <Album
                    album={album}
                  />
                );
              }}
            />
            {/* leanpub-end-insert */}
          </div>
        </div>
      );
    }
  }
}

export default AlbumsContainer;
