import ReactDOM from "react-dom/client";
import React from 'react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
  useLocation,
} from 'react-router-dom';

const data = [
  {filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK"},
  {filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK"},
  {filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem"},
  {filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings"},
  {filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus"},
];


class App1 extends React.Component {
  render() {
    {/* <> fragment for >1 components */}
    return (
      <> 
        <Title name={this.props.name}/>
        <Gallery />
      </>  
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <header className="bg-warning">
        <h1 className="display-4 text-center">{this.props.name}</h1>
      </header>
    );
  }
}

class Gallery extends React.Component {
  render() {
    return (
      <main className="container">
        {data.map((file,index) => <FileCard i={index} key={index} />)}
      </main> 
    );
  }
} 

class FileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: -1 };
  }
  handleClick(index,e) {
    if (this.state.selected != index)
      this.setState({selected: index});
    else
      this.setState({selected: -1});
    console.log(index);
  }
  render() {
    let i = this.props.i;
    return (
      <div onClick={(e)=>this.handleClick(i,e)} className="card d-inline-block m-2" style={{width:this.state.selected==i? '100%' : 200}}>
        <img src={"images/"+data[i].filename} className="w-100" />
        <div className="card-body">
          <h6 className="card-title">{data[i].filename}</h6>
          <p className="card-text">{data[i].year}</p>
          { this.state.selected==i && <p className="card-text">{data[i].remarks}</p> }
        </div>
      </div>
    );
  }
}
function App2() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/about">About</Link> </li>
          <li> <Link to="/file/fileA">FileA</Link> </li>
          <li> <Link to="/file/fileB">FileB</Link> </li>
          <li> <Link to="/file/fileC">FileC</Link> </li>
          <li> <Link to="/wrong">Wrong Link</Link> </li>
        </ul>
      </div>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/file/:id" element={<File />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function File() {
  let { id } = useParams();
  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}


const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App1 />);
