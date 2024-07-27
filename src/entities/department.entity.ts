// department.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'department' })
export class Department {
    @PrimaryGeneratedColumn()
    department_id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    TH_name: string;

    @Column({ type: 'text' })
    ShortName: string;
}
