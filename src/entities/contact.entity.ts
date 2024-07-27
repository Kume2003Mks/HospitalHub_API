import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contact' })
export class Contact {

    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    phone: string

    @Column({ type: 'text' })
    detail: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date
}
