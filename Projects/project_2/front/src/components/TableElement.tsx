import React from 'react'
import Axios from 'axios'
import { arr3, LikeDislikeArray } from './Landing'

interface Props { data: {
    data: arr3[]
    userId: number
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void
    mount_like: () => void
    likeDislikeArray: LikeDislikeArray[]
    handleShow_change: () => void
 }   
}

const TableElement: React.FC<Props> = ({ data }) => { // собсна, для каждого проекта из таблицы
    const check = (userId: number, projectKey: number, status: string) => {
        let result: number = 0
        for (let i = 0; i < data.likeDislikeArray.length; i++) {
            const element = data.likeDislikeArray[i]
            if (element.userId === userId && element.projectKey === projectKey && element.status === status) {
                console.log(element.userId + " === " + userId)
                console.log(element.projectKey + " === " + projectKey)
                console.log(element.status + " === " + status)
                result = 1
                break
            } else {
                result = 0
            }
        }
        return result
    }
    const mount = data.mount_like
    return (
        <tbody>
            {
                data.data.map(el => (
                    <tr key={el.projectKey} onClick={data.handleClick} tabIndex={el.id}>
                        <th>{el.author}, {el.projectKey}</th>
                    <th>{el.theme}</th>
                   
                        <th>{el.description}</th>
                        <th>
                            <input type="button" value="Like" id={`like${el.projectKey}`} onClick={() => {
                                if (data.userId !== 0) {
                                    Axios.defaults.withCredentials = true
                                    const check_status: number | undefined = check(data.userId, el.projectKey, "like")
                                    if (check_status === 1) {
                                        let newProject = {
                                            projectKey: el.projectKey,
                                            userId: data.userId,
                                            status: "1337"
                                        }
                                        Axios.post("http://localhost:4000/api/projects/likeDislike", {
                                            newRaw: newProject
                                        }).then((response) => {
                                            console.log(response)
                                        })
                                    } else {
                                        let newProject = {
                                            projectKey: el.projectKey,
                                            userId: data.userId,
                                            status: "like"
                                        }
                                        Axios.post("http://localhost:4000/api/projects/likeDislike", {
                                            newRaw: newProject
                                        }).then((response) => {
                                            console.log(response)
                                        })
                                    }
                                } mount() 
                                mount()
                            }}/> : {el.like}
                            <span>      </span>
                            <input type="button" value="Dislike" id={`dislike${el.projectKey}`} onClick={() => {
                                if (data.userId !== 0) {
                                    Axios.defaults.withCredentials = true
                                    const check_status: number | undefined = check(data.userId, el.projectKey, "dislike")
                                    if (check_status === 1) {
                                        let newProject = {
                                            projectKey: el.projectKey,
                                            userId: data.userId,
                                            status: "1337"
                                        }
                                        Axios.post("http://localhost:4000/api/projects/likeDislike", {
                                            newRaw: newProject
                                        }).then((response) => {
                                            console.log(response)
                                        })
                                    } else {
                                        let newProject = {
                                            projectKey: el.projectKey,
                                            userId: data.userId,
                                            status: "dislike"
                                        }
                                        Axios.post("http://localhost:4000/api/projects/likeDislike", {
                                            newRaw: newProject
                                        }).then((response) => {
                                            console.log(response)
                                        })
                                    }
                                } mount()
                                mount()
                            }}/> : {el.dislike}
                        </th>
                        <th><button onClick={data.handleShow_change}>Info</button></th>
                    </tr>
                ))
            }
        </tbody>
    )
}



export default TableElement