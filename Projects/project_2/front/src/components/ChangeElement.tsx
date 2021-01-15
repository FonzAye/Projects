import * as React from 'react';
import { ArrayOfRows } from './Landing';
import '../styles/AddElement.css'

interface Props {
    handleShow_change: () => void
    handleEdit: () => void
    handleDelete: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    id: number
    author: string
    theme: string
    description: string
    popCLass_change: string
    data: ArrayOfRows[]
    login: string
}

const ChangeElement: React.FC<Props> = (props: Props) => {
  if(props.login === props.author){
    return (
      <div className={`popup__click ${props.popCLass_change}`}>
      <div className="popup__body">
          <div className="popup__content">
            <div className="popup__close" onClick={props.handleShow_change}>X</div>
            <h1>Info</h1>
            <div className="textbox" id="textbox">
                <input 
                  type="text" 
                  value={props.author}
                  disabled
                />
            </div>
            <div className="textbox"id="textbox">
                <input
                  name="theme" 
                  type="text" 
                  placeholder="theme"
                  value={props.theme}
                  onChange={props.handleChange}
                />
            </div>
            <div className="textbox"id="textbox">
            <textarea 
                      name="description"
                      placeholder="description"
                      value={props.description} 
                      onChange={props.handleChange}
                      cols={30}
                      rows={10}
                    />
                </div>
            <input type="button" className="btn" value="save" onClick={props.handleEdit}/>
            <input type="button" className="btn" value="delete" onClick={props.handleDelete}/>
          </div>
      </div>
  </div>
  )
  } else {
    return (
      <div className={`popup__click ${props.popCLass_change}`}>
      <div className="popup__body">
          <div className="popup__content">
            <div className="popup__close" onClick={props.handleShow_change}>X</div>
            <h1>Info</h1>
            <div className="textbox" id="textbox">
                <input 
                  type="text" 
                  value={props.author}
                  disabled
                />
            </div>
            <div className="textbox"id="textbox">
                <input
                  name="theme" 
                  type="text" 
                  placeholder="theme"
                  value={props.theme}
                  onChange={props.handleChange}
                  disabled
                />
            </div>
            <div className="textbox"id="textbox">
            <textarea 
                      name="description"
                      placeholder="description"
                      value={props.description} 
                      onChange={props.handleChange}
                      cols={30}
                      rows={10}
                      disabled
                    />
                </div>
            <input disabled type="button" className="btn" value="save" onClick={props.handleEdit} style={{display: 'none'}}/>
            <input disabled type="button" className="btn" value="delete" onClick={props.handleDelete} style={{display: 'none'}}/>
          </div>
      </div>
  </div>
  )
  }
    
};

export default ChangeElement