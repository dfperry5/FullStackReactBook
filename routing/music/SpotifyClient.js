/* eslint-disable prefer-template, new-cap */
import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import camelcaseKeys from 'camelcase-keys';

const getFirstImageUrl = (images) => (
  images && images[0] && images[0].url
);

// Makes the artist page more interesting by removing albums that are dupes
// like deluxe editions, remasters, etc.
const filterDupes = (albums) => (
  albums.reduce((memo, album) => {
    if (!memo.find((m) => m.name === album.name)) {
      return memo.concat(album);
    } else {
      return memo;
    }
  }, [])
);

const BASE_URI = 'https://api.spotify.com/v1';

function get(url) {
  return fetch(url, {
    method: 'get',
    headers: {
      accept: 'application/json',
    },
  }).then(checkStatus)
    .then(parseJson)
    .then((data) => camelcaseKeys(data, { deep: true }));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

function parseAlbum(album) {
  return {
    id: album.id,
    tracks: album.tracks && album.tracks.items.map((i) => parseTrack(i)),
    artist: parseArtist(album.artists[0]),
    year: album.releaseDate && album.releaseDate.slice(0, 4),
    imageUrl: getFirstImageUrl(album.images),
    name: album.name.replace(/\s\(.+\)$/, ''),
  };
}

function parseArtist(artist) {
  return {
    imageUrl: getFirstImageUrl(artist.images),
    name: artist.name,
    id: artist.id,
  };
}

function parseTrack(track) {
  return {
    albumImage: track.album && getFirstImageUrl(track.album.images),
    name: track.name,
    durationMs: track.durationMs,
    id: track.id,
    trackNumber: track.trackNumber,
    previewUrl: track.previewUrl,
  };
}

export function getAlbum(albumId) {
  return get(
    BASE_URI + '/albums/' + albumId
  ).then((data) => parseAlbum(data));
}

export function getAlbums(albumIds) {
  return get(
    BASE_URI + '/albums?ids=' + albumIds.join(',')
  ).then((data) => (
    data.albums.map((a) => parseAlbum(a))
  ));
}

export function getArtist(artistId) {
  return get(
    BASE_URI + '/artists/' + artistId
  ).then((data) => parseArtist(data));
}

export function getArtistTopTracks(artistId) {
  const url = URI(
    BASE_URI + '/artists/' + artistId + '/top-tracks'
  ).query({ country: 'us' });

  return get(url).then((data) => (
    data.tracks.map((t) => parseTrack(t))
  ));
}

export function getArtistAlbums(artistId) {
  const url = (
    BASE_URI + '/artists/' + artistId + '/albums?album_type=album'
  );

  return get(url).then((data) => (
    data.items.map((a) => parseAlbum(a))
  ));
}

export function getArtistAlbumsDetailed(artistId) {
  return this.getArtistAlbums(artistId)
           .then((albums) => this.getAlbums(
             albums.map((a) => a.id)
           ));
}

export function getArtistDetailed(artistId) {
  return Promise.all([
    this.getArtist(artistId),
    this.getArtistTopTracks(artistId),
    this.getArtistAlbumsDetailed(artistId),
  ]).then(([ artist, topTracks, albums ]) => ({
    artist,
    topTracks,
    albums: filterDupes(albums),
  }));
}

const SpotifyClient = {
  getAlbum,
  getAlbums,
  getArtist,
  getArtistTopTracks,
  getArtistAlbums,
  getArtistAlbumsDetailed,
  getArtistDetailed,
};

export default SpotifyClient;
