import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('connection_status')
export class ConnectionStatus {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    status: string;

    @Column({ type: 'boolean', default: false })
    right_to_comment : boolean;

    @Column({ type: 'boolean', default: true })
    right_to_react : boolean;

    @Column({ type: 'boolean', default: false })
    right_to_message: boolean;

    @Column({ type: 'boolean', default: true })
    right_to_view: boolean;
}