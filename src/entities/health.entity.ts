import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'health' })
export class Health {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'simple-array', nullable: true })
    keywords: string[]

    @Column({ type: 'text', nullable: true })
    content: string

    @Column({ type: 'text' })
    cover: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date

    @Column({ type: 'int', default: 0 })
    views: number

    @Column({ type: 'boolean', default: false })
    publish: boolean

    @Column({ type: 'int', default: 0 })
    important: number
}
