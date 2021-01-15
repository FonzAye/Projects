import * as React from 'react';

interface Props {}

interface State {
    L: number
    fmax: number
}

class tik_lb extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            L: 0,
            fmax: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.sBogom = this.sBogom.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        if(name === "L") {
            this.setState({
              L: parseInt(value)
            })
          } else if (name === "fmax") {
              this.setState({
                  fmax: parseInt(value)
              })
          }
    }

    sBogom(L: number, fmax: number) {
        var n: number
        var db: number
        var bmax: number
        var Ts: number
        var x: number
        var y: number
        var at: number

        bmax = 2
        n = Math.log2(L)
        db = (2 * bmax) / (L - 1)
        Ts = 1 / (2 * fmax)
        for (let i = 0; i < 5; i++) {
            x = i * Ts
            y = 2 * Math.cos((15*x) + 3)
            at = (y - (-bmax)) / db
            
        }
    }

    render() {
        return (
            <div>
                <input onChange={this.handleChange}
                type="text" 
                name="L" 
                />
                <input onChange={this.handleChange}
                type="text" 
                name="fmax" 
                />
            </div>
        )
    }
}

export default tik_lb