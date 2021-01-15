import * as React from 'react';
import { ArrayOfRows } from './Landing';
import '../styles/AddElement.css'


interface Props {
    handleShow_add: () => void
    handleAdd: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    author: string
    theme: string
    description: string
    popCLass_add: string
    data: ArrayOfRows[]
    login: string
}

export const AddElement: React.FC<Props> = (props: Props) => {

    return (
        <div className={`popup ${props.popCLass_add}`}>
            <div className="popup__body">
                <div className="popup__content">
                  <div className="popup__close" onClick={props.handleShow_add}>X</div>
                  <h1>Add</h1>
                  <div className="textbox">
                      <input 
                        name="author"
                        type="text" 
                        value={props.login}
                        onChange={props.handleChange}
                      />
                  </div>
                  <div className="textbox">
                      <input
                        name="theme" 
                        type="text" 
                        placeholder="theme"
                        value={props.theme}
                        onChange={props.handleChange}
                      />
                  </div>
                  <div className="textbox">
                      <textarea 
                        name="description"
                        placeholder="description"
                        value={props.description}
                        onChange={props.handleChange}
                        cols={30}
                        rows={10}
                      />
                      </div>
                  <input type="button" className="btn" value="add" onClick={props.handleAdd}/>
                </div>
            </div>
        </div>
    )
};