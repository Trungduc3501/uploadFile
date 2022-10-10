import React from "react";
export default class Index extends React.Component {
  state = {
    name: "",
    fileImage: [],
    linkImage: [],
    id: "",
    nameUpdate: "",
    textSearch: "",
    idUpdate : ""
  };

  isChange = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleAdd = (file) => {
    this.setState({
      fileImage: file,
    });
    let ImgArr = [];
    for (let i = 0; i < file.length; i++) {
      const url = URL.createObjectURL(file[i]);
      ImgArr.push(url);
    }
    this.setState({
        linkImage : ImgArr
    })
    console.log(ImgArr, "111111111113333");
  };

  render() {
    let listData = [];

    if (this.props.itemFile) {
      console.log(this.props.itemFile, "aaaa");
      listData = this.props.itemFile.map((item, key) => {
        return (
          <tr key={item._id}>
            <th>{key + 1}</th>
            <th>{item.name}</th>
            <th>
              {item.img.map((value, key) => {
                return (
                  <div key={key}>
                    <img alt="" src={value} width="100px"></img>
                     <button onClick={() => this.props.deleteOnes({id : item._id , index: key} )} style={{visibility : item.img.length > 1 ? 'visible' : 'hidden' }}>x</button>
                  </div>
                );
                
              })
              }
              
             
            </th>
           
              <th>
                <button
                  onClick={() =>
                    this.setState({
                      nameUpdate: item.name,
                      idUpdate: item._id,
                      linkImage: item.img,
                    })
                  }
                >
                  EDIT
                </button>
                <button onClick={() => this.props.deleteItems({ id: item._id })}>
                  DELETE
                </button>
              </th>
          </tr>
        );
      });
    }
  
    let paginate = []
    let totalPage = this.props.totalPage
    let activePage = this.props.activePage
    for ( let i = 1 ; i <= totalPage ; i++ ) {
      let button = (
        <button key={i} onClick={() => this.props.textSearch ? this.props.searchItems({
          activePage : i , textSearch: this.props.textSearch
        }) : this.props.paginateItems(i)} style={{backgroundColor : activePage === i ? 'blue' : 'white'}}>{i}</button>
      )
      paginate.push(button)
    }
    return (
      <div>
         <div>{this.state.linkImage.map((link, index) => {
                    return (
                        <div key={index}>
                            <span>
                                <img src={link} alt='' width={90} heigth={90}></img>
                            </span>
                        </div>
                    )
                })}</div>
        <input
          multiple
          type="file"
          onChange={(e) => this.handleAdd(e.target.files)}
        ></input>
        <br></br>
        <input type="text" onChange={(e) => this.isChange(e, "name")} />
        <button
          onClick={() => {
            
            this.props.addItems({
              name: this.state.name,
              img: this.state.fileImage,
            });
          }}
        >
          Submit
        </button>

        <br></br>
       
      

        <input
          type="text"
          onChange={(e) => this.isChange(e, "nameUpdate")}
          value={this.state.nameUpdate}
        />
        <button
          onClick={() => {
            this.props.updateItems({
              name: this.state.nameUpdate,
              id: this.state.idUpdate,
              img: this.state.fileImage,
            });
          }}
        >
          Update
        </button>
        <br></br>
        <input
          type="text"
          onChange={(e) => this.isChange(e, "textSearch")}
          value={this.state.textSearch}
        />
        <button
          onClick={() => {
            this.props.searchItems({
              textSearch: this.state.textSearch,
              activePage : 1
            });
          }}
        >
          Search
        </button>
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Ten</th>
              <th>Anh</th>
              <th>Hanh dong</th>
            </tr>
            {listData}
          </tbody>
        </table>
        {paginate}
      </div>
    );
  }
}

