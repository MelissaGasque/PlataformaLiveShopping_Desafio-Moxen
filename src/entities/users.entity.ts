import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Live } from "./live.entity"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 30})
    name: string;

    @Column({length: 256, unique:true})
    email: string;

    @Column({length: 15})
    password: string

    @OneToMany(() => Live, (live) => live.user)
    live: Live[]
}