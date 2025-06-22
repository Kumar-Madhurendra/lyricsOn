export interface RootObject {
 attributes:    Attributes;
 href:          string;
 id:            string;
 meta:          Meta;
 relationships: Relationships;
 type:          RootObjectType;
}

export interface Attributes {
 albumName:                 string;
 artistName:                string;
 artwork:                   Artwork;
 audioLocale:               string;
 audioTraits:               AudioTrait[];
 composerName?:             string;
 contentRating?:            ContentRating;
 discNumber:                number;
 durationInMillis:          number;
 editorialNotes?:           EditorialNotes;
 genreNames:                string[];
 hasLyrics:                 boolean;
 hasTimeSyncedLyrics:       boolean;
 isAppleDigitalMaster:      boolean;
 isMasteredForItunes:       boolean;
 isVocalAttenuationAllowed: boolean;
 isrc:                      string;
 name:                      string;
 playParams:                PlayParams;
 previews:                  Preview[];
 releaseDate:               Date;
 trackNumber:               number;
 url:                       string;
}

export interface Artwork {
 bgColor:    string;
 hasP3:      boolean;
 height:     number;
 textColor1: string;
 textColor2: string;
 textColor3: string;
 textColor4: string;
 url:        string;
 width:      number;
}

export enum AudioTrait {
 Atmos = "atmos",
 HiResLossless = "hi-res-lossless",
 Lossless = "lossless",
 LossyStereo = "lossy-stereo",
 Spatial = "spatial",
}

export enum ContentRating {
 Clean = "clean",
 Explicit = "explicit",
}

export interface EditorialNotes {
 short: string;
}

export interface PlayParams {
 id:   string;
 kind: Kind;
}

export enum Kind {
 Song = "song",
}

export interface Preview {
 url: string;
}

export interface Meta {
 contentVersion: ContentVersion;
 formerIds?:     string[];
}

export interface ContentVersion {
 MZ_INDEXER: number;
 RTCI:       number;
}

export interface Relationships {
 artists:        Artists;
 "music-videos": MusicVideos;
}

export interface Artists {
 data: Datum[];
 href: string;
}

export interface Datum {
 href: string;
 id:   string;
 type: DatumType;
}

export enum DatumType {
 Artists = "artists",
 MusicVideos = "music-videos",
}

export interface MusicVideos {
 data:  Datum[];
 href:  string;
 next?: string;
}

export enum RootObjectType {
 Songs = "songs",
}
