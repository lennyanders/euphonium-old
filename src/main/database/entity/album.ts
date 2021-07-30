// I work with esbuild/vite so emitDecoratorMetadata does not work and I need to define every columns DB type
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Track } from './track';

@Entity('album')
export class Album {
  @PrimaryColumn('text')
  artists: string;

  @PrimaryColumn('text')
  title: string;

  @Column('text', { nullable: true })
  coverPath?: string;

  @Column('integer', { nullable: true })
  coverDateFileModified?: number;

  @OneToMany(() => Track, (track) => track.albumArtists && track.albumTitle)
  tracks?: Track[];
}
