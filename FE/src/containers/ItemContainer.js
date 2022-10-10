import React, { Component } from 'react';
import * as actions from '../actions/ItemAction'
import Items from '../components/Items'
import { connect} from 'react-redux'
class ItemContainer extends Component {
    componentDidMount() {
        this.props.paginateItems(1)
    }
    render() {
        return (
            <div>
                <Items {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemFile : state.items.listItem,
        totalPage : state.items.totalPage,
        activePage : state.items.activePage,
        textSearch : state.items.textSearch
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getItems: () => {
            dispatch(actions.getRequest())
        },
        addItems: (data) => {
            dispatch(actions.addRequest(data))
        },
        deleteItems: (data) => {
            dispatch(actions.deleteRequest(data))
        },
        updateItems: (data) => {
            dispatch(actions.updateRequest(data))
        },
        paginateItems: (data) => {
            dispatch(actions.paginateRequest(data))
        },
        searchItems: (data) => {
            dispatch(actions.searchRequest(data))
        },
        deleteOnes: (data) => {
            dispatch(actions.deleteOneRequest(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)