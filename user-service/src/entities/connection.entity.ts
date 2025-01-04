import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import {User} from "src/entities/user.entity";
import {ConnectionStatus} from "src/entities/connection_status.entity";

@Entity('connection')
export class Connection {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'following_id' })
    following: User;

    @ManyToOne(() => ConnectionStatus, (status) => status.id, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'status_type_id' })
    status: ConnectionStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
