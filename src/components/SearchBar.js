import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends Component{

    render(){
        return (
            <div>
                輸入使用者姓名:<input type="text" /><button>查詢</button><br/>
                輸入專案名稱:  <input type="text" /><br/>
                <input type="checkbox"/>只顯示fork次數大於20的專案
            </div>
        );
    }
}

export default SearchBar;