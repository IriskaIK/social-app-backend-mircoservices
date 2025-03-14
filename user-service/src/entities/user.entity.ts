import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({nullable : true})
    image_id : string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
