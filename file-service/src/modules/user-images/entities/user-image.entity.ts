import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('user_images')
export class UserImage {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({unique: true})
    filepath : string;

    @Column()
    filename: string;

    @Column()
    owner_id : string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
