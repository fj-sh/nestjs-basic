import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Timestamp,
  Entity,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'smallint',
    comment: 'ID',
  })
  readonly id: number;

  @Column('varchar', { comment: 'タスク名' })
  name: string;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '最終更新日時' })
  readonly updated_at?: Timestamp;

  constructor(name: string) {
    this.name = name;
  }
}
