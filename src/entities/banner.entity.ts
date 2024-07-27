import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'banner' })
export class Banner {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    image: string

    @Column({ type: 'text' })
    link: string

    @Column({ type: 'boolean', default: false })
    publish: boolean
}
