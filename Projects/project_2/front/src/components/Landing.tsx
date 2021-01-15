import React from "react"
import Axios from 'axios'
import Header from './Header';
import TableElement from './TableElement';
import '../styles/App.css'
import { AddElement } from './AddElement';
import ChangeElement from './ChangeElement';
import Login from "./Login";
import { Register } from "./Register";


interface Props {
  isLoggedIn: boolean
}

interface State {
    projectKey: number
    id: number
    currInd: number
    author: string
    theme: string
    description: string
    isLoading: boolean
    number: number
    popClass_add: string
    popClass_change: string
    popClass_login: string
    popClass_register: string
    arrayOfRows: ArrayOfRows[]
    loggedIn: boolean
    login: string
    userId: number
  LikeDislikeArray: LikeDislikeArray[]
  arr3: arr3[]
}

export interface ArrayOfRows {
    projectKey: number
    id: number
    author: string
    theme: string
    description: string
}

interface Row {
  id?: number
  author: string
  theme: string
  description: string
}

export interface LikeDislikeArray {
  projectKey: number
  userId: number
  status: string
}

export interface arr3 {
  projectKey: number
  id: number
  author: string
  theme: string
  description: string
  like: number
  dislike: number
}
class Landing extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            projectKey: 0,
            id: 0,
            currInd: 0,
            author: "",
            theme: "",
            description: "",
            isLoading: false,
            number: 1,
            popClass_add: "",
            popClass_change: "",
            popClass_login: "",
            popClass_register: "",
            arrayOfRows: [],
            loggedIn: props.isLoggedIn,
            login: "",
            userId: 0,
          LikeDislikeArray: [],
            arr3: []
        }
        this.handleShow_add = this.handleShow_add.bind(this)
        this.handleShow_change = this.handleShow_change.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.mount = this.mount.bind(this)
      this.handleShow_login = this.handleShow_login.bind(this)
      this.handleShow_register = this.handleShow_register.bind(this)
    }

  componentDidMount() {
    var userId = 0
    Axios.defaults.withCredentials = true
    Axios.get("http://localhost:4000/api/login") // чекаю, залогинен ли юзер
      .then((response) => {
        if (response.data.loggedIn) {
          this.setState({
            loggedIn: true,
            login: response.data.user,
            userId: response.data.userId
          })
          userId = response.data.userId
          console.log(response.data.user)
        } else {
          console.log("not logged in " + response.data.user)
        }
      })
    Axios.get("http://localhost:4000/api/projects/loadAll") // загружаю все проекты из бд
      .then(response => {
        const data = JSON.stringify(response.data.result)
        const arrayOfRows = JSON.parse(data)
        localStorage.setItem('ArrayOfRows', data)
        this.setState({
          arrayOfRows: arrayOfRows
        })
      })
    Axios.get("http://localhost:4000/api/projects/loadlikeDislike") // загружаю все лайки или дизлайки
      .then((response) => {
        const data = JSON.stringify(response.data.result)
        const likeDislikeArray = JSON.parse(data)
        this.setState({
          LikeDislikeArray: likeDislikeArray
        })
        const arr1: ArrayOfRows[] = this.state.arrayOfRows
        const arr2: LikeDislikeArray[] = this.state.LikeDislikeArray
        const arr3: arr3[] = []
        for (let i = 0; i < arr1.length; i++) {  // тут что-то сложное.. из бд собираем все количество лайков и дизлайков и составляем новый 
          var like: number = 0                   // массив с данными по каждому проекту в отдельном елементе массива: projectKey, id, authoer, theme, descripion, like, dislike
          var dislike: number = 0
          for (let k = 0; k < arr2.length; k++) {
            if (arr1[i].projectKey === arr2[k].projectKey && arr2[k].status === "like") {
              like++
            }
            if (arr1[i].projectKey === arr2[k].projectKey && arr2[k].status === "dislike") {
              dislike++
            }
          }
          const element: arr3 = {
            projectKey: arr1[i].projectKey,
            id: arr1[i].id,
            author: arr1[i].author,
            theme: arr1[i].theme,
            description: arr1[i].description,
            like: like,
            dislike: dislike
          }
          arr3.push(element)
        }
        const aaa = JSON.stringify(arr3)
        localStorage.setItem('aaa', aaa)
        this.setState({ arr3: arr3 })
        for (let i = 0; i < arr2.length; i++) { // тута мы проверям, каким проектам оставлял оценки конкретный юзер, который залогинился
          const element = arr2[i]
          if (element.userId === userId && element.status === "like") {
            var a = document.getElementById(`like${element.projectKey}`)
            if (a !== null) {
              a.style.color = "red"
            }
          } else if (element.userId === userId && element.status === "dislike") {
            var a = document.getElementById(`dislike${element.projectKey}`)
            if (a !== null) {
              a.style.color = "red"
            }
          } else {
            var a = document.getElementById(`dislike${element.projectKey}`)
            var b = document.getElementById(`like${element.projectKey}`)
            if (a !== null && b !== null) {
              a.style.color = "inherit"
              b.style.color = "violet"
            }
          }
        }
      })
    console.log("mounted")
  }

    // Method to add a new element
    handleAdd() {
      let newRow: Row = {
        id: this.state.arrayOfRows.length + 1,
        author: this.state.login,
        theme: this.state.theme,
        description: this.state.description
      }
      Axios.post("http://localhost:4000/api/projects/add", {
        project: newRow
      }).then((response) => {
        console.log(response)
      })
      this.mountAll()
      //let someArray: ArrayOfRows[] = this.state.arrayOfRows
      //someArray.push(newRow)
      //const editedArray: string = JSON.stringify(someArray) 
      //localStorage.setItem('ArrayOfRows', editedArray)
      //console.log(JSON.stringify(someArray))
    }

  // method to edit the element
    handleEdit() {
      let newRow = {
        id: this.state.currInd,
        author: this.state.author,
        theme: this.state.theme,
        description: this.state.description
      }
      Axios.post("http://localhost:4000/api/projects/edit", {
        id: this.state.currInd,
        author: this.state.author,
        theme: this.state.theme,
        description: this.state.description
      }).then((response) => {
        console.log(response)
      })
      this.mountAll()
    }

  // method to delete an element
    handleDelete() {
      const id = this.state.currInd
      Axios.post("http://localhost:4000/api/projects/delete", {
       id: id
      }).then((response) => {
        console.log(response)
      })
      this.mountAll()
      /*
      const currArr: ArrayOfRows[] = this.state.arrayOfRows
      const ind = this.state.currInd
      const newArr = currArr.splice(ind-1, ind)
      this.setState({
        arrayOfRows: currArr
      })
      const editedArray: string = JSON.stringify(currArr)
      localStorage.setItem('ArrayOfRows', editedArray)*/
    }
    
    // Method to show a popup
    handleShow_add() {
      if (this.state.loggedIn) {
        this.setState({
          theme: "",
          description: ""
        })
        if (this.state.popClass_add === "") {
          this.setState({
            popClass_add: "show"
          })
        } else {
          this.setState({
            popClass_add: ""
          })
        }
        this.componentDidMount()
      } else {
        alert("login or sign up first")
      }
  }

  // method to show the form to change the element
  handleShow_change() { // для активации поп-ап`а
    if(this.state.loggedIn) {
      if (this.state.popClass_change === "") {
        this.setState({
          popClass_change: "show1"
        })
      } else {
        this.setState({
          popClass_change: ""
        })
      }
      this.componentDidMount()
    } else {
      alert("login or sign up first")
    }
  }

  handleShow_login() { // для активации поп-ап`а
      if (this.state.popClass_login === "") {
        this.setState({
          popClass_login: "show1"
        })
      } else {
        this.setState({
          popClass_login: ""
        })
      }
      this.componentDidMount()
  }

  handleShow_register() { // для активации поп-ап`а
      if (this.state.popClass_register === "") {
        this.setState({
          popClass_register: "show1"
        })
      } else {
        this.setState({
          popClass_register: ""
        })
      }
      this.componentDidMount() 
  }

  // Method to keep things in state 
  handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    if(name === "author") {
      this.setState({
        author: value
      })
    } else if(name === "theme") {
      this.setState({
        theme: value
      })
    } else if(name === "description"){
      this.setState({
        description: value
      })
    }
  }
  
  // Method to do smt, I lost track
  handleClick(e: React.MouseEvent<HTMLDivElement>) { // приколюха, чтоб при нажатии на проект в state записывались его данные, чтоб при активации поп-ап`а уже были записаны данные проекта
    const ind: number = e.currentTarget.tabIndex
    const currRow: ArrayOfRows = this.state.arrayOfRows[ind-1]
    this.setState({
      currInd: ind,
      author: currRow.author,
      theme: currRow.theme,
      description: currRow.description
    })
  }

  // Method to help me get a brain tumor
  mount() {  // штука, чтоб после того, как пользователь поставил каку.-то оценку проекту она автоматически добавлялась в базу данных(просто копипаста из componentDidMount)
    var userId = this.state.userId
    Axios.get("http://localhost:4000/api/projects/loadlikeDislike")
      .then((response) => {
        const data = JSON.stringify(response.data.result)
        const likeDislikeArray = JSON.parse(data)
        this.setState({
          LikeDislikeArray: likeDislikeArray
        })
        const arr1: ArrayOfRows[] = this.state.arrayOfRows
        const arr2: LikeDislikeArray[] = this.state.LikeDislikeArray
        const arr3: arr3[] = []
        for (let i = 0; i < arr1.length; i++) {
          var like: number = 0
          var dislike: number = 0
          for (let k = 0; k < arr2.length; k++) {
            if (arr1[i].projectKey === arr2[k].projectKey && arr2[k].status === "like") {
              like++
            }
            if (arr1[i].projectKey === arr2[k].projectKey && arr2[k].status === "dislike") {
              dislike++
            }
          }
          const element: arr3 = {
            projectKey: arr1[i].projectKey,
            id: arr1[i].id,
            author: arr1[i].author,
            theme: arr1[i].theme,
            description: arr1[i].description,
            like: like,
            dislike: dislike
          }
          arr3.push(element)
        }
        const aaa = JSON.stringify(arr3)
        localStorage.setItem('aaa', aaa)
        this.setState({ arr3: arr3 })
        for (let i = 0; i < arr2.length; i++) {
          const element = arr2[i]
          if (element.userId === userId && element.status === "like") {
            var a = document.getElementById(`dislike${element.projectKey}`)
            var b = document.getElementById(`like${element.projectKey}`)
            if (a !== null && b !== null) {
              a.style.color = "inherit"
              b.style.color = "red"
            }
          } else if (element.userId === userId && element.status === "dislike") {
            var a = document.getElementById(`dislike${element.projectKey}`)
            var b = document.getElementById(`like${element.projectKey}`)
            if (a !== null && b !== null) {
              a.style.color = "red"
              b.style.color = "violet"
            }
          } else {
            var a = document.getElementById(`dislike${element.projectKey}`)
            var b = document.getElementById(`like${element.projectKey}`)
            if (a !== null && b !== null) {
              a.style.color = "inherit"
              b.style.color = "violet"
            }
          }
        }
      })
  }

  mountAll() {
    Axios.get("http://localhost:4000/api/projects/loadAll")
      .then(response => {
        const data = JSON.stringify(response.data.result)
        const arrayOfRows = JSON.parse(data)
        localStorage.setItem('ArrayOfRows', data)
        this.setState({
          arrayOfRows: arrayOfRows
        })
      })
  }

    render() {
        return (
            <div>
            <Header 
              handleShow_add={this.handleShow_add}
              handleShow_login={this.handleShow_login}
              handleShow_register={this.handleShow_register}
               loggedIn={this.state.loggedIn}
               login={this.state.login}
            />
            <table className="content-table">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Theme</th>
                  <th>Description</th>
                  <th>Feedback</th>
                  <th>Options</th>
                </tr>
              </thead>
            {this.state.isLoading ? <p>loading...</p> :
             <TableElement 
               data={{
                    data: this.state.arr3,
                    userId: this.state.userId,
                    handleClick: this.handleClick,
                    mount_like: this.mount,
                    likeDislikeArray: this.state.LikeDislikeArray,
                    handleShow_change: this.handleShow_change
               }}
            />
            }
            </table>
            <AddElement 
              data={this.state.arrayOfRows}
              author={this.state.author}
              theme={this.state.theme}
              description={this.state.description}
              handleShow_add={this.handleShow_add}
              popCLass_add={this.state.popClass_add}
              handleAdd={this.handleAdd}
              handleChange={this.handleChange}
              login={this.state.login}
            />            
            <ChangeElement 
              id={this.state.id}
              data={this.state.arrayOfRows}
              author={this.state.author}
              theme={this.state.theme}
              description={this.state.description}
              handleShow_change={this.handleShow_change}
              popCLass_change={this.state.popClass_change}
              handleEdit={this.handleEdit}
              handleChange={this.handleChange}
              handleDelete={this.handleDelete}
              login={this.state.login}
            />
            <Login
              handleShow_login={this.handleShow_login}
              popClass_login={this.state.popClass_login}
            />
            <Register
              handleShow_register={this.handleShow_register}
              popClass_register={this.state.popClass_register}
            />
        </div>
        )
    }
}

export default Landing