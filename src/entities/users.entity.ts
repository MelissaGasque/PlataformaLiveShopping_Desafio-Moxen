import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Live } from "./live.entity"
import { getRounds, hashSync } from "bcryptjs"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 30})
    name: string

    @Column({length: 256, unique:true})
    email: string

    @Column({length: 120})
    password: string

    @OneToMany(() => Live, (live) => live.user, { onDelete: "CASCADE" })
    live: Live[]

    @BeforeInsert()
    @BeforeUpdate() 

    hashPassword(){
        const hasRounds: number = getRounds(this.password)
      
        if(!hasRounds){
            this.password = hashSync(this.password, 10) 
        }
    }
}