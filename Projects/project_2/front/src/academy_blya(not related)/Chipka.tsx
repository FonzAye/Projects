import { clear, info } from 'console';
import * as React from 'react';
import '../styles/Chipka.css'
import { storage } from './storage';

interface Props {}

interface State {
    id: number
    x: number
    y: number
    storage: ArrayOfRows[]
    newStorage: newArr[]
    name: string
    surname: string
    dateIn: string
    dateOut: string
    thing: string
    lvl: number
    dept: number
}

interface lvl {
    name: string
    surname: string
    dateIn: string
    dateOut: string
    thing: string
}

export interface ArrayOfRows {
    id: number
    X: number
    x: number
    y: number
    lvl1: lvl
    lvl2: lvl
    lvl3: lvl
}

interface newArr {
    id: number
    X: number
    x: number
    y: number
    lvl1?: lvl
    lvl2?: lvl
    lvl3?: lvl
}

class Chipka extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            storage: [],
            newStorage: [],
            name: "",
            surname: "",
            dateIn: "",
            dateOut: "",
            thing: "",
            id: 0,
            lvl: 0,
            dept: 0
        }
        this.handleChange= this.handleChange.bind(this)
        this.moveUp = this.moveUp.bind(this)
        this.moveLeft = this.moveLeft.bind(this)
        this.shell = this.shell.bind(this)
        this.formPut = this.formPut.bind(this)
        this.formGet = this.formGet.bind(this)
        this.get = this.get.bind(this)
        this.check = this.check.bind(this)
        this.searchEmpty = this.searchEmpty.bind(this)
        this.all = this.all.bind(this)
    }

    componentDidMount(){
        this.setState({
            storage: storage
        })
        console.log()
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const name = e.currentTarget.name
        var value = e.currentTarget.value
        if(name === "name") {
            this.setState({
                name: value
            })
        }
        if(name === "surname") {
            this.setState({
                surname: value
            })
        }
        if(name === "thing") {
            this.setState({
                thing: value
            })
        }
        if(name === "dateOut") {
            this.setState({
                dateOut: value
            })
        }
        if(name === "id") {
            this.setState({
                id: parseInt(value)
            })
        }
        if(name === "lvl") {
            if(parseInt(value) > 3){
                alert("incorrect. 3 = max")
            } else {
                this.setState({
                    lvl: parseInt(value)
                })
            }
        }
}

   moveUp(x: number, y: number) {
    const robot = document.getElementById("robot")
        if(robot !== null) {
            robot.style.transform = `translate3d(${x}px, ${y}px, 0)`
            //robot.style.top = "150px"
        }
        this.setState({
            y: y,
            x: x
        })
    }
   moveLeft(x: number, y: number) {
    const robot = document.getElementById("robot")
        if(robot !== null) {
            robot.style.transform = `translate3d(${x}px, ${y}px, 0)`
            //robot.style.top = "150px"
        }
    }
    moveRight() {
        const robot = document.getElementById("robot")
        if(robot !== null) {
            robot.style.transform = `translate3d(120px, 450px, 0)`
            //robot.style.top = "150px"
        }
    }

    deployThingIn(x: number, zIndex: number) {
        const thing = document.getElementById("thing")
        const robot = document.getElementById("robot")
        if(thing !== null && robot !== null) {
            thing.style.transform = `translateX(${x}px)`
            robot.style.zIndex = (zIndex).toString()
            thing.style.visibility = "hidden"
        }
    }
    
    deployThingOut(x: number, zIndex: number) {
        const thing = document.getElementById("thing")
        const robot = document.getElementById("robot")
        if(thing !== null && robot !== null) {
            thing.style.transform = `translateX(0px)`
            robot.style.zIndex = (zIndex).toString()
            thing.style.visibility = "visible"
        }
    }

    shell(id: number, lvl: number) {
        const thing = document.getElementById("thing")
        if(thing !== null) {
            thing.style.visibility = "visible"
            thing.style.transition = "0s"
            thing.style.transform = "translateX(0px)"
        }
        var side: number
        if(id < 7){
            side = -150
        } else {
            side = 150
        }
        this.moveUp(this.state.storage[id-1].X, this.state.storage[id-1].y)
        const moveLeft = () => {
            this.moveLeft(this.state.storage[id-1].x, this.state.storage[id-1].y)
            if(thing !== null) {
            thing.style.transition = "all 3s ease-out"
            }
        }
        setTimeout(moveLeft, 3000)
        setTimeout(() => {
            this.deployThingIn(side, lvl + 1)
        }, 6000)
        // move back
        setTimeout(() => {
            this.moveLeft(this.state.storage[id-1].X, this.state.storage[id-1].y)
        }, 9000);
        setTimeout(() => {
            this.moveUp(this.state.storage[id-1].X, 855)
        }, 12000);
    }

    get(id: number, lvl: number) {
        var side: number
        if(id < 7){
            side = -150
        } else {
            side = 150
        }
        const thing = document.getElementById("thing")
        if(thing !== null) {
            thing.style.visibility = "hidden"
            thing.style.transition = "0s"
            thing.style.transform = `translateX(${side}px)`
        }
        this.moveUp(this.state.storage[id-1].X, this.state.storage[id-1].y)
        const moveLeft = () => {
            this.moveLeft(this.state.storage[id-1].x, this.state.storage[id-1].y)
            if(thing !== null) {
            thing.style.transition = "all 3s ease-out"
            }
        }
        setTimeout(moveLeft, 3000)
        setTimeout(() => {
            this.deployThingOut(side, lvl + 1)
        }, 6000)
        // move back
        setTimeout(() => {
            this.moveLeft(this.state.storage[id-1].X, this.state.storage[id-1].y)
        }, 9000);
        setTimeout(() => {
            this.moveUp(this.state.storage[id-1].X, 855)
        }, 12000);
        setTimeout(() => {
            if(thing !== null) {
                thing.style.visibility = "hidden"
                }
        }, 15000);
    }

    formPut(){
        var nowDate = new Date
        var currArray = this.state.storage
        console.log(currArray)
        var lvl = {
            name: this.state.name,
            surname: this.state.surname,
            dateIn: nowDate.toString(),
            dateOut: this.state.dateOut,
            thing: this.state.thing
        }
        var update = {
            id: this.state.id,
            x: currArray[this.state.id-1].x,
            X: currArray[this.state.id-1].X,
            y: currArray[this.state.id-1].y,
            lvl1: this.state.lvl === 1 ? lvl : currArray[this.state.id-1].lvl1,
            lvl2: this.state.lvl === 2 ? lvl : currArray[this.state.id-1].lvl2,
            lvl3: this.state.lvl === 3 ? lvl : currArray[this.state.id-1].lvl3,
        }
        var lvlX = `lvl${this.state.lvl}`
        if(
            this.state.lvl === 1 && currArray[this.state.id-1].lvl1.name === "" || 
            this.state.lvl === 2 && currArray[this.state.id-1].lvl2.name === "" ||
            this.state.lvl === 3 && currArray[this.state.id-1].lvl3.name === "" 
        ) {
            currArray[this.state.id-1] = update
        console.log(currArray)
        this.shell(this.state.id, this.state.lvl)
        this.setState({
            storage: currArray
        })
        } else {
            alert("This slot is already taken")
        }
        localStorage.setItem("array", JSON.stringify(this.state.storage))
    }

    formGet(){
        var currArray = this.state.storage
        console.log(currArray)
        var lvl = {
            name: "",
            surname: "",
            dateIn: "",
            dateOut: "",
            thing: ""
        }
        var update = {
            id: this.state.id,
            x: currArray[this.state.id-1].x,
            X: currArray[this.state.id-1].X,
            y: currArray[this.state.id-1].y,
            lvl1: this.state.lvl === 1 ? lvl : currArray[this.state.id-1].lvl1,
            lvl2: this.state.lvl === 2 ? lvl : currArray[this.state.id-1].lvl2,
            lvl3: this.state.lvl === 3 ? lvl : currArray[this.state.id-1].lvl3,
        }
        if(
            this.state.lvl === 1 && currArray[this.state.id-1].lvl1.name !== "" || 
            this.state.lvl === 2 && currArray[this.state.id-1].lvl2.name !== "" ||
            this.state.lvl === 3 && currArray[this.state.id-1].lvl3.name !== "" 
        ) {
            currArray[this.state.id-1] = update
        console.log(currArray)
        this.get(this.state.id, this.state.lvl)
        this.setState({
            storage: currArray
        })
        } else {
            alert("It's empty")
        }
        localStorage.setItem("array", JSON.stringify(this.state.storage))
    }

    check(){
        var dateOut: number = new Date(this.state.storage[0].lvl1.dateOut).getTime()
        var dateIn: number = new Date(this.state.storage[0].lvl1.dateIn).getTime()
        var difference =  dateOut - dateIn
        var days = difference / (1000 * 3600 * 24)
        if(days < 0) {
            var dept = days * 3
            this.setState({
                dept: dept,
                dateIn: this.state.storage[0].lvl1.dateIn,
                dateOut: this.state.storage[0].lvl1.dateOut
            })
        } else {
            this.setState({
                dept: 0
            })
        }
    }

    searchEmpty() {
        var z = storage
        this.setState({
            newStorage: z,
            name: "bababa"
        })
        console.log(this.state.name)
        console.log(z)
        console.log(this.state.newStorage)
        for (let i = 0; i < this.state.newStorage.length; i++) {
            const element = this.state.newStorage[i]
            if (this.state.newStorage[i].lvl1?.name === "") {
                this.state.newStorage[i].lvl1 = undefined
            }
            if (this.state.newStorage[i].lvl2?.name === "") {
                delete element.lvl2
            }
            if (this.state.newStorage[i].lvl3?.name === "") {
                delete element.lvl3
            }
        } console.log(this.state.newStorage)
        console.log(this.state.storage)
        console.log("storage: ", storage)
        
    }

    all() {
        var x = localStorage.getItem('array')
        if (x != null) {
            this.setState({
                newStorage: JSON.parse(x)
            })
        }
    }
    
    render() {
        return (
            <div>
                <div className="control">
                    <div className="inputFieldsIn">
                        In
                      <input type="text" name="name"onChange={this.handleChange} placeholder="name"/>
                      <input type="text" name="surname"onChange={this.handleChange}placeholder="surname"/>
                        <input type="text" name="thing" onChange={this.handleChange} placeholder="thing" />
                        <p>Date Out</p>
                      <input type="date" name="dateOut"onChange={this.handleChange}placeholder="date out"/>
                      <input type="text" name="id"onChange={this.handleChange} placeholder="shelf"/>
                      <input type="text" name="lvl"onChange={this.handleChange}id="lvl" placeholder="etage"/>
                      <p></p>
                      <button onClick={()=>{
                          this.formPut()
                      }}>Save and Start</button>
                    </div>
                    <div className="inputFieldsOut">
                        Out
                      <input type="text" name="id"onChange={this.handleChange}placeholder="shelf"/>
                      <input type="text" name="lvl"onChange={this.handleChange}id="lvl"placeholder="etage"/>
                      <p></p>
                      <button onClick={()=>{
                          this.formGet()
                      }}>Save and Start</button>
                    </div>
                    <div className="deptCalc">
                        Dept
                        <input type="text" name="id"onChange={this.handleChange}placeholder="shelf"/>
                        <input type="text" name="lvl"onChange={this.handleChange}id="lvl"placeholder="etage"/>
                        <input type="text" name="dept" value={this.state.dept} />
                        <p>Here we check the zadolzhennost' of the thing in the shelf. It is calculated by the amount of days multiplied by 3 ( 3 usd(or any other currancy) for 1 day s)</p>
                        <button onClick={this.check}>Check</button>
                    </div>
                </div>
                <div className="info_table" id="info_table">
                    <div className="table">
                        <button onClick={this.searchEmpty}>Hit Me</button>
                        <button onClick={this.all}>AAA</button>
                        {
                            this.state.newStorage.map(el => (
                                <div>
                                    <span>Shelf number {el.id}</span>
                                    <br />
                                    <div>
                                        {el.lvl1 !== undefined ?
                                            <div>
                                                <span>Level 1 : {el.lvl1?.name === "" ?
                                                    "empty" :
                                                    <div>
                                                        <span>Name : {el.lvl1?.name}</span><br />
                                                        <span>Surname : {el.lvl1?.surname}</span><br />
                                                        <span>Date In : {el.lvl1?.dateIn}</span><br />
                                                        <span>Date Out : {el.lvl1?.dateOut}</span><br />
                                                        <span>Thing : <b>{el.lvl1?.thing}</b></span><br />
                                                    </div>
                                                }</span><br /></div>
                                            :
                                            <div></div>
                                        }
                                        
                                        </div>
                                        <div>
                                        {el.lvl2 !== undefined ?
                                            <div>
                                                <span>Level 2 : {el.lvl2?.name === "" ?
                                                    "empty" :
                                                    <div>
                                                        <span>Name : {el.lvl2?.name}</span><br />
                                                        <span>Surname : {el.lvl2?.surname}</span><br />
                                                        <span>Date In : {el.lvl2?.dateIn}</span><br />
                                                        <span>Date Out : {el.lvl2?.dateOut}</span><br />
                                                        <span>Thing : <b>{el.lvl2?.thing}</b></span><br />
                                                    </div>
                                                }</span><br /></div>
                                            :
                                            <div></div>
                                        }
                                        </div>
                                        <div>
                                        {el.lvl3 !== undefined ?
                                            <div>
                                                <span>Level 3 : {el.lvl3?.name === "" ?
                                                    "empty" :
                                                    <div>
                                                        <span>Name : {el.lvl3?.name}</span><br />
                                                        <span>Surname : {el.lvl3?.surname}</span><br />
                                                        <span>Date In : {el.lvl3?.dateIn}</span><br />
                                                        <span>Date Out : {el.lvl3?.dateOut}</span><br />
                                                        <span>Thing : <b>{el.lvl3?.thing}</b></span><br />
                                                    </div>
                                                }</span><br /></div>
                                            :
                                            <div></div>
                                        }
                                        
                                        </div>
                                    <hr/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="storage">
                    <button onClick={() => {
                        var a = document.getElementById("info_table")
                        if (a !== null) {
                            if (a.style.visibility === "visible") {
                                a.style.visibility = "hidden"
                            } else {
                                a.style.visibility = "visible"
                            }
                            
                        }
                    }}>Info</button>
                    <div className="robot" id="robot">
                        <div className="thing" id="thing"></div>
                    </div>
                    {/*SHELL 1*/}
                    <div className="shelf1">
                        <div className="lvl1_1"></div>
                        <div className="lvl2_1"></div>
                        <div className="lvl3_1"></div>
                        <div className="lvl3_cover_left"></div>
                    </div>
                        
                    {/*SHELL 2*/}
                    <div className="shelf2">
                        <div className="lvl1_2"></div>
                        <div className="lvl2_2"></div>
                        <div className="lvl3_2"></div>
                        <div className="lvl3_cover_left"></div>
                    </div>
                    {/*SHELL 3*/}
                    <div className="shelf3">
                        <div className="lvl1_3"></div>
                        <div className="lvl2_3"></div>
                        <div className="lvl3_3"></div>
                        <div className="lvl3_cover_left"></div>
                    </div>
                    {/*SHELL 4*/}
                    <div className="shelf4">
                        <div className="lvl1_4"></div>
                        <div className="lvl2_4"></div>
                        <div className="lvl3_4"></div>
                        <div className="lvl3_cover_left"></div>
                    </div>
                    {/*SHELL 5*/}
                    <div className="shelf5">
                        <div className="lvl1_5"></div>
                        <div className="lvl2_5"></div>
                        <div className="lvl3_5"></div>
                        <div className="lvl3_cover_left"></div>
                    </div>
                    {/*SHELL 6*/}
                    <div className="shelf6">
                        <div className="lvl1_6"></div>
                        <div className="lvl2_6"></div>
                        <div className="lvl3_6"></div>
                        <div className="lvl3_cover_left"></div>
                    </div>
                    <div id="shelfs7-12">
                    {/*SHELL 7*/}
                    <div className="shelf7">
                        <div className="lvl1_7"></div>
                        <div className="lvl2_7"></div>
                        <div className="lvl3_7"></div>
                        <div className="lvl3_cover_right"></div>
                    </div>
                        
                    {/*SHELL 8*/}
                    <div className="shelf8">
                        <div className="lvl1_8"></div>
                        <div className="lvl2_8"></div>
                        <div className="lvl3_8"></div>
                        <div className="lvl3_cover_right"></div>
                    </div>
                    {/*SHELL 9*/}
                    <div className="shelf9">
                        <div className="lvl1_9"></div>
                        <div className="lvl2_9"></div>
                        <div className="lvl3_9"></div>
                        <div className="lvl3_cover_right"></div>
                    </div>
                    {/*SHELL 10*/}
                    <div className="shelf10">
                        <div className="lvl1_10"></div>
                        <div className="lvl2_10"></div>
                        <div className="lvl3_10"></div>
                        <div className="lvl3_cover_right"></div>
                    </div>
                    {/*SHELL 11*/}
                    <div className="shelf11">
                        <div className="lvl1_11"></div>
                        <div className="lvl2_11"></div>
                        <div className="lvl3_11"></div>
                        <div className="lvl3_cover_right"></div>
                    </div>
                    {/*SHELL 12*/}
                    <div className="shelf12">
                        <div className="lvl1_12"></div>
                        <div className="lvl2_12"></div>
                        <div className="lvl3_12"></div>
                        <div className="lvl3_cover_right"></div>
                    </div>
                    </div>
                </div>
                {this.state.storage.map((thing)=> (
            <p key={thing.id}>{JSON.stringify(thing)}</p>
    ))}
            </div>
        )
    }
}

export default Chipka