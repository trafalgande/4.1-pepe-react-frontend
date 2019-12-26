import React, { Component } from 'react'

class HeaderBar extends Component {
    render() {
        return (
    
            <div className="card-header">
            <h4>Лабораторная работа №4</h4>
            <p className="card-text"><small className="text-muted">Чайка Алексей | Р3214 | Вариант: 3453</small></p>
            <p className="card-text"><small className="text-muted">Current user : {this.props.currentUser}</small></p>

            </div>

        )
    }
}
export default HeaderBar