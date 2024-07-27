import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";

@Entity({ name: 'doctor' })
export class Doctor {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    cover: string

    @Column({ type: 'text' })
    specialized: string

    @Column({ type: 'text', nullable: true })
    content: string

    @Column({ type: 'boolean', default: false })
    publish: boolean

    @ManyToMany(() => Department)
    @JoinTable({
        name: 'doctor_departments', // Custom join table name
        joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'department_id', referencedColumnName: 'department_id' }
    })
    departments: Department[]
}
