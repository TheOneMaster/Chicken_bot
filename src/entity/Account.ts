import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Region } from "../riotAPI/types"


@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    puuid: string

    @Column()
    accountName: string

    @Column()
    password: string

    @Column({
        type: "simple-enum",
        enum: ["na", "eu", "ap", "latam", "br", "kr"],
    })
    region: Region

}
