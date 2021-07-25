// I work with esbuild so emitDecoratorMetadata does not work and I need to define every columns DB type
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('track')
export class Track {
  @PrimaryColumn('text')
  path: string;

  @Column('text')
  fileName: string;

  @Column('integer')
  dateFileModified: number;

  @Column('integer')
  duration: number;

  @Column('integer', { nullable: true })
  number?: number;

  @Column('integer', { nullable: true })
  count?: number;

  @Column('integer', { nullable: true })
  diskNumber?: number;

  @Column('integer', { nullable: true })
  diskCount?: number;

  @Column('integer', { nullable: true })
  year?: number;

  @Column('text', { nullable: true })
  artists?: string;

  @Column('text', { nullable: true })
  title?: string;

  @Column('text', { nullable: true })
  album?: string;

  @Column('text', { nullable: true })
  albumArtists?: string;
}
