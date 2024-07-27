import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'promotion' })
export class Promotion {

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

    @Column({ type: 'float' })
    price: number

    @Column({ type: 'float', default: 0 })
    max_price: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date

    @Column({ type: 'datetime', nullable: true })
    end_date: Date

    @Column({ type: 'int', default: 0 })
    views: number

    @Column({ type: 'boolean', default: false })
    publish: boolean

    @Column({ type: 'int', default: 0 })
    important: number

    @Column({ type: 'simple-array', nullable: true })
    relevant_promotion: string[]

}
