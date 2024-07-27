import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'page' })
export class Page {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    route: string

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

    @Column({ type: 'simple-array', nullable: true })
    relevant_doctor: string[]
}
